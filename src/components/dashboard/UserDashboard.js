import React from 'react';
import { Link } from 'react-router-dom';

const UserDashboard = () => {
    const username = 'Michael';
    return (
        <div className='card'>
            <div className='row'>
                <div className='col s6'>
                    <h4>Welcome {username}</h4>
                </div>
                <div className='col s3 offset-s3'>
                    <h4>Role :Voter</h4>
                </div>
            </div>
            <div className='row'>
                <div className='col s12 center'>
                    <h5>What would you like to do?</h5>
                </div>
            </div>
            <div className='row'>
                <div className='col s12'>
                    <h5>Surveys</h5>
                    <div style={{ marginLeft: '2rem' }}>
                        <Link className='black-text'>
                            <p>Available Surveys</p>
                        </Link>
                        <Link className='black-text'>
                            <p>Completed Surveys</p>
                        </Link>
                        <Link className='black-text'>
                            <p>Coupon Awards</p>
                        </Link>
                    </div>
                </div>
            </div>
            <div className='row'>
                <div className='col s12'>
                    <h5>User Info</h5>
                    <div style={{ marginLeft: '2rem' }}>
                        <Link className='black-text'>
                            <p>Edit User Info</p>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UserDashboard;
