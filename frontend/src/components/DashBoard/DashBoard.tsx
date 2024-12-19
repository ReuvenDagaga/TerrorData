import { useState } from 'react';
import DetailsSpace from './Detailes/DetailsSpace';
import { HeaderCard } from './HeaderCards/HeaderCard'
import { Container } from '@mui/material'
import DeadliestAttackTypes from '../Charts/DeadliestAttackTypes';

export default function DashBoard() {
  const BASE_URL = "http://localhost:3222/api/";
  const [data, setData] = useState([]);

  return (
    <>
    <Container sx={{display: "flex", flexWrap: "nowrap"}}>
        <HeaderCard urlToMakeGetRequest={BASE_URL + 'analysis/deadliest-attack-types'} />
        <HeaderCard urlToMakeGetRequest={BASE_URL + 'analysis/deadliest-attack-types'} />
        <HeaderCard urlToMakeGetRequest={BASE_URL + 'analysis/deadliest-attack-types'} />
        <HeaderCard urlToMakeGetRequest={BASE_URL + 'analysis/deadliest-attack-types'} />
    </Container> 
    <Container sx={{display: 'flex', justifyContent: 'center', width: '100%'}}>
        <DetailsSpace />
        <DeadliestAttackTypes/>
    </Container>
    </>
  )
}
