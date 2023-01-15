import React from 'react';
import { useContext, useState } from 'react';
import { AuthContext } from '../context/auth.context';
import axios from 'axios';

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
                            <div style={{ display: 'flex' }}>
                                {fieldToEdit === 'name' ?
                                    <form onSubmit={updateUser}>
                                        <input onChange={(e) => {
                                            setInputText(e.target.value)
                                        }} defaultValue={user.name} type="text" />
                                        <button>submit</button>
                                    </form>
                                    :
                                    <h3>username: {user.name}</h3>}

                                <button onClick={() => {
                                    setFieldToEdit('name')
                                }}>edit</button>
                            </div>
                            <div style={{ display: 'flex' }}>
                                {fieldToEdit === 'email' ?
                                    <form onSubmit={updateUser}>
                                        <input onChange={(e) => {
                                            setInputText(e.target.value)
                                        }} defaultValue={user.email} type="text" />
                                        <button>submit</button>
                                    </form>
                                    :
                                    <h3>email: {user.email}</h3>}

                                <button onClick={() => {
                                    setFieldToEdit('email')
                                }}>edit</button>
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
