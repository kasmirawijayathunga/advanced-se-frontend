import { IndexRouteObject, NonIndexRouteObject } from 'react-router-dom';
import ErrorPage from './components/ErrorPage';

import Dashboard from './app/(Home)/page';
import Shops from './app/shops/page';
import Layout from './app/layout';

import DashboardIcon from '@mui/icons-material/Dashboard';
import { OverridableComponent } from '@mui/material/OverridableComponent';
import { SvgIconTypeMap } from '@mui/material';
import { JsxElement } from 'typescript';
import Shop from './app/shops/[id]/page';

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
        children: [
            {
                path: "/",
                element: <Dashboard />,
                icon: <DashboardIcon />,
                navlink: true,
                label: "Dashboard",
                errorElement: <ErrorPage errorCode="404" />
            },
            {
                path: "/shops",
                loader: () => ({ title: "Shops" }),
                element: <Shops />,
                navlink: false,
                label: "Shops",
                children: [
                    {
                        path: "/shops/:shopId",
                        element: <Shop />,
                        navlink: false,
                    }
                ]
            }
        ]
    }
    
];

export default RouteList