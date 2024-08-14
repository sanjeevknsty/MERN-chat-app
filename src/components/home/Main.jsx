import { Box, Flex} from '@chakra-ui/react'
import React from 'react'
import ChatSection from './ChatSection'
import MessageSection from './MessageSection'
const Main = () => {
  return (
    <div>
      <Box bg='purple' w='100%' h="90vh" p={4} color='white'>
        <Flex>
        <Box  bg='green' w='40%' h="80vh" p={4} color='white'>
          <ChatSection/>
        </Box>
        <Box  bg='red' w='60%' h="80vh" p={4} color='white'>
          <MessageSection/>
        </Box>
        </Flex>
      </Box>

    </div>
  )
}

export default Main
