import React from 'react'
import Main from './home/Main'
import Header from './home/Header'
import { Flex } from '@chakra-ui/react'
// import { color } from 'framer-motion'

const Home = () => {


  return (
    // <div style={{width : "100%" ,height : "100vh"}}>
      <Flex flexDir="column" w="100%" h="100vh" color={"#F0F0F0"}> 
        <Header/> 
        <Main/>   
      </Flex>
    // </div>
  )
}

export default Home
