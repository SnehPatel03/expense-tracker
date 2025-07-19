import React, { useContext, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import ProfilePhotoSelector from '../inputs/ProfilePhotoSelector';
import axios from 'axios';
import { UserContext } from '../Contexts/UserContext';
import toast from 'react-hot-toast';

function SignUp() {
  const [fullname, setfullname] = useState("");
  const [email, setemail] = useState("");
  const [profile, setprofile] = useState(null);
  const [password, setpassword] = useState("");
  const [error, seterror] = useState(null);
  const navigateTo = useNavigate();

  const { user, updateUser } = useContext(UserContext);

  
  useEffect(() => {
    if (user) {
      console.log("Updated user from context:", user);  
    }
  }, [user]);

  const signinHandle = async (e) => {
    localStorage.clear();
    e.preventDefault();
    try {
      const data = await axios.post("https://expense-tracker-backend-jkhf.onrender.com/signin", {
        fullname,
        email,
        password,
        profile
      }, {
        withCredentials: true,
        headers: {
          "Content-Type": "multipart/form-data"
        }
      });

      toast.success(data.data.message || "User registration Successful");

      updateUser(data.data.newUser); 
      localStorage.setItem("jwt", data.data.token);

      setfullname("");
      setpassword("");
      setemail("");
      setprofile(null);

      navigateTo("/home");
    } catch (error) {
      toast.error(error.response?.data?.message || error.response?.data?.error);
    }
  };



  return (
    <>
      <div className='w-[98vw]  ml-2 sm:w-full h-screen flex md:pl-10'>
        <div className='w-full sm:w-[60vw] h-screen py-7 px-4 flex flex-col '>
          <h2 className='font-semibold '>ByteBudget</h2>
          <div className=' md:h-[65vh] w-full py-5 px-4 flex flex-col gap-2'>
            <h3 className='font-bold text-xl tracking-wide'>Create an Account</h3>
            <h5 className='text-[5vw] font-semibold tracking-wide
         md:text-sm'>Join us today by entering your details below </h5>

            <form onSubmit={signinHandle}
              encType='multipart/form-data'
              className='flex flex-col gap-2 mt-3 '>
              <ProfilePhotoSelector profile={profile} setprofile={setprofile} />
              <div className='flex gap-3'>
                <div className='w-[50%] flex flex-col gap-2'> <h4 className='text-md font-medium'>Full Name</h4>
                  <input
                    placeholder='Enter Full Name'
                    type="text"
                    value={fullname}
                    onChange={(e) => setfullname(e.target.value)}
                    className='w-full h-9 border-1 rounded-md py-1 px-2 text-sm md:w-[20vw]' /></div>
                <div className='w-[50%] flex flex-col gap-2'>
                  <h4 className='text-md font-medium'>Email Address</h4>
                  <input
                    placeholder='ex@gmail.com'
                    type="email"
                    value={email}
                    onChange={(e) => setemail(e.target.value)}
                    className='w-full h-9 border-1 rounded-md py-1 px-2 text-sm md:w-[20vw]' />
                </div>
              </div>
              <h4 className='text-md font-medium'>Password</h4>
              <input type="password"
                placeholder='Min 8 Characters'
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
