import { Box, Center, Button, Flex, FormControl, Input } from '@chakra-ui/react'
import React, { useContext, useEffect, useMemo, useState } from 'react'
import ChatMessages from './messageSection/ChatMessages'
import ChatHeaderSection from "./messageSection/ChatHeaderSection"
import userContext from '../context/userContext'
import axios from 'axios'
import { io } from 'socket.io-client'

const MessageSection = () => {

  const socket = io("http://localhost:5000")

  var selectedChatDuplicate = []
  const context = useContext(userContext)
  const { user, selectedChat } = context
  const [newMessage, setNewMessage] = useState()
  const [allMessages, setAllMessages] = useState([])
  const handleChange = (e) => {
    e.preventDefault()
    setNewMessage(e.target.value)
  }
  console.log(allMessages)
  // const socket = useMemo(io("http://localhost:5000"),[])

  useEffect(() => {
    socket.on("connection", () => {
      console.log("CONNECTED")
      console.log(socket.id)
    })

    // socket.on("server",(message)=>{
    //   console.log(message)
    // })
    socket.emit("setup", user)
    socket.on("connected", () => {
      console.log("USER CONNECTED")
    })
  }, [])

  const fetchAllMessages = async () => {
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${user.token}`
      }
    }
    try {
      console.log("enterd")
      // setAllMessages('')

      const { data } = await axios.get(`http://localhost:5000/api/message/${selectedChat._id}`, config)

      setAllMessages(data)

      socket.emit("join room", selectedChat._id)

    } catch (error) {
      console.log(error)
    }
  }

  const handleSubmit = async (e) => {
    // e.key === "Enter"  &&
    if ( newMessage) {
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.token}`
        }
      }
      try {
        // console.log("dsds")
        const { data } = await axios.post("http://localhost:5000/api/message", { content: newMessage, chat: selectedChat._id }, config)

        socket.emit("new message", data)
        setAllMessages([...allMessages, data])
        console.log("before")
        console.log(allMessages)
        console.log("after")
      } catch (error) {
        console.log(error)
      }
      setNewMessage('')
    }


  }


  useEffect(() => {
    fetchAllMessages()

    selectedChatDuplicate = selectedChat
    // eslint-disable-next-line
  }, [selectedChat])

  useEffect(() => {
    console.log("render")
    socket.on("message received", (newMessage) => {
      // console.log(newMessage)
      // console.log(selectedChatDuplicate)
      console.log(newMessage.chat._id, selectedChatDuplicate._id)
      if (!selectedChatDuplicate || selectedChatDuplicate._id !== newMessage.chat._id) {
        // Notify
        console.log("notify")
      }
      else {
        console.log(newMessage.content)
        console.log(allMessages)
        // allMessages.append(newMessage)
        setAllMessages((prev) =>[...prev, newMessage])
        console.log("end")
      }
    })
  })

  return (
    <Flex flexDir="column" style={{ width: "100%", height: "100%", position: "relative" }}  >

      {/* header */}
      <Box p={1} mr="auto" w="100%">
        <ChatHeaderSection />
      </Box>
      {/* messageContent */}
      <Box className='example' p={5} flex={1}>
        <ChatMessages allMessages={allMessages} />

      </Box>
      {/* inputMessage */}
      <FormControl alignItems="center" isRequired onKeyDown={(e) => e.key === "Enter" && (handleSubmit)() } p={3}>
          <Flex gap={1}>
            <Input placeholder='Send a Message'
              onChange={handleChange}
              value={newMessage}
            />
            <Button onClick={handleSubmit} colorScheme='blue'>Send</Button>
          </Flex>
        </FormControl>
    </Flex>
  )
}

export default MessageSection
