import React from 'react'
import { HeaderCard } from './HeaderCards/HeaderCard'
import { Container } from '@mui/material'

export default function DashBoard() {
  return (
    <Container sx={{display: 'flex', flexWrap: 'wrap', flexDirection: 'row', justifyContent: 'center', width: '100%', marginTop: '20px'}}>
        <HeaderCard navigateTo='/1' />
        <HeaderCard navigateTo='/1' />
        <HeaderCard navigateTo='/1' />
        <HeaderCard navigateTo='/1' />
        <HeaderCard navigateTo='/1' />
    </Container> 
  )
}
