import React from 'react';
import Day from '../components/day';
import { useState,useEffect } from 'react';
import axios from 'axios';


const Home = () => {
    const[allDays, setAllDays]=useState([])
    useEffect(()=>{
        axios.get('http://localhost:3000/days/all')
        .then(foundDays=>{
            console.log(foundDays.data,"<--days")
            setAllDays(foundDays.data)
        })
        .catch(err=>{
            console.log(err,"<---err")
        })
    },[])
    const addDayData=()=>{
    setAllDays([...allDays, { day: new Date(), quote: '', myEvents: []}])
    }
    const addEvent = (dayId) => {
    const mappedDays=allDays.map(day=>{
            if(day._id===dayId){
                //the association of the event with the day
                day.myEvents.push({userEntry:"",dayId})
            }
            return day
        })
        setAllDays(mappedDays)
    }
    return (
        <div className='home'>
            <button onClick={addDayData}>＋</button>
            <div className='days'>
            {
            allDays.map((day)=>{
                return (
                <Day dayData={day} addEvent={addEvent} />
                )
            })
            }
            
            </div>
        </div>
    );
}

export default Home;
