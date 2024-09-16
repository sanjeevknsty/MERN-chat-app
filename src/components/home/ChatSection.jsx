import { Avatar, AvatarGroup, Box, Center, Flex, Heading, Text, VStack } from '@chakra-ui/react'
import React, { useContext, useEffect, useState } from 'react'
import userContext from '../context/userContext'
import axios from 'axios'
import CreateGroup from './CreateGroup'
import {checkChatName} from "../reUsable/ChatUtils"
import AvatarFrame from './Avatar'

const ChatSection = () => {
  const context = useContext(userContext)
  const { user, chats, setSelectedChat } = context
  const [results, setResults] = useState('')



  const fetchUsers = async () => {
    try {
      if (!user) return
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.token}`
        }
      }

      const { data } = await axios.get(" http://localhost:5000/api/chat/", config)
      setResults(data)


    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {

    fetchUsers()

    // eslint-disable-next-line
  }, [user, chats])

  // useEffect(() => {

  //   fetchUsers()

  // }, [chats])


  return (
    <Flex flexDir="column" w="100%" h="100%" >
      <CreateGroup />
      <div  flex={1} className='example'>
        <VStack
          scrollBehavior='inside'
          gap={0}
          p="2"
          // mt={2}
        >

          {results.length > 0 ? results.map((element) => {
            // (user._id !== element.users[0]._id)
            return <Box
              scrollBehavior='inside'
              w="100%"
              // bg='blue.600' 
              p="0"
              color="#cecdcd"
              // borderBottom={"1px solid #aaa"}
              m="0"
              _hover={{bg : "rgba(255,255,255, 0.1)",borderRadius :"10px" }}
              key={element._id}
              cursor='default'
              onClick={() => setSelectedChat(element)
              }
              >
              <Flex jujustifyContent={"center"} alignItems='center' >
                <Box ml="2">
                      <AvatarFrame element = {element}/>
                </Box>
                <Flex flex="1" flexDir={'column'} justifyContent={'space-around'} ml={3} >
                  <Heading size='md' mr="auto">
                  {checkChatName(element,user)}
                    {/* {element.isGroup ? element.name : (user._id === element.users[0]._id) ? element.users[1].name : element.users[0].name} */}
                  </Heading>
                  <Text fontSize='sm' mr="auto">
                    LatestMessage :
                  </Text>
                </Flex>
              </Flex>
            </Box>


          }) : <>No users</>
          }
        </VStack>
      </div>
    </Flex>
  )
}

export default ChatSection
