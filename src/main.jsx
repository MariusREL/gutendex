import React from "react";
import ReactDOM from "react-dom/client";
import { createHashRouter, RouterProvider } from "react-router-dom";
import App from "./App.jsx";
import Home from "./pages/Home/Home.jsx";
import Category from "./pages/Category/Category.jsx";
import BookDetails from "./pages/BookDetails/BookDetails.jsx";
import Favorites from "./pages/Favorites/Favorites.jsx";
import "./index.css";

const router = createHashRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "search",
        element: <Home />,
      },
      {
        path: "category/:categoryName",
        element: <Category />,
      },
      {
        path: "book/:bookId",
        element: <BookDetails />,
      },
      {
        path: "favorites",
        element: <Favorites />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
