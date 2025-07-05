import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import ProfilePhotoSelector from '../inputs/ProfilePhotoSelector'


function SignUp() {

  const [fullname, setfullname] = useState("")
  const [email, setemail] = useState("")
  const [password, setpassword] = useState("")
  const [error, seterror] = useState(null)
const navigateTo = useNavigate();


    return (
    <>
    <div className='w-full h-screen flex md:pl-10'>
      <div className='w-full sm:w-[60vw] h-screen py-7 px-4 flex flex-col '>
      <h2 className='font-semibold '>Expense Tracker</h2>
      <div className=' md:h-[65vh] w-full py-5 px-4 flex flex-col gap-2'>
        <h3 className='font-bold text-xl tracking-wide'>Create an Account</h3>
        <h5 className='text-[5vw] font-semibold tracking-wide
         md:text-sm'>Join us today by entering your details below </h5>
       
      <form className='flex flex-col gap-2 mt-3 '>
       <ProfilePhotoSelector />
        <div className='flex gap-3'>
         <div className='w-[50%] flex flex-col gap-2'> <h4 className='text-md font-medium'>Full Name</h4>
        <input type="text"
        value={fullname}
        onChange={(e) => setfullname(e.target.value)}
        className='w-full h-9 border-1 rounded-md py-1 px-2 text-sm md:w-[20vw]' /></div>
        <div className='w-[50%] flex flex-col gap-2'>
          <h4 className='text-md font-medium'>Email Address</h4>
        <input type="email" 
         value={email}
        onChange={(e) => setemail(e.target.value)}
        className='w-full h-9 border-1 rounded-md py-1 px-2 text-sm md:w-[20vw]' />
        </div>
        </div>
        <h4 className='text-md font-medium'>Password</h4>
        <input type="password" 
           value={password}
        onChange={(e) => setpassword(e.target.value)}
        className='w-full h-9 border-1 rounded-md py-1 px-2 text-sm md:w-[41vw]' />
        <button className=' bg-[#613AB7] hover:bg-[#38116D] duration-500 py-2 mt-7 rounded-lg text-white font-bold tracking-[3px]  md:w-[41vw]'>
          SIGN UP 
        </button>
        <h4 className='text-sm font-medium mt-5'>
          Already have an Account?
        </h4>
        <Link to='/login' className='text-sm font-bold tracking-wider hover:text-[#47366b] duration-500' 
        >Login</Link>
      </form>
      </div>
      </div>
      <div className='signin1 lg:w-[80vw] h-screen'>


      </div>
    </div>

    </>
  )
}

export default SignUp