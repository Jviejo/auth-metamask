import ReactDOM from "react-dom/client";
import { Dashboard } from "./components/Dashboard.jsx";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { AuthenticationProvider } from "./components/Authentication.jsx";
import Login from "./components/Login.jsx";
import Home from "./components/Home.jsx";
import Public from "./components/Public.jsx";
import { Logout } from "./components/Logout.jsx";
import Container from "./components/Container.jsx";
import { Navigate } from "react-router-dom";
import { useAuth } from "./components/Authentication.jsx";
import  Privada  from "./components/Privada";
import Profile from "./components/Profile";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Container />,

    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "Login",
        element: <Login />,
      },
      {
        path: "Logout",
        element: <Logout />,
      },
      {
        path: "public",
        element: <Public />,
      },

      {
        path: "dashboard",
        element: <Dashboard />,
        children: [
          {
            index: true,
            element: <Privada />,
          },
          {
            path: "profile",
            element: <Profile />,
          },
        ],
      }
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <AuthenticationProvider>
    <RouterProvider router={router}></RouterProvider>
  </AuthenticationProvider>
);
