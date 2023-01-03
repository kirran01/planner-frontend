import React, { useState, useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom'
import Day from '../components/day';
import { AuthContext } from '../context/auth.context';

const Dayofweek = ({ allDays, setAllDays }) => {
    const { user, isLoggedIn, logOut } = useContext(AuthContext)
    const [filteredDays, setFilteredDays] = useState([]);
    const { dayofweek } = useParams();

    useEffect(() => {
        const filteredDays = allDays.filter(day => {
            return new Date(day.day).toDateString().substring(0, 3).toLowerCase() === dayofweek.substring(0, 3).toLowerCase()
        })
        setFilteredDays(filteredDays);
    }, [dayofweek, allDays])

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
        <div className='days-of-week'>
            <h1>{dayofweek}</h1>
            {isLoggedIn && !allDays.length ? <p style={{textAlign:'center'}}>press the + button to add your first day</p> : <></>}
            {isLoggedIn && (<div className='all-days'>
                {filteredDays.map(d =>
                    <Day key={d._id} dayObj={d} addEvent={() => addEvent(d._id)} allDays={allDays} setAllDays={setAllDays} />
                )}
            </div>)}
            {!isLoggedIn && <>
                <p style={{textAlign:'center'}}>log in to begin adding tasks</p>
            </>}
        </div>
    );
}

export default Dayofweek;
