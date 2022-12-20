import React from 'react';
import { useState } from 'react';
import axios from 'axios';

const Evententry = () => {
    const[eventInput,setEventInput]=useState('')
    const handleEventInput=(e)=>{
    setEventInput(e.target.value)
    }
    const submitEvent=(e)=>{
    e.preventDefault()
    axios.post('http://localhost:3000/events/create-event',{
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
