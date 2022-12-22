import React from 'react';
import { Link } from 'react-router-dom';

const Dayselect = () => {
    return (
        <nav className='nav-days'>
    <ul>
        <li>
        <Link to="/day/sunday">S</Link>
            </li>
        <li>
        <Link to="/day/monday">M</Link>
            </li>
        <li>
        <Link to="/day/tuesday">T</Link>
            </li>
        <li>
        <Link to="/day/wednesday">W</Link>
            </li>
        <li>
        <Link to="/day/thursday">T</Link>
            </li>
        <li>
        <Link to="/day/friday">F</Link>
            </li>
        <li>
        <Link to="/day/saturday">S</Link>
            </li>
    </ul>
        </nav>
    );
}

export default Dayselect;
