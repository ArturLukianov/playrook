import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { ThemeProvider } from "./components/theme-provider.tsx";
import {
  BrowserRouter,
  Routes,
  Route,
  Router,
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import { PlaybookList } from "./pages/PlaybookList.tsx";
import { PlaybookEditor } from "./pages/PlaybookEditor.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <PlaybookList />,
  },
  {
    path: "/playbook/:playbookId/edit",
    element: <PlaybookEditor />,
    loader: async ({ params }) => {
      const res = await fetch(
        `http://localhost:8080/playbook/${params.playbookId}`
      );
      if (!res.ok) throw new Error("Failed to fetch");
      return res.json();
    },
  },
]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <RouterProvider router={router} />
    </ThemeProvider>
  </StrictMode>
);
