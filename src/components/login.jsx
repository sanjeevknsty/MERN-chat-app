import React, {  useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'


const Login = () => {
  const navigate = useNavigate()

  const [credentials, setCredentials] = useState({ email: "", password: "" })

  const onChange = (event) => {
    setCredentials({ ...credentials, [event.target.name]: event.target.value })

  }
  const handleClick = async (e) => {
    e.preventDefault()
    try {

      const config = {
        headers: {
          "Content-Type": "application/json"
        }
      }


      const { data } = await axios.post('http://localhost:5000/api/auth/login',

        JSON.stringify({ email: credentials.email, password: credentials.password }), config)

      console.log(data)
      localStorage.setItem("userItem", JSON.stringify(data))
      console.log("User Found")
      navigate('/')
      

    }
    catch (err) {
      navigate('/signup')
      console.log(err)
    }


  }
  return (
    <div className='mt-3'>
      <form onSubmit={handleClick}>
        <div className="mb-3">
          <label htmlFor="email" className="form-label" >Email address</label>
          <input type="email" className="form-control" name="email" id="email" onChange={onChange} aria-describedby="emailHelp" />
          <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">Password</label>
          <input type="password" name='password' className="form-control" onChange={onChange} id="password" required />
        </div>
        <button type="submit" className="btn btn-primary">Login</button>
        <button type="submit" className="btn btn-primary m-2" onClick={()=>{navigate('/signup')}}>Signup</button>
      </form>
    </div>
  )
}

export default Login
