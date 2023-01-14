import HomePage from './view/HomePage/HomePage';
import LoginPage from './view/LoginPage/LoginPage';
import RegisterPage from './view/RegisterPage/RegisterPage';
import SystemPage from './view/SystemPage/SystemPage';
import ProfilePage from './view/ProfilePage/ProfilePage';
import LogoutPage from './view/LogoutPage/LogoutPage';

const routerMap = [
    {
        path: "/",
        element: <HomePage />,
    },
    {
        path: "/login",
        element: <LoginPage />,
    },
    {
        path: "/register",
        element: <RegisterPage />,
    },
    {
        path: "/system",
        element: <SystemPage />,
    },
    {
        path: "/profile",
        element: <ProfilePage />,
    },
    {
        path: "/logout",
        element: <LogoutPage />,
    },



]

export default routerMap;