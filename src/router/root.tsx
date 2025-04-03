import { lazy, Suspense } from "react";
import { createBrowserRouter } from "react-router-dom";
import Loading from "../components/Loading";
import Layout from "../components/Layout";
import pokemonRouter from "./pokemon-router";

const LazyHome = lazy(() => import("../pages/Index"));
const LazyPokemon = lazy(() => import("../pages/pokemon/Pokemon"));

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
      {
        path: "/pokemon",
        element: (
          <Suspense fallback={<Loading />}>
            <LazyPokemon />
          </Suspense>
        ),
        children: pokemonRouter(),
      },
    ],
  },
]);
export default router;
