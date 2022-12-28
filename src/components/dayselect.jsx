import React from 'react';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import Modal from 'react-modal';
Modal.setAppElement('#root');


const Dayselect = (props) => {
    const [err, setErr] = useState(null)
    const [dayInput, setDayInput] = useState("")
    console.log(dayInput)
    console.log(props.allDays)
    const handleDayInput = (e) => {
        setDayInput(e.target.value)
    }
    function openModal() {
        setIsOpen(true);
    }
    function closeModal() {
        setIsOpen(false);
    }
    const [modalIsOpen, setIsOpen] = useState(false);
    const customStyles = {
        content: {
            top: '50%',
            left: '50%',
            right: 'auto',
            bottom: 'auto',
            marginRight: '-50%',
            transform: 'translate(-50%, -50%)',
        },
    };
    const addDay = (e) => {
        e.preventDefault()
        const foundDay = props.allDays.find(d => {
            return new Date(d.day).toLocaleString('fr-CA', { timeZone: 'America/New_York' }).substring(0, 10) === dayInput
        })
        console.log(foundDay)
        if (foundDay) {
            setErr("day already exists")
        } else {
            setErr("")
            props.setAllDays([...props.allDays, { day: new Date(dayInput + "T00:00"), quote: '', myEvents: [] }]);
            setIsOpen(false);
        }


    }
    return (
        <nav className='nav-days'>
            <ul>
                <li>
                    <button id='add-event-button' onClick={openModal}>＋</button>
                </li>
                <li>
                    <Link to="/day/sunday">S</Link>
                </li>
                <li>
                    <Link to="/day/monday">M</Link>
                </li>
                <li>
                    <Link to="/day/tuesday">T</Link>
                </li>
                <li>
                    <Link to="/day/wednesday">W</Link>
                </li>
                <li>
                    <Link to="/day/thursday">T</Link>
                </li>
                <li>
                    <Link to="/day/friday">F</Link>
                </li>
                <li>
                    <Link to="/day/saturday">S</Link>
                </li>
            </ul>
            <Modal
                isOpen={modalIsOpen}
                onRequestClose={closeModal}
                style={customStyles}
                contentLabel="Example Modal"
            >
                <button onClick={closeModal}>close</button>
                <h2>Choose a day</h2>
                <form onSubmit={addDay}>
                    <input type="date" onChange={handleDayInput} />
                    <button>submit</button>
                </form>
                <p>{err}</p>
            </Modal>
        </nav>
    );
}

export default Dayselect;
