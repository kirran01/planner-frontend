import e from 'cors';
import React, { useContext } from 'react';
import { useState } from 'react';

const Login = () => {
    // const {storeToken, authenticateUser}=useContext(AuthContext)
    const[inputState, setInputState]=useState({
        email:'',
        password:''
    })
    const handleInputState=(e)=>{
        setInputState({...inputState,[e.target.name]:e.target.value})
    }

    return (
    <div>
    <form className='login'>
      <label htmlFor="email">Email</label>
      <br />
      <input type="text" value={inputState.email} name="email" onChange={handleInputState} />
      <br />
      <label htmlFor="password">Password</label>
      <br/>
      <input type="password" value={inputState.password} name="password" onChange={handleInputState} />
      <br />
      <button type="submit">Log in</button>
    </form>
    </div>
    );
}

export default Login;
