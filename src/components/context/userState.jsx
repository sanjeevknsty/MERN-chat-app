import { useNavigate } from "react-router-dom";
import UserContext from "./userContext";

import React, { useEffect, useState } from 'react'
import axios from "axios";

const UserState =({children})=> {
  const navigate = useNavigate()
  const [user,setUser] = useState()
  const [chats,setChats] = useState()
  const [searchResults,setSearchResults] = useState()
  const [ selectedChat,setSelectedChat] = useState()
  const [pic,setPic] = useState()
  const [ profilePicture, setProfilePicture ] = useState("");
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
   
  },[navigate])


  const handleSearch = async (token , value) => {
    // e.preventDefault()
    try {
      const config = {
        headers: {
          "Content-type": "application/json",
          "Authorization": `Bearer ${token}`
        }
      }
      setSearchResults('')
      const { data } = await axios.get(`http://localhost:5000/api/auth/search?search=${value}`, config)
      setSearchResults(data)
      
    } catch (error) {
      console.log(error)
    }
  }

  const onUpload = (e) =>{
    setPic(e.target.files[0])
    
  }

  const uploadImage = () => {
    const data = new FormData()
    data.append("file", pic)
    data.append("upload_preset", "ml_default")
    data.append("cloud_name","djjwwhzh8")
    fetch("https://api.cloudinary.com/v1_1/djjwwhzh8/image/upload",{
    method:"post",
    body: data
    })
    .then(resp => resp.json())
    .then(data => {
    setProfilePicture(data.url)
    })
    .catch(err => console.log(err))
    }


  return (
    <div>
      <UserContext.Provider value={{ user ,chats,setChats,handleSearch,searchResults,selectedChat,setSelectedChat,onUpload,uploadImage,profilePicture,setProfilePicture}}>
        {children}
      </UserContext.Provider>
    </div>
  )
}

export default UserState
