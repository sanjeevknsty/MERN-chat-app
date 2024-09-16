import axios from 'axios'
import React, { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom'
// import { useNavigate } from 'react-router-dom'

const Signup = () => {

  const navigate = useNavigate()
  const context = useContext(useState)
  const [profilePicture,uploadImage,onUpload] = context

  const [credentials, setCredentials] = useState({ name: "", email: "", password: "", confirmPassword: "" })



  const onChange = (event) => {
    setCredentials({ ...credentials, [event.target.name]: event.target.value })

  }


  const handleSignUp = async (e) => {

    e.preventDefault()
    await uploadImage()
    try {
      const config = {
        headers: {
          "Content-type": "application/json"
        }
      }
      const { email, password, name} = credentials

      const { data } = await axios.post('http://localhost:5000/api/auth/signup', { email, password, name, profilePicture}, config)
      localStorage.setItem('userItem', JSON.stringify(data))
      console.log("UserCreated")
      navigate('/')

    } catch (error) {

      console.log(error)

    }
  }


  return (
    <div className='mt-30'>
      <form onSubmit={handleSignUp}>
        <div className="mb-3">
          <label htmlFor="name" className="form-label" >Name</label>
          <input type="text" className="form-control" name="name" id="nameSignup" onChange={onChange} aria-describedby="text" />
        </div>
        <div className="mb-3">
          <label htmlFor="email" className="form-label" >Email address</label>
          <input type="email" className="form-control" name="email" id="emailSignup" onChange={onChange} aria-describedby="emailHelp" required />
          <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">Password</label>
          <input type="password" name='password' className="form-control" onChange={onChange} id="passwordSignup" minLength={3} required />
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">Confirm Password</label>
          <input type="password" name='confirmPassword' className="form-control" onChange={onChange} id="confirmPasswordSignup" minLength={3} required />
        </div>
        <div className="custom-file">
          <input type="file" className="custom-file-input" id="validatedCustomFile" required  onChange={onUpload}/>
          <label className="custom-file-label" htmlFor="validatedCustomFile">Choose file...</label>
          <div className="invalid-feedback">Example invalid custom file feedback</div>
        </div>

        <button type="submit" className="btn btn-primary">Login</button>
      </form>      </div>
  )
}

export default Signup
