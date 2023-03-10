import React from 'react';
import { useState, useEffect } from 'react';
import axios from 'axios';
import Evententry from './evententry';

const Day = (props) => {
  const [dateTag, setDateTag] = useState(props.dayObj.day)
  const[pressedPlus,setPressedPlus]=useState(false)
  const [isEditing, setIsEditing] = useState(false)
  const [hasSubmitted, setHasSubmitted] = useState(false)
  const timeCreated = new Date(props.dayObj.day).toString().slice(15, 21)


  const handlePlus=()=>{
    setPressedPlus(true)
  }

  const handleDayInputState = (e) => {
    e.preventDefault()
    setDateTag(e.target.value + 'T00:00:00')
  }

  const editDate = () => {
    if (!isEditing) {
      setIsEditing(true)
    } else {
      setIsEditing(false)
    }
  }

  const submitEditedDate = (e) => {
    // e.preventDefault()
    axios.put(`${import.meta.env.VITE_BACKEND_URL}/days/all/${props.dayObj._id}`, {
      day: dateTag
    })
      .then(updatedDay => {
        const updatedDateId = updatedDay.data._id;
        // Update that particular day in the allDays array
        const allDays = props.allDays.map(day => {
          if (day._id === updatedDateId) {
            return { ...day, day: dateTag };
          }
          return day;
        });
        props.setAllDays(allDays);
        setDateTag(updatedDay.data.day)
        setIsEditing(false)
      })
      .catch(err => {
        console.log(err)
      })

  }

  const removeDay = (e) => {
    axios.delete(`${import.meta.env.VITE_BACKEND_URL}/days/all/${props.dayObj._id}`)
      .then(deletedDay => {
        const filteredForDelete = props.allDays.filter(d => {
          if (d._id == props.dayObj._id) {
            return false
          } else {
            return true
          }
        })
        props.setAllDays(filteredForDelete)
      })
      .catch(err => {
        console.log(err, "<--err")
      })
  }

  return (
    <div className='day-card'>
      {props.dayObj && (
        <>
          <button onClick={removeDay}>×</button>
          <div className="button-box">
            <h2>{new Date(props.dayObj.day).toDateString()}</h2>
            <h5 id='time-created' style={{ textAlign: 'center' }}>created at:{timeCreated}</h5>
            {!hasSubmitted && (<><p style={{ textAlign: 'center' }}>press '+' to add a task</p></>)}
          </div>
        </>
      )}
     {!pressedPlus&& <button onClick={() => {
        props.addEvent(props.dayObj._id)
        setPressedPlus(true)
      }}>＋</button>}
      {
        props.dayObj.myEvents.map((event) => {
          return (
            <Evententry setPressedPlus={setPressedPlus} key={event._id} hasId={props.hasId} setHasSubmitted={setHasSubmitted} dayObj={props.dayObj} allDays={props.allDays} setAllDays={props.setAllDays} event={event} />
          )
        })
      }

    </div>
  );
}

export default Day;
