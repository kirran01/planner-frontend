import React from 'react';
import { useState, useEffect } from 'react';
import axios from 'axios';
import Evententry from './evententry';

const Day = (props) => {
  const[dateTag,setDateTag]=useState(props.dayObj.day)
  const[isEditing,setIsEditing]=useState(false)

  const handleDayInputState=(e)=>{
  e.preventDefault()
  console.log(e.target.value)
  setDateTag(e.target.value + 'T00:00:00')
  }

  const submitEditedDate=(e)=>{
  e.preventDefault()
  axios.put(`http://localhost:3000/days/all/${props.dayObj._id}`,{
    day:dateTag
  })
  .then(updatedDay=>{
    setDateTag(updatedDay.data.day)
  })
  .catch(err=>{
    console.log(err)
  })

  }

  const removeDay=(e)=>{
  axios.delete(`http://localhost:3000/days/all/${props.dayObj._id}`)
  .then(deletedDay=>{
  })
  .catch(err=>{
    console.log(err,"<--err")
  })
  }
    return (
          <div className='day-card'>
            {!props.dayObj&&(
              <>
              </>
            )}
            {props.dayObj&&(
             <> 
            <div id="button-box">
            <button onClick={removeDay}>×</button>
            </div>
            <h1 style={{textAlign:'center'}}>{(new Date(dateTag)).toDateString()}</h1>  
            <button type="" onClick={submitEditedDate}>✅</button>
            <input type="date" onChange={handleDayInputState}/>
             </>
              )}
            <button onClick={()=>{
              //we are passing the 'dayId' here in this parameter
              props.addEvent(props.dayObj._id)}}>＋</button>
            {
              props.dayObj.myEvents.map((event)=>{
              return(    
              <>
              <Evententry event={event}/>
              </>
              )
            })
            }
            {!props.dayObj.myEvents.length&&(
              <>
              </>
            )}
        </div>
    );
}

export default Day;
