# Prompt para Gemini Navegador — Configuração DNS, Analytics & Search Console

> Copie o bloco abaixo e cole no Gemini no navegador para que ele te guie passo a passo

---

```
Você está me ajudando a configurar a infraestrutura de produção do site dkapture.com. O site foi desenvolvido em Next.js 16 e será hospedado na Vercel. O domínio está no Cloudflare. Me guie passo a passo em cada tarefa abaixo.

## Informações do projeto
- Domínio: dkapture.com
- Hospedagem: Vercel
- DNS: Cloudflare
- Framework: Next.js 16 (App Router)
- Sitemap: https://dkapture.com/sitemap.xml

---

## TAREFA 1: Configurar DNS no Cloudflare para Vercel

Me guie para configurar os registros DNS no Cloudflare apontando para a Vercel:

1. No painel do Cloudflare para dkapture.com → DNS → Records
2. Criar/verificar estes registros:
   - **CNAME** `@` → `cname.vercel-dns.com` (Proxy: DNS Only / cinza)
   - **CNAME** `www` → `cname.vercel-dns.com` (Proxy: DNS Only / cinza)
3. Em SSL/TLS → modo: `Full (Strict)` se usando proxy, ou qualquer modo se DNS Only
4. Verificar que não há registros conflitantes (A records antigos, etc.)

Me mostre onde clicar em cada etapa.

---

## TAREFA 2: Adicionar domínio na Vercel

Me guie para adicionar o domínio customizado na Vercel:

1. No dashboard da Vercel → projeto dkapture-agency → Settings → Domains
2. Adicionar `dkapture.com`
3. Adicionar `www.dkapture.com` (redirect para dkapture.com)
4. Aguardar o checkmark verde (SSL provisioned)
5. Testar: abrir https://dkapture.com e https://www.dkapture.com

---

## TAREFA 3: Google Analytics 4 — Criar Property (se não existir)

Me guie para criar a property GA4:

1. Ir para https://analytics.google.com
2. Admin → Create Property
   - Nome: "Dkapture Agency"
   - Timezone: US - Eastern Time
   - Currency: USD
3. Criar Data Stream → Web
   - URL: https://dkapture.com
   - Stream name: "Dkapture Web"
4. Copiar o Measurement ID (formato G-XXXXXXXXXX)
5. Esse ID será usado no código do site

---

## TAREFA 4: Google Search Console — Verificar e Configurar

Se a propriedade já foi verificada, me guie para:

1. Ir para https://search.google.com/search-console
2. Selecionar a property dkapture.com
3. Ir em Sitemaps → Adicionar:
   - `https://dkapture.com/sitemap.xml`
4. Verificar se o sitemap foi aceito e quantas URLs foram descobertas
5. Ir em URL Inspection → testar a homepage `https://dkapture.com`
6. Verificar se há erros de indexação

Se a propriedade NÃO foi verificada ainda:
1. Adicionar property tipo "Domain" → `dkapture.com`
2. Verificar via DNS TXT record no Cloudflare
3. Após verificação, submeter o sitemap

---

## TAREFA 5: Configurar Event Tracking (depois de ter o Measurement ID)

Após obter o Measurement ID, o desenvolvedor vai adicionar ao site:
- Pageview tracking (automático com GA4)
- Form submission events (contato, newsletter)
- CTA button clicks
- Phone/WhatsApp clicks

Me ajude a configurar no GA4:
1. Admin → Data Streams → Dkapture Web → Enhanced Measurement
2. Ativar: Page views, Scrolls, Outbound clicks, Site search, Form interactions
3. Criar Custom Events se necessário:
   - `contact_form_submit`
   - `newsletter_signup`
   - `cta_click`
   - `whatsapp_click`

---

## Ordem recomendada
1. DNS Cloudflare → 2. Vercel Domain → 3. GA4 Property → 4. Search Console → 5. Events

Me guie uma tarefa de cada vez, esperando minha confirmação antes de seguir para a próxima.
```
