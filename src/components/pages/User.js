import React from 'react';

const User = ({ location, history }) => {
    if (!location.action) history.push('/dashboard');
    let action;
    switch (location.action) {
        case 'view-completed':
            action = <div>{location.action}</div>;
            break;
        case 'view-coupons':
            action = <div>{location.action}</div>;
            break;
        case 'edit-user':
            action = <div>{location.action}</div>;
            break;
        default:
            return <></>;
    }

    return <div className='card fade center'>{action}</div>;
};

export default User;
