import React from 'react';
import Day from '../components/day';
import { useState,useEffect,useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../context/auth.context';

const Home = () => {
    const {user,isLoggedIn, logOut} = useContext(AuthContext)
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
    const addDay=()=>{
        //until a date is in the db, there is no ._id to associate the new event with resulting in a bug when making new events
        //on a new day object 
    setAllDays([...allDays, { day: new Date(), quote: '', myEvents: []}])
    }
    const addEvent = (dayId) => {
    const mappedDays=allDays.map(day=>{
            if(day._id===dayId){
                day.myEvents.push({userEntry:"",dayId})
            }
            return day
        })
        setAllDays(mappedDays)
    }
    return (
        <div className='home'>
            <button onClick={addDay}>＋</button>
            <div className='days'>
            {
            allDays.map((day)=>{
                return (
                <Day dayObj={day} addEvent={addEvent} />
                )
            })
            }
            
            </div>
        </div>
    );
}

export default Home;
