# Lições Aprendidas — Dkapture Agency Website

> Documento técnico para que futuras IAs (ou desenvolvedores) evitem os mesmos erros.
> Atualizar a cada sprint que introduzir bugs ou padrões novos.

---

## Última atualização: v1.0.0 (2026-02-15)

---

## 1. Next.js 16 — `params` é Promise

### O problema
No Next.js 16, `params` em page components e `generateMetadata` é uma **Promise** e precisa ser `await`ed. Isso é diferente do Next.js 14/15.

### Bug encontrado (Sprint 4)
```tsx
// ❌ ERRADO — causava 404 em todas as rotas dinâmicas
interface PageProps {
    params: { slug: string; locale: string };
}
export default function Page({ params }: PageProps) {
    const study = data.find(s => s.slug === params.slug); // undefined!
}
```

```tsx
// ✅ CORRETO
interface PageProps {
    params: Promise<{ slug: string; locale: string }>;
}
export default async function Page({ params }: PageProps) {
    const { slug, locale } = await params;
    setRequestLocale(locale);
    const study = data.find(s => s.slug === slug);
}
```

### Onde verificar
- Todos os arquivos `app/[locale]/**/page.tsx`
- Ambos: componente default export E `generateMetadata`

### Arquivo de referência
`app/[locale]/ecosystem/[service]/page.tsx` — padrão correto implementado

---

## 2. `generateStaticParams` deve incluir locale

### O problema
Se `generateStaticParams` não incluir `locale`, as páginas dinâmicas só são geradas para o locale padrão.

### Bug encontrado (Sprint 4)
```tsx
// ❌ ERRADO — só gera EN, PT dá 404
export async function generateStaticParams() {
    return items.map((item) => ({ slug: item.slug }));
}
```

```tsx
// ✅ CORRETO — gera EN + PT
export function generateStaticParams() {
    const locales = ["en", "pt"];
    return locales.flatMap((locale) =>
        items.map((item) => ({ locale, slug: item.slug }))
    );
}
```

---

## 3. Links internos — SEMPRE `@/i18n/navigation`

### O problema
Usar `import Link from "next/link"` ignora o sistema de locale do next-intl. Links não adicionam o prefixo `/pt` automaticamente.

### Bug encontrado (Sprint 3)
`related-case.tsx` usava `next/link` → links em PT apontavam para páginas EN.

### Regra
```tsx
// ❌ NUNCA
import Link from "next/link";
import { useRouter } from "next/navigation";

// ✅ SEMPRE
import { Link, useRouter, usePathname } from "@/i18n/navigation";
```

### Exceções válidas
- `app/not-found.tsx` (root, fora do `[locale]`) — pode usar `next/link`
- `app/global-error.tsx` — pode usar `<a>` puro (layout pode ter falhado)

---

## 4. Strings hardcoded — Pattern recorrente

### O problema
O Gemini consistentemente esquecia de traduzir strings em componentes novos. Cada sprint teve pelo menos 2-5 strings hardcoded em inglês.

### Strings frequentemente esquecidas
- Badges/labels pequenos (ex: `"Proprietary Tech"`, `"MOST POPULAR"`)
- Aria-labels (ex: `"Copy Link"`, `"Share on LinkedIn"`)
- Alerts (ex: `alert("Link copied to clipboard!")`)
- Textos sr-only (ex: `<span className="sr-only">Home</span>`)
- Mensagens de estado vazio (ex: `"Try adjusting your filters"`)
- Sufixos de unidade (ex: `"/mo"`, `"/yr"`)

### Checklist de verificação
```bash
# Buscar strings suspeitas em componentes novos
grep -rn '"[A-Z][a-z]' components/sections/novo-componente.tsx
# Buscar aria-labels hardcoded
grep -rn 'aria-label="' components/
# Buscar alerts
grep -rn 'alert(' components/
```

---

## 5. middleware.ts — Cuidado com o matcher

### O problema
O negative lookahead no matcher do middleware exclui paths do processamento de locale. Se uma rota de app tiver o mesmo nome de uma pasta em `/public/`, ela será excluída.

### Bug encontrado (Sprint 4)
```typescript
// ❌ ERRADO — excluía /portfolio das rotas, causando 404
matcher: ["/((?!api|_next|_vercel|images|portfolio|.*\\..*).*)" ]

// ✅ CORRETO — portfolio removido, arquivos estáticos cobertos por .*\\..*
matcher: ["/((?!api|_next|_vercel|images|.*\\..*).*)" ]
```

