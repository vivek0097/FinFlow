import React, { Suspense } from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Layout from './components/layout/Layout';
import { Dashboard, Audit } from './pages';
import { ThemeProvider } from './context/ThemeContext';
import NotFound from './pages/NotFound';

// 1. Loader Component ko SABSE UPAR rakhein (Before Router)
const PageLoader = () => (
  <div className="h-[80vh] flex flex-col items-center justify-center space-y-4">
    <div className="w-12 h-12 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin"></div>
    <p className="text-gray-500 font-medium dark:text-gray-400">FinFlow is syncing...</p>
  </div>
);

// 2. Phir Router Configuration karein
const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    errorElement: <NotFound />,
    children: [
      {
        index: true,
        element: (
          <Suspense fallback={<PageLoader />}>
            <Dashboard />
          </Suspense>
        ),
      },
      {
        path: "audit",
        element: (
          <Suspense fallback={<PageLoader />}>
            <Audit />
          </Suspense>
        ),
      },
      {
        path: "*", 
        element: <NotFound />
      }
    ],
  },
]);

// 3. Main App Component
function App() {
  return (
    <ThemeProvider>
      <RouterProvider router={router} />
    </ThemeProvider>
  );
}

export default App;