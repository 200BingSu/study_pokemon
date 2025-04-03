import { lazy, Suspense } from "react";
import Loading from "../components/Loading";

const LazyIndex = lazy(() => import("../pages/pokemon/Index"));

const pokemonRouter = () => {
  return [
    {
      index: true,
      element: (
        <Suspense fallback={<Loading />}>
          <LazyIndex />
        </Suspense>
      ),
    },
  ];
};

export default pokemonRouter;
