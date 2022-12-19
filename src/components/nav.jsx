import React from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../context/auth.context';
import { useContext } from 'react';

const Nav = () => {
const{user,isLoggedIn,logOut}=useContext(AuthContext);
    return (
    <nav className='nav-main'>
      <ul>
        {
          isLoggedIn && (
            <>
             <li>
              <h4 style={{margin:'0'}}>{user.name}</h4>
            </li>
            <li>
            <Link to="/">Home</Link>
            </li>
            <li>
              <button onClick={logOut}>Log Out</button>
            </li>
            </>
          )  
        }
        {
          !isLoggedIn && (
            <>
            <li>
            <Link to="/">Home</Link>
            </li>
            <li>
            <Link to="/login">Login</Link>
            </li>
            <li>
            <Link to="/signup">Signup</Link>
            </li>
            </>
          )
        }
      </ul>
    </nav>
    );
}

export default Nav;
