import { lazy, Suspense } from "react";
import { createBrowserRouter } from "react-router-dom";
import Login from "@/views/Login";
import Home from "@/views/Home";
import Index from "@/views/Index";
import withAuth from "@/Components/Auth";

const withLoading = (comp) => {
  return <Suspense fallback={<h2>loading</h2>}>{withAuth(comp)}</Suspense>;
};

const User = lazy(() => import("@/views/User"));
const Statistics = lazy(() => import("@/views/Statistics"));
const Page1 = lazy(() => import("@/views/Page1"));
const Page2 = lazy(() => import("@/views/Page2"));
const Info = lazy(() => import("@/views/Info"));

const routes = [
  {
    path: "/",
    element: withAuth(<Home />),
    children: [
      {
        index: true,
        element: withAuth(<Index />),
      },
      {
        path: "user",
        element: withLoading(<User />),
      },
      {
        path: "statistics",
        element: withLoading(<Statistics />),
      },
      {
        path: "sub/page1",
        element: withLoading(<Page1 />),
      },
      {
        path: "sub/page2",
        element: withLoading(<Page2 />),
      },
      {
        path: "info",
        element: withLoading(<Info />),
      },
    ],
  },
  {
    path: "/login",
    element: withAuth(<Login />),
  },
];
export const router = createBrowserRouter(routes);
