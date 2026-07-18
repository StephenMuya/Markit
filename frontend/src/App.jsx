import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Suspense, lazy } from "react";
import Hero from "./features/landing/Hero.jsx";
import HowItWorks from "./features/landing/HowItWorks.jsx";
import UseCases from "./features/landing/UseCases.jsx";
import Infrastructure from "./features/landing/Infrastructure.jsx";
import CallToAction from "./features/landing/CallToAction.jsx";
import Faq from "./features/landing/Faq.jsx";
import Footer from "./features/landing/Footer.jsx";
import Layout from "./features/navigation/Layout.jsx";
import GlobalErrorFallback from "./components/GlobalErrorFallback/GlobalErrorFallback.jsx";

// Lazy load the new feature pages to ensure code splitting
const SearchDashboard = lazy(() => import("./features/search/SearchDashboard.jsx"));
const SignIn = lazy(() => import("./features/auth/SignIn.jsx"));

// Define the routing tree using the modern Data Router
const router = createBrowserRouter([
  {
    // The home landing page requires a transparent navbar over its background image,
    // so it renders its own layout independently.
    path: "/",
    element: (
      <>
        <main>
          <Hero />
          <HowItWorks />
          <UseCases />
          <Infrastructure />
          <CallToAction />
          <Faq />
        </main>
        <Footer />
      </>
    ),
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
        element: (
          <Suspense
            fallback={
              <div className="animate-pulse p-8 text-center text-gray-500">Loading Auth...</div>
            }
          >
            <SignIn />
          </Suspense>
        ),
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
