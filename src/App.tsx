import React from 'react'
import './App.css'
import { TopPage } from './pages/TopPage'
import { Grid, GridItem } from '@chakra-ui/react'

function App() {

  return (
    <>
<Grid templateColumns='repeat(1, 1fr)' gap={6}>
  <GridItem w='100%'>
    <h1>TSV2Markdown</h1>
  </GridItem>
  <GridItem w='100%'>
      <TopPage></TopPage>
  </GridItem>
</Grid>
    </>
  )
}

export default App
