import React from 'react';
import { connect } from 'react-redux';

const Admin = ({ location, history, surveys }) => {
    const role = 'admin';
    const isAuthenticated = true;
    const isAdmin = role === 'admin' ? true : false;

    if (!isAuthenticated || !isAdmin) history.push('/');

    // If not action have been passed via link, push back to dashboard
    if (!location.action) history.push('/dashboard');

    let action;
    switch (location.action) {
        case 'edit-survey':
            action = (
                <div>
                    {location.action}
                    {surveys.map(survey => (
                        <p key={survey.id}>
                            Category: {survey.category}, Survey Topic: {survey.name}
                        </p>
                    ))}
                </div>
            );
            break;
        case 'delete-survey':
            action = <div>{location.action}</div>;
            break;
        case 'edit-user':
            action = <div>{location.action}</div>;
            break;
        case 'view-users':
            action = <div>{location.action}</div>;
            break;
        case 'add-category':
            action = <div>{location.action}</div>;
            break;
        case 'view-categories':
            action = <div>{location.action}</div>;
            break;
        default:
            return <></>;
    }

    return <div className='card fade center'>{action}</div>;
};

const mapStateToProps = state => ({
    surveys: state.survey.surveys
});

export default connect(mapStateToProps, null)(Admin);
