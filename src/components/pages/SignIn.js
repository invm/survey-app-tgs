import React from 'react';
import { Link } from 'react-router-dom';

const SignIn = () => {
    const handleSubmit = e => {
        e.preventDefault();
        // Handle login attempt
    };
    return (
        <div className='row fade'>
            <form className='col s12'>
                <div className='row'>
                    <div className='input-field col s12'>
                        <input id='email' type='email' className='validate' />
                        <label htmlFor='email'>Email</label>
                    </div>
                </div>
                <div className='row'>
                    <div className='input-field col s12'>
                        <input id='password' type='password' className='validate' />
                        <label htmlFor='password'>Password</label>
                    </div>
                </div>
                <div className='center'>
                    <button onClick={handleSubmit} className='mx-2 waves-effect waves-light btn-large purple darken-4'>
                        Sign In <i className='material-icons left'>perm_identity</i>
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

export default SignIn;
