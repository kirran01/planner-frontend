import React from 'react';
import { useState } from 'react';
import axios from 'axios';

const Evententry = (props) => {
    const[eventInput,setEventInput]=useState(props.event.userEntry||"")

    const handleEventInput=(e)=>{
    setEventInput(e.target.value)
    }
    const submitEvent=(e)=>{
    e.preventDefault()
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

    return (
            <form action="" className='event-form'>
                <input type="text" value={eventInput} onChange={handleEventInput}/>
                <div className='event-form-buttons'>
                    <button onClick={submitEvent}>✔</button>
                    <button onClick={removeEvent}>✕</button>
                    <button>✎</button>
                </div>
            </form>
    );
}

export default Evententry;
