import { useState } from 'react'
import './App.css'
import { Routes, Route, Navigate } from "react-router-dom"
import SignUp from './pages/SignUp'
import Login from './pages/Login'
import Expense from './pages/Expense'
import Income from './pages/Income'
import Home from './pages/Home'
import UserProvider from './Contexts/UserContext'
import {Toaster} from "react-hot-toast"
import NoFound from './pages/NoFound'

function App() {

  return (
    <UserProvider>
    <>
      <Routes>
        <Route path='/' element={<Root/>  } />
        <Route path='/Home' element={<Home/>  } />
        <Route path='/signin' element={<SignUp/>} />
        <Route path='/login' element={<Login/>} />
        <Route path='/expense' element={<Expense/>} />
        <Route path='/income' element={<Income/>} /> 
      </Routes>
    </>
    <Toaster
toastOption={{
  className:"",
  style:{
    fontSize:'13px'
  }
}}

    />
    </UserProvider>
  )
}

export default App

const Root = () => {
  return <Navigate to="/login" />;
};
