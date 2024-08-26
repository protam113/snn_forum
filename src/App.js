import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { publicRoutes, privateRoutes } from "./routes/index";
import { DefaultLayout, AdminLayout } from "./components/layouts/index";
import { AuthProvider } from "./context/AuthContext";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ThemeProvider, useTheme } from "./context/themeContext";
import "./App.css";
import { LoadingProvider } from "./context/LoadingContext";
import { HelmetProvider } from "react-helmet-async";
import useScrollToTop from "./hooks/useScrollToTop.js";
import ProtectedRoutes from "./utils/ProtectedRoutes.js";
import { BlogProvider } from "./context/BlogContex.js";
import { SecureStorageProvider } from "./context/SecureStorageProvider.js";
function AppContent() {
  const { theme } = useTheme();
  useScrollToTop();

  return (
    <div
      className={`app min-h-screen ${
        theme === "light" ? "bg-white" : "bg-zinc-800"
      }`}
    >
      <Routes>
        {publicRoutes.map((route, id) => {
          const Page = route.component;
          const Layout = route.layout || DefaultLayout;

          return (
            <Route
              key={id}
              path={route.path}
              element={
                <Layout>
                  <Page />
                </Layout>
              }
            />
          );
        })}

        {privateRoutes.map((route, id) => {
          const Page = route.component;
          const Layout = route.layout || AdminLayout;

          return (
            <Route
              key={id}
              path={route.path}
              element={
                <ProtectedRoutes allowedRoles={["admin", "manager"]}>
                  <Layout>
                    <Page />
                  </Layout>
                </ProtectedRoutes>
              }
            />
          );
        })}
      </Routes>
    </div>
  );
}

function App() {
  return (
    <Router>
      <SecureStorageProvider>
        <AuthProvider>
          <ThemeProvider>
            <BlogProvider>
              <LoadingProvider>
                <HelmetProvider>
                  <AppContent />
                  <ToastContainer position="top-center" />
                </HelmetProvider>
              </LoadingProvider>
            </BlogProvider>
          </ThemeProvider>
        </AuthProvider>
      </SecureStorageProvider>
    </Router>
  );
}

export default App;
