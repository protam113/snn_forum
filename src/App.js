import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { publicRoutes, privateRoutes } from "./routes/index";
import { DefaultLayout } from "./components/layouts/index";
import { AuthProvider } from "./context/AuthContext";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ThemeProvider, useTheme } from "./context/themeContext";
import "./App.css";
import RequireAuth from "./hooks/requireAuth.js";
import { LoadingProvider } from "./context/LoadingContext";
import { BlogProvider } from "./context/BlogContext.js";

function AppContent() {
  const { theme } = useTheme();

  return (
    <div
      className={`app min-h-screen ${
        theme === "light" ? "bg-white" : "bg-zinc-800"
      }`}
    >
      <Routes>
        {publicRoutes.map((route, id) => {
          const Page = route.component;
          let Layout = DefaultLayout;

          if (route.layout) {
            Layout = route.layout;
          } else if (route.layout === null) {
            Layout = React.Fragment;
          }

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
          let Layout = DefaultLayout;

          if (route.layout) {
            Layout = route.layout;
          } else if (route.layout === null) {
            Layout = React.Fragment;
          }

          return (
            <Route
              key={id}
              path={route.path}
              element={
                <RequireAuth>
                  <Layout>
                    <Page />
                  </Layout>
                </RequireAuth>
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
      <AuthProvider>
        <ThemeProvider>
          <LoadingProvider>
            <BlogProvider>
              <AppContent />
              <ToastContainer position="top-center" />
            </BlogProvider>
          </LoadingProvider>
        </ThemeProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;
