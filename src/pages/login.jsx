import { useState,useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { AuthContext } from '../context/auth.context';

function Login(){
    const {storeToken, authenticateUser}=useContext(AuthContext)
    const navigate=useNavigate()
    const[inputState, setInputState]=useState({
        email:'',
        password:''
    })
    const handleInputState=(e)=>{
        setInputState({...inputState,[e.target.name]:e.target.value})
    }

    const submitLogin=(e)=>{
    e.preventDefault()
    axios.post(`${import.meta.env.VITE_BACKEND_URL}/auth/login`,{
        email:inputState.email,
        password:inputState.password
    })
    .then(loginRes=>{
    console.log(loginRes.data)
    storeToken(loginRes.data.authToken)
    authenticateUser()
    navigate('/')
    })
    .catch(err=>{
        console.log(err,"<--err")
    })
    }

    return (
    <div className='login-page'>
        <h1>Log In</h1>
    <form onSubmit={submitLogin} className='login-form'>
      <label htmlFor="email">Email</label>
      <br/>
      <input type="text" value={inputState.email} name="email" onChange={handleInputState} />
      <br />
      <label htmlFor="password">Password</label>
      <br/>
      <input type="password" value={inputState.password} name="password" onChange={handleInputState} />
      <br/>
      <button type="submit">Log in</button>
    </form>
    </div>
    );
}

export default Login;
