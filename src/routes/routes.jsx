import { createBrowserRouter } from "react-router-dom";
import Root from "../components/layout/Root";
import Home from "../components/pages/HeroSection";
import Products from "../components/pages/Products";
import Logs from "../components/pages/Logs";
import Contact from "../components/pages/contact";
import About from "../components/pages/about";
import Login from "../components/auth/Login";
import Register from "../components/auth/register";

const router = createBrowserRouter([
    {
        path: "/",
        Component: Root,
        children: [
            {
                index: true,
                Component: Home,
            },
            {
                path: 'products',
                Component: Products
            },
            {
                path: 'logs',
                Component: Logs
            },
            {
                path: 'contact',
                Component: Contact
            },
            {
                path: 'about',
                Component: About
            },
            {
                path: 'login',
                Component: Login
            },
            {
                path: 'register',
                Component: Register
            }
        ]
    }
]);

export default router;