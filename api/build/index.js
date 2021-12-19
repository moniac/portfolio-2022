var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getOwnPropSymbols = Object.getOwnPropertySymbols;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __propIsEnum = Object.prototype.propertyIsEnumerable;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __spreadValues = (a, b) => {
  for (var prop in b || (b = {}))
    if (__hasOwnProp.call(b, prop))
      __defNormalProp(a, prop, b[prop]);
  if (__getOwnPropSymbols)
    for (var prop of __getOwnPropSymbols(b)) {
      if (__propIsEnum.call(b, prop))
        __defNormalProp(a, prop, b[prop]);
    }
  return a;
};
var __markAsModule = (target) => __defProp(target, "__esModule", { value: true });
var __export = (target, all) => {
  __markAsModule(target);
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __reExport = (target, module2, desc) => {
  if (module2 && typeof module2 === "object" || typeof module2 === "function") {
    for (let key of __getOwnPropNames(module2))
      if (!__hasOwnProp.call(target, key) && key !== "default")
        __defProp(target, key, { get: () => module2[key], enumerable: !(desc = __getOwnPropDesc(module2, key)) || desc.enumerable });
  }
  return target;
};
var __toModule = (module2) => {
  return __reExport(__markAsModule(__defProp(module2 != null ? __create(__getProtoOf(module2)) : {}, "default", module2 && module2.__esModule && "default" in module2 ? { get: () => module2.default, enumerable: true } : { value: module2, enumerable: true })), module2);
};

// <stdin>
__export(exports, {
  assets: () => import_assets.default,
  entry: () => entry,
  routes: () => routes
});

// node_modules/@remix-run/dev/compiler/shims/react.ts
var React = __toModule(require("react"));

// app/entry.server.tsx
var entry_server_exports = {};
__export(entry_server_exports, {
  default: () => handleRequest
});
var import_server = __toModule(require("react-dom/server"));
var import_remix = __toModule(require("remix"));
function handleRequest(request, responseStatusCode, responseHeaders, remixContext) {
  let markup = (0, import_server.renderToString)(/* @__PURE__ */ React.createElement(import_remix.RemixServer, {
    context: remixContext,
    url: request.url
  }));
  responseHeaders.set("Content-Type", "text/html");
  return new Response("<!DOCTYPE html>" + markup, {
    status: responseStatusCode,
    headers: responseHeaders
  });
}

// route-module:/Users/mohammedmulazada/Documents/GitHub/portfolio-2022/app/root.tsx
var root_exports = {};
__export(root_exports, {
  CatchBoundary: () => CatchBoundary,
  ErrorBoundary: () => ErrorBoundary,
  default: () => App,
  links: () => links,
  loader: () => loader
});
var import_remix2 = __toModule(require("remix"));
var import_react_feather = __toModule(require("react-feather"));

// app/styles/global.css
var global_default = "/build/_assets/global-D5HQBARV.css";

// app/styles/dark.css
var dark_default = "/build/_assets/dark-RLW6FJQO.css";

// app/spotify.server.tsx
var {
  SPOTIFY_CLIENT_ID: client_id,
  SPOTIFY_CLIENT_SECRET: client_secret,
  SPOTIFY_REFRESH_TOKEN: refresh_token
} = process.env;
var basic = Buffer.from(`${client_id}:${client_secret}`).toString("base64");
var NOW_PLAYING_ENDPOINT = `https://api.spotify.com/v1/me/player/currently-playing`;
var RECENTLY_PLAYED_ENDPOINT = `https://api.spotify.com/v1/me/player/recently-played`;
var TOKEN_ENDPOINT = `https://accounts.spotify.com/api/token`;
var getAccessToken = async () => {
  const params = new URLSearchParams({
    grant_type: "refresh_token",
    refresh_token
  });
  const response = await fetch(TOKEN_ENDPOINT, {
    method: "POST",
    headers: {
      Authorization: `Basic ${basic}`,
      "Content-Type": "application/x-www-form-urlencoded"
    },
    body: params.toString()
  });
  return response.json();
};
var getNowPlaying = async () => {
  const { access_token } = await getAccessToken();
  return fetch(NOW_PLAYING_ENDPOINT, {
    headers: {
      Authorization: `Bearer ${access_token}`,
      "Content-Type": "application/json"
    }
  });
};
var getRecentlyPlayed = async () => {
  const { access_token } = await getAccessToken();
  return fetch(RECENTLY_PLAYED_ENDPOINT, {
    headers: {
      Authorization: `Bearer ${access_token}`,
      "Content-Type": "application/json"
    }
  });
};
var getPlaying = async () => {
  let spotifyError = false;
  try {
    const response = await getNowPlaying();
    const song = await response.json();
    const isPlaying = song.is_playing;
    const title = song.item.name;
    const artist = song.item.artists.map((_artist) => _artist.name).join(", ");
    const album = song.item.album.name;
    const albumImageUrl = song.item.album.images[1].url;
    const songUrl = song.item.external_urls.spotify;
    return {
      album,
      albumImageUrl,
      artist,
      isPlaying,
      songUrl,
      title,
      spotifyError
    };
  } catch (error) {
  }
  try {
    const recentlyPlayedResponse = await getRecentlyPlayed();
    const formattedRecentlyPlayed = await recentlyPlayedResponse.json();
    const firstRecentlyPlayed = formattedRecentlyPlayed.items[0];
    return {
      isPlaying: false,
      album: firstRecentlyPlayed.track.album.name,
      artist: firstRecentlyPlayed.track.album.artists.map((_artist) => _artist.name).join(", "),
      title: firstRecentlyPlayed.track.name,
      albumImageUrl: firstRecentlyPlayed.track.album.images[1].url,
      songUrl: firstRecentlyPlayed.track.external_urls.spotify,
      spotifyError
    };
  } catch (error) {
    spotifyError = true;
  }
  return { spotifyError };
};

// app/components/NowPlaying.tsx
var NowPlaying = (props) => {
  const { title, artist, albumImageUrl, isPlaying } = props;
  const renderText = () => {
    if (isPlaying) {
      return /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement("i", null, "Currently"), ", I am listening to ", /* @__PURE__ */ React.createElement("b", null, title), " by ", /* @__PURE__ */ React.createElement("b", null, artist), ".");
    }
    return /* @__PURE__ */ React.createElement(React.Fragment, null, "I was listening to ", /* @__PURE__ */ React.createElement("b", null, title), " by ", /* @__PURE__ */ React.createElement("b", null, artist), ".");
  };
  return /* @__PURE__ */ React.createElement("div", {
    className: "now-playing"
  }, /* @__PURE__ */ React.createElement("p", null, renderText()), /* @__PURE__ */ React.createElement("img", {
    src: albumImageUrl
  }));
};

