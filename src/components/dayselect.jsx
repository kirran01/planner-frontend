import React from 'react';
import { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Modal from 'react-modal';
import axios from 'axios';
Modal.setAppElement('#root');
import { AuthContext } from '../context/auth.context';


const Dayselect = (props) => {
    const navigate = useNavigate()
    const { user, isLoggedIn, logOut } = useContext(AuthContext)
    const [err, setErr] = useState(null)
    const [dayInput, setDayInput] = useState("")
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
            return new Date(d.day).toLocaleString('fr-CA').substring(0, 10) === dayInput.toLocaleString('fr-CA').substring(0, 10)
        })
        if (foundDay) {
            setErr("day already exists")
        } else {
            setErr("")
            const storedToken = localStorage.getItem('authToken')
            axios.post(`${import.meta.env.VITE_BACKEND_URL}/days/create-day`, {
                day: dayInput,
                quote: '',
            }, { headers: { Authorization: `Bearer ${storedToken}` } })
                .then(res => {
                    let newDay = new Date(res.data.day).toString().substring(0, 3)
                    switch (newDay) {
                        case 'Mon':
                            newDay = "monday"
                            break;
                        case 'Tue':
                            newDay = "tuesday"
                            break;
                        case 'Wed':
                            newDay = "wednesday"
                            break;
                        case "Thu":
                            newDay = "thursday"
                            break;
                        case 'Fri':
                            newDay = "friday"
                            break;
                        case 'Sat':
                            newDay = 'saturday'
                            break;
                        case 'Sun':
                            newDay = 'sunday'
                    }
                    setIsOpen(false);
                    props.setAllDays([...props.allDays, res.data]);
                    navigate(`/day/${newDay}`)
                })
                .catch(err => {
                    console.log('err adding day', err)
                    setIsOpen(false);
                })
        }
    }
    return (
        <nav className='nav-days'>
            <ul>
                {isLoggedIn && <li>
                    <button id='add-event-button' onClick={openModal}>＋</button>
                </li>}
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
                    <input type="datetime-local" onChange={handleDayInput} />
                    <button>submit</button>
                </form>
                <p>{err}</p>
            </Modal>
        </nav>
    );
}

export default Dayselect;
