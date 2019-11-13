import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
    const isAuthenticated = true;
    const role = 'user';
    const authLinks = (
        <>
            {role === 'admin' && (
                <li className='hide-on-med-and-down'>
                    <Link to='/create'>Create Survey</Link>
                </li>
            )}
            <li>
                <Link to='/dashboard'>
                    <i style={{ margin: '0' }} className='material-icons left'>
                        apps
                    </i>
                </Link>
            </li>
            <li>
                <Link to='/'>
                    <i style={{ margin: '0' }} className='material-icons left'>
                        exit_to_app
                    </i>
                </Link>
            </li>
        </>
    );

    const guestLinks = (
        <>
            <li>
                <Link to='/signin'>Sign In</Link>
            </li>
            <li className='hide-on-small-only'>
                <Link to='/signup'>Sign Up</Link>
            </li>
        </>
    );
    return (
        <nav className=' purple darken-4'>
            <div className='nav-wrapper container'>
                <Link to='/' className='brand-logo left '>
                    Survey App
                </Link>
                <ul id='nav-mobile' className='right '>
                    <li className='hide-on-med-and-down'>
                        <Link to='/surveys'>Surveys</Link>
                    </li>
                    {isAuthenticated ? authLinks : guestLinks}
                </ul>
            </div>
        </nav>
    );
};

export default Navbar;
