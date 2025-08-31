import { IndexRouteObject, NonIndexRouteObject } from 'react-router-dom';
import ErrorPage from './components/ErrorPage';

import Dashboard from './app/(Home)/page';
import Shops from './app/shops/page';
import Layout from './app/layout';

import DashboardIcon from '@mui/icons-material/Dashboard';
import Routes from './app/routes/page';
import ShopTypes from './app/shoptypes/page';
import Users from './app/users/page';

interface ExtendedIndexRouteObject extends IndexRouteObject {
    navlink?: boolean;
    label?: string;
    icon?: React.JSX.Element;
}
interface ExtendedNonIndexRouteObject extends NonIndexRouteObject {
    navlink?: boolean;
    label?: string;
    icon?: React.JSX.Element;
    children?: ExtendedRouteObject[]
}

type ExtendedRouteObject = ExtendedIndexRouteObject | ExtendedNonIndexRouteObject;

const RouteList: ExtendedRouteObject[] | undefined = [
    {
        element: <Layout />,
        errorElement: <ErrorPage errorCode="404" />,
        children: [
            {
                path: "/",
                element: <Dashboard />,
                icon: <DashboardIcon />,
                navlink: true,
                label: "Dashboard"
            },
            {
                path: "/shops",
                loader: () => ({ title: "Shops" }),
                element: <Shops />,
                navlink: false,
                label: "Shops",
            },
            {
                path: "/routes",
                loader: () => ({ title: "Routes" }),
                element: <Routes />,
                navlink: false,
                label: "Routes",
            },
            {
                path: "/shoptypes",
                loader: () => ({ title: "Shop Types" }),
                element: <ShopTypes />,
                navlink: false,
                label: "Shop Types",
            },
            {
                path: "/users",
                loader: () => ({ title: "Users" }),
                element: <Users />,
                navlink: false,
                label: "Users",
            },
        ]
    }
    
];

export default RouteList