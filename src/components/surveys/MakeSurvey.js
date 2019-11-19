// This is a monolith component that does handles survey creation and edition
import React, { useState, useEffect } from 'react';
import uuid from 'uuid';
import { connect } from 'react-redux';
import { createSurvey, editSurvey, addCategory } from '../../actions/surveyActions';
import { setError } from '../../actions/errorActions';
import Spinner from '../layout/Spinner';
import { Redirect } from 'react-router-dom';

const MakeSurvey = props => {
    const { error, surveyLoading, surveys } = props.survey;
    const { isAuthenticated, role, loading } = props.auth;
    const [survey, setSurvey] = useState({
        id: uuid.v4(),
        category: 'Sports',
        name: '',
        questions: []
    });
    // Used to edit surveys
    let edit = props.location.action || null;
    const surveyToEdit = edit ? props.location.survey : null;
    useEffect(() => {
        if (error) props.setError(error);
        if (!isAuthenticated && role !== 'admin') props.history.push('/');
        // If there is survey to edit than load, if came from store than fill all fields
        if (edit && surveyToEdit) {
            const survey = props.survey.surveys.find(survey => survey.id === surveyToEdit);
            setSurvey({ ...survey });
            // Saved in order to compare after edition
            // eslint-disable-next-line
            edit = survey;
            (function() {
                var list = document.getElementsByTagName('label');
                for (let item of list) {
                    item.className = 'active';
                }
            })();
        }
        // eslint-disable-next-line
    }, [error]);

    const [addNewCatInput, setAddNewCatInput] = useState(false); // Switch 'new category input display
    const [currentQuestion, setCurrentQuestion] = useState({
        id: uuid.v4(),
        new: true,
        question: '',
        answers: [
            { id: 0, answer: '', count: 0 },
            { id: 1, answer: '', count: 0 },
            { id: 2, answer: '', count: 0 },
            { id: 3, answer: '', count: 0 }
        ]
    });
    const [newCat, setNewCat] = useState('');
    const categories = props.survey.categories;

    const handleSelect = e => {
        // Sets category to selected option or adds block to add new categories
        let el = document.getElementById('category');
        if (el.options[el.selectedIndex].value === 'Add new category...') {
            setAddNewCatInput(true);
        } else {
            setAddNewCatInput(false);
            setSurvey({
                ...survey,
                [e.target.id]: e.target.value
            });
        }
    };

    const handleNewCat = e => {
        e.preventDefault();
        // Add new category, select it as default and clear inputs
        if (newCat !== '') {
            props.addCategory(newCat);
            setSurvey({ ...survey, category: newCat });
            setNewCat('');
            setAddNewCatInput(false);
        } else {
            setNewCat('');
            setAddNewCatInput(false);
        }
    };

    const handleAnswerChange = e => {
        const id = Number(e.target.id[e.target.id.length - 1]);
        setCurrentQuestion({
            ...currentQuestion,
            answers: currentQuestion.answers.map(answer => {
                if (answer.id === id) {
                    answer.answer = e.target.value;
                    return answer;
                }
                return answer;
            })
        });
    };

    const handleNewQuestion = e => {
        e.preventDefault();
        // If the question is filled and all answers are field than save the question
        if (currentQuestion.question !== '' && currentQuestion.answers.filter(answer => answer.answer !== '').length === 4) {
            delete currentQuestion.new;
            setSurvey({
                ...survey,
                questions: [...survey.questions, currentQuestion]
            });
            setCurrentQuestion({
                id: uuid.v4(),
                new: true,
                question: '',
                answers: [
                    { id: 0, answer: '', count: 0 },
                    { id: 1, answer: '', count: 0 },
                    { id: 2, answer: '', count: 0 },
                    { id: 3, answer: '', count: 0 }
                ]
            });
        }
    };

    const handleEditQuestion = question => {
        setCurrentQuestion({
            ...question,
            new: false,
            id: question.id
        });
    };
    const handleSaveEditedQuestion = id => {
        setSurvey({
            ...survey,
            questions: [
                ...survey.questions.map(question => {
                    if (question.id === id) {
                        return currentQuestion;
                    }
                    return question;
                })
            ]
        });
        setCurrentQuestion({
            id: uuid.v4(),
            new: true,
            question: '',
            answers: [
                { id: 0, answer: '', count: 0 },
                { id: 1, answer: '', count: 0 },
                { id: 2, answer: '', count: 0 },
                { id: 3, answer: '', count: 0 }
            ]
        });
    };

    const handleDeleteQuestion = question => {
        const id = question.id;
        setSurvey({
            ...survey,
            questions: survey.questions.filter(question => question.id !== id)
        });
    };

    const handleCreateSurvey = async e => {
        e.preventDefault();
        if (edit) {
            await props.editSurvey(survey);
            if (JSON.stringify(edit) !== JSON.stringify(survey)) setTimeout(() => props.history.push(`/surveys/${survey.id}`), 1000);
        } else {
            let len = surveys.length;
            await props.createSurvey(survey);
            // If added new surveys, force push after addition
            if (len < surveys.length) props.history.push('/surveys');
            // If edited survey, force push after comparison
        }
    };
    if (loading)
        return (
            <div className='row' style={{ display: 'flex', justifyContent: 'center', marginTop: '3rem' }}>
                <Spinner color={'purple'} size={20} />
            </div>
        );
    else if (!isAuthenticated) return <Redirect to='/' />;
    else
        return (
            <div className='card fade'>
                <h4 className='center' style={{ paddingTop: '2rem' }}>
                    {edit ? 'Edit Survey' : 'Create new survey'}
                </h4>
                <form className='col s12' style={{ padding: '2rem' }}>
                    <div className='row'>
                        <div className='input-field col s12'>
                            <p>Category</p>
                            <div className='valign-wrapper row'>
                                <select id='category' onChange={handleSelect} className='browser-default col' value={survey.category}>
                                    {categories.map((category, index) => (
                                        <option key={category.id} value={category.name}>
                                            {category.name}
                                        </option>
                                    ))}
                                    <option value='Add new category...'>Add new category...</option>
                                </select>
                                {addNewCatInput ? (
                                    <>
                                        <div className=' input-field col'>
                                            <input id='new_cat' type='text' className='validate' onChange={e => setNewCat(e.target.value)} value={newCat} />
                                            <label htmlFor='new_cat'>New Category</label>
                                            <button onClick={handleNewCat} className='mx-2 waves-effect waves-light btn-large purple darken-4'>
                                                <i className='material-icons left'>add_circle</i> Add
                                            </button>
                                        </div>
                                    </>
                                ) : null}
                            </div>
                        </div>
                    </div>
                    <div className='row'>
                        <div className='input-field col s12'>
                            <input onChange={e => setSurvey({ ...survey, [e.target.id]: e.target.value })} value={survey.name} id='name' type='text' className='validate' />
                            <label htmlFor='name'>Survey Name</label>
                        </div>
                    </div>
                    <div className='row'>
                        <div className='input-field col s12'>
                            <input
                                onChange={e =>
                                    setCurrentQuestion({
                                        ...currentQuestion,
                                        question: e.target.value
                                    })
                                }
                                id='question'
                                type='text'
                                value={currentQuestion.question}
                                className='validate'
                            />
                            <label htmlFor='question'>Enter Question</label>
                        </div>
                    </div>
                    <div className='row'>
                        {currentQuestion.answers.map(answer => (
                            <span key={answer.id} className='input-field col s3'>
                                <input id={`answer-${answer.id}`} type='text' value={answer.answer} className='validate' onChange={handleAnswerChange} />
                                <label htmlFor={`answer-${answer.id}`}>Option #{`${answer.id + 1}`}</label>
                            </span>
                        ))}
                    </div>
                    <div className='row'>
                        {currentQuestion.new ? (
                            <button onClick={handleNewQuestion} className='col s3 mx-2 waves-effect waves-light btn-large purple darken-4'>
                                Add Question
                            </button>
                        ) : (
                            <button
                                onClick={e => {
                                    e.preventDefault();
                                    handleSaveEditedQuestion(currentQuestion.id);
                                }}
                                className='col s3 mx-2 waves-effect waves-light btn-large purple darken-4'
                            >
                                Edit Question
                            </button>
                        )}
                    </div>
                    {survey.questions.map((question, i) => (
                        <div key={question.id} className=' card hoverable ' style={{ padding: '0.25rem' }}>
                            {' '}
                            <div
                                className='valign-wrapper'
                                style={{
                                    marginLeft: '0.5rem',
                                    marginRight: '0.5rem',
                                    display: 'flex',
                                    justifyContent: 'space-between'
                                }}
                            >
                                <h6>
                                    Question #{i + 1}: {question.question}
                                </h6>
                                <div>
                                    <button
                                        style={{ marginRight: '1rem' }}
                                        onClick={e => {
                                            e.preventDefault();
                                            handleEditQuestion(question);
                                        }}
                                        className='   mx-2 waves-effect waves-light btn-large purple darken-4 '
                                    >
                                        Edit
                                    </button>
                                    <button
                                        onClick={e => {
                                            e.preventDefault();
                                            handleDeleteQuestion(question);
                                        }}
                                        className='   mx-2 waves-effect waves-light btn-large purple darken-4'
                                    >
                                        Delete
                                    </button>
                                </div>
                            </div>
                            <div className='row'>
                                <div className='col s12'>
                                    <h6>Answers:</h6>
                                </div>
                            </div>
                            <div className='row '>
                                {question.answers.map(answer => (
                                    <span className='col s3 center' key={answer.id}>
                                        {answer.answer}
                                    </span>
                                ))}
                            </div>
                        </div>
                    ))}
                    <button onClick={handleCreateSurvey} className='mx-2 waves-effect waves-light btn-large purple darken-4'>
                        {surveyLoading ? <Spinner size={1} button={true} /> : <i className='material-icons left'> assignment</i>}
                        {edit ? 'Save' : 'Create'} Survey
                    </button>
                </form>
            </div>
        );
};

const mapStateToProps = state => ({
    survey: state.survey,
    auth: state.auth
});

export default connect(mapStateToProps, { createSurvey, editSurvey, addCategory, setError })(MakeSurvey);
