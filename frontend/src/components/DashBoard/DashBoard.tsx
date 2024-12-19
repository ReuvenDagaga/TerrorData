import { useState } from 'react';
import DetailsSpace from './Detailes/DetailsSpace';
import { HeaderCard } from './HeaderCards/HeaderCard'
import { Box, Container } from '@mui/material'

export default function DashBoard() {
  const BASE_URL = "http://localhost:3222/api/";
  const [data, setData] = useState([]);

  return (
    <>
    <Container sx={{display: "flex", flexWrap: "nowrap"}}>
        <HeaderCard setData={setData} urlToMakeGetRequest={BASE_URL + 'analysis/deadliest-attack-types'} />
        <HeaderCard setData={setData} urlToMakeGetRequest={BASE_URL + 'analysis/deadliest-attack-types'} />
        <HeaderCard setData={setData} urlToMakeGetRequest={BASE_URL + 'analysis/deadliest-attack-types'} />
        <HeaderCard setData={setData} urlToMakeGetRequest={BASE_URL + 'analysis/deadliest-attack-types'} />
    </Container> 
    <Box sx={{ display: "flex", justifyContent: "center", height: "65vh", background: "rgba(119, 139, 212, 0.23)", marginBottom: "20px", width: "100%"}}>{data && <DetailsSpace data={data} />}</Box>
    </>
  )
}
