import { useState } from 'react'
import './App.css'
import { Route, Routes} from 'react-router-dom'
import Nav from './components/nav'
import Home from './pages/home'
import DaySelect from './components/dayselect'
import Login from './pages/login'
import Signup from './pages/signup'

function App() {
  return (
    <div className="App">
      <Nav/> 
      <DaySelect/>
      <Routes>
      <Route path='/' element={<Home/>}/>
      <Route path='/login' element={<Login/>}/>
      <Route path='/signup' element={<Signup/>}/>
      </Routes>  
    </div>
  )
}

export default App
