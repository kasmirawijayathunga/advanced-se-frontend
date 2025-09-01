import { IndexRouteObject, NonIndexRouteObject } from 'react-router-dom';
import ErrorPage from './components/ErrorPage';

import Dashboard from './app/(Home)/page';
import Shops from './app/shops/page';
import Layout from './app/layout';

import DashboardIcon from '@mui/icons-material/Dashboard';
import StorefrontIcon from '@mui/icons-material/Storefront';
import PersonIcon from '@mui/icons-material/Person';
import RouteIcon from '@mui/icons-material/Route';
import GroupsIcon from '@mui/icons-material/Groups';
import AddBusinessIcon from '@mui/icons-material/AddBusiness';

import Routes from './app/routes/page';
import ShopTypes from './app/shoptypes/page';
import Users from './app/users/page';
import Customers from './app/customers/page';

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
                icon: <AddBusinessIcon />,
                element: <Shops />,
                navlink: true,
                label: "Shops",
            },
            {
                path: "/routes",
                loader: () => ({ title: "Routes" }),
                element: <Routes />,
                icon: <RouteIcon />,
                navlink: true,
                label: "Routes",
            },
            {
                path: "/shoptypes",
                loader: () => ({ title: "Shop Types" }),
                element: <ShopTypes />,
                icon: <StorefrontIcon />,
                navlink: true,
                label: "Shop Types",
            },
            {
                path: "/customers",
                loader: () => ({ title: "Customers" }),
                element: <Customers />,
                icon: <GroupsIcon />,
                navlink: true,
                label: "Customers",
            },
            {
                path: "/users",
                loader: () => ({ title: "Users" }),
                element: <Users />,
                icon: <PersonIcon />,
                navlink: true,
                label: "Users",
            },
        ]
    }
    
];

export default RouteList