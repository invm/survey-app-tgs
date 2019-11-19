import React from 'react';
import { connect } from 'react-redux';
import Spinner from '../layout/Spinner';

const Survey = props => {
    // @todo breaks on refresh!
    const { surveys, surveyLoading } = props.survey;
    let survey = null;
    // If pressed on from survey list, than the survey is passed down to this component
    if (props.location.survey) survey = props.location.survey;
    else {
        // If not passed from survey list,try and fetch from db the survey
        survey = surveys.find(survey => survey.id === props.match.params.id);
    }

    // If no such survey, probably a mistake, show survey not found
    if (surveyLoading)
        return (
            <div className='row' style={{ display: 'flex', justifyContent: 'center', marginTop: '3rem' }}>
                <Spinner color={'purple'} size={20} />
            </div>
        );
    else if (survey) {
        const { category, name, questions, voted } = survey;
        return (
            <div className='card fade'>
                <div className='card-content'>
                    <div className='card-header'>
                        {' '}
                        <h5>{category}</h5>
                    </div>
                    <div className='card-body'>
                        <h6>{name}</h6>
                        <ul>
                            {questions.map((question, i) => (
                                <li key={question.id}>
                                    <h6>
                                        {i + 1}
                                        {': '}
                                        {question.question}
                                    </h6>
                                    <div>
                                        {question.answers.map(answer =>
                                            voted ? (
                                                <p key={answer.id}>
                                                    {answer.answer} -> {answer.count}
                                                    {' votes.'}
                                                </p>
                                            ) : (
                                                <label key={answer.id} style={{ color: 'black', marginRight: '1.5rem' }}>
                                                    <input name={`${question.id}`} type='radio' />
                                                    <span>{answer.answer}</span>
                                                </label>
                                            )
                                        )}
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div className='card-action'>
                        <button className='hoverable mx-2 waves-effect waves-light btn-large purple darken-4'>
                            Save Vote! <i className='material-icons left'>how_to_vote</i>
                        </button>
                    </div>
                </div>
            </div>
        );
    } else
        return (
            <>
                <h4>Survey Not Found</h4>
            </>
        );
};

const mapStateToProps = state => ({
    survey: state.survey
});

export default connect(mapStateToProps, null)(Survey);
