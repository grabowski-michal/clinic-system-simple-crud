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
        element: <LoginPage onlyForGuests={true} />,
    },
    {
        path: "/register",
        element: <RegisterPage onlyForGuests={true} />,
    },
    {
        path: "/appointment",
        element: <SystemPage authRequired={true} />,
    },
    {
        path: "/profile",
        element: <ProfilePage authRequired={true} />,
    },
    {
        path: "/logout",
        element: <LogoutPage />,
    },



]

export default routerMap;