import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import Spinner from '../layout/Spinner';
import { Link } from 'react-router-dom';
import { addCategory, deleteSurvey, deleteCategory } from '../../actions/surveyActions';
import { setError } from '../../actions/errorActions';

const Admin = props => {
    const { location, history, survey } = props;
    const surveyLoading = survey.surveyLoading;
    const error = survey.error;
    const role = 'admin';
    const isAuthenticated = true;
    const isAdmin = role === 'admin' ? true : false;
    const [newCat, setNewCat] = useState('');
    if (!isAuthenticated || !isAdmin) history.push('/');

    // If not action have been passed via link, push back to dashboard
    if (!location.action) history.push('/dashboard');

    useEffect(() => {
        if (error) props.setError(error);
        //eslint-disable-next-line
    }, [error]);

    const handleNewCat = e => {
        e.preventDefault();

        if (newCat !== '' && !survey.categories.includes(newCat)) {
            props.addCategory(newCat);
            setNewCat('');
        } else if (survey.categories.includes(newCat)) {
            setNewCat('');
            // @todo dispatch an error
        }
    };

    const handleDeleteSurvey = id => props.deleteSurvey(id);

    const handleCategoryRemove = id => props.deleteCategory(id);

    let action;
    switch (location.action) {
        case 'edit-survey':
            action = (
                <div>
                    {survey.surveys.map(survey => (
                        <p style={{ padding: '2rem' }} key={survey.id}>
                            <span style={{ margin: '1rem' }}>
                                <strong>Category: </strong>
                                {survey.category}, <strong>Survey Topic: </strong>
                                {survey.name}
                            </span>
                            <Link to={{ pathname: '/survey', action: 'edit-survey', survey: survey.id }} className='black-text'>
                                <button className='mx-2 waves-effect waves-light btn-large purple darken-4'>
                                    Edit Survey <i className='material-icons left'>autorenew</i>
                                </button>
                            </Link>
                        </p>
                    ))}
                </div>
            );
            break;
        case 'delete-survey':
            action = (
                <div>
                    {survey.surveys.map(survey => (
                        <p style={{ padding: '2rem' }} key={survey.id}>
                            <span style={{ margin: '1rem' }}>
                                <strong>Category: </strong>
                                {survey.category}, <strong>Survey Topic: </strong>
                                {survey.name}
                            </span>
                            <button onClick={e => handleDeleteSurvey(survey.id)} className='mx-2 waves-effect waves-light btn-large purple darken-4'>
                                <i className='material-icons left'>remove_circle_outline</i> Delete Survey
                            </button>
                        </p>
                    ))}
                </div>
            );
            break;
        case 'edit-user':
            action = <div>{location.action}</div>;
            break;
        case 'view-users':
            action = <div>{location.action}</div>;
            break;
        case 'add-category':
            action = (
                <div className='fade' style={{ padding: '1rem' }}>
                    <h4>Add New Category</h4>
                    <div className=' input-field col'>
                        <input id='new_cat' type='text' className='validate' onChange={e => setNewCat(e.target.value)} value={newCat} />
                        <label htmlFor='new_cat'>New Category</label>
                        <button onClick={handleNewCat} className='mx-2 waves-effect waves-light btn-large purple darken-4'>
                            <i className='material-icons left'>add_circle</i> Add
                        </button>
                        {survey.categories.map(({ name, id }) => (
                            <p key={id}>{name}</p>
                        ))}
                        <Link to={{ pathname: '/admin', action: 'view-categories' }} className='black-text'>
                            <button className='mx-2 waves-effect waves-light btn-large purple darken-4'>View All Categories</button>
                        </Link>
                    </div>
                </div>
            );
            break;
        case 'view-categories':
            action = (
                <div className='fade' style={{ paddingBottom: '1rem' }}>
                    <h4>List of all categories:</h4>
                    {surveyLoading && (
                        <div className='row' style={{ display: 'flex', justifyContent: 'center', marginTop: '1rem' }}>
                            <Spinner color={'purple'} size={5} />
                        </div>
                    )}
                    {survey.categories.map(({ name, id }) => (
                        <div className='row' key={id}>
                            <span className='col s8 '>
                                {name}{' '}
                                <button
                                    onClick={e => {
                                        e.preventDefault();
                                        handleCategoryRemove(id);
                                    }}
                                    className='mx-1 waves-effect waves-light btn-small purple darken-4'
                                >
                                    Remove <i className='material-icons left'>remove_circle_outline</i>
                                </button>
                            </span>
                        </div>
                    ))}

                    <Link to={{ pathname: '/admin', action: 'add-category' }} className='black-text'>
                        <button className='mx-2 waves-effect waves-light btn-large purple darken-4'>
                            Add New Category <i className='material-icons left'>add_circle</i>
                        </button>
                    </Link>
                </div>
            );
            break;
        default:
            return <></>;
    }
    if (surveyLoading)
        return (
            <div className='row' style={{ display: 'flex', justifyContent: 'center', marginTop: '3rem' }}>
                <Spinner color={'purple'} size={20} />
            </div>
        );

    return <div className='card center'>{action}</div>;
};

const mapStateToProps = state => ({
    survey: state.survey
});

export default connect(mapStateToProps, { addCategory, deleteSurvey, setError, deleteCategory })(Admin);