// route-module:/Users/mohammedmulazada/Documents/GitHub/portfolio-2022/app/root.tsx
var links = () => {
  return [
    { rel: "stylesheet", href: global_default },
    {
      rel: "stylesheet",
      href: dark_default
    }
  ];
};
var loader = async (data) => {
  return await getPlaying();
};
function App() {
  return /* @__PURE__ */ React.createElement(Document, null, /* @__PURE__ */ React.createElement(Layout, null, /* @__PURE__ */ React.createElement(import_remix2.Outlet, null)));
}
function ErrorBoundary({ error }) {
  console.error(error);
  return /* @__PURE__ */ React.createElement(Document, {
    title: "Error!"
  }, /* @__PURE__ */ React.createElement(Layout, null, /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("h1", null, "There was an error"), /* @__PURE__ */ React.createElement("p", null, error.message), /* @__PURE__ */ React.createElement("hr", null), /* @__PURE__ */ React.createElement("p", null, "Hey, developer, you should replace this with what you want your users to see."))));
}
function CatchBoundary() {
  let caught = (0, import_remix2.useCatch)();
  let message;
  switch (caught.status) {
    case 401:
      message = /* @__PURE__ */ React.createElement("p", null, "Oops! Looks like you tried to visit a page that you do not have access to.");
      break;
    case 404:
      message = /* @__PURE__ */ React.createElement("p", null, "Oops! Looks like you tried to visit a page that does not exist.");
      break;
    default:
      throw new Error(caught.data || caught.statusText);
  }
  return /* @__PURE__ */ React.createElement(Document, {
    title: `${caught.status} ${caught.statusText}`
  }, /* @__PURE__ */ React.createElement(Layout, null, /* @__PURE__ */ React.createElement("h1", null, caught.status, ": ", caught.statusText), message));
}
function Document({
  children,
  title
}) {
  return /* @__PURE__ */ React.createElement("html", {
    lang: "en"
  }, /* @__PURE__ */ React.createElement("head", null, /* @__PURE__ */ React.createElement("meta", {
    charSet: "utf-8"
  }), /* @__PURE__ */ React.createElement("meta", {
    name: "viewport",
    content: "width=device-width,initial-scale=1"
  }), title ? /* @__PURE__ */ React.createElement("title", null, title) : null, /* @__PURE__ */ React.createElement(import_remix2.Meta, null), /* @__PURE__ */ React.createElement(import_remix2.Links, null)), /* @__PURE__ */ React.createElement("body", null, children, /* @__PURE__ */ React.createElement(import_remix2.ScrollRestoration, null), /* @__PURE__ */ React.createElement(import_remix2.Scripts, null), process.env.NODE_ENV === "development" && /* @__PURE__ */ React.createElement(import_remix2.LiveReload, null)));
}
function Layout({ children }) {
  const response = (0, import_remix2.useLoaderData)();
  return /* @__PURE__ */ React.createElement("div", {
    className: "remix-app"
  }, /* @__PURE__ */ React.createElement("header", {
    className: "remix-app__header"
  }, /* @__PURE__ */ React.createElement("div", {
    className: "container remix-app__header-content"
  }, /* @__PURE__ */ React.createElement(import_remix2.Link, {
    to: "/",
    title: "Moniac",
    className: "remix-app__header-home-link"
  }, /* @__PURE__ */ React.createElement(MoniacLogo, null)), /* @__PURE__ */ React.createElement("nav", {
    "aria-label": "Main navigation",
    className: "remix-app__header-nav"
  }, /* @__PURE__ */ React.createElement("ul", null, /* @__PURE__ */ React.createElement("li", null, /* @__PURE__ */ React.createElement(import_remix2.Link, {
    to: "/"
  }, "Home")), /* @__PURE__ */ React.createElement("li", null, /* @__PURE__ */ React.createElement(import_remix2.Link, {
    to: "/blog"
  }, "Blog")))))), /* @__PURE__ */ React.createElement("div", {
    className: "remix-app__main"
  }, /* @__PURE__ */ React.createElement("div", {
    className: "container remix-app__main-content"
  }, children)), /* @__PURE__ */ React.createElement("div", {
    className: "container"
  }, !(response == null ? void 0 : response.spotifyError) && /* @__PURE__ */ React.createElement(NowPlaying, __spreadValues({}, response))), /* @__PURE__ */ React.createElement("footer", {
    className: "remix-app__footer"
  }, /* @__PURE__ */ React.createElement("div", {
    className: "container remix-app__footer-content"
  }, /* @__PURE__ */ React.createElement("p", null, "\xA9 Mohammed Mulazada"), /* @__PURE__ */ React.createElement("div", {
    className: "icons"
  }, /* @__PURE__ */ React.createElement("a", {
    target: "_blank",
    href: "https://twitter.com/thisismoniac"
  }, /* @__PURE__ */ React.createElement(import_react_feather.Twitter, null)), /* @__PURE__ */ React.createElement("a", {
    target: "_blank",
    href: "https://github.com/moniac"
  }, /* @__PURE__ */ React.createElement(import_react_feather.GitHub, null)), /* @__PURE__ */ React.createElement("a", {
    target: "_blank",
    href: "https://twitter.com/thisismoniac"
  }, /* @__PURE__ */ React.createElement(import_react_feather.Linkedin, null))))));
}
function MoniacLogo() {
  return /* @__PURE__ */ React.createElement("svg", {
    fill: "currentColor",
    width: "40",
    "data-name": "Layer 1",
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 400 400"
  }, /* @__PURE__ */ React.createElement("path", {
    className: "cls-1",
    d: "M261 157a155 155 0 0116 7l35-89h1v120a136 136 0 0124 41 159 159 0 015 15V34h-42l-47 119 8 4zM184 331h27l54-135a109 109 0 00-19-12l-4-2-44 113-45-113-4 2a109 109 0 00-18 12zM58 236a136 136 0 0124-41V75h1l35 89a155 155 0 0116-7l8-4L95 34H53v218a159 159 0 015-16z"
  }));
}

