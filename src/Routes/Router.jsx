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
import DashboardLayout from "../Layouts/DashboardLayout";
import MyParcels from "../Pages/Dashboard/My Parcels/MyParcels";
import Payment from "../Pages/Dashboard/Payment/Payment";
import paymentSuccess from "../Pages/Dashboard/Payment/PaymentSuccess";
import PaymentCancelled from "../Pages/Dashboard/Payment/PaymentCancelled";
import PaymentHistory from "../Pages/Dashboard/Payment History/PaymentHistory";
import ApproveRiders from "../Pages/Dashboard/Approve Riders/ApproveRiders";
import UsersManagement from "../Pages/Dashboard/Users Management/UsersManagement";
import AdminRoute from "./AdminRoute";
import AssignRiders from "../Pages/Dashboard/Assign Riders/AssignRiders";
import RiderRoute from "./RiderRoute";
import ManageDeliveries from "../Pages/Dashboard/Manage Deliveries/ManageDeliveries";
import Services from "../Pages/Services/Services";
import CompletedDeliveries from "../Pages/Dashboard/Completed Deliveries/CompletedDeliveries";
import ParcelTracking from "../Pages/Parcel Tracking/ParcelTracking";
import DashboardHome from "../Pages/Dashboard/Dashboard Home/DashboardHome";

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
                path: 'services',
                Component: Services
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
                </PrivateRoute>,
                loader: () => fetch('/warehouses.json'),
                hydrateFallbackElement: <Loading />
            },
            {
                path: "be-rider",
                element: <PrivateRoute>
                    <BeRider />
                </PrivateRoute>,
                loader: () => fetch('/warehouses.json'),
                hydrateFallbackElement: <Loading />
            },
            {
                path: "parcel-tracking/:id",
                Component: ParcelTracking
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
    },
    {
        path: 'dashboard',
        element: <PrivateRoute>
            <DashboardLayout />
        </PrivateRoute>,
        children: [
            {
                index: true,
                Component: DashboardHome
            },
            {
                path: 'my-parcels',
                Component: MyParcels
            },
            {
                path: 'payment/:id',
                Component: Payment
            },
            {
                path: 'payment-success',
                Component: paymentSuccess
            },
            {
                path: 'payment-cancelled',
                Component: PaymentCancelled
            },
            {
                path: 'payment-history',
                Component: PaymentHistory
            },
            {
                path: 'approve-riders',
                element: <AdminRoute>
                    <ApproveRiders />
                </AdminRoute>
            },
            {
                path: 'assign-riders',
                element: <AdminRoute>
                    <AssignRiders />
                </AdminRoute>
            },
            {
                path: 'manage-users',
                // Component: UsersManagement,
                element: <AdminRoute>
                    <UsersManagement />
                </AdminRoute>
            },
            {
                path: 'manage-deliveries',
                element: <RiderRoute>
                    <ManageDeliveries />
                </RiderRoute>
            },
            {
                path: 'completed-deliveries',
                element: <RiderRoute>
                    <CompletedDeliveries />
                </RiderRoute>
            },
        ]
    }
]);