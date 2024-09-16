import { Box, Flex } from '@chakra-ui/react'
import React, { useContext } from 'react'
import ChatSection from './ChatSection'
import MessageSection from './MessageSection'
import userContext from '../context/userContext'
const Main = () => {
  const context = useContext(userContext)
  const { selectedChat } = context
  return (
    <>
      <Flex flex={1} bg='#191919' w='100%' h="80%" p={0} >
          <Box w='30%' h="100%" p={2} color='white' borderRight={"1px solid rgba(170, 170, 170,0.5)"}>
            <ChatSection />
          </Box>
          <Box w='70%' h="100%" p={0} color='white'>
            {selectedChat && <MessageSection />}

          </Box>
      </Flex>

    </>
  )
}

export default Main
