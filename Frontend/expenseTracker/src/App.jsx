import { useState } from 'react'
import './App.css'
import { Routes, Route, Navigate } from "react-router-dom"
import SignUp from './pages/SignUp'
import Login from './pages/Login'
import Expense from './pages/Expense'
import Income from './pages/Income'
import Home from './pages/Home'
function App() {

  return (
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
  )
}

export default App

const Root = () => {
  const isAuthenticate = localStorage.getItem("token")
  return isAuthenticate ?
    ( <Navigate to="/Home" />) :  ( <Navigate to="/login" />)
}