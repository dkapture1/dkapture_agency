import fs from "fs";
import path from "path";
import matter from "gray-matter";

const postsDirectory = path.join(process.cwd(), "content/blog");

export interface BlogPost {
    slug: string;
    title: string;
    excerpt: string;
    date: string;
    author: string;
    category: string;
    tags: string[];
    featuredImage: string;
    readTime: number;
    content: string;
    locale: string;
}

export type BlogPostMetadata = Omit<BlogPost, "content">;

export async function getBlogPost(slug: string, locale: string): Promise<BlogPost | null> {
    // We look for files named `slug.mdx`
    // The content inside should have frontmatter for both languages or we might use specific logic.
    // Per SPRINT-6.md, we use bilingual frontmatter in a single file or two files. 
    // Let's implement the single file strategy with bilingual frontmatter fields (title, titlePt, etc.) 
    // and return the localized version.

    const fullPath = path.join(postsDirectory, `${slug}.mdx`);

    if (!fs.existsSync(fullPath)) {
        return null;
    }

    const fileContents = fs.readFileSync(fullPath, "utf8");
    const { data, content } = matter(fileContents);

    // Helper to get localized string or fallback
    const getLoc = (key: string) => (locale === "pt" ? data[`${key}Pt`] || data[key] : data[key]);

    return {
        slug,
        title: getLoc("title"),
        excerpt: getLoc("excerpt"),
        date: data.date,
        author: data.author,
        category: data.category, // We might want to localize category names in the UI, keeping the key static here
        tags: data.tags,
        featuredImage: data.featuredImage,
        readTime: data.readTime,
        content, // The raw MDX content
        locale,
    };
}

export async function getAllOneLocalePosts(locale: string): Promise<BlogPostMetadata[]> {
    if (!fs.existsSync(postsDirectory)) {
        return [];
    }

    const fileNames = fs.readdirSync(postsDirectory);
    const posts = fileNames
        .filter((fileName) => fileName.endsWith(".mdx"))
        .map((fileName) => {
            const slug = fileName.replace(/\.mdx$/, "");
            const fullPath = path.join(postsDirectory, fileName);
            const fileContents = fs.readFileSync(fullPath, "utf8");
            const { data } = matter(fileContents);

            const getLoc = (key: string) => (locale === "pt" ? data[`${key}Pt`] || data[key] : data[key]);

            return {
                slug,
                title: getLoc("title"),
                excerpt: getLoc("excerpt"),
                date: data.date,
                author: data.author,
                category: data.category,
                tags: data.tags,
                featuredImage: data.featuredImage,
                readTime: data.readTime,
                locale,
            };
        })
        .sort((a, b) => (a.date < b.date ? 1 : -1));

    return posts;
}

export async function getAllPosts(): Promise<string[]> {
    if (!fs.existsSync(postsDirectory)) {
        return [];
    }
    const fileNames = fs.readdirSync(postsDirectory);
    return fileNames
        .filter((fileName) => fileName.endsWith(".mdx"))
        .map((fileName) => fileName.replace(/\.mdx$/, ""));
}