// route-module:/Users/mohammedmulazada/Documents/GitHub/portfolio-2022/app/routes/blog/$slug.tsx
var slug_exports = {};
__export(slug_exports, {
  default: () => PostSlug,
  links: () => links2,
  loader: () => loader2,
  meta: () => meta
});
var import_react = __toModule(require("react"));
var import_remix3 = __toModule(require("remix"));
var import_client = __toModule(require("mdx-bundler/client"));

// app/blog.server.tsx
var import_path = __toModule(require("path"));
var import_promises = __toModule(require("fs/promises"));
var import_front_matter = __toModule(require("front-matter"));
var import_mdx_bundler = __toModule(require("mdx-bundler"));
var import_reading_time = __toModule(require("reading-time"));

// utils/rehype-highlight-code.js
var import_parse_numeric_range = __toModule(require("parse-numeric-range"));
var import_unist_util_visit = __toModule(require("unist-util-visit"));
var import_hast_util_to_string = __toModule(require("hast-util-to-string"));
var import_refractor = __toModule(require("refractor"));

// utils/rehype-highlight-line.js
var import_hast_util_to_html = __toModule(require("hast-util-to-html"));
var import_unified = __toModule(require("unified"));
var import_rehype_parse = __toModule(require("rehype-parse"));
var lineNumberify = function lineNumberify2(ast, lineNum = 1) {
  let lineNumber = lineNum;
  return ast.reduce((result, node) => {
    if (node.type === "text") {
      if (node.value.indexOf("\n") === -1) {
        node.lineNumber = lineNumber;
        result.nodes.push(node);
        return result;
      }
      const lines = node.value.split("\n");
      for (let i = 0; i < lines.length; i++) {
        if (i !== 0)
          ++lineNumber;
        if (i === lines.length - 1 && lines[i].length === 0)
          continue;
        result.nodes.push({
          type: "text",
          value: i === lines.length - 1 ? lines[i] : `${lines[i]}
`,
          lineNumber
        });
      }
      result.lineNumber = lineNumber;
      return result;
    }
    if (node.children) {
      node.lineNumber = lineNumber;
      const processed = lineNumberify2(node.children, lineNumber);
      node.children = processed.nodes;
      result.lineNumber = processed.lineNumber;
      result.nodes.push(node);
      return result;
    }
    result.nodes.push(node);
    return result;
  }, { nodes: [], lineNumber });
};
var wrapLines = function wrapLines2(ast, linesToHighlight) {
  const highlightAll = linesToHighlight.length === 1 && linesToHighlight[0] === 0;
  const allLines = Array.from(new Set(ast.map((x) => x.lineNumber)));
  let i = 0;
  const wrapped = allLines.reduce((nodes, marker) => {
    const line = marker;
    const children = [];
    for (; i < ast.length; i++) {
      if (ast[i].lineNumber < line) {
        nodes.push(ast[i]);
        continue;
      }
      if (ast[i].lineNumber === line) {
        children.push(ast[i]);
        continue;
      }
      if (ast[i].lineNumber > line) {
        break;
      }
    }
    nodes.push({
      type: "element",
      tagName: "div",
      properties: {
        dataLine: line,
        className: "highlight-line",
        dataHighlighted: linesToHighlight.includes(line) || highlightAll ? "true" : "false"
      },
      children,
      lineNumber: line
    });
    return nodes;
  }, []);
  return wrapped;
};
var MULTILINE_TOKEN_SPAN = /<span class="token ([^"]+)">[^<]*\n[^<]*<\/span>/g;
var applyMultilineFix = function(ast) {
  let html = (0, import_hast_util_to_html.default)(ast);
  html = html.replace(MULTILINE_TOKEN_SPAN, (match, token) => match.replace(/\n/g, `</span>
<span class="token ${token}">`));
  const hast = (0, import_unified.default)().use(import_rehype_parse.default, { emitParseErrors: true, fragment: true }).parse(html);
  return hast.children;
};
var rehype_highlight_line_default = (ast, lines) => {
  const formattedAst = applyMultilineFix(ast);
  const numbered = lineNumberify(formattedAst).nodes;
  return wrapLines(numbered, lines);
};

