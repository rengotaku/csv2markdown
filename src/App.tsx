import './App.css'
import { TopPage } from './pages/TopPage'
import { Grid, GridItem, Heading, Text, Link } from '@chakra-ui/react'

function App() {

  return (
    <>
      <Grid templateColumns='repeat(1, 1fr)' gap={6}>
        <GridItem w='100%'>
          <Heading size='2xl'>TSV2Markdown</Heading>
        </GridItem>
        <GridItem w='100%'>
            <TopPage></TopPage>
        </GridItem>
        <GridItem w='100%'>
          <Text sx={{color: 'gray.500'}}>
            TSV2Markdown
            | <span style={{fontSize: '10px'}}>data grid by <Link href="https://datagridxl.com/" isExternal>DataGridXL</Link></span>
          </Text>
        </GridItem>
      </Grid>
    </>
  )
}

export default App
