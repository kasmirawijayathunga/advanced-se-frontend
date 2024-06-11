import { Avatar, Box, Button, Divider, IconButton, ListItemIcon, ListItemText, Menu, MenuItem, Tooltip, Typography } from '@mui/material'
import React from 'react'
import PersonAdd from '@mui/icons-material/PersonAdd';
import Settings from '@mui/icons-material/Settings';
import Logout from '@mui/icons-material/Logout';
import { Link } from 'react-router-dom';
import Auth from '../../../utils/services/Auth';

function HeaderMenu() {
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);
    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
      setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
      setAnchorEl(null);
    };
  return (
    <>
      <Box sx={{ display: 'flex', alignItems: 'center', textAlign: 'center' }}>
        {/* <Link to="/#"><Button>About</Button></Link>
        <Link to="/#" style={{ marginLeft: 5 }}><Button>Contact</Button></Link> */}
        <IconButton
            onClick={handleClick}
            size="small"
            sx={{ ml: 1.5 }}
        >
            <Avatar sx={{ width: 32, height: 32 }}>M</Avatar>
        </IconButton>
      </Box>
      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        slotProps={{
            paper: {
                elevation: 0,
                sx: {
                    overflow: 'visible',
                    filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                    mt: 1,
                    '& .MuiAvatar-root': {
                        width: 32, height: 32, ml: -0.5, mr: 1,
                    },
                    '&::before': {
                        content: '""',
                        display: 'block',
                        position: 'absolute',
                        top: 0,
                        right: 14,
                        width: 10,
                        height: 10,
                        bgcolor: 'background.paper',
                        transform: 'translateY(-50%) rotate(45deg)',
                        zIndex: 0,
                    },
                },
            }
        }}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
        {/*
            <Link to="/#">
                <MenuItem>
                    <Avatar /> 
                    <ListItemText primary="Profile" />
                </MenuItem>
            </Link>
            <Divider />
        */}
          <MenuItem onClick={()=>Auth.logout()}>
              <ListItemIcon>
                  <Logout fontSize="small" />
              </ListItemIcon>
              <ListItemText primary="Logout" />
          </MenuItem>
      </Menu>
    </>
  )
}

export default HeaderMenu