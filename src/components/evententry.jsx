import React from 'react';
import { useState } from 'react';
import axios from 'axios';

const Evententry = (props) => {
    const[eventInput,setEventInput]=useState(props.event.userEntry||"")
    const[isEditing,setIsEditing]=useState(false)

    const handleEventInput=(e)=>{
    setEventInput(e.target.value)
    }
    const submitEvent=(e)=>{
    // e.preventDefault()
    axios.post('http://localhost:3000/events/create-event',{
    ...props.event,
    userEntry:eventInput
    })
    .then(newEvent=>{
        console.log(newEvent,"<--axiosres")
    })
    .catch(err=>{
        console.log(err)
    })
    }

    const removeEvent=(e)=>{
    //not sure why these are difernet in the console log?
    // console.log(props.event._id)

    e.preventDefault()
    axios.delete(`http://localhost:3000/events/all/${props.event._id}`)
    .then(deletedEvent=>{
        // console.log(deletedEvent.data._id,"<--deletedId")
    })
    .catch(err=>{
        console.log(err,"<--err")
    })
    }

    const updateEvent=(e)=>{
    e.preventDefault()
    console.log("initiate update")
    setEventInput("")
    setIsEditing(true)
    }

    const submitEdit=(e)=>{
    e.preventDefault()
    axios.put(`http://localhost:3000/events/all/${props.event._id}`,{
        userEntry:eventInput
    })
    .then(updatedEvent=>{
        setIsEditing(false)
        console.log(updatedEvent)
    })
    .catch(err=>{
        console.log(err)
    })

    }

    return (
            <form action="" className='event-form'>
                {isEditing&&(
                    <>
                <input type="text" value={eventInput} onChange={handleEventInput}/>
                <div className='event-form-buttons'>
                <button onClick={submitEdit}>✅</button>
                </div>
                    </>
                )}
                {!isEditing&&(
                    <>
                {/* //user entry is only provided after submission, so before submission inputs dont have userentry */}
                {props.event.userEntry?<input type="text" value={eventInput}/>:<input type="text" value={eventInput} onChange={handleEventInput}/>}
                <div className='event-form-buttons'>
                    {!props.event.userEntry?<button onClick={submitEvent}>✔</button>:<></>}
                    <button onClick={removeEvent}>✕</button>
                    <button onClick={updateEvent}>✎</button>
                </div>
                    </>
                )}
            </form>
    );
}

export default Evententry;