// utils/rehype-highlight-word.js
var import_hast_util_to_html2 = __toModule(require("hast-util-to-html"));
var import_unified2 = __toModule(require("unified"));
var import_rehype_parse2 = __toModule(require("rehype-parse"));
var CALLOUT = /__(.*?)__/g;
var rehype_highlight_word_default = (code) => {
  const html = (0, import_hast_util_to_html2.default)(code);
  const result = html.replace(CALLOUT, (_, text) => `<span class="highlight-word">${text}</span>`);
  const hast = (0, import_unified2.default)().use(import_rehype_parse2.default, { emitParseErrors: true, fragment: true }).parse(result);
  return hast.children;
};

// utils/rehype-highlight-code.js
var rehype_highlight_code_default = (options = {}) => {
  return (tree) => {
    (0, import_unist_util_visit.default)(tree, "element", visitor);
  };
  function visitor(node, index, parentNode) {
    if (parentNode.tagName === "pre" && node.tagName === "code") {
      const lang = node.properties.className ? node.properties.className[0].split("-")[1] : "md";
      let result = import_refractor.default.highlight((0, import_hast_util_to_string.default)(node), lang);
      const linesToHighlight = (0, import_parse_numeric_range.default)(node.properties.line || "0");
      result = rehype_highlight_line_default(result, linesToHighlight);
      result = rehype_highlight_word_default(result);
      node.children = result;
    }
  }
};

