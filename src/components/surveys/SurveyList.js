import React from 'react';
import SurveySummary from './SurveySummary';
import { connect } from 'react-redux';

const SurveyList = ({ surveys }) => {
    return (
        <div className='card fade' style={{ padding: '0.5rem' }}>
            {surveys.map(survey => (
                <SurveySummary survey={survey} key={survey.id} />
            ))}
        </div>
    );
};

const mapStateToProps = state => ({
    surveys: state.survey.surveys
});
export default connect(mapStateToProps, null)(SurveyList);
