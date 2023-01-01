import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/auth.context';
import { useContext } from 'react';
const numberToDay = { 1: 'monday', 2: 'tuesday', 3: 'wednesday', 4: 'thursday', 5: 'friday', 6: 'saturday', 0: 'sunday' }



const Nav = () => {
  const navigate = useNavigate()
  const { user, isLoggedIn, logOut } = useContext(AuthContext);
  const goToToday = () => {
    const today = new Date().getDay()
    const day = numberToDay[today]
    navigate(`/day/${day}`)
  }

  return (
    <nav className='nav-main'>
      <ul>
        {
          isLoggedIn && (
            <>
              <li>
                <p onClick={goToToday}>Today</p>
          
              </li>
              <li>
                <Link to="/profile">{user.name}</Link>
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