### Regra
Nunca adicionar nomes de rotas de app ao matcher. Arquivos estáticos com extensão já são cobertos por `.*\\..*`.

---

## 6. MDX custom components — Props com arrays/objetos

### O problema
`next-mdx-remote/rsc` pode não serializar corretamente props com arrays ou objetos complexos passados inline no MDX.

### Bug encontrado (Sprint 6)
```mdx
<!-- ❌ Props com arrays causavam undefined -->
<ComparisonTable
  headers={["Feature", "UGC", "Professional Video"]}
  rows={[{ feature: "Cost", u: "Low", p: "Medium/High" }]}
/>
```

### Solução
Adicionar defaults seguros nos componentes MDX:
```tsx
function ComparisonTable({ headers = [], rows = [] }: Props) {
    if (!headers.length || !rows.length) return null;
    // ...
}
```

---

## 7. Regressões ao tocar em arquivos existentes

### O problema
Ao implementar novas funcionalidades, o Gemini ocasionalmente alterava arquivos existentes e introduzia regressões (ex: removendo `await` de params em arquivo que já funcionava).

### Bug encontrado (Sprint 6)
`portfolio/page.tsx` teve o `generateMetadata` reescrito sem `await params`, mesmo já estando correto antes.

### Regra para IAs futuras
- Antes de modificar um arquivo existente, ler o conteúdo atual
- Verificar se os padrões existentes (params Promise, i18n, Link imports) estão preservados
- Após a sprint, rodar TODAS as URLs existentes, não apenas as novas

---

## 8. Formato de moeda locale-aware

### O problema
`Intl.NumberFormat` com locale hardcoded `"en-US"` exibe formato americano mesmo na versão PT.

### Bug encontrado (Sprint 5)
```tsx
// ❌ ERRADO — sempre formato americano
const formatCurrency = (v: number) =>
    new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(v);

// ✅ CORRETO — formato muda por locale
import { useLocale } from "next-intl";
const locale = useLocale();
const formatCurrency = (v: number) =>
    new Intl.NumberFormat(locale === "pt" ? "pt-BR" : "en-US", {
        style: "currency", currency: "USD", maximumFractionDigits: 0
    }).format(v);
```

---

## 9. Error pages e i18n

### O problema
Error pages (`not-found.tsx`, `error.tsx`) podem ou não ter acesso ao Provider de i18n, dependendo de onde estão na árvore de componentes.

### Estratégia definida (Sprint 7)

| Arquivo | Acesso ao i18n | Estratégia |
|---------|---------------|------------|
| `app/not-found.tsx` | ❌ Fora do `[locale]` | Dual-language manual (EN + PT) |
| `app/[locale]/not-found.tsx` | ✅ Dentro do Provider | `useTranslations("notFound")` |
| `app/[locale]/error.tsx` | ✅ Client Component com Provider | `useTranslations("error")` |
| `app/global-error.tsx` | ❌ Layout pode ter crashado | Dual-language hardcoded |

---

## 10. Checklist de validação por sprint

### Usar esta checklist após CADA sprint:

```bash
# 1. Build
pnpm build  # DEVE passar sem erros

# 2. URLs novas (EN + PT)
curl -s -o /dev/null -w "%{http_code}" "http://localhost:3000/nova-rota"
curl -s -o /dev/null -w "%{http_code}" "http://localhost:3000/pt/nova-rota"

# 3. Regressão (TODAS as rotas existentes)
curl -s -o /dev/null -w "%{http_code}" "http://localhost:3000/"
curl -s -o /dev/null -w "%{http_code}" "http://localhost:3000/ecosystem"
curl -s -o /dev/null -w "%{http_code}" "http://localhost:3000/portfolio"
curl -s -o /dev/null -w "%{http_code}" "http://localhost:3000/portfolio/urban-oasis"
curl -s -o /dev/null -w "%{http_code}" "http://localhost:3000/ai-lab"
curl -s -o /dev/null -w "%{http_code}" "http://localhost:3000/insights"
curl -s -o /dev/null -w "%{http_code}" "http://localhost:3000/pt"
# ... todas as rotas PT

# 4. Hardcoded strings
grep -rn 'from "next/link"' components/  # deve ser 0
grep -rn '"[A-Z][a-z].*"' components/sections/novo*.tsx  # verificar manualmente

# 5. Console do dev server
# Verificar ZERO MISSING_MESSAGE warnings

# 6. Sitemap
curl -s "http://localhost:3000/sitemap.xml" | grep "nova-rota"  # deve encontrar
```

