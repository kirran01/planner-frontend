import React from 'react';
import { useState, useEffect } from 'react';
import axios from 'axios';
import Evententry from './evententry';

const Day = (props) => {
  // {import.meta.env.VITE_BACKEND_URL}
  const[dateTag,setDateTag]=useState(props.dayObj.day)
  const[isEditing,setIsEditing]=useState(false)
  const[showChange,setShowChange]=useState(false)

  const handleDayInputState=(e)=>{
  e.preventDefault()
  console.log(e.target.value)
  setDateTag(e.target.value + 'T00:00:00')
  }

  const editDate=()=>{
    if(!isEditing){
      setIsEditing(true)
    }else{
      setIsEditing(false)
    }
  }

  const submitEditedDate=(e)=>{
  // e.preventDefault()
  //dateTag is not set here. 
  axios.put(`${import.meta.env.VITE_BACKEND_URL}/days/all/${props.dayObj._id}`,{
    day:dateTag
  })
  .then(updatedDay=>{
    setDateTag(updatedDay.data.day)
    setIsEditing(false)
  })
  .catch(err=>{
    console.log(err)
  })

  }

  const removeDay=(e)=>{
  axios.delete(`${import.meta.env.VITE_BACKEND_URL}/days/all/${props.dayObj._id}`)
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
            <form onSubmit={removeDay}>
            <button>×</button>
            </form>
            <h1 style={{textAlign:'center'}}>{(new Date(dateTag)).toDateString()}</h1>  
            </div>
            {props.dayObj.myEvents.length>=1?<button onClick={editDate}>change</button>:<></>}
            {isEditing?(<>
            <div className='date-edit'>
            <input type="date" onChange={handleDayInputState}/>
            <button onClick={submitEditedDate}>✅</button>
            </div>
            </>):(<>
            </>)}
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
