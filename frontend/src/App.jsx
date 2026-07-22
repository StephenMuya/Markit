import { lazy, Suspense } from "react";
import { createBrowserRouter, Navigate, RouterProvider } from "react-router-dom";
import Layout from "./features/navigation/Layout.jsx";
import GlobalErrorFallback from "./components/GlobalErrorFallback/GlobalErrorFallback.jsx";
import LandingPage from "./features/landing/LandingPage.jsx";

// Lazy load the new feature pages to ensure code splitting
const SearchDashboard = lazy(() => import("./features/search/SearchDashboard.jsx"));

// Define the routing tree using the modern Data Router
const router = createBrowserRouter([
  {
    path: "/",
    element: <LandingPage />,
    errorElement: <GlobalErrorFallback />,
  },
  {
    // The global layout for all other feature pages provides a persistent solid Navbar
    element: <Layout />,
    errorElement: <GlobalErrorFallback />,
    children: [
      {
        path: "/search",
        element: (
          <Suspense
            fallback={
              <div className="animate-pulse p-8 text-center text-gray-500">
                Loading Dashboard...
              </div>
            }
          >
            <SearchDashboard />
          </Suspense>
        ),
      },
      {
        path: "/signin",
        element: <Navigate to="/" replace />,
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
