import {
  Link,
  Links,
  LiveReload,
  LoaderFunction,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useCatch,
  useLoaderData,
} from "remix";
import type { LinksFunction } from "remix";
import { GitHub, Linkedin, Twitter } from "react-feather";

import globalStylesUrl from "~/styles/global.css";
import darkStylesUrl from "~/styles/dark.css";
import { getPlaying } from "./spotify.server";
import { NowPlaying } from "./components/NowPlaying";

// https://remix.run/api/app#links
export let links: LinksFunction = () => {
  return [
    { rel: "stylesheet", href: globalStylesUrl },
    {
      rel: "stylesheet",
      href: darkStylesUrl,
      // media: "(prefers-color-scheme: dark)",
    },
    // { rel: "stylesheet", href: tailwindStyles },
  ];
};

export let loader: LoaderFunction = async (data) => {
  return await getPlaying();
};

// https://remix.run/api/conventions#default-export
// https://remix.run/api/conventions#route-filenames
export default function App() {
  return (
    <Document>
      <Layout>
        <Outlet />
      </Layout>
    </Document>
  );
}

// https://remix.run/docs/en/v1/api/conventions#errorboundary
export function ErrorBoundary({ error }: { error: Error }) {
  console.error(error);
  return (
    <Document title="Error!">
      <Layout>
        <div>
          <h1>There was an error</h1>
          <p>{error.message}</p>
          <hr />
          <p>
            Hey, developer, you should replace this with what you want your
            users to see.
          </p>
        </div>
      </Layout>
    </Document>
  );
}

// https://remix.run/docs/en/v1/api/conventions#catchboundary
export function CatchBoundary() {
  let caught = useCatch();

  let message;
  switch (caught.status) {
    case 401:
      message = (
        <p>
          Oops! Looks like you tried to visit a page that you do not have access
          to.
        </p>
      );
      break;
    case 404:
      message = (
        <p>Oops! Looks like you tried to visit a page that does not exist.</p>
      );
      break;

    default:
      throw new Error(caught.data || caught.statusText);
  }

  return (
    <Document title={`${caught.status} ${caught.statusText}`}>
      <Layout>
        <h1>
          {caught.status}: {caught.statusText}
        </h1>
        {message}
      </Layout>
    </Document>
  );
}

function Document({
  children,
  title,
}: {
  children: React.ReactNode;
  title?: string;
}) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width,initial-scale=1" />
        {title ? <title>{title}</title> : null}
        <Meta />
        <Links />
      </head>
      <body>
        {children}
        <ScrollRestoration />
        <Scripts />
        {process.env.NODE_ENV === "development" && <LiveReload />}
      </body>
    </html>
  );
}

function Layout({ children }: { children: React.ReactNode }) {
  const response = useLoaderData();

  return (
    <div className="remix-app">
      <header className="remix-app__header">
        <div className="container remix-app__header-content">
          <Link to="/" title="Moniac" className="remix-app__header-home-link">
            <MoniacLogo />
          </Link>
          <nav aria-label="Main navigation" className="remix-app__header-nav">
            <ul>
              <li>
                <Link to="/">Home</Link>
              </li>
              <li>
                <Link to="/blog">Blog</Link>
              </li>
            </ul>
          </nav>
        </div>
      </header>
      <div className="remix-app__main">
        <div className="container remix-app__main-content">{children}</div>
      </div>

      <div className="container">
        {!response?.spotifyError && <NowPlaying {...response} />}
      </div>
      <footer className="remix-app__footer">
        <div className="container remix-app__footer-content">
          <p>&copy; Mohammed Mulazada</p>

          <div className="icons">
            <a target="_blank" href="https://twitter.com/thisismoniac">
              <Twitter />
            </a>
            <a target="_blank" href="https://github.com/moniac">
              <GitHub />
            </a>
            <a target="_blank" href="https://twitter.com/thisismoniac">
              <Linkedin />
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}

function MoniacLogo() {
  return (
    <svg
      fill="currentColor"
      width="40"
      data-name="Layer 1"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 400 400"
    >
      <path
        className="cls-1"
        d="M261 157a155 155 0 0116 7l35-89h1v120a136 136 0 0124 41 159 159 0 015 15V34h-42l-47 119 8 4zM184 331h27l54-135a109 109 0 00-19-12l-4-2-44 113-45-113-4 2a109 109 0 00-18 12zM58 236a136 136 0 0124-41V75h1l35 89a155 155 0 0116-7l8-4L95 34H53v218a159 159 0 015-16z"
      ></path>
    </svg>
  );
}
