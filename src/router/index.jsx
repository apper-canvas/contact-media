import { createBrowserRouter } from "react-router-dom";
import { lazy, Suspense } from "react";
import Root from "@/layouts/Root";
import Layout from "@/components/organisms/Layout";
import { getRouteConfig } from "@/router/route.utils";

const Contacts = lazy(() => import("@/components/pages/Contacts"));
const ContactDetail = lazy(() => import("@/components/pages/ContactDetail"));
const Companies = lazy(() => import("@/components/pages/Companies"));
const Deals = lazy(() => import("@/components/pages/Deals"));
const NotFound = lazy(() => import("@/components/pages/NotFound"));
const Login = lazy(() => import("@/pages/Login"));
const Signup = lazy(() => import("@/pages/Signup"));
const Callback = lazy(() => import("@/pages/Callback"));
const ErrorPage = lazy(() => import("@/pages/ErrorPage"));
const ResetPassword = lazy(() => import("@/pages/ResetPassword"));
const PromptPassword = lazy(() => import("@/pages/PromptPassword"));

const createRoute = ({
  path,
  index,
  element,
  access,
  children,
  ...meta
}) => {
  let configPath;
  if (index) {
    configPath = "/";
  } else {
    configPath = path.startsWith('/') ? path : `/${path}`;
  }

  const config = getRouteConfig(configPath);
  const finalAccess = access || config?.allow;

  const route = {
    ...(index ? { index: true } : { path }),
    element: element ? <Suspense fallback={<div>Loading.....</div>}>{element}</Suspense> : element,
    handle: {
      access: finalAccess,
      ...meta,
    },
  };

  if (children && children.length > 0) {
    route.children = children;
  }

  return route;
};

const mainRoutes = [
  createRoute({
    index: true,
    element: <Contacts />,
  }),
  createRoute({
    path: "contacts",
    element: <Contacts />,
  }),
  createRoute({
    path: "contacts/:id",
    element: <ContactDetail />,
  }),
  createRoute({
    path: "companies",
    element: <Companies />,
  }),
  createRoute({
    path: "deals",
    element: <Deals />,
  }),
  createRoute({
    path: "*",
    element: <NotFound />,
  }),
];

const routes = [
  {
    path: "/",
    element: <Root />,
    children: [
      {
        path: "/",
        element: <Layout />,
        children: mainRoutes,
      },
      createRoute({
        path: "login",
        element: <Login />,
      }),
      createRoute({
        path: "signup",
        element: <Signup />,
      }),
      createRoute({
        path: "callback",
        element: <Callback />,
      }),
      createRoute({
        path: "error",
        element: <ErrorPage />,
      }),
      createRoute({
        path: "reset-password/:appId/:fields",
        element: <ResetPassword />,
      }),
      createRoute({
        path: "prompt-password/:appId/:emailAddress/:provider",
        element: <PromptPassword />,
      }),
    ],
  },
];

export const router = createBrowserRouter(routes);