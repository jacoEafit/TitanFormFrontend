import { createRoot } from 'react-dom/client'
import { createBrowserRouter,RouterProvider,Navigate } from "react-router-dom";
import { FormPage } from './pages/FormPage';
import { titanTheme } from './styles/theme';
import { ThemeProvider } from '@emotion/react';
import { TitanFormSubmitSuccess } from './pages/TitanFormSubmitSuccess';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Navigate to='/TitanFormPage' replace />
  },
  {
    path: '/TitanFormPage',
    element: <FormPage />
  },
  {
    path: '/TitanFormSubmitSuccess',
    element: <TitanFormSubmitSuccess />
  },
  {
    path: '*',
    element: <Navigate to='/TitanFormPage' replace />
  }
]);

createRoot(document.getElementById('root')).render(
  <>
    <ThemeProvider theme={titanTheme}>
      <RouterProvider router={router} />
    </ThemeProvider>
  </>
)