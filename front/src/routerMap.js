import App from './components/App/App';

const routerMap = [
    {
        path: "/",
        element: <App func="home"/>,
    },
    {
        path: "/login",
        element: <App func="login"/>,
    },
    {
        path: "/register",
        element: <App func="register"/>,
    },



]

export default routerMap;