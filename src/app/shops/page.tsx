import { Box, Container, styled } from '@mui/material'
import React, { useState } from 'react'
import AddShop from './add';
import { DataGrid } from '@mui/x-data-grid';
import useScreenSize from '../../utils/hooks/useScreenSize';
import ViewModal from './ViewModal';

const PageBox = styled(Box)({
  maxHeight: `calc(100vh - 84px)`,
  overflow: "auto"
});

function Shops() {
  const { isSmScreen } = useScreenSize();
  const [data, setData] = useState([
    { id: 1, shopName: 'Samarasingha Hardware', shopOwnerName: 'Jhon Samarasinghe', shopRoute: "Route 1", shopCategory: "Hardware", foo: "bar" },
    { id: 2, shopName: 'Smith\'s Grocery', shopOwnerName: 'Emily Smith', shopRoute: "Route 2", shopCategory: "Grocery" },
    { id: 3, shopName: 'Johnson Electronics', shopOwnerName: 'Michael Johnson', shopRoute: "Route 3", shopCategory: "Electronics" },
    { id: 4, shopName: 'Green Thumb Nursery', shopOwnerName: 'Sarah Green', shopRoute: "Route 4", shopCategory: "Nursery" },
    { id: 5, shopName: 'Baker\'s Delight Bakery', shopOwnerName: 'David Baker', shopRoute: "Route 5", shopCategory: "Bakery" },
    { id: 6, shopName: 'Fresh Fashion Boutique', shopOwnerName: 'Sophia Rodriguez', shopRoute: "Route 6", shopCategory: "Fashion" },
    { id: 7, shopName: 'Happy Paws Pet Store', shopOwnerName: 'Liam Thompson', shopRoute: "Route 7", shopCategory: "Pet Supplies" },
    { id: 8, shopName: 'Tech Haven', shopOwnerName: 'Olivia White', shopRoute: "Route 8", shopCategory: "Technology" },
    { id: 9, shopName: 'Garden Glory', shopOwnerName: 'Ethan Brown', shopRoute: "Route 9", shopCategory: "Gardening" },
    { id: 10, shopName: 'Books & Beyond', shopOwnerName: 'Ava Martinez', shopRoute: "Route 10", shopCategory: "Books" },
    { id: 11, shopName: 'Sunny Side Cafe', shopOwnerName: 'Noah Lee', shopRoute: "Route 11", shopCategory: "Cafe" },
    { id: 12, shopName: 'Healthy Living Pharmacy', shopOwnerName: 'Mia Scott', shopRoute: "Route 12", shopCategory: "Pharmacy" }
  ]);
  const [modal_data, setModal_data] = useState<{
    id: number;
    shopName: string;
    shopOwnerName: string;
    shopRoute: string;
    shopCategory: string;
  } | null>(null);

  const clearModal = () => setModal_data(null);
  const handleRowClick = (e:any) => {
    // console.log(e.row)
    setModal_data(e.row)
  };

  return (
    <Container>
      <AddShop />
      {/* @ts-expect-error */}
      <ViewModal data={modal_data} clearModal={clearModal} />
      <PageBox>
        <DataGrid
          autosizeOnMount={true}
          rows={data}
          columnVisibilityModel={{
            id: isSmScreen ? false : true,
            shopOwnerName: isSmScreen ? false : true,
            shopRoute: isSmScreen ? false : true,
            shopCategory: isSmScreen ? false : true,
          }}
          columns={[
            {
              field: 'id',
              headerName: 'Shop ID',
              flex: 1
            },
            {
              field: 'shopName',
              headerName: 'Shop Name',
              flex: 1
            },
            {
              field: 'shopOwnerName',
              headerName: 'Owner Name',
              flex: 1
            },
            {
              field: 'shopRoute',
              headerName: 'Shop Route',
              flex: 1
            },
            {
              field: 'shopCategory',
              headerName: 'Full name',
              flex: 1
            },
          ]}
          initialState={{
            pagination: {
              paginationModel: {
                pageSize: 10,
              },
            },
          }}
          pageSizeOptions={[10]}
          onRowClick={handleRowClick}
        />
      </PageBox>
    </Container>
  )
}

export default Shops