import React from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useState } from 'react';

function Signup(){
    const navigate=useNavigate()
    const[input, setInput]=useState({
        email:'',
        name:'',
        password:''
    })

    const updateInput=(e)=>{
    setInput({
        ...input,[e.target.name]:e.target.value
    })
    }
    const submitSignup=(e)=>{
    e.preventDefault()
    axios.post('http://localhost:3000/auth/signup',{
        email:input.email,
        name:input.name,
        password:input.password
    })
    .then(axiosRes=>{
        console.log(axiosRes.data)
        navigate('/login')
    })
    .catch(err=>{
        console.log(err)
    })
    }

    return (
    <div>
    <form onSubmit={submitSignup}>
    <label htmlFor="username">Username</label>
      <br />
      <input value={input.name} type="text" name="name" onChange={updateInput}/>
      <br />
      <label htmlFor="email">Email</label>
      <br />
      <input value={input.email} type="text" name="email" onChange={updateInput}/>
      <br />
      <label htmlFor="password">Password</label>
      <br />
      <input value={input.password} type="password" name="password" onChange={updateInput}/>
      <br />
      <button>Sign up</button>
    </form>
        </div>
    );
}

export default Signup;
