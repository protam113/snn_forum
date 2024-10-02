import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import {
  publicRoutes,
  privateRoutes,
  DefaultLayout,
  AdminLayout,
} from "./routes/index";
import { AuthProvider } from "./context/AuthContext";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ThemeProvider, useTheme } from "./context/themeContext";
import "./App.css";
import { HelmetProvider } from "react-helmet-async";
import useScrollToTop from "./hooks/useScrollToTop.js";
import ProtectedRoutes from "./utils/ProtectedRoutes.js";
import { BlogProvider } from "./context/BlogContex.js";
import { SecureStorageProvider } from "./context/SecureStorageProvider.js";
import ScrollToTop from "./hooks/useScrollToTop.js";
import { ErrorProvider, useError } from "./context/ErrorProvider.js";
import { Error404, Error500, WebMaintenance } from "./pages/error/error.js";
import { ToastDesignProvider } from "./context/ToastService.js";
import { UserProvider } from "./context/UserProvider.js";
import PageNotfound_404 from "./pages/auth/404PageNotfound.js";

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
          const Layout = route.layout;

          return (
            <Route
              key={id}
              path={route.path}
              element={
                Layout ? (
                  <Layout>
                    <Page />
                  </Layout>
                ) : (
                  <Page />
                )
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
              // element={
              //   <ProtectedRoutes allowedRoles={["admin", "manager"]}>
              //     <Layout>
              //       <Page />
              //     </Layout>
              //   </ProtectedRoutes>
              // }
              element={
                Layout ? (
                  <ProtectedRoutes allowedRoles={["admin", "manager"]}>
                    <Layout>
                      <Page />
                    </Layout>
                  </ProtectedRoutes>
                ) : (
                  <ProtectedRoutes allowedRoles={["admin", "manager"]}>
                    <Page />
                  </ProtectedRoutes>
                )
              }
            />
          );
        })}

        {/* <Route path="*" element={<PageNotfound_404 />} /> */}
      </Routes>
    </div>
  );
}

function App() {
  return (
    <Router>
      <SecureStorageProvider>
        <ToastDesignProvider>
          <ErrorProvider>
            <AuthProvider>
              <UserProvider>
                <ThemeProvider>
                  <BlogProvider>
                    <ScrollToTop />
                    <HelmetProvider>
                      <AppContent />
                      <ToastContainer position="top-center" />
                    </HelmetProvider>
                  </BlogProvider>
                </ThemeProvider>
              </UserProvider>
            </AuthProvider>
          </ErrorProvider>
        </ToastDesignProvider>
      </SecureStorageProvider>
    </Router>
  );
}

export default App;
