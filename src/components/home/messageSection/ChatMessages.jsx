import { Avatar, Box, Flex } from '@chakra-ui/react'
import React, { useContext } from 'react'
import ScrollableFeed from 'react-scrollable-feed'
import userContext from '../../context/userContext'
import { checkAvatar } from '../../reUsable/ChatUtils'

const ChatMessages = ({ allMessages }) => {
  // console.log("Count")
  const context = useContext(userContext)
  const { user } = context
  // console.log(allMessages)
  return (
    <>
       {/* <ScrollableFeed> */}
        {allMessages && allMessages.map((element, i) => {
          // console.log(allMessages[i].sender)
          return <Flex gap={1} mt={1} key={i}>
            {checkAvatar(user, allMessages, i) && <Avatar h={8} w={8} src={element.sender.profilePicture} />}

            <Box
              borderRadius='md'
              bg={element.sender._id === user._id ? '#6BB87D' : "#495591"}
              maxW='md'
              ml={element.sender._id === user._id ? 'auto' : !checkAvatar(user, allMessages, i) && 35}
              px={4}
              h={8}
              key={element._id}
            >
              {element.content}
            </Box>
          </Flex>
        })}
      {/* </ScrollableFeed> */}
    </>
  )

}

export default ChatMessages
