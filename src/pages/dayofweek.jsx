import React from 'react';
import { useParams } from 'react-router-dom'
import Day from '../components/day';

const Dayofweek = ({ allDays, setAllDays }) => {
    const { dayofweek } = useParams();
    const filteredDays = allDays.filter(day => new Date(day.day).toDateString().substring(0, 3).toLowerCase() === dayofweek.substring(0, 3).toLowerCase())
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
                    <Day dayObj={d} addEvent={() => addEvent(d._id)} allDays={allDays} setAllDays={setAllDays} />
                )}
            </div>
        </div>
    );
}

export default Dayofweek;
