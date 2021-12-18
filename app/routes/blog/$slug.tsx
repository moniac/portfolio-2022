import { useMemo } from "react";
import {
  LinksFunction,
  LoaderFunction,
  MetaFunction,
  useLoaderData,
} from "remix";
import { getMDXComponent } from "mdx-bundler/client";
import { getPost } from "~/blog.server";
import stylesUrl from "../../styles/blog/post.css";
import { BlockQuote } from "~/components/BlockQuote";

export const loader: LoaderFunction = async ({ params }) => {
  if (!params.slug) {
    return "expected a 🐌!";
  }
  return getPost(params.slug);
};

export let meta: MetaFunction = ({ data }) => {
  const {
    title,
    frontmatter: { teaser },
  } = data;
  return {
    title: data ? title : "Oops...",
    description: teaser,
  };
};

export let links: LinksFunction = () => {
  return [{ rel: "stylesheet", href: stylesUrl }];
};

const components = {
  code: (props) => {
    return <code {...props} />;
  },
  blockquote: (props) => {
    return <BlockQuote {...props} />;
  },
};

export default function PostSlug() {
  const result = useLoaderData();
  const { html: code, readingTime } = result;

  const Component = useMemo(() => getMDXComponent(code), [code]);

  return (
    <main className="flow post">
      <h1>{result.title}</h1>
      <em>{readingTime.text} approx.</em>
      <Component components={components} />
    </main>
  );
}
