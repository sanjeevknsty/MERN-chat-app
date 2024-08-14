import { Box } from '@chakra-ui/react'
import React from 'react'
import Navbar from './Navbar'

const Header = () => {
  return (
    <div>
      <Box bg='tomato' w='100%' h="4vw" p={4} color='white'>
        <Navbar/>
</Box>
    </div>
  )
}

export default Header
