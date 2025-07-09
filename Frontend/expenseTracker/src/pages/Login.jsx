import React, { useState } from 'react'
import { Link, Navigate, useNavigate } from 'react-router-dom'
import axios from 'axios'



function Login() {
  const [email, setemail] = useState("")
  const [password, setpassword] = useState("")
  const navigateTo = useNavigate()


  const loginHandle = async (e) => {
    e.preventDefault()
    try {
      const data = await axios.post("http://localhost:3000/login", {
        email, password
      }, {
        withCredentials: true,
        headers: {
          "Content-Type": "application/json"
        }
      }
      )
      alert(data.data.message || "User Login Successfully ")
      console.log(data)
      localStorage.setItem("jwt", data.data.token)
      setpassword("")
      setemail("")
      navigateTo("/")
    } catch (error) {
      alert(error.response.data.message || error.message)

    }
  }

  return (
    <>
      <div className='w-full h-screen flex md:pl-10'>
        <div className='w-full sm:w-[50vw] h-screen py-7 px-4 flex flex-col gap-16 '>
          <h2 className='font-semibold '>Expense Tracker</h2>
          <div className=' md:h-[65vh] w-full py-5 px-4 flex flex-col gap-2'>
            <h3 className='font-bold text-xl tracking-wide'>Welcome Back</h3>
            <h5 className='text-[5vw] font-semibold md:text-sm'>Please Enter Your Details to Log In </h5>

            <form
              onSubmit={loginHandle}
              className='flex flex-col gap-2 mt-10'>
              <h4 className='text-md font-medium'>Email Address</h4>
              <input type="email"
                placeholder='john@123.com'
                value={email}
                onChange={(e) => setemail(e.target.value)}

                className='w-full h-9 border-1 rounded-md py-1 px-2 text-sm md:w-[40vw]' />
              <h4 className='text-md font-medium'>Password</h4>
              <input type="password"
                value={password}
                placeholder='Enter Your Password Here'
                onChange={(e) => setpassword(e.target.value)}
                className='w-full h-9 border-1 rounded-md py-1 px-2 text-sm md:w-[40vw]' />
              <button className=' bg-[#613AB7] hover:bg-[#38116D] duration-500 py-2 mt-7 rounded-lg text-white font-bold tracking-[3px]  md:w-[40vw]'>
                LOGIN
              </button>
              <h4 className='text-sm font-medium mt-5'>
                Don't have an Account?
              </h4>
              <Link to='/signin' className='text-sm font-bold tracking-wider hover:text-[#47366b] duration-500'
              >SignIn</Link>
            </form>
          </div>
        </div>
        <div type="submit" className='login lg:w-[80vw] h-screen'>
        </div>
      </div>

    </>
  )
}

export default Login