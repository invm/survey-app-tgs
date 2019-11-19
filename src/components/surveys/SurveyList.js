import React, { useEffect } from 'react';
import SurveySummary from './SurveySummary';
import Spinner from '../layout/Spinner';
import { connect } from 'react-redux';
import { fetchSurveys } from '../../actions/surveyActions';
import { setError } from '../../actions/errorActions';

const SurveyList = props => {
    const { surveys, surveyLoading, error } = props.survey;
    useEffect(() => {
        if (error) setError(error);
        //eslint-disable-next-line
    }, []);
    if (surveyLoading)
        return (
            <div className='row' style={{ display: 'flex', justifyContent: 'center', marginTop: '3rem' }}>
                <Spinner color={'purple'} size={20} />
            </div>
        );
    console.log(surveys);
    return (
        <div className='card fade' style={{ padding: '0.5rem' }}>
            {surveys.map(survey => (
                <SurveySummary survey={survey} key={survey.id} />
            ))}
        </div>
    );
};

const mapStateToProps = state => ({
    survey: state.survey
});
export default connect(mapStateToProps, { fetchSurveys })(SurveyList);
