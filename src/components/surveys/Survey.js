import React from 'react';

const Survey = props => {
    let survey = null;
    // If pressed on from survey list, than the survey is passed down to this component
    if (props.location.survey) survey = props.location.survey;
    else {
        // If not passed from survey list,try and fetch from db the survey
    }
    // If no such survey, probably a mistake, show survey not found
    if (!survey)
        return (
            <div className='card  justify-content-center' style={flexBetweenCenter}>
                <h4 style={{ fontSize: '3rem' }}>Survey Not Found</h4>
            </div>
        );
    return (
        <div>
            <div className='card-header'>
                {' '}
                <h5>Category</h5>
            </div>
            <div className='card-body'>
                <h6>Here goes the question</h6>
                <label style={{ color: 'black' }}>
                    <input name='group1' type='radio' />
                    <span>Red</span>
                </label>
                <label style={{ color: 'black' }}>
                    <input name='group1' type='radio' />
                    <span>Yellow</span>
                </label>
            </div>
        </div>
    );
};

const flexBetweenCenter = {
    margin: '1rem',
    padding: '5rem',
    textAlign: 'center'
};

export default Survey;
