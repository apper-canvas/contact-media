import { createBrowserRouter } from "react-router-dom";
import { lazy, Suspense } from "react";
import Layout from "@/components/organisms/Layout";

const Contacts = lazy(() => import("@/components/pages/Contacts"));
const ContactDetail = lazy(() => import("@/components/pages/ContactDetail"));
const Companies = lazy(() => import("@/components/pages/Companies"));
const Deals = lazy(() => import("@/components/pages/Deals"));
const NotFound = lazy(() => import("@/components/pages/NotFound"));

const mainRoutes = [
  {
    path: "",
    index: true,
    element: (
      <Suspense fallback={<div>Loading.....</div>}>
        <Contacts />
      </Suspense>
    ),
  },
  {
    path: "contacts",
    element: (
      <Suspense fallback={<div>Loading.....</div>}>
        <Contacts />
      </Suspense>
    ),
  },
  {
    path: "contacts/:id",
    element: (
      <Suspense fallback={<div>Loading.....</div>}>
        <ContactDetail />
      </Suspense>
    ),
  },
  {
    path: "companies",
    element: (
      <Suspense fallback={<div>Loading.....</div>}>
        <Companies />
      </Suspense>
    ),
  },
  {
    path: "deals",
    element: (
      <Suspense fallback={<div>Loading.....</div>}>
        <Deals />
      </Suspense>
    ),
  },
  {
    path: "*",
    element: (
      <Suspense fallback={<div>Loading.....</div>}>
        <NotFound />
      </Suspense>
    ),
  },
];

const routes = [
  {
    path: "/",
    element: <Layout />,
    children: mainRoutes,
  },
];

export const router = createBrowserRouter(routes);