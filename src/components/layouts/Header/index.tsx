import React from 'react'
import MuiAppBar, { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import useScreenSize from '../../../utils/hooks/useScreenSize';
import { Box, IconButton, styled } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';

//@ts-expect-error
import Image_Logo from '../../../assets/logo.png';
import HeaderMenu from './menu';
import useAuthentication from '../../../utils/hooks/useAuthentication';

interface AppBarProps extends MuiAppBarProps {
  issmscreen: string;
}

const AppBar = styled(MuiAppBar)<AppBarProps>(({ theme, issmscreen }) => ({
  backgroundColor: theme.palette.background.paper,
  color: theme.palette.text.primary,
  ...(issmscreen === "false") && {
    zIndex: theme.zIndex.drawer + 1,
  },
}));

function Header({ handleToogleDrawer }:{ handleToogleDrawer: () => void }) {
  const user = useAuthentication()
    const { isSmScreen } = useScreenSize();

  return (
    <AppBar position="fixed" issmscreen={isSmScreen.toString()??"false"}>
      <Toolbar>
        {isSmScreen && (
          <IconButton
            onClick={handleToogleDrawer}
            edge="start"
            sx={{ mr: 1, ml:-1 }}
          >
            <MenuIcon />
          </IconButton>
        )}
        <Box sx={{ display: "flex", justifyContent: "space-between", flex: 1 }}>
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <img src={Image_Logo} alt="" height={40} />
            <Typography variant="h6" sx={{ ml: 1, fontWeight: "bold" }}>LightWave</Typography>
          </Box>
          <Box>
            {user && (<HeaderMenu />)}
          </Box>
        </Box>
      </Toolbar>
    </AppBar>
  )
}

export default Header