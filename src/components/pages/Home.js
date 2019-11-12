import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
    return (
        <div className='row mx-2'>
            <div className='col s12 center container '>
                <div className='card-panel '>
                    <div className='purple-text text-darken-4 '>
                        <h4>Sign in or Sign up to vote!</h4>
                        <div className='row'>
                            <Link to='/signup'>
                                <button className='mx-2 waves-effect waves-light btn-large purple darken-4'>
                                    Sign Up <i className='material-icons left'>person_add</i>
                                </button>
                            </Link>
                        </div>
                        <div className='row'>
                            <Link to='/signin'>
                                <button className='mx-2 waves-effect waves-light btn-large purple darken-4'>
                                    Sign In <i className='material-icons left'>perm_identity</i>
                                </button>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Home;
