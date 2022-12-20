import React from 'react';
import { useState, useEffect } from 'react';
import axios from 'axios';
import Evententry from './evententry';

const Day = () => {
    const[eventEntries, setEventEntries]=useState([<Evententry/>]);
    const addTaskEntry=()=>{
    setEventEntries([...eventEntries,<Evententry/>])
    }
    return (
        <div className='day-card'>
            <h1 style={{textAlign:'center'}}>DATE</h1>
            <button onClick={addTaskEntry}>+</button>
            {eventEntries}
        </div>
    );
}

export default Day;
