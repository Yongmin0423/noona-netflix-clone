import { createBrowserRouter } from "react-router-dom";
import AppLayout from "./AppLayout";
import Home from "./pages/Home/Home";
import Movies from "./pages/Movies/Movies";
import MovieDetail from "./pages/MovieDetail/MovieDetail";
import Notfound from "./pages/Notfound/Notfound";

const router = createBrowserRouter([
  {
    path: "/",
    element: <AppLayout />,
    children: [
      {
        path: "",
        element: <Home />,
      },
      {
        path: "movies",
        element: <Movies />,
      },
      {
        path: "movies/:id",
        element: <MovieDetail />,
      },
    ],
  },
  {
    path: "*",
    element: <Notfound />,
  },
]);

export default router;
