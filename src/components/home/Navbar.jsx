import { Button, Card, CardBody, Drawer, DrawerBody, DrawerCloseButton, DrawerContent, DrawerHeader, DrawerOverlay, Input, Text, useDisclosure } from '@chakra-ui/react'
import axios from 'axios'
import React, { useContext, useState } from 'react'
import userContext from '../context/userContext'

const Navbar = () => {
  const [value, setValue] = useState('')
  // const [results,setResults] = useState()

  const context = useContext(userContext)
  const {user,setChats,handleSearch,searchResults} = context
  
  // console.log(userToken)

  const { isOpen, onOpen, onClose } = useDisclosure()
  const btnRef = React.useRef()


  const handleChange = (e) => {
    e.preventDefault()
    setValue(e.target.value)
    handleSearch(user.token,value)
  }

  const handleClick = async (userId)=>{
    // e.preventDefault()
    try {
      const config = {
        headers: {
          "Content-type": "application/json",
          "Authorization": `Bearer ${user.token}`
        }
      }

      // const index = e.target.getAttribute("data-index")
      // const index = e.target.key
      // console.log(key)
      // setResults('')
      const { data } = await axios.post(`http://localhost:5000/api/chat/`,{userId :  userId}, config)
      setChats([...searchResults,data])
    } catch (error) {
      console.log(error)
    }
    onClose()
    // console.log(results)

  }
  
  

  return (

    <div>

      <Button ref={btnRef} colorScheme='teal' onClick={onOpen}>
        Search
      </Button>
      <Drawer
        isOpen={isOpen}
        placement='left'
        onClose={onClose}
        finalFocusRef={btnRef}
      >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>Search for User</DrawerHeader>

          <DrawerBody>
            <Input placeholder='Type here...' onChange={handleChange} />
            <Button colorScheme='blue' mt={2} onClick={handleSearch}>Search</Button>
            {
              searchResults ? searchResults.map((element)=>{
                return  <Card key={element._id} onClick={()=> handleClick(element._id)}>
                <CardBody>
                  <Text>{element.name}</Text>
                  <Text>{element.email}</Text>
                </CardBody>
              </Card> 
              }) : <>No User Found</>
            }
          </DrawerBody>

         
          {/* <DrawerFooter>
            <Button variant='outline' mr={3} onClick={onClose}>
              Cancel
            </Button>
            <Button colorScheme='blue'>Save</Button>
          </DrawerFooter> */}
        </DrawerContent>
      </Drawer>
    </div>
  )
}

export default Navbar