// utils/rehype-meta-attribute.js
var import_unist_util_visit2 = __toModule(require("unist-util-visit"));
var re = /\b([-\w]+)(?:=(?:"([^"]*)"|'([^']*)'|([^"'\s]+)))?/g;
var rehype_meta_attribute_default = (options = {}) => {
  return (tree) => {
    (0, import_unist_util_visit2.default)(tree, "element", visitor);
  };
  function visitor(node, index, parentNode) {
    var match;
    if (node.tagName === "code" && node.data && node.data.meta) {
      re.lastIndex = 0;
      while (match = re.exec(node.data.meta)) {
        node.properties[match[1]] = match[2] || match[3] || match[4] || "";
        parentNode.properties[match[1]] = match[2] || match[3] || match[4] || "";
      }
    }
  }
};

// app/blog.server.tsx
var import_rehype_toc = __toModule(require("@jsdevtools/rehype-toc"));
var import_rehype_slug = __toModule(require("rehype-slug"));
var postsPath = import_path.default.join(__dirname, "..", "posts");
async function getPosts() {
  console.log(postsPath, "@@@@@");
  const dir = await import_promises.default.readdir(postsPath);
  return Promise.all(dir.map(async (filename) => {
    const file = await import_promises.default.readFile(import_path.default.join(postsPath, filename));
    const { attributes } = (0, import_front_matter.default)(file.toString());
    return {
      slug: filename.replace(/\.mdx$/, ""),
      title: attributes.title,
      frontmatter: attributes
    };
  }));
}
async function getPost(slug) {
  const filepath = import_path.default.join(postsPath, slug + ".mdx");
  const file = await import_promises.default.readFile(filepath);
  const postContent = file.toString();
  const result = await (0, import_mdx_bundler.bundleMDX)({
    source: postContent,
    xdmOptions(options) {
      options.rehypePlugins = [
        ...options.rehypePlugins ?? [],
        import_rehype_slug.default,
        import_rehype_toc.default,
        rehype_meta_attribute_default,
        rehype_highlight_code_default
      ];
      return options;
    }
  });
  return {
    slug,
    html: result.code,
    title: result.frontmatter.title,
    readingTime: (0, import_reading_time.default)(postContent),
    frontmatter: result.frontmatter
  };
}

