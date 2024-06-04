import { Outlet } from "react-router-dom";
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Drawer from "../components/layouts/Drawer";
import useDrawer from "../utils/hooks/useDrawer";
import Header from "../components/layouts/Header";
import useAuthentication from "../utils/hooks/useAuthentication";
import AuthLogin from "../components/auth/login/page";
import Footer from "../components/layouts/Footer";

function Layout() {
  const user = useAuthentication()
  const theme = useTheme();
  const [drawer, setDrawer] = useDrawer();

  const handleToogleDrawer = () => {
    setDrawer(!drawer);
  };

  if(!user){
    return (
      <Box sx={{ display: 'flex' }}>
        <Header
          handleToogleDrawer={handleToogleDrawer}
        />
        <Box component="main" sx={{ flexGrow: 1, height: "100vh", maxHeight: "100vh", display: "flex", flexDirection: "column" }}>
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', padding: (theme) => theme.spacing(0, 1), ...theme.mixins.toolbar }}></Box>
          <AuthLogin />
        </Box>
        <Footer />
      </Box>
    )
  }

  return (
    <Box sx={{ display: 'flex' }}>
      <Header
        handleToogleDrawer={handleToogleDrawer}
      />
      <Drawer
        open={drawer}
        handleToogleDrawer={handleToogleDrawer}
      />
      <Box component="main" sx={{ flexGrow: 1, height: "100vh", maxHeight: "100vh", display: "flex", flexDirection: "column" }}>
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', padding: (theme) => theme.spacing(0, 1), ...theme.mixins.toolbar }}></Box>
        <Box sx={{ display: "flex", flexDirection: "column", flex: 1 }}>
          <Outlet />
        </Box>
      </Box>
      <Footer />
    </Box>
  );
}

export default Layout;
