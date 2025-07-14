import { createRoot } from 'react-dom/client'
import { createBrowserRouter,RouterProvider,Navigate } from "react-router-dom";
import { FormPage } from './pages/FormPage';
import { titanTheme } from './styles/theme';
import { ThemeProvider } from '@emotion/react';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Navigate to='/TitanFormPage' replace />
  },
  {
    path: '/TitanFormPage',
    element: <FormPage></FormPage>
  },
  
]);

createRoot(document.getElementById('root')).render(
  <>
    <ThemeProvider theme={titanTheme}>
      <RouterProvider router={router} />
    </ThemeProvider>
  </>
)