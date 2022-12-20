import React from 'react';
import Day from '../components/day';
import { useState,useEffect } from 'react';
import axios from 'axios';


const Home = () => {
    const[days, setDays]=useState([]);
    useEffect(()=>{
        axios.get('http://localhost:3000/days/all')
        .then(foundDays=>{
            console.log(foundDays.data,"<--days")
        })
        .catch(err=>{
            console.log(err,"<---err")
        })
    },[])
    const addDay=()=>{
    setDays([...days,<Day/>])
    }
    return (
        <div className='home'>
            <button onClick={addDay}>+</button>
            <div className='days'>
            {days}
            </div>
        </div>
    );
}

export default Home;
