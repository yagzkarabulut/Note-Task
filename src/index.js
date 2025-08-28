import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import Notes from "./pages/Notes";
import EditNote from "./pages/EditNote";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

const router = createBrowserRouter([
  { path: "/", element: <App />, children: [
    { index: true, element: <Notes /> },
    { path: "notes/:id/edit", element: <EditNote /> },
  ]},
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
