import { Box, Divider, IconButton, List, ListItem, ListItemButton, ListItemIcon, ListItemText, styled } from "@mui/material";
import React from "react";
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import { ChevronRight, Close } from "@mui/icons-material";
import RouteList from "../../../routes";
import { Link } from "react-router-dom";
import useScreenSize from "../../../utils/hooks/useScreenSize";

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

function DrawerContent({
  open,
  handleToogleDrawer
}:{
  open: boolean,
  handleToogleDrawer: () => void
}) {
  const { isSmScreen } = useScreenSize();
  return (
    <>
      <DrawerHeader>
        <IconButton onClick={handleToogleDrawer}>
          <Close />
        </IconButton>
      </DrawerHeader>
      <Box sx={{ flex: 1 }}>
        <Divider />
        {RouteList?.map((mainRoute, index) => (
          <List key={mainRoute.path ?? index}>
            {mainRoute?.children?.map((route, index) => route.navlink && (
              <Link to={route.path??""} key={route.path}>
                <ListItem disablePadding sx={{ display: "block" }}>
                  <ListItemButton
                    sx={{
                      minHeight: 48,
                      justifyContent: open ? "initial" : "center",
                      px: 2.5,
                    }}
                  >
                    <ListItemIcon
                      sx={{
                        minWidth: 0,
                        mr: open ? 3 : "auto",
                        justifyContent: "center",
                      }}
                    >
                      {route.icon}
                    </ListItemIcon>
                    <ListItemText primary={route.label} sx={{ opacity: open ? 1 : 0 }} />
                  </ListItemButton>
                </ListItem>
              </Link>
            ))}
          </List>
        ))}
        {/* 
        <Divider />
        <List>
          {["All mail", "Trash", "Spam"].map((text, index) => (
            <ListItem key={text} disablePadding sx={{ display: "block" }}>
              <ListItemButton
                sx={{
                  minHeight: 48,
                  justifyContent: open ? "initial" : "center",
                  px: 2.5,
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: open ? 3 : "auto",
                    justifyContent: "center",
                  }}
                >
                  {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                </ListItemIcon>
                <ListItemText primary={text} sx={{ opacity: open ? 1 : 0 }} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
        */}
      </Box>
      {!isSmScreen && (
        <Box>
          <ListItemButton onClick={handleToogleDrawer}
            sx={{
              minHeight: 48,
              justifyContent: open ? "initial" : "center",
              px: 2.5,
            }}
          >
            <ListItemIcon
              sx={{
                minWidth: 0,
                mr: open ? 3 : "auto",
                justifyContent: "center",
              }}
            >
              {open ? <ChevronLeftIcon /> : <ChevronRight />}
            </ListItemIcon>
            {open && (<ListItemText primary="Collapse Menu" />)}
          </ListItemButton>
        </Box>
      )}
    </>
  );
}

export default DrawerContent;
