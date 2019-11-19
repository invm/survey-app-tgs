import React, { useEffect } from 'react';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import Navbar from './components/layout/Navbar';
import Dashboard from './components/pages/Dashboard';
import Home from './components/pages/Home';
import SignIn from './components/pages/SignIn';
import SignUp from './components/pages/SignUp';
import MakeSurvey from './components/surveys/MakeSurvey';
import Survey from './components/surveys/Survey';
import SurveyList from './components/surveys/SurveyList';
import Admin from './components/pages/Admin';
import User from './components/pages/User';
import ErrorCard from './components/layout/ErrorCard';

import { fetchCategories, fetchSurveys } from './actions/surveyActions';

const App = props => {
    useEffect(() => {
        props.fetchSurveys();
        props.fetchCategories();
        //eslint-disable-next-line
    }, []);
    return (
        <Router>
            <Navbar />
            <ErrorCard />
            <div className='container '>
                <Switch>
                    <Route exact path='/' component={Home} />
                    <Route exact path='/signin' component={SignIn} />
                    <Route exact path='/signup' component={SignUp} />
                    <Route exact path='/admin' component={Admin} /> />
                    <Route exact path='/user' component={User} />
                    <Route exact path='/surveyslist' render={props => <SurveyList {...props} />} />
                    <Route exact path='/surveys/:id' render={props => <Survey {...props} />} />
                    <Route exact path='/survey' component={MakeSurvey} />
                    <Route exact path='/dashboard' component={Dashboard} />
                    <Route render={() => <Redirect to='/' />} />
                </Switch>
            </div>
        </Router>
    );
};

export default connect(null, { fetchSurveys, fetchCategories })(App);
