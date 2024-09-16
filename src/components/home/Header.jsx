import { Box } from '@chakra-ui/react'
import React from 'react'
import Navbar from './Navbar'

const Header = () => {
  return (
    <>
      <Box bg='#0F0F0F' w='100%' p={4}>
        <Navbar />
      </Box>
    </>
  )
}

export default Header
