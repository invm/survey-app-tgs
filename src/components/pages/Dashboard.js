import React from 'react';
import { Link } from 'react-router-dom';

const Dashboard = ({ history }) => {
    const role = 'admin';
    const isAuthenticated = true;
    let user = { name: 'Admin' };
    if (role !== 'admin') user = { name: 'Michael' };

    if (!isAuthenticated) history.push('/');

    const userLinks = (
        <>
            <div className='row'>
                <div className='col s12'>
                    <h5>Surveys</h5>
                    <div style={{ marginLeft: '2rem' }}>
                        <Link to='/surveys' className='black-text'>
                            <p>Available Surveys</p>
                        </Link>
                        <Link to={{ pathname: '/user', action: 'view-completed' }} className='black-text'>
                            <p>Completed Surveys</p>
                        </Link>
                        <Link to={{ pathname: '/user', action: 'view-coupons' }} className='black-text'>
                            <p>Coupon Awards</p>
                        </Link>
                    </div>
                </div>
            </div>
            <div className='row'>
                <div className='col s12'>
                    <h5>User Info</h5>
                    <div style={{ marginLeft: '2rem' }}>
                        <Link to={{ pathname: '/user', action: 'edit-user' }} className='black-text'>
                            <p>Edit User Info</p>
                        </Link>
                    </div>
                </div>
            </div>
        </>
    );

    const adminLinks = (
        <>
            <div className='row'>
                <div className='col s12'>
                    <h5>Surveys</h5>
                    <div style={{ marginLeft: '2rem' }}>
                        <Link to='/create' className='black-text'>
                            <p>Create New Survey</p>
                        </Link>
                        <Link to={{ pathname: '/admin', action: 'edit-survey' }} className='black-text'>
                            <p>Edit Survey</p>
                        </Link>
                        <Link to={{ pathname: '/admin', action: 'delete-survey' }} className='black-text'>
                            <p>Delete Survey</p>
                        </Link>
                    </div>
                </div>
            </div>
            <div className='row'>
                <div className='col s12'>
                    <h5>User Info</h5>
                    <div style={{ marginLeft: '2rem' }}>
                        <Link to={{ pathname: '/admin', action: 'edit-user' }} className='black-text'>
                            <p>Edit User Info</p>
                        </Link>
                        <Link to={{ pathname: '/admin', action: 'view-users' }} className='black-text'>
                            <p>View All Users</p>
                        </Link>
                    </div>
                </div>
            </div>
            <div className='row'>
                <div className='col s12'>
                    <h5>Categories</h5>
                    <div style={{ marginLeft: '2rem' }}>
                        <Link to={{ pathname: '/admin', action: 'add-category' }} className='black-text'>
                            <p>Add New Category</p>
                        </Link>
                        <Link to={{ pathname: '/admin', action: 'view-categories' }} className='black-text'>
                            <p>View All Categories</p>
                        </Link>
                    </div>
                </div>
            </div>
        </>
    );
    return (
        <div className='card fade'>
            <div className='row'>
                <div className='col s6'>
                    <h5>Welcome {user.name}</h5>
                </div>
                <div className='col s4 offset-s2 center'>
                    <h5>Role: {role === 'admin' ? 'Admin' : 'Voter'}</h5>
                </div>
            </div>
            <div className='row'>
                <div className='col s12 center'>
                    <h5>What would you like to do?</h5>
                </div>
            </div>
            {role === 'admin' ? adminLinks : userLinks}
        </div>
    );
};

export default Dashboard;
