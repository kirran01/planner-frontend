import React from 'react';
import { useParams } from 'react-router-dom'

const Dayofweek = ({ allDays }) => {

    const { dayofweek } = useParams();
    
    const filteredDays = allDays.filter(day => new Date(day.day).toDateString().substring(0,3).toLowerCase() === dayofweek.substring(0,3).toLowerCase())
    

    // console.log(filteredDays[0].myEvents[0].userEntry,"filtereddays")
    return (
        <div className='days-of-week'>
            <h1>{'all '+dayofweek+'s'}</h1>
            <div className='all-days'>
            {filteredDays.map(d =>
            <>
            <div className='day-of-week'>
            <h2>{new Date(d.day).toDateString()}</h2>
            {console.log(d.myEvents)}
            {/* {d.myEvents.map(event=>{
                <p>{event.userEntry}</p>
            })} */}
            <p>event1</p>
            <p>event2</p>
            <p>event3</p>
            </div>
          </>
          )}
          </div>
        </div>
    );
}

export default Dayofweek;
