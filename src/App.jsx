import { useState,useEffect,useContext } from 'react'
import { AuthContext } from './context/auth.context'
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
  const{user, isLoggedIn,logOut}=useContext(AuthContext)
  console.log('user', user)
  // {user?console.log(user._id,"<-USERID3"):console.log("no user")}

  const[allDays, setAllDays]=useState([])
    useEffect(()=>{
      if (user) {
        axios.get(`${import.meta.env.VITE_BACKEND_URL}/days/all`)
        .then(foundDays=>{
            console.log('foundDays', foundDays.data);
            const filteredDaysByUser = foundDays.data.filter(day => day.owner === user._id);
            // const currentUsersDays=foundDays.data.filter(day=>console.log(day.owner,"OWNER"))
            setAllDays(filteredDaysByUser);
        })
        .catch(err=>{
            console.log(err,"<---err")
        })
      }
        
    },[user])
  useEffect(() => {
    if (!isLoggedIn) {
      setAllDays([]);
    }
  }, [isLoggedIn]);

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
