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
import ScrollToTop from "./hooks/useScrollToTop.js";
import { ErrorProvider, useError } from "./context/ErrorProvider.js";
import { Error404, Error500, WebMaintenance } from "./pages/error/error.js";
function AppContent() {
  const { theme } = useTheme();
  useScrollToTop();
  const { error } = useError();

  if (error?.type === "maintenance") {
    return <WebMaintenance />;
  }

  if (error?.type === "server") {
    return <Error500 message="Lỗi máy chủ. Vui lòng thử lại sau." />;
  }

  if (error?.type === "default") {
    return (
      <Error404 message={error.message || "Đã xảy ra lỗi không xác định."} />
    );
  }

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
        <ErrorProvider>
          <AuthProvider>
            <ThemeProvider>
              <BlogProvider>
                <ScrollToTop />
                <HelmetProvider>
                  <AppContent />
                  <ToastContainer position="top-center" />
                </HelmetProvider>
              </BlogProvider>
            </ThemeProvider>
          </AuthProvider>
        </ErrorProvider>
      </SecureStorageProvider>
    </Router>
  );
}

export default App;
