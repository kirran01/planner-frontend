import React from 'react';
import { useState, useEffect } from 'react';
import axios from 'axios';
import Evententry from './evententry';

const Day = (props) => {
  const [dateTag, setDateTag] = useState(props.dayObj.day)
  const [isEditing, setIsEditing] = useState(false)
  const [hasSubmitted, setHasSubmitted] = useState(false)

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
      })
      .catch(err => {
        console.log(err, "<--err")
      })
  }

  return (
    <div className='day-card'>
      {!props.dayObj && (
        <>
        </>
      )}
      {props.dayObj && (
        <>
          <form className='delete-button' onSubmit={removeDay}>
            <button>×</button>
          </form>
          <div did="button-box">

            <h2>{new Date(props.dayObj.day).toDateString()}</h2>
            {!hasSubmitted && (<><p>press '+' to add a task</p></>)}
          </div>
        </>
      )}
      <button onClick={() => {
        props.addEvent(props.dayObj._id)
      }}>＋</button>
      {
        props.dayObj.myEvents.map((event) => {
          return (
            <Evententry key={event._id} hasId={props.hasId} setHasSubmitted={setHasSubmitted} dayObj={props.dayObj} allDays={props.allDays} setAllDays={props.setAllDays} event={event} />
          )
        })
      }

    </div>
  );
}

export default Day;
