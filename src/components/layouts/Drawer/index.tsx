import useScreenSize from '../../../utils/hooks/useScreenSize';
import { CSSObject } from '@emotion/react';
import { styled, Theme } from '@mui/material';
import MuiDrawer from '@mui/material/Drawer';
import DrawerContent from './content';

const drawerWidth = 240;

const openedMixin = (theme: Theme): CSSObject => ({
    width: drawerWidth,
    transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
    }),
    overflowX: 'hidden',
});

const closedMixin = (theme: Theme): CSSObject => ({
    transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: 'hidden',
    width: `calc(${theme.spacing(7)} + 1px)`,
    [theme.breakpoints.up('sm')]: {
        width: `calc(${theme.spacing(8)} + 1px)`,
    },
});

const SlidingDrawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
    ({ theme, open }) => ({
        width: drawerWidth,
        flexShrink: 0,
        whiteSpace: 'nowrap',
        boxSizing: 'border-box',
        position: "relative",
        ...(open && {
            ...openedMixin(theme),
            '& .MuiDrawer-paper': openedMixin(theme),
        }),
        ...(!open && {
            ...closedMixin(theme),
            '& .MuiDrawer-paper': closedMixin(theme),
        }),
    }),
);

function Drawer({
    open,
    handleToogleDrawer
}: {
    open: boolean,
    handleToogleDrawer: () => void
}) {
    const { isSmScreen } = useScreenSize();

    return (
        <>
            {isSmScreen ? (
                <MuiDrawer
                    variant="temporary"
                    open={open}
                    onClose={handleToogleDrawer}
                    ModalProps={{
                        keepMounted: true, // Better open performance on mobile.
                    }}
                    sx={{
                        display: { xs: 'block', sm: 'none' },
                        '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
                    }}
                >
                    <DrawerContent
                        open={open}
                        handleToogleDrawer={handleToogleDrawer}
                    />
                </MuiDrawer>
            ) : (
                <SlidingDrawer variant="permanent" open={open}>
                    <DrawerContent
                        open={open}
                        handleToogleDrawer={handleToogleDrawer}
                    />
                </SlidingDrawer>
            )}
        </>
    )
}

export default Drawer