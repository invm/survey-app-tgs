import React, { useEffect, useState } from 'react';
import SurveySummary from './SurveySummary';
import Spinner from '../layout/Spinner';
import { connect } from 'react-redux';
import { fetchSurveys } from '../../actions/surveyActions';
import { setError } from '../../actions/errorActions';

const SurveyList = props => {
    const { surveys, surveyLoading, error } = props.survey;
    let completedSurveys = props.auth.user.completedSurveys || [];
    const { categories } = props.survey;
    const [category, setCategory] = useState('All Surveys');
    useEffect(() => {
        if (error) setError(error);
        //eslint-disable-next-line
    }, [props.auth]);

    const handleCategoryChange = e => {
        let el = document.getElementById('category');
        setCategory(el.options[el.selectedIndex].value);
    };

    if (surveyLoading)
        return (
            <div className='row' style={{ display: 'flex', justifyContent: 'center', marginTop: '3rem' }}>
                <Spinner color={'purple'} size={20} />
            </div>
        );
    return (
        <div className='card fade' style={{ padding: '0.5rem' }}>
            <div className='row center'>
                <h4>Available Surveys</h4>
                <span>Filter by category:</span>
                <select className='browser-default col' id='category' onChange={handleCategoryChange} value={category}>
                    <option value={'All Surveys'}>All Surveys</option>

                    {categories.map(category => (
                        <option key={category.id} value={category.name}>
                            {category.name}
                        </option>
                    ))}
                </select>
            </div>
            {surveys
                .filter(survey => {
                    if (category === 'All Surveys') {
                        return true;
                    }
                    return survey.category === category;
                })
                .filter(survey => !completedSurveys.includes(survey.id))
                .map(survey => (
                    <SurveySummary survey={survey} key={survey.id} />
                ))}
        </div>
    );
};

const mapStateToProps = state => ({
    survey: state.survey,
    auth: state.auth
});
export default connect(mapStateToProps, { fetchSurveys })(SurveyList);
