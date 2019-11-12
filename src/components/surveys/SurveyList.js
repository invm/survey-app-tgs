import React from 'react';
import SurveySummary from './SurveySummary';

const SurveyList = ({ surveys }) => {
    return (
        <div className='card' style={{ padding: '0.5rem' }}>
            {surveys.map(survey => (
                <SurveySummary survey={survey} key={survey.id} />
            ))}
        </div>
    );
};

export default SurveyList;
