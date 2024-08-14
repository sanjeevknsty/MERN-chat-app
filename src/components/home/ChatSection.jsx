import { Box, Heading, Text, VStack } from '@chakra-ui/react'
import React, { useContext, useEffect, useState } from 'react'
import userContext from '../context/userContext'
import axios from 'axios'
import CreateGroup from './CreateGroup'

const ChatSection = () => {
  const context = useContext(userContext)
  const { user, chats } = context
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

  }, [user])
  useEffect(() => {

    fetchUsers()

  }, [chats])


  return (
    <div>
      <CreateGroup/>
      <VStack>

        {results.length > 0 ? results.map((element) => {
          // (user._id !== element.users[0]._id)
          return  <Box 
          scrollBehavior='inside'
          w="100%" 
          bg='blue.600' 
          color='white' 
          key={element._id}>

            <Heading size='md'>
              {element.isGroup ? element.name : (user._id === element.users[0]._id) ? element.users[1].name :  element.users[0].name}
            </Heading>
            <Text pt='2' fontSize='sm'>
              LatestMessage :
            </Text>
          </Box>


        }) : <>No users</>
      }
      </VStack>
      {/* <Card>
  <CardHeader>
    <Heading size='md'>Client Report</Heading>
  </CardHeader>

  <CardBody >
    <Stack divider={<StackDivider />} spacing='4'>
   
    </Stack>
  </CardBody>
</Card>     */}
    </div>
  )
}

export default ChatSection
