import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import Spinner from '../layout/Spinner';

const Home = props => {
    const { isAuthenticated, loading } = props.auth;
    useEffect(() => {
        if (isAuthenticated) props.history.push('/dashboard');
        // eslint-disable-next-line
    }, []);
    if (loading)
        return (
            <div className='row' style={{ display: 'flex', justifyContent: 'center', marginTop: '3rem' }}>
                <Spinner color={'purple'} size={20} />
            </div>
        );
    return (
        <div className={`row mx-2 fade`}>
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
                                <button className='mx-2 waves-effect waves-light btn-large purple darken-4 '>
                                    <span>Sign In</span>
                                    <i className='material-icons left'>perm_identity</i>
                                </button>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

const mapStateToProps = state => ({
    auth: state.auth
});

export default connect(mapStateToProps, null)(Home);
