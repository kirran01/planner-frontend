import { useState, useEffect, useContext } from 'react'
import { AuthContext } from './context/auth.context'
import './App.css'
import { Route, Routes } from 'react-router-dom'
import axios from 'axios'
import Nav from './components/nav'
import Home from './pages/home'
import DaySelect from './components/dayselect'
import Login from './pages/login'
import Signup from './pages/signup'
import Profile from './pages/profile'
import Dayofweek from './pages/dayofweek'
import Evententry from './components/evententry'
import All from './pages/all'
import Foot from './components/foot'

function App() {
  const { user, isLoggedIn, logOut } = useContext(AuthContext)
  const [allDays, setAllDays] = useState([])
  useEffect(() => {
    if (user) {
      axios.get(`${import.meta.env.VITE_BACKEND_URL}/days/all`)
        .then(foundDays => {
          const mostRecent = foundDays.data.sort((a, b) => {
            let dateA = new Date(a.day)
            let dateB = new Date(b.day)
            if (dateA < dateB) {
              return -1
            } else if (dateA > dateB) {
              return 1
            } else {
              return 0
            }
          })
          const filteredDaysByUser = foundDays.data.filter(day => day.owner === user._id);
          setAllDays(filteredDaysByUser);
        })
        .catch(err => {
          console.log(err, "<---err")
        })
    }
  }, [user])

  useEffect(() => {
    if (!isLoggedIn) {
      setAllDays([]);
    }
  }, [isLoggedIn]);

  return (
    <div className="App">
      <Nav />
      <DaySelect allDays={allDays} setAllDays={setAllDays} />
      <Routes>
        <Route path='/' element={<Home allDays={allDays} setAllDays={setAllDays} />} />
        <Route path='/login' element={<Login />} />
        <Route path='/signup' element={<Signup />} />
        <Route path='/profile' element={<Profile />} />
        <Route path='/day/:dayofweek' element={<Dayofweek allDays={allDays} setAllDays={setAllDays} />} />
      </Routes>
      <Foot/>
    </div>
  )
}

export default App
