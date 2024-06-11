import { Box, Container, styled } from '@mui/material'
import React, { useEffect, useState } from 'react'
import AddShop from './add';
import { DataGrid } from '@mui/x-data-grid';
import useScreenSize from '../../utils/hooks/useScreenSize';
import ViewModal from './ViewModal';
import Axios from '../../utils/services/Axios';
import { Shop } from '../../config/shop.types';
import Auth from '../../utils/services/Auth';

const PageBox = styled(Box)({
  maxHeight: `calc(100vh - 84px)`,
  overflow: "auto"
});

function Shops() {
  const { isSmScreen } = useScreenSize();
  const [data_shops, setData_shops] = useState([]);
  const [modal_data, setModal_data] = useState<Shop | null>(null);

  
  const fetchData = async () => {
    const accessToken = await Auth.getAccessToken();
    const response = await Axios.get("/shops",{
      headers: {
          Authorization: "Bearer " + accessToken
      }
    })
    setData_shops(response.data.result)
  };
  useEffect(()=>{
    fetchData()
  },[])

  const clearModal = () => setModal_data(null);
  const handleRowClick = (e:any) => {
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
          rows={data_shops}
          columnVisibilityModel={{
            id: isSmScreen ? false : true,
            Customer: isSmScreen ? false : true,
            Route: isSmScreen ? false : true,
            Shoptypes: isSmScreen ? false : true,
          }}
          columns={[
            {
              field: 'id',
              headerName: 'Shop ID'
            },
            {
              field: 'name',
              headerName: 'Shop Name',
              flex: 1
            },
            {
              field: 'Customer',
              headerName: 'Owner Name',
              flex: 1,
              renderCell: (item)=>item?.value?.name ?? ""
            },
            {
              field: 'Route',
              headerName: 'Shop Route',
              flex: 1,
              renderCell: (item)=>item?.value?.label ?? ""
            },
            {
              field: 'Shoptypes',
              headerName: 'Shop Category',
              flex: 1,
              renderCell: (item)=>item?.value?.label ?? ""
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