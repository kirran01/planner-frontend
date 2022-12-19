import React from 'react';
import { useContext } from 'react';
import { AuthContext } from '../context/auth.context';

const Profile = () => {
    const{user,isLoggedIn,logOut}=useContext(AuthContext)
    return (
        <div>
            {
                user&&(
                    <>
                    <h1 style={{textAlign:'center'}}>Profile</h1>
                    <h3>username: {user.name}</h3>
                    <h3>email:{user.email}</h3>
                    </>
                )
            }
            {
                !user&&(
                    <>
                    <h4>loading...</h4>
                    </>
                )
            }
        </div>
    );
}

export default Profile;
