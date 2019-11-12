import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
    const isAuthenticated = true;
    const authLinks = (
        <>
            <li>
                <Link to='/create'>Create Survey</Link>
            </li>
            <li>
                <Link to='/dashboard'>Dashboard</Link>
            </li>
            <li>
                <Link to='/'>Log out</Link>
            </li>
        </>
    );

    const guestLinks = (
        <>
            <li>
                <Link to='/signin'>Sign In</Link>
            </li>
            <li>
                <Link to='/signup'>Sign Up</Link>
            </li>
        </>
    );
    return (
        <nav className=' purple darken-4'>
            <div className='nav-wrapper container'>
                <Link to='/' className='brand-logo'>
                    Survey App
                </Link>
                <ul id='nav-mobile' className='right hide-on-med-and-down'>
                    <li>
                        <Link to='/surveys'>Surveys</Link>
                    </li>
                    {isAuthenticated ? authLinks : guestLinks}
                </ul>
            </div>
        </nav>
    );
};

export default Navbar;
