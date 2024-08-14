import { useNavigate } from "react-router-dom";
import UserContext from "./userContext";

import React, { useEffect, useState } from 'react'
import axios from "axios";

const UserState =({children})=> {
  const navigate = useNavigate()
  const [user,setUser] = useState()
  const [chats,setChats] = useState()
  const [searchResults,setSearchResults] = useState()
// console.log(user._id)
  useEffect(() => {
    try {
      const user = JSON.parse(localStorage.getItem("userItem"))
      setUser(user)

      if(user){

        navigate('/')
        
      }
      else{
        navigate('/login')
      }

    } catch (error) {
      console.log('dfdf')
      navigate('/signup')

    }
   
  },[])


  const handleSearch = async (value) => {
    // e.preventDefault()
    try {
      const config = {
        headers: {
          "Content-type": "application/json",
          "Authorization": `Bearer ${user.token}`
        }
      }
      setSearchResults('')
      const { data } = await axios.get(`http://localhost:5000/api/auth/search?search=${value}`, config)
      setSearchResults(data)
      
    } catch (error) {
      console.log(error)
    }
  }


  return (
    <div>
      <UserContext.Provider value={{ user ,chats,setChats,handleSearch,searchResults}}>
        {children}
      </UserContext.Provider>
    </div>
  )
}

export default UserState
