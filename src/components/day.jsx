import React from 'react';
import { useState, useEffect } from 'react';
import axios from 'axios';

//set DATE programmatically

const Day = () => {
    const[taskEntries, setTaskEntries]=useState([]);
    const addTaskEntry=()=>{
    setTaskEntries([...taskEntries,<input/>])
    }
    return (
        <div className='day-card'>
            <h1 style={{textAlign:'center'}}>DATE</h1>
            <button onClick={addTaskEntry}>+</button>
          <form className='task-form' action="">
            <div className='task-entries'>
            {taskEntries}
            <input type="text" value={'entry'} />
            </div>
          </form>
        </div>
    );
}

export default Day;
