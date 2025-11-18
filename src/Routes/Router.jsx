import { createBrowserRouter } from "react-router";
import MainLayout from "../Layouts/MainLayout";
import Home from "../Pages/Home/Home/Home";
import Coverage from "../Pages/Coverage/Coverage";
import Loading from "../Components/Loading"
import Error from "../Pages/Shared/Error"
import AboutSection from "../Pages/About/AboutSection";
import AuthLayout from "../Layouts/AuthLayout";
import Login from "../Pages/Authentication/Login";
import Register from "../Pages/Authentication/Register";
import PrivateRoute from "./PrivateRoute";
import BeRider from "../Pages/Rider/BeRider";
import SendParcel from "../Pages/SendParcel/SendParcel"

export const router = createBrowserRouter([
    {
        path: "/",
        Component: MainLayout,
        errorElement: <Error />,
        children: [
            {
                index: true,
                Component: Home,
            },
            {
                path: 'coverage',
                Component: Coverage,
                loader: () => fetch('/warehouses.json'),
                hydrateFallbackElement: <Loading />
            },
            {
                path: "about-us",
                Component: AboutSection,
            },
            {
                path: 'send-parcel',
                element: <PrivateRoute>
                    <SendParcel />
                </PrivateRoute>
            },
            {
                path: "be-rider",
                element: <PrivateRoute>
                    <BeRider />
                </PrivateRoute>
            }
        ]
    },
    {
        path: "/",
        Component: AuthLayout,
        children: [
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