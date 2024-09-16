import { Avatar, Box, Flex, Heading, Text } from '@chakra-ui/react'
import React, { useContext } from 'react'
import userContext from '../../context/userContext'
import AvatarFrame from '../Avatar'

const ChatHeaderSection = () => {
  const context = useContext(userContext)
  const {selectedChat,user} = context
  return (
    <>
      <Box m="0" p="1" w='100%' mr="auto" borderBottom={"1px solid rgba(170, 170, 170,0.5)"}>
        <Flex alignItems={'center'} justifyContent={"center"}>
          <Box mr="auto" >
            <AvatarFrame element={selectedChat} />
          </Box>
            <Heading mr="auto" ml="3" flex={1} size="md">{selectedChat.isGroup ? selectedChat.name : (user._id === selectedChat.users[0]._id) ? selectedChat.users[1].name :  selectedChat.users[0].name} </Heading>
        </Flex>
      </Box>    
    </>
  )
}

export default ChatHeaderSection
