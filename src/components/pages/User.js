import React, { useEffect } from 'react';
import { connect } from 'react-redux';

const User = ({ location, history, auth }) => {
    const { isAuthenticated, admin } = auth;
    let { action } = location || null;
    useEffect(() => {
        if (!action || !isAuthenticated || admin) history.push('/dashboard');
        //eslint-disable-next-line
    }, [isAuthenticated, admin]);
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

const mapStateToProps = state => ({
    auth: state.auth
});
export default connect(mapStateToProps, null)(User);
