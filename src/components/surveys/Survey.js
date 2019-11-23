import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import Spinner from '../layout/Spinner';
import { castVote } from '../../actions/surveyActions';
import { setError } from '../../actions/errorActions';

const Survey = props => {
    const { surveys, surveyLoading, error } = props.survey;
    const { user, isAuthenticated, admin } = props.auth;
    const [answers, setAnswers] = useState({});
    let survey = null;
    // If pressed on from survey list, than the survey is passed down to this component
    if (props.location.survey) survey = props.location.survey;
    else {
        // If not passed from survey list,try and fetch from db the survey
        survey = surveys.find(survey => survey.id === props.match.params.id);
    }

    useEffect(() => {
        if (error) props.setError(error);
        //eslint-disable-next-line
    }, [error]);

    const handleVote = () => {
        // check than all answers are checked before attempting to cast vote
        if (Object.keys(answers).length < survey.questions.length) props.setError('Please fill all answers');
        else {
            props.castVote(survey.id, answers);
            setAnswers({});
        }
    };

    const handleAnswers = e => {
        const q = e.target.id.substring(1, 2);
        const a = Number(e.target.id.slice(3));
        setAnswers({
            ...answers,
            [q]: a
        });
    };

    // If no such survey, probably a mistake, show survey not found
    if (surveyLoading)
        return (
            <div className='row' style={{ display: 'flex', justifyContent: 'center', marginTop: '3rem' }}>
                <Spinner color={'purple'} size={20} />
            </div>
        );
    else if (survey) {
        // if such survey exists, fetch again from redux for most up-to-date data
        survey = surveys.find(survey => survey.id === props.match.params.id);
        const { category, name, questions, id } = survey;
        let voted = admin ? true : user.completedSurveys.includes(id);
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
                                        {question.answers.map((answer, index) =>
                                            voted || !isAuthenticated ? (
                                                <p key={answer.id}>
                                                    {answer.answer} -> {answer.count}
                                                    {' votes.'}
                                                </p>
                                            ) : (
                                                <label key={answer.id} style={{ color: 'black', marginRight: '1.5rem' }}>
                                                    <input onChange={handleAnswers} name={`q${i}`} type='radio' id={`q${i}a${index}`} />
                                                    <span>{answer.answer}</span>
                                                </label>
                                            )
                                        )}
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </div>
                    {isAuthenticated && !voted && (
                        <div className='card-action'>
                            <button onClick={handleVote} className='hoverable mx-2 waves-effect waves-light btn-large purple darken-4'>
                                Save Vote! <i className='material-icons left'>how_to_vote</i>
                            </button>
                        </div>
                    )}
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
    survey: state.survey,
    auth: state.auth
});

export default connect(mapStateToProps, { castVote, setError })(Survey);
