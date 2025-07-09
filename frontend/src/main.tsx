import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import { ThemeProvider } from './components/theme-provider.tsx';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { PlaybookList } from './pages/PlaybookList.tsx';
import { PlaybookEditor } from './pages/PlaybookEditor.tsx';
import Layout from './layout.tsx';
import About from './pages/About.tsx';
import Homepage from './pages/Homepage.tsx';
import { playbookApi } from './lib/api';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        path: '',
        element: <Homepage />,
      },
      {
        path: 'info',
        element: <About />,
      },
      {
        path: 'playbooks',
        element: <PlaybookList />,
      },
      {
        path: 'playbook/:playbookId/edit',
        element: <PlaybookEditor />,
        loader: async ({ params }) => {
          if (!params.playbookId) throw new Error('Playbook ID is required');
          return await playbookApi.getById(params.playbookId);
        },
      },
    ],
  },
]);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <RouterProvider router={router} />
    </ThemeProvider>
  </StrictMode>
);
