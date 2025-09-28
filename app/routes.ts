import { index, layout, route, type RouteConfig } from "@react-router/dev/routes";

export default [
  layout("routes/_app.tsx", [
    index("routes/home.tsx"),
    route("about", "routes/about.tsx"),
    route("learn", "routes/learn.tsx"),
    route("toolkit", "routes/toolkit.tsx"),
    layout("routes/blog/_layout.tsx", [
      index("routes/blog/index.tsx"),
      route(":slug", "routes/blog/$slug.tsx"),
    ]),
  ]),
  route("*", "routes/404.tsx"),
] satisfies RouteConfig;
