import React from 'react';
import { useParams } from 'react-router-dom'

const Dayofweek = ({ allDays }) => {

    const { dayofweek } = useParams();
    
    const filteredDays = allDays.filter(day => new Date(day.day).toDateString().substring(0,3).toLowerCase() === dayofweek.substring(0,3).toLowerCase())

    return (
        <div>
            {dayofweek}
            {filteredDays.map(d => <p>{d.day}</p>)}
        </div>
    );
}

export default Dayofweek;
