import { StrictMode } from "react";
// import { createRoot } from 'react-dom/client'
import "./index.css";
import App from "./App.jsx";
import ReactDom from "react-dom/client";
import { MoviesProvider } from "./context/MovieContext";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import About from "./Pages/About.jsx";
import Contact from "./Pages/Contact.jsx";
const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "about",
        element: <About />,
      },
      {
        path: "contact",
        element: <Contact />,
      },
    ],
  },
]);
ReactDom.createRoot(document.getElementById("root")).render(
  <StrictMode>
    <MoviesProvider>
      <RouterProvider router={router} />
    </MoviesProvider>
  </StrictMode>,
);
