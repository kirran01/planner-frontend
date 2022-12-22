import { useState,useEffect } from 'react'
import './App.css'
import { Route, Routes} from 'react-router-dom'
import axios from 'axios'
import Nav from './components/nav'
import Home from './pages/home'
import DaySelect from './components/dayselect'
import Login from './pages/login'
import Signup from './pages/signup'
import Profile from './pages/profile'
import Dayofweek from './pages/dayofweek'

function App() {

  const[allDays, setAllDays]=useState([])
    useEffect(()=>{
        axios.get('http://localhost:3000/days/all')
        .then(foundDays=>{
            setAllDays(foundDays.data)
        })
        .catch(err=>{
            console.log(err,"<---err")
        })
    },[])

  return (
    <div className="App">
      <Nav/> 
      <DaySelect/>
      <Routes>
      <Route path='/' element={<Home allDays={allDays} setAllDays={setAllDays}/>}/>
      <Route path='/login' element={<Login/>}/>
      <Route path='/signup' element={<Signup/>}/>
      <Route path='/profile' element={<Profile/>}/>
      <Route path='/day/:dayofweek' element={<Dayofweek allDays={allDays}/>}/>
      </Routes>  
    </div>
  )
}

export default App
