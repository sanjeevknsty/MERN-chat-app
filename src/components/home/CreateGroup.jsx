import { Button, Modal, FormControl, FormLabel, Input, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, useDisclosure, Card, CardBody, Text, Stack, Badge, IconButton } from '@chakra-ui/react'
import React, { useContext, useState } from 'react'
import userContext from '../context/userContext'
import axios from 'axios'

const CreateGroup = () => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const btnRef = React.useRef(null)
  const initialRef = React.useRef(null)

  const context = useContext(userContext)
  const { searchResults, handleSearch,user } = context

  const [value, setValue] = useState()
  const [groupUser, setGroupUser] = useState()
  const [tittle,setTittle] = useState()
  const [addedUsers ,setAddUsers] = useState()

  const handleTittleChange = (e)=>{
    e.preventDefault()
    setTittle(e.target.value)
  }

  const handleChange = (e) => {
    e.preventDefault()
    setValue(e.target.value)
    handleSearch(value)
  }

  const handleClickAddUser = (ele) => {
    if(groupUser){

      if (!groupUser.includes(ele)){
  
        setGroupUser((prev) =>[...prev, ele])
        setAddUsers((prev) =>[...prev, ele._id])

      }
    }
    else{
      setGroupUser([ele])
      setAddUsers([ele._id])
    }

  }

  const handleRemove =()=>{
    //delete the user having the id

  }
  const handleClickCreateGroup = async() => {
    try {
      const config = {
        headers :{
          "Content-Type" : "application/json",
          Authorization : `Bearer ${user.token}`
        }
      }
      const {data} = await axios.post("http://localhost:5000/api/chat/groupchat",{name : tittle ,users : addedUsers},config)
      console.log(data)
      
    } catch (error) {
      console.log("jnsfkjsnfnsfkdj")
    }
   onClose() 
  }


  return (
    <>
      <Button mt={3} ref={btnRef} onClick={onOpen}>
        Trigger modal
      </Button>

      <Modal
        initialFocusRef={initialRef}
        finalFocusRef={btnRef}
        isOpen={isOpen}
        onClose={onClose}
        scrollBehavior='inside'
      >
        <ModalOverlay />
        <ModalContent>

          <ModalHeader>Create Group</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <FormControl>
            <FormLabel>Tittle</FormLabel>
              <Input ref={initialRef} placeholder='Tittle' onChange={handleTittleChange}/>
              <FormLabel>Search</FormLabel>
              <Input ref={initialRef} placeholder='Search' onChange={handleChange} />
              <Stack direction='row' mt='2'>
                {groupUser && groupUser.map((element) => {

                  return <Badge key={element._id} colorScheme='green'>{element.name}
                    <IconButton
                      variant='outline'
                      colorScheme='teal'
                      aria-label='Send email'
                      icon={<i className="fa-solid fa-x"></i>}
                      onClick={()=>handleRemove(element._id)}
                    />
                  </Badge>
                })
                }

              </Stack>
            </FormControl>
            {searchResults && searchResults.map((element) => {
              return <Card key={element._id} onClick={() => { handleClickAddUser(element) }} >
                <CardBody>
                  <Text>{element.name}</Text>
                  <Text>{element.email}</Text>
                </CardBody>
              </Card>
            })}
          </ModalBody>

          <ModalFooter>
            <Button colorScheme='blue' mr={3} onClick={handleClickCreateGroup}>
              Save
            </Button>
            <Button onClick={onClose}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}

export default CreateGroup
