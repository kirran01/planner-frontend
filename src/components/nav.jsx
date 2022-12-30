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
              <Link to="/profile">{user.name}</Link>
            </li>
            <li>
            <Link to="/">Today</Link>
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
            <Link to="/">Today</Link>
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
