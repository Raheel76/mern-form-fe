import { createBrowserRouter, Navigate, RouterProvider } from "react-router";
import { Layout } from "./components";
import Home from "./app/home";
import Signup from "./auth/Signup";
import Login from "./auth/Login";
import { ForgotPassword, ResetPassword, SendOtp } from "./auth";
import { PublicRoute, RequireAuth } from "./routes";

function App() {
  const router = createBrowserRouter([
    {
      path: "",
      element: (
        <RequireAuth>
          <Layout />
        </RequireAuth>
      ),
      children: [
        {
          path: "/",
          element: <Home />,
        },
      ],
    },
    {
      path: "/auth/signup",
      element: (
        <PublicRoute>
          <Signup />
        </PublicRoute>
      ),
    },
    {
      path: "/auth/login",
      element: (
        <PublicRoute>
          <Login />
        </PublicRoute>
      ),
    },
    {
      path: "/auth/otp",
      element: (
        <PublicRoute>
          <SendOtp />
        </PublicRoute>
      ),
    },
    {
      path: "/auth/reset",
      element: (
        <PublicRoute>
          <ResetPassword />
        </PublicRoute>
      ),
    },
    {
      path: "/auth/forgot",
      element: (
        <PublicRoute>
          <ForgotPassword />
        </PublicRoute>
      ),
    },
    {
      path: "*",
      element: <Navigate to="/" replace />,
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;