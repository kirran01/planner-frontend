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
    // const body=props.event
    // body.userEntry=eventInput
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

    const removeEvent=()=>{

    }

    return (
            <form action="" className='event-form'>
                <input type="text" value={eventInput} onChange={handleEventInput}/>
                <div className='event-form-buttons'>
                    <button onClick={submitEvent}>✔</button>
                    <button>✕</button>
                    <button>✎</button>
                </div>
            </form>
    );
}

export default Evententry;
