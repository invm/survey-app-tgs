import React from 'react';

const SignIn = () => {
    const handleSubmit = e => {
        e.preventDefault();
        // Handle login attempt
    };
    return (
        <div className='row'>
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
                <button onClick={handleSubmit} className='mx-2 waves-effect waves-light btn-large purple darken-4'>
                    Sign In <i className='material-icons left'>perm_identity</i>
                </button>
            </form>
        </div>
    );
};

export default SignIn;
