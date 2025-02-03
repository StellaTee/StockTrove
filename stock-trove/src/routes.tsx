import { createBrowserRouter } from "react-router-dom";
import ErrorPage from "./pages/ErrorPage";
import HomePage from "./pages/HomePage";
import Layout from "./pages/Layout";
import UserPage from "./pages/UserPage";
import FollowingPage from "./pages/FollowingPage";
import DiscoverPage from "./pages/DiscoverPage";
import RegisterPage from "./pages/RegisterPage";
import CompanyDetail from "./pages/CompanyDetail";
import LoginPage from "./pages/LoginPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    errorElement: <ErrorPage />,
    children: [
      { path: "", element: <HomePage /> },
      { path: "user", element: <UserPage /> },
      { path: "following", element: <FollowingPage /> },
      { path: "discover", element: <DiscoverPage /> },
      { path: "company/:symbol", element: <CompanyDetail /> },
    ],
  },

  {
    path: "/register",
    element: <RegisterPage />,
  },

  {
    path: "/login",
    element: <LoginPage />,
  },
]);

export default router;
