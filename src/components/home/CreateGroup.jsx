import { Button, Modal, FormControl, FormLabel, Input, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, useDisclosure, Card, CardBody, Text, Stack, Badge, IconButton } from '@chakra-ui/react'
import React, { useContext, useState } from 'react'
import userContext from '../context/userContext'
import axios from 'axios'

const CreateGroup = () => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const btnRef = React.useRef(null)
  const initialRef = React.useRef(null)

  const context = useContext(userContext)
  const { searchResults, handleSearch,user,onUpload,profilePicture} = context

  const [value, setValue] = useState()
  const [groupUser, setGroupUser] = useState()
  const [tittle,setTittle] = useState()
  const [addedUsers ,setAddUsers] = useState()

  // console.log(groupUser,addedUsers)

  const handleTittleChange = (e)=>{
    e.preventDefault()
    setTittle(e.target.value)
  }

  const handleChange = (e) => {
    e.preventDefault()
    setValue(e.target.value)
    handleSearch(user.token,value)
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

  const handleRemove =(ele)=>{
    //delete the user having the id
    const groupuserFiltered = groupUser.filter( id => id._id !== ele)
    const addedUsersFiltered = addedUsers.filter( id => id !== ele)

    setAddUsers(addedUsersFiltered)
    setGroupUser(groupuserFiltered)

  }


  // const handleClose = ()=>{
  //   setGroupUser('')
  //   setAddUsers('')
  // }

  const handleClickCreateGroup = async() => {
    try {
      const config = {
        headers :{
          "Content-Type" : "application/json",
          Authorization : `Bearer ${user.token}`
        }
      }
      const {data} = await axios.post("http://localhost:5000/api/chat/groupchat",{name : tittle ,users : addedUsers,profilePicture},config)
      console.log(data)
      
    } catch (error) {
      console.log(error)
    }
   onClose() 
  }


  return (
    <>
      <Button ref={btnRef} onClick={onOpen} ml="auto" mr="3" p={3}> 
        Create Group
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
              <div className="custom-file">
          <input type="file" className="custom-file-input" id="validatedCustomFile" required  onChange={onUpload}/>
          <label className="custom-file-label" htmlFor="validatedCustomFile">Choose file...</label>
          <div className="invalid-feedback">Example invalid custom file feedback</div>
        </div>
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
            {groupUser && <Button colorScheme='blue' mr={3} onClick={handleClickCreateGroup}>
              Create
            </Button>}
            <Button onClick={onClose}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}

export default CreateGroup
