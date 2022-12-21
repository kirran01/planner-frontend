import React from 'react';
import { useState, useEffect } from 'react';
import axios from 'axios';
import Evententry from './evententry';

const Day = (props) => {
    return (
          <div className='day-card'>
            {
            !props.dayData&&(
              <>
              <h1></h1>
              <h2></h2>
              </>
            )  
            }
            {
              props.dayData&&(
                <>
            <h1 style={{textAlign:'center'}}>{(new Date(props.dayData.day)).toDateString()}</h1>
            <h2 style={{textAlign:'center'}}>{props.dayData.quote}</h2>
                </>
              )
            }
            <button onClick={()=>{
              //we are passing the 'dayId' here in this parameter
              props.addEvent(props.dayData._id)}}>＋</button>
            {
            props.dayData.myEvents.map((event)=>{
              return(    
              <>
              <Evententry event={event}/>
              </>
              )
            })
            }
            {
            !props.dayData.myEvents.length&&(
              <>
              <p></p>
              </>
            )  
            }
        </div>
    );
}

export default Day;
