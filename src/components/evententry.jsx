import React from 'react';
import { useState } from 'react';
import axios from 'axios';

const Evententry = (props) => {
    const [eventInput, setEventInput] = useState(props.event.userEntry || "")
    const [isEditing, setIsEditing] = useState(false)
    const [newSubmission, setNewSubmission] = useState(false)
    console.log(props.allDays,"<--props.alldays")

    const handleEventInput = (e) => {
        setEventInput(e.target.value)
    }
    const submitEvent = (e) => {
        e.preventDefault()
        axios.post(`${import.meta.env.VITE_BACKEND_URL}/events/create-event`, {
            ...props.event,
            userEntry: eventInput
        }, {
            headers: {
                authorization: `Bearer ${localStorage.getItem('authToken')}`
            }
        })
            .then(newEvent => {
                const userEntry = newEvent.data.userEntry
                const mappedDays = props.allDays.map(day => {
                    if (newEvent.dayId === day._id) {
                        return { ...day.myEvents, userEntry: userEntry }
                    }
                    return day
                })
                props.setAllDays(mappedDays)
                setEventInput(userEntry)
                setNewSubmission(true)
            })
            .catch(err => {
                console.log(err)
            })
    }

    const removeEvent = (e) => {
        axios.delete(`${import.meta.env.VITE_BACKEND_URL}/events/all/${props.event._id}`)
            .then(deletedEvent => {
            })
            .catch(err => {
                console.log(err, "<--err")
            })
    }

    const updateEvent = (e) => {
        e.preventDefault()
        setEventInput("")
        setIsEditing(true)
    }

    const submitEdit = (e) => {
        e.preventDefault()
        axios.put(`${import.meta.env.VITE_BACKEND_URL}/events/all/${props.event._id}`, {
            userEntry: eventInput
        })
            .then(updatedEvent => {
                setIsEditing(false)
                console.log(updatedEvent)
            })
            .catch(err => {
                console.log(err)
            })

    }

    return (
        <form action="" className='event-form'>
            {isEditing && (
                <>
                    <input type="text" value={eventInput} onChange={handleEventInput} />
                    <div className='event-form-buttons'>
                        <button onClick={submitEdit}>✅</button>
                    </div>
                </>
            )}
            {!isEditing && (
                <>
                    {props.event.userEntry ? <input type="text" value={eventInput} /> : <input type="text" value={eventInput} onChange={handleEventInput} />}
                    <div className='event-form-buttons'>
                        {!props.event.userEntry && !newSubmission ? <button onClick={submitEvent}>✔</button> : <></>}
                        <button onClick={removeEvent}>✕</button>
                        <button onClick={updateEvent}>✎</button>
                    </div>
                </>
            )}
        </form>
    );
}

export default Evententry;
