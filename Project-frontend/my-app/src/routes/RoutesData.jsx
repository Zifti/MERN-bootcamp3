import Home from '../pages/Home'
import Dealership from '../pages/Dealership'
import Login from '../pages/Login'
import Register from '../pages/Register'
import NewDealership from '../pages/NewDealership'
import SingleDealerhsip from '../pages/ShowDealership'
import EditDealership from '../pages/EditDealership'
import ForgotPassword from '../pages/ForgotPassword'
import ResetPassword from '../pages/ResetPassword'
import VerifyAccount from '../pages/VerifyAccount'

export const publicRoutes = [
    {
        path:'/dealerships',
        element:<Dealership />
    },
    {
        path: '/register',
        element: <Register />
    },
    {
        path:'/login',
        element:<Login />
    },
    {
        path:'/dealerships/:id' ,
        element:<SingleDealerhsip />
    },

    {
        path:'/forgot-password',
        element: <ForgotPassword />
    },
    {
        path:'/reset-password/:token',
        element: <ResetPassword />
    },
    {
        path: '/verify-account/:token',
        element: <VerifyAccount />
    },

]

export const privateRoutes = [
    {
        path: '/dealerships/new',
        element: <NewDealership />
    },
    {
        path:'/dealerships/:id/edit' ,
        element:<EditDealership />
    },
]

export const exposedRoutes = [
    {
        path:'/',
        element:<Home />,
    }
]