

import React, { Suspense } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import Auth from './components/Auth'; 
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Layout from './components/layout/Layout';
import { Dashboard, Audit } from './pages';
import { ThemeProvider } from './context/ThemeContext';
 import NotFound from './pages/NotFound';

const ProtectedRoute = ({ children }) => {
  const { user } = useAuth();
  return user ? children : <Navigate to="/login" />;
};


const PageLoader = () => (
  <div className="h-[80vh] flex flex-col items-center justify-center space-y-4">
    <div className="w-12 h-12 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin"></div>
    <p className="text-gray-500 font-medium dark:text-gray-400">FinFlow is syncing...</p>
  </div>
);


const router = createBrowserRouter([
  {
    path: "/login",
    element: <Auth />,
  },
  {
    path: "/",
    element: (
      <ProtectedRoute>
        <Layout />
      </ProtectedRoute>
    ),
    errorElement: <NotFound />,
    children: [
      { index: true, element: <Suspense fallback={<PageLoader />}><Dashboard /></Suspense> },
      { path: "audit", element: <Suspense fallback={<PageLoader />}><Audit /></Suspense> },
    ],
  },
]);

function App() {
  return (
    <AuthProvider>
      <ThemeProvider>
        <RouterProvider router={router} />
      </ThemeProvider>
    </AuthProvider>
  );
}
export default App;