---

## 11. Workflow Claude ↔ Gemini

### Como funciona
- **Claude** = Tech Lead / Reviewer (valida planos, testa implementações, identifica bugs)
- **Gemini** = Developer (implementa código baseado nos prompts)
- **Arquivo de comunicação**: `docs/GEMINI-PROMPT.md` (atualizado a cada ciclo)

### Fluxo
1. Claude prepara prompt → `docs/GEMINI-PROMPT.md`
2. Usuário copia prompt → cola no Gemini
3. Gemini apresenta plano → Usuário compartilha com Claude
4. Claude revisa plano → aprova ou solicita ajustes
5. Gemini implementa → Usuário pede validação ao Claude
6. Claude testa (build + URLs + i18n + hardcoded strings + regressão)
7. Se bugs → Claude prepara fix prompt → volta ao passo 2
8. Se ok → próxima sprint

### Lições do workflow
- **Sempre pedir plano antes de codar** — evita retrabalho
- **Incluir templates de código no prompt** — o Gemini segue melhor com exemplos explícitos
- **Reforçar regras recorrentes** — a cada prompt, incluir as regras que o Gemini mais esquece
- **Referenciar arquivos existentes** — ex: "use `ecosystem/[service]/page.tsx` como modelo"

---

## 12. Dependências críticas e versões

| Pacote | Versão | Notas |
|--------|--------|-------|
| next | 16.1.6 | params é Promise, middleware usa "proxy" |
| next-intl | 4.8.2 | localePrefix "as-needed" |
| react | 19.x | Server Components por padrão |
| framer-motion | 11.x | Animações em client components |
| @next/third-parties | latest | Google Analytics 4 |
| next-mdx-remote | latest | Usar import `/rsc` para Server Components |
| gray-matter | latest | Parse frontmatter dos MDX |
| pnpm | 10.x | NUNCA usar npm |

---

## Apêndice: Bugs por sprint

| Sprint | Bug | Severidade | Causa raiz |
|--------|-----|------------|------------|
| 3 | 7 strings hardcoded em componentes de serviço | Alta | Gemini não traduziu strings curtas |
| 3 | `related-case.tsx` com `next/link` | Alta | Import errado |
| 3 | `ecosystem/page.tsx` metadata estática | Média | Não converteu para `generateMetadata` |
| 4 | Middleware excluía `/portfolio` | Crítica | `portfolio` no negative lookahead |
| 4 | `[slug]/page.tsx` params sem Promise | Crítica | Padrão Next.js 14 usado em Next.js 16 |
| 4 | `generateStaticParams` sem locale | Crítica | Gerava só EN |
| 4 | `case-challenge.tsx` fallback hardcoded | Média | `\|\| "The Challenge"` |
| 4 | `portfolio/page.tsx` metadata estática | Média | Não converteu |
| 5 | `ai-integrations.tsx` sem i18n | Alta | Componente inteiro sem `useTranslations` |
| 5 | `ai-tools-grid.tsx` badge hardcoded | Alta | `"Proprietary Tech"` |
| 5 | `roi-calculator.tsx` sufixos hardcoded | Média | `"/mo"`, `"/yr"` |
| 5 | `roi-calculator.tsx` formato moeda fixo | Baixa | `en-US` hardcoded |
| 6 | `ComparisonTable` crash (500) | Crítica | MDX props arrays → undefined |
| 6 | `portfolio/page.tsx` params regressão | Crítica | Gemini reescreveu sem `await` |
| 6 | `insights/page.tsx` string hardcoded | Alta | `"Try adjusting..."` |
| 6 | `breadcrumbs.tsx` "Home" hardcoded | Média | sr-only text |
| 6 | `share-buttons.tsx` 3 strings | Média | alert + aria-labels |
| 6 | RSS título idêntico EN/PT | Média | Ternário retorna mesmo valor |
| 6 | `blog-sidebar.tsx` ignora prop | Média | Array hardcoded vs prop |
| 6 | Translation keys ausentes case studies | Média | `client`, `duration` faltavam |
