import React from 'react';
import { useContext } from 'react';
import { AuthContext } from '../context/auth.context';

const Profile = () => {
    const { user, isLoggedIn, logOut } = useContext(AuthContext)
    return (
        <div className='profile'>
            <h1>Profile</h1>
            <div className='profile-info-card'>
                {
                    user && (
                        <>
                            <h3>username: {user.name}</h3>
                            <h3>email: {user.email}</h3>
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
