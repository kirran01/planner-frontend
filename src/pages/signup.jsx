import React from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useState } from 'react';

function Signup() {
    const [signupErr, setSignupErr] = useState(false)
    const [signupWait, setSignupWait] = useState(false)
    const navigate = useNavigate(false)
    const [input, setInput] = useState({
        email: '',
        name: '',
        password: ''
    })

    const updateInput = (e) => {
        setInput({
            ...input, [e.target.name]: e.target.value
        })
    }
    const submitSignup = (e) => {
        setSignupWait(true)
        e.preventDefault()
        axios.post(`${import.meta.env.VITE_BACKEND_URL}/auth/signup`, {
            email: input.email,
            name: input.name,
            password: input.password
        })
            .then(axiosRes => {
                setSignupWait(false)
                console.log(axiosRes)
                console.log(axiosRes.data)
                console.log(axiosRes.data.authToken)
                navigate('/login')
            })
            .catch(err => {
                setSignupWait(false)
                setSignupErr(true)
                console.log(err)
            })
    }

    return (
        <div className='signup-page'>
            <h1>Sign up</h1>
            {signupWait && <p>If you are not redirected, please try again in a moment. render server needs to wake up</p>}
            {signupErr && <p>internal error, invalid form input</p>}
            <form className='signup-form' onSubmit={submitSignup}>
                <label htmlFor="username">Username</label>
                <br />
                <input value={input.name} type="text" name="name" onChange={updateInput} />
                <br />
                <label htmlFor="email">Email</label>
                <br />
                <input value={input.email} type="text" name="email" onChange={updateInput} />
                <br />
                <label htmlFor="password">Password</label>
                <br />
                <input value={input.password} type="password" name="password" onChange={updateInput} />
                <br />
                <button>Sign up</button>
            </form>
        </div>
    );
}

export default Signup;
