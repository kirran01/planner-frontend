import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom'
import Day from '../components/day';

const Dayofweek = ({ allDays, setAllDays }) => {
    const [filteredDays, setFilteredDays] = useState([]);
    const { dayofweek } = useParams();


    useEffect(() => {
        console.log('running', dayofweek, allDays)

        const filteredDays = allDays.filter(day => {
            console.log(new Date(day.day).toDateString().substring(0, 3).toLowerCase())
            return new Date(day.day).toDateString().substring(0, 3).toLowerCase() === dayofweek.substring(0, 3).toLowerCase()
        })
        console.log('filterd days', filteredDays)
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
            <div className='all-days'>
                {filteredDays.map(d =>
                    <Day key={d._id} dayObj={d} addEvent={() => addEvent(d._id)} allDays={allDays} setAllDays={setAllDays} />
                )}
            </div>
        </div>
    );
}

export default Dayofweek;
