import { Search } from '@mui/icons-material'
import { Box, Button, Container, Divider, FormControl, Grid, IconButton, InputAdornment, InputLabel, List, ListItem, ListItemButton, ListItemText, OutlinedInput, styled } from '@mui/material'
import React, { FormEvent, useState } from 'react'
import { Link, Outlet, useParams } from 'react-router-dom';
import Shop_Default from './[id]/default';
import useScreenSize from '../../utils/hooks/useScreenSize';
import useDrawer from '../../utils/hooks/useDrawer';
import AddShop from './add';

const DATA_SHOPS = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18];

const GridPage = styled(Grid)({
  maxHeight: `calc(100vh - 84px)`
});

function Shops() {
  let { shopId } = useParams();
  const [drawer, setDrawer] = useDrawer();
  const { isSmScreen, isMdScreen, gtMdScreen } = useScreenSize();

  const handleSearch = (e:FormEvent) => {
    e.preventDefault();
  };

  return (
    <Grid container sx={{ flex: 1 }}>
      {((isSmScreen && !shopId) || (isMdScreen && (!shopId || (!drawer && shopId))) || gtMdScreen) && (
        <GridPage item xs={12} sm={drawer ? 12 : 5} md={drawer ? 12 : 4} lg={4} xl={3} sx={{ display: "flex", flexDirection: "column", borderRight: "solid thin", borderRightColor: (theme)=>theme.palette.grey[300] }}>          
          <AddShop />
          <Box component="form" onSubmit={handleSearch} sx={{ display: "flex", alignItems: "center", px:3 }}>
            <FormControl sx={{ m: 1, flex: 1 }} variant="outlined">
              <InputLabel htmlFor="shop-search-input" sx={{ ml:0.5 }}>Search</InputLabel>
              <OutlinedInput
                id="shop-search-input"
                endAdornment={
                  <InputAdornment position="end" sx={{ mr: 0.5 }}>
                    <IconButton
                      type="submit"
                      edge="end"
                    >
                      <Search />
                    </IconButton>
                  </InputAdornment>
                }
                sx={{ borderRadius: 10, pl:1 }}
                label="Search"
              />
            </FormControl>
          </Box>
          <Box sx={{ flex: 1, overflowY: "auto", mb:1 }}>
            <List>
              {DATA_SHOPS.map((shop, index)=>(
                <Link to={`/shops/${shop}`} key={index}>
                  <Divider />
                  <ListItemButton>
                    <ListItemText primary={`Shop Name ${shop}`} />
                  </ListItemButton>
                </Link>
              ))}
            </List>
          </Box>
        </GridPage>
      )}
      {((isSmScreen && shopId) || (isMdScreen && (shopId || (!drawer && !shopId))) || gtMdScreen) && (
        <Grid item xs={12} sm={drawer ? 12 : 7} md={drawer ? 12 : 8} lg={8} xl={9}>
          {shopId ? <Outlet /> : <Shop_Default />}
        </Grid>
      )}
    </Grid>
  )
}

export default Shops