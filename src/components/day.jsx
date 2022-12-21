import React from 'react';
import { useState, useEffect } from 'react';
import axios from 'axios';
import Evententry from './evententry';

const Day = (props) => {
  const removeDay=(e)=>{
  e.preventDefault()
  console.log("removeDay")
  axios.delete(`http://localhost:3000/days/all/${props.dayObj._id}`)
  .then(deletedDay=>{
    console.log(deletedDay,"<----deleted")
  })
  .catch(err=>{
    console.log(err,"<--err")
  })
  }
    return (
          <div className='day-card'>
            {
            !props.dayObj&&(
              <>
              <h1></h1>
              <h2></h2>
              </>
            )  
            }
            {
              props.dayObj&&(
                <> 
            <button onClick={removeDay}>Delete</button>
            <h1 style={{textAlign:'center'}}>{(new Date(props.dayObj.day)).toDateString()}</h1>
            <h2 style={{textAlign:'center'}}>{props.dayObj.quote}</h2>
           
                </>
              )
            }
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
            {
            !props.dayObj.myEvents.length&&(
              <>
              <p></p>
              </>
            )  
            }
        </div>
    );
}

export default Day;
