import React from 'react';
import { Link } from 'react-router-dom';

const Dayselect = () => {
    return (
        <nav className='nav-days'>
    <ul>
        <li>
        <Link to="/">S</Link>
            </li>
        <li>
        <Link to="/">M</Link>
            </li>
        <li>
        <Link to="/">T</Link>
            </li>
        <li>
        <Link to="/">W</Link>
            </li>
        <li>
        <Link to="/">T</Link>
            </li>
        <li>
        <Link to="/">F</Link>
            </li>
        <li>
        <Link to="/">S</Link>
            </li>
    </ul>
        </nav>
    );
}

export default Dayselect;
