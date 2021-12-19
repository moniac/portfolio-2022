import path from "path";
import fs from "fs/promises";
import parseFrontMatter from "front-matter";
import { bundleMDX } from "mdx-bundler";
import readingTime from "reading-time";
import rehypeHighlightCode from "../utils/rehype-highlight-code";
import rehypeMetaAttribute from "../utils/rehype-meta-attribute";
import rehypeTOC from "@jsdevtools/rehype-toc";
import rehypeSlug from "rehype-slug";

export type Post = {
  slug: string;
  title: string;
  frontmatter: {
    title: string;
    teaser: string;
  };
};

// relative to the server output not the source!
const postsPath = path.join(__dirname, "posts");

export async function getPosts() {
  const dir = await fs.readdir(postsPath);
  return Promise.all(
    dir.map(async (filename) => {
      const file = await fs.readFile(path.join(postsPath, filename));
      const { attributes } = parseFrontMatter(file.toString());

      return {
        slug: filename.replace(/\.mdx$/, ""),
        title: attributes.title,
        frontmatter: attributes,
      };
    })
  );
}

export async function getPost(slug: string) {
  const filepath = path.join(postsPath, slug + ".mdx");

  const file = await fs.readFile(filepath);
  const postContent = file.toString();

  const result = await bundleMDX({
    source: postContent,
    xdmOptions(options) {
      options.rehypePlugins = [
        ...(options.rehypePlugins ?? []),
        rehypeSlug,
        rehypeTOC,
        rehypeMetaAttribute,
        rehypeHighlightCode,
      ];

      return options;
    },
  });

  return {
    slug,
    html: result.code,
    title: result.frontmatter.title,
    readingTime: readingTime(postContent),
    frontmatter: result.frontmatter,
  };
}
