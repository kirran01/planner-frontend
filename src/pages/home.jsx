import React from 'react';
import Day from '../components/day';
import { useNavigate } from 'react-router-dom';
import { useContext, useState, useEffect } from 'react';
import axios from 'axios';
import { AuthContext } from '../context/auth.context';

const numberToDay = { 1: 'monday', 2: 'tuesday', 3: 'wednesday', 4: 'thursday', 5: 'friday', 6: 'saturday', 0: 'sunday' }

const Home = ({ allDays, setAllDays }) => {
    const navigate = useNavigate()
    const { user, isLoggedIn, logOut } = useContext(AuthContext)
    // useEffect(() => {
    //     const today = new Date().getDay()
    //     const day = numberToDay[today]
    //     navigate(`/day/${day}`)
    // }, [])

    const addEvent = (dayId) => {
        const mappedDays = allDays.map(day => {
            if (day._id === dayId) {
                day.myEvents.push({ userEntry: "", dayId })
            }
            return day
        })
        setAllDays(mappedDays)
    }
    return (
        <div className='home'>
            {!isLoggedIn ? <>
                <h2>log in or sign <i class="fa fa-volume-up" aria-hidden="true"></i> to begin adding tasks</h2>
            </>
             : 
            <></>
            }
            <div className='days'>
                {
                    allDays.map((day) => {
                        return (
                            <Day key={day._id} dayObj={day} addEvent={() => addEvent(day._id)} allDays={allDays} setAllDays={setAllDays} />
                        )
                    })
                }
            </div>
        </div>
    );
}

export default Home;
