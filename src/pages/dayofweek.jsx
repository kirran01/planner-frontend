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
    console.log('filteredDays', filteredDays)
    return (
        <div className='days-of-week'>
            <h1>{dayofweek}</h1>
            <div className='all-days'>
                {filteredDays.map(d =>

                    <Day dayObj={d} addEvent={() => addEvent(d._id)} allDays={allDays} setAllDays={setAllDays} />


                    // <>
                    //     <div className='day-of-week'>
                    //         <h2>{new Date(d.day).toDateString()}</h2>
                    //         <div className='events-for-day'>
                    //             <button onClick={() => {
                    //                 addEvent(d._id)
                    //             }}>＋</button>
                    //             {d.myEvents.map(event => {
                    //                 return (

                    //                     <p>{event.userEntry}</p>

                    //                 )
                    //             })}
                    //         </div>
                    //     </div>
                    // </>
                )}
            </div>
        </div>
    );
}

export default Dayofweek;
