import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/auth.context';
import { useContext } from 'react';
const numberToDay = { 1: 'monday', 2: 'tuesday', 3: 'wednesday', 4: 'thursday', 5: 'friday', 6: 'saturday', 0: 'sunday' }



const Nav = () => {
  const navigate = useNavigate()
  const today = new Date().getDay()
  const day = numberToDay[today]
  const { user, isLoggedIn, logOut } = useContext(AuthContext);
  const goToToday = () => {
    const today = new Date().getDay()
    const day = numberToDay[today]
    navigate(`/day/${day}`)
  }

  return (
    <nav className='nav-main'>
      <div>
        <ul>
          {
            isLoggedIn && (
              <>
                <li>
                  <p style={{ cursor: 'pointer' }} onClick={goToToday}>Today ({day})</p>
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
      </div>
    </nav>
  );
}

export default Nav;
