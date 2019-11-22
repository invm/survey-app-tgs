import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';

import { register } from '../../actions/authActions';
import { setError } from '../../actions/errorActions';

import Spinner from '../layout/Spinner';

const SignUp = props => {
    const { loading, error, isAuthenticated } = props.auth;
    const [user, setUser] = useState({
        fname: '',
        lname: '',
        email: '',
        password: ''
    });

    useEffect(() => {
        if (error) props.setError(error);
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
        props.register(user);
    };

    return (
        <div className='row fade' style={{ marginTop: '1rem' }}>
            <form className='col s12 m8 offset-m2'>
                <div className='row'>
                    <div className='input-field col s6'>
                        <input onChange={handleInput} value={user.fname} id='fname' type='text' className='validate' />
                        <label htmlFor='fname'>First Name</label>
                    </div>
                    <div className='input-field col s6'>
                        <input onChange={handleInput} value={user.lname} id='lname' type='text' className='validate' />
                        <label htmlFor='lname'>Last Name</label>
                    </div>
                </div>
                <div className='row'>
                    <div className='input-field col s12'>
                        <input required onChange={handleInput} value={user.email} id='email' type='email' className='validate' />
                        <label htmlFor='email'>Email</label>
                    </div>
                </div>
                <div className='row'>
                    <div className='input-field col s12'>
                        <input required onChange={handleInput} value={user.password} id='password' type='password' className='validate' />
                        <label htmlFor='password'>Password</label>
                    </div>
                </div>

                <button onClick={handleSubmit} className='mx-2 waves-effect waves-light btn-large purple darken-4'>
                    {loading ? <Spinner size={1} button={true} /> : <i className='material-icons left'>person_add</i>}
                    Sign Up
                </button>
            </form>
        </div>
    );
};

const mapStateToProps = state => ({
    auth: state.auth
});

export default connect(mapStateToProps, { register, setError })(SignUp);
