import React from 'react';
import { useParams } from 'react-router-dom'

const Dayofweek = ({ allDays }) => {

    const { dayofweek } = useParams();
    
    const filteredDays = allDays.filter(day => new Date(day.day).toDateString().substring(0,3).toLowerCase() === dayofweek.substring(0,3).toLowerCase())
    
    return (
        <div className='days-of-week'>
            <h1>{dayofweek}</h1>
            <div className='all-days'>
            {filteredDays.map(d =>
            <>
            <div className='day-of-week'>
            <h2>{new Date(d.day).toDateString()}</h2>
            {console.log(d.myEvents)}
            <div className='events-for-day'>
            {d.myEvents.map(event=>{
                return(
             
                <p>{event.userEntry}</p>
           
                )
            })}
            </div>
            </div>
          </>
          )}
          </div>
        </div>
    );
}

export default Dayofweek;
