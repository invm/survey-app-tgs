import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import { logout } from '../../actions/authActions';

const Navbar = props => {
    const isAuthenticated = props.auth.isAuthenticated;
    const role = props.auth.role;

    const onLogoutClick = e => {
        props.logout();
    };
    const authLinks = (
        <>
            {role === 'admin' && (
                <li className='hide-on-med-and-down'>
                    <Link to='/survey'>Create Survey</Link>
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
                <Link onClick={onLogoutClick} to='/'>
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
                    <li className='hide-on-small-only'>
                        <Link to='/surveys'>Surveys</Link>
                    </li>
                    {isAuthenticated ? authLinks : guestLinks}
                </ul>
            </div>
        </nav>
    );
};

const mapStateToProps = state => ({
    auth: state.auth
});

export default connect(mapStateToProps, { logout })(Navbar);
