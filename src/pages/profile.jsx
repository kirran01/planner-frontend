import React from 'react';
import { useContext, useState } from 'react';
import { AuthContext } from '../context/auth.context';
import axios from 'axios';
import { margin } from '@mui/system';

const Profile = () => {
    const { user, setUser, isLoggedIn, storeToken, logOut } = useContext(AuthContext)
    const [fieldToEdit, setFieldToEdit] = useState('')
    const [inputText, setInputText] = useState('')
    const updateUser = (e) => {
        e.preventDefault()
        axios.put(`${import.meta.env.VITE_BACKEND_URL}/auth/edit-user`, {
            [fieldToEdit]: inputText
        },
            {
                headers: {
                    authorization: `Bearer ${localStorage.getItem('authToken')}`
                }
            }
        )
            .then(res => {
                setUser(res.data.updatedUser)
                storeToken(res.data.updatedToken)
                setFieldToEdit('')
            })
            .catch(err => {
                console.log(err)
            })
    }
    return (
        <div className='profile'>
            <h1>Profile</h1>
            <div className='profile-info-card'>
                {
                    user && (
                        <>
                            <div className='user-info' style={{ display: 'flex', margin:'5px', alignItems:'center' }}>
                                {fieldToEdit === 'name' ?
                                    <form onSubmit={updateUser}>
                                        <input onChange={(e) => {
                                            setInputText(e.target.value)
                                        }} defaultValue={user.name} type="text" />
                                        <button>submit</button>
                                        <button onClick={()=>{
                                        setFieldToEdit('')
                                        }}>Cancel</button>
                                    </form>
                                    :
                                    <>
                                    <h3 style={{fontWeight:'lighter', margin:'5px'}} >Username:</h3>
                                    <h3 style={{fontWeight:'lighter', margin:'5px'}}>{user.name}</h3>
                                    </>
                                    }
                               {fieldToEdit===''&& <button onClick={() => {
                                    setFieldToEdit('name')
                                }}>Edit</button>}
                            </div>
                            <div className='user-info' style={{ display: 'flex', margin:'5px', alignItems:'center'}}>
                                {fieldToEdit === 'email' ?
                                    <form onSubmit={updateUser}>
                                        <input onChange={(e) => {
                                            setInputText(e.target.value)
                                        }} defaultValue={user.email} type="text" />
                                        <button>Submit</button>
                                        <button onClick={()=>{
                                        setFieldToEdit('')
                                        }}>Cancel</button>
                                    </form>
                                    :
                                    <>
                                    <h3 style={{fontWeight:'lighter', margin:'5px'}}>Email:</h3>
                                    <h3 style={{fontWeight:'lighter', margin:'5px'}}>{user.email}</h3>
                                    </>
                                    
                                    }

                               {fieldToEdit===''&&  <button onClick={() => {
                                    setFieldToEdit('email')
                                }}>Edit</button>}
                            </div>
                        </>
                    )
                }
                {
                    !user && (
                        <>
                            <h4>loading...</h4>
                        </>
                    )
                }
            </div>
        </div>
    );
}

export default Profile;
