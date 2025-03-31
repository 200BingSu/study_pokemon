import { lazy, Suspense } from "react";
import { createBrowserRouter } from "react-router-dom";
import Loading from "../components/Loading";
import Layout from "../components/Layout";

const LazyHome = lazy(() => import("../pages/Index"));

const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        path: "/",
        element: (
          <Suspense fallback={<Loading />}>
            <LazyHome />
          </Suspense>
        ),
      },
    ],
  },
]);
export default router;
