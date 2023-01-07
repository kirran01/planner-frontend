import React from 'react';
import Day from '../components/day';
import { useNavigate } from 'react-router-dom';
import { useContext, useState, useEffect } from 'react';
import axios from 'axios';
import { AuthContext } from '../context/auth.context';

const numberToDay = { 1: 'monday', 2: 'tuesday', 3: 'wednesday', 4: 'thursday', 5: 'friday', 6: 'saturday', 0: 'sunday' }

const Home = ({ allDays, setAllDays }) => {
    console.log(allDays, "allDays")
    const navigate = useNavigate()
    const { user, isLoggedIn, logOut } = useContext(AuthContext)

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
                <h2 style={{ textAlign: 'center' }}>log in or sign up to begin adding tasks</h2>
            </>
                :
                <></>
            }
            {isLoggedIn && !allDays.length ? <p style={{ textAlign: 'center' }}>Welcome, {user.name}! press the + button to add your first Day. Once you've made your first day, you can begin adding tasks</p> : <></>}
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