// app/styles/blog/post.css
var post_default = "/build/_assets/post-UXF2SXLZ.css";

// app/components/BlockQuote.tsx
var BlockQuote = (props) => {
  const { children } = props;
  return /* @__PURE__ */ React.createElement("blockquote", {
    className: "BlockQuote"
  }, children);
};

// route-module:/Users/mohammedmulazada/Documents/GitHub/portfolio-2022/app/routes/blog/$slug.tsx
var loader2 = async ({ params }) => {
  if (!params.slug) {
    return "expected a \u{1F40C}!";
  }
  return getPost(params.slug);
};
var meta = ({ data }) => {
  const {
    title,
    frontmatter: { teaser }
  } = data;
  return {
    title: data ? title : "Oops...",
    description: teaser
  };
};
var links2 = () => {
  return [{ rel: "stylesheet", href: post_default }];
};
var components = {
  code: (props) => {
    return /* @__PURE__ */ React.createElement("code", __spreadValues({}, props));
  },
  blockquote: (props) => {
    return /* @__PURE__ */ React.createElement(BlockQuote, __spreadValues({}, props));
  }
};
function PostSlug() {
  const result = (0, import_remix3.useLoaderData)();
  const { html: code, readingTime: readingTime2 } = result;
  const Component = (0, import_react.useMemo)(() => (0, import_client.getMDXComponent)(code), [code]);
  return /* @__PURE__ */ React.createElement("main", {
    className: "flow post"
  }, /* @__PURE__ */ React.createElement("h1", null, result.title), /* @__PURE__ */ React.createElement("em", null, readingTime2.text, " approx."), /* @__PURE__ */ React.createElement(Component, {
    components
  }));
}

// route-module:/Users/mohammedmulazada/Documents/GitHub/portfolio-2022/app/routes/blog/index.tsx
var blog_exports = {};
__export(blog_exports, {
  default: () => blog_default,
  loader: () => loader3,
  meta: () => meta2
});
var import_remix5 = __toModule(require("remix"));

// app/components/BlogCard.tsx
var import_remix4 = __toModule(require("remix"));
var BlogCard = (props) => {
  const { title, teaser, link } = props;
  return /* @__PURE__ */ React.createElement("div", {
    className: ""
  }, /* @__PURE__ */ React.createElement("div", {
    className: "max-w-4xl px-10 py-6 bg-white rounded-lg shadow-md"
  }, /* @__PURE__ */ React.createElement("div", {
    className: "mt-2"
  }, /* @__PURE__ */ React.createElement("a", {
    href: "#",
    className: "text-2xl font-bold text-gray-700 hover:underline"
  }, title), /* @__PURE__ */ React.createElement("p", {
    className: "mt-2 text-gray-600"
  }, teaser)), /* @__PURE__ */ React.createElement("div", {
    className: "flex items-center justify-between mt-4"
  }, /* @__PURE__ */ React.createElement(import_remix4.Link, {
    className: "text-blue-500 hover:underline",
    to: link
  }, "Read more"))));
};

// route-module:/Users/mohammedmulazada/Documents/GitHub/portfolio-2022/app/routes/blog/index.tsx
var loader3 = () => {
  return getPosts();
};
var meta2 = () => {
  return {
    title: "Blog",
    description: "A collection of my blog posts."
  };
};
var blog_default = () => {
  const posts = (0, import_remix5.useLoaderData)();
  return /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("h1", null, "Blog"), /* @__PURE__ */ React.createElement("ul", {
    className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4"
  }, posts.map((post) => /* @__PURE__ */ React.createElement("li", {
    key: post.slug
  }, /* @__PURE__ */ React.createElement(BlogCard, {
    title: post.title,
    teaser: post.frontmatter.teaser,
    link: post.slug
  })))));
};

