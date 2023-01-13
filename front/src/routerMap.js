import HomePage from './view/HomePage/HomePage';
import LoginPage from './view/LoginPage/LoginPage';
import RegisterPage from './view/RegisterPage/RegisterPage';
import SystemPage from './view/SystemPage/SystemPage';

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



]

export default routerMap;