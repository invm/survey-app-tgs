import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import Spinner from '../layout/Spinner';

import { login } from '../../actions/authActions';
import { setError } from '../../actions/errorActions';

const SignIn = props => {
    const { loading, error, isAuthenticated } = props.auth;
    const [user, setUser] = useState({
        email: '',
        password: ''
    });

    useEffect(() => {
        if (error) props.setError(error);
        //eslint-disable-next-line
        if (isAuthenticated) props.history.push('/dashboard');
        //eslint-disable-next-line
    }, [error, isAuthenticated]);

    const handleInput = e => {
        setUser({
            ...user,
            [e.target.id]: e.target.value
        });
    };

    const handleSubmit = e => {
        e.preventDefault();
        // Handle login attempt
        if (user.email !== '' && user.password !== '') {
            props.login(user);
        }
    };
    return (
        <div className='row fade' style={{ marginTop: '1rem' }}>
            <form className='col s8 offset-s2'>
                <div className='row'>
                    <div className='input-field col s12'>
                        <input required value={user.email} onChange={handleInput} id='email' type='email' className='validate' />
                        <label htmlFor='email'>Email</label>
                    </div>
                </div>
                <div className='row'>
                    <div className=' input-field col s12'>
                        <input required value={user.password} onChange={handleInput} id='password' type='password' className='validate' />
                        <label htmlFor='password'>Password</label>
                    </div>
                </div>
                <div className='center'>
                    <button onClick={handleSubmit} className='mx-2 waves-effect waves-light btn-large purple darken-4'>
                        {loading ? <Spinner size={1} button={true} /> : <i className='material-icons left'>perm_identity</i>} Sign In
                    </button>

                    <p>Not a registered user?</p>
                    <Link to='/signup'>
                        <button className='mx-2 waves-effect waves-light btn-large purple darken-4'>
                            Sign Up <i className='material-icons left'>person_add</i>
                        </button>
                    </Link>
                </div>
            </form>
        </div>
    );
};

const mapStateToProps = state => ({
    auth: state.auth
});

export default connect(mapStateToProps, { login, setError })(SignIn);