// route-module:/Users/mohammedmulazada/Documents/GitHub/portfolio-2022/app/routes/index.tsx
var routes_exports = {};
__export(routes_exports, {
  default: () => Index,
  loader: () => loader4,
  meta: () => meta3
});
var import_remix6 = __toModule(require("remix"));
var Icon = __toModule(require("react-feather"));
var loader4 = () => {
  let data = {
    resources: [
      {
        name: "Remix Docs",
        url: "https://remix.run/docs"
      },
      {
        name: "React Router Docs",
        url: "https://reactrouter.com/docs"
      },
      {
        name: "Remix Discord",
        url: "https://discord.gg/VBePs6d"
      }
    ],
    experience: [
      {
        title: "Promoted to medior FE \u{1F9D1}\u{1F3FB}\u200D\u{1F4BB}",
        description: `Having worked at de Bijenkorf for a little over a year, I got promoted to medior FE. I gained a lot of experience
        due to the unique challenges a large, growing website can face, together with the support and guidance of my team members.`,
        date: "Nov 2021 - Present",
        icon: "ThumbsUp"
      },
      {
        title: "Joined de Bijenkorf! \u{1F41D}",
        description: `I had always wanted to work at a larger company on a product that is used by many many users. The Bijenkorf
        website is one of the most popular webshops in the Netherlands. I joined the amazing Checkout team, which suddenly meant
        I was responsible for making sure millions of customers could checkout successfully. An initially intimidating challenge which
        turned out to be a great learning experience.`,
        date: "July 2020",
        icon: "Briefcase"
      },
      {
        title: "Started a company \u{1F9D9}\u200D\u2642\uFE0F",
        description: `Together with two of my good friends, we started Level30Wizards,
        a digital agency focussed on delivering high quality websites and web applications.`,
        date: "Aug 2018 - Oct 2020",
        icon: "Briefcase"
      },
      {
        title: "Started working at Lifely",
        description: `Since the internship went so well, I was offered a part-time job, which turned into a full-time job.`,
        date: "Jan 2019 - Dec 2019",
        icon: "Briefcase"
      },
      {
        title: "Finished my study at the Amsterdam University of Applied Sciences \u{1F468}\u{1F3FB}\u200D\u{1F393}",
        description: `After 4 years, I was finally done with my study.
        I was very happy with my time there, and it felt bittersweet to leave the place that taught me a lot and I called my second home.`,
        date: "July 2019",
        icon: "Edit2"
      },
      {
        title: "Second intership",
        description: `Having some experience, I wanted to join a company that that could help me elevate my skills.
        Lifely was that company.
        Here I learned a lot about professional web development and got a lot of experience in React and TypeScript.`,
        date: "Sept 2018 - Jan 2019",
        icon: "Briefcase"
      },
      {
        title: "Part-time front-end job",
        description: "I joined LemonCake to work on a project for the trendy vegan restaurant: mr & mrs. watson.",
        date: "Sept 2017 - Nov 2017",
        icon: "Briefcase"
      },
      {
        title: "My first front-end intership",
        description: `At Diffuse I got to work with a small team of developers and got to learn a lot about the front-end development process. 
          This was an excellent internship to help me shape my skills and confirm that this was what I wanted to keep doing.`,
        date: "Apr 2015 - June 2017",
        icon: "Briefcase"
      },
      {
        title: "Started my study at the Amsterdam University of Applied Sciences",
        description: `Working with film editing programs like Adobe After Effects and Adobe Premiere exposed me to scripting,
        which always intrigued me. I found that this study contained a lot interesting programs, including web development, so I decided to continue my studies.`,
        date: "Sept 2015",
        icon: "Edit2"
      },
      {
        title: "Started a part-time job at a tech store for LG",
        description: "I sold LG household appliances, though my time was short I did learn a lot about talking directly to customers.",
        date: "Jan 2015 - April 2015",
        icon: "Briefcase"
      },
      {
        title: "Finished my film study",
        description: `Managed to get a degree in film. As much as I enjoyed my time here, I felt ultimately
         that film was more suited as a hobby than a career.`,
        date: "2015",
        icon: "Edit2"
      },
      {
        title: "Second Film intership at Guerilla",
        description: `Guerilla, known worldwide for its games such as Killzone and Horizon.
          I worked on the trailers and teasers for the games, and also setup livestreams.`,
        date: "Sep 2014 - Jan 2015",
        icon: "Briefcase"
      },
      {
        title: "Started my first internship",
        description: `My first internship was at VDO, 
        back then it was a small team existing of just the three founders and me. 
        I had a great time there and gained quite some experience.`,
        date: "Feb 2014 - June 2014",
        icon: "Briefcase"
      },
      {
        title: "Started a film & animation study",
        description: "I was always fascinated by film, and figured that was what I wanted to do.",
        date: "2011",
        icon: "Edit2"
      },
      {
        title: "Started working in a restaurant",
        description: "Had to start somewhere!",
        date: "April 2009 - June 2011",
        icon: "Briefcase"
      },
      {
        title: "Moved to Amsterdam",
        description: "My parents immigrated to the Netherlands in hopes of giving me better chances to succeed in life.",
        date: "Approx 1995",
        icon: "Home"
      },
      {
        title: "Born ",
        description: "Where it all began.",
        date: "July 1994",
        icon: "Smile"
      }
    ]
  };
  return (0, import_remix6.json)(data);
};
var meta3 = () => {
  return {
    title: "Home | Portfolio of Mohammed Mulazada",
    description: "This is the portfolio of Mohammed Mulazada, a front-end developer based in Amsterdam."
  };
};
function Index() {
  const { experience } = (0, import_remix6.useLoaderData)();
  return /* @__PURE__ */ React.createElement("div", {
    className: "remix__page"
  }, /* @__PURE__ */ React.createElement("main", {
    className: "flow"
  }, /* @__PURE__ */ React.createElement("div", {
    className: "flow"
  }, /* @__PURE__ */ React.createElement("h2", null, "Welcome to my portfolio!"), /* @__PURE__ */ React.createElement("p", null, "This is my little place on the internet. You can find out more about me here, or what I write about.")), /* @__PURE__ */ React.createElement("div", {
    className: "about-mo flow"
  }, /* @__PURE__ */ React.createElement("h2", null, "About ", /* @__PURE__ */ React.createElement("strike", null, "Me"), " Mo"), /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("ol", {
    className: "timeline"
  }, experience.map((item) => {
    const label = item.icon || "Search";
    const IconComponent = Icon[label];
    return /* @__PURE__ */ React.createElement("li", {
      key: item.title,
      className: "timeline-list"
    }, /* @__PURE__ */ React.createElement("div", {
      className: "timeline-meta"
    }, /* @__PURE__ */ React.createElement("span", {
      className: "timeline-icon"
    }, /* @__PURE__ */ React.createElement(IconComponent, null))), /* @__PURE__ */ React.createElement("div", {
      className: "timeline-description"
    }, /* @__PURE__ */ React.createElement("h4", null, item.title), /* @__PURE__ */ React.createElement("p", null, item.date), /* @__PURE__ */ React.createElement("p", {
      className: "timeline__content"
    }, item.description)));
  }))))));
}

// <stdin>
var import_assets = __toModule(require("./assets.json"));
var entry = { module: entry_server_exports };
var routes = {
  "root": {
    id: "root",
    parentId: void 0,
    path: "",
    index: void 0,
    caseSensitive: void 0,
    module: root_exports
  },
  "routes/blog/$slug": {
    id: "routes/blog/$slug",
    parentId: "root",
    path: "blog/:slug",
    index: void 0,
    caseSensitive: void 0,
    module: slug_exports
  },
  "routes/blog/index": {
    id: "routes/blog/index",
    parentId: "root",
    path: "blog",
    index: true,
    caseSensitive: void 0,
    module: blog_exports
  },
  "routes/index": {
    id: "routes/index",
    parentId: "root",
    path: void 0,
    index: true,
    caseSensitive: void 0,
    module: routes_exports
  }
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  assets,
  entry,
  routes
});
//# sourceMappingURL=/build/index.js.map
