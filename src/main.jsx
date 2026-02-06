import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import TaskDetailsPage from "./pages/TaskDetails.jsx";
import "./index.css";
import { Toaster } from "sonner";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import TasksPage from "./pages/Tasks.jsx";
import Home from "./pages/Home.jsx";

const queryClient = new QueryClient();

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/tasks",
    element: <TasksPage />,
  },
  {
    path: "/task/:taskId",
    element: <TaskDetailsPage />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <Toaster pauseOnHover />
      <RouterProvider router={router} />
    </QueryClientProvider>
  </React.StrictMode>,
);
