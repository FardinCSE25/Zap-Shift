import { createBrowserRouter } from "react-router";
import MainLayout from "../Layouts/MainLayout";
import Home from "../Pages/Home/Home/Home";
import Coverage from "../Pages/Coverage/Coverage";
import Loading from "../Components/Loading"
import Error from "../Pages/Shared/Error"
import AboutSection from "../Pages/About/AboutSection";

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
        ]
    },
]);