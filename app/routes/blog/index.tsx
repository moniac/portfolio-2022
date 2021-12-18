import { Link, MetaFunction, useLoaderData } from "remix";
import { getPosts, Post } from "~/blog.server";
import { BlogCard } from "../../components/BlogCard";

export const loader = () => {
  return getPosts();
};

export let meta: MetaFunction = () => {
  return {
    title: "Blog",
    description: "A collection of my blog posts.",
  };
};

export default () => {
  const posts = useLoaderData<Post[]>();

  return (
    <div>
      <h1>Blog</h1>
      <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {posts.map((post) => (
          <li key={post.slug}>
            <BlogCard
              title={post.title}
              teaser={post.frontmatter.teaser}
              link={post.slug}
            />
          </li>
        ))}
      </ul>
    </div>
  );
};
