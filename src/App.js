import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import Navbar from './components/layout/Navbar';
import Home from './components/pages/Home';
import SurveyList from './components/surveys/SurveyList';
import Survey from './components/surveys/Survey';
import SignIn from './components/pages/SignIn';
import SignUp from './components/pages/SignUp';
import CreateSurvey from './components/surveys/CreateSurvey';
import Dashboard from './components/pages/Dashboard';

const App = () => {
    const surveys = [{ id: 12, category: 'Football', name: 'Who will win the ECL this season?' }, { id: 3, category: 'NBA', name: 'Who will win the NBA this season?' }, { id: 53, category: 'Elections', name: 'Who will win the elections?' }];

    return (
        <Router>
            <Navbar />
            <div className='container'>
                <Switch>
                    <Route exact path='/' component={Home} />
                    <Route exact path='/signin' component={SignIn} />
                    <Route exact path='/signup' component={SignUp} />
                    <Route exact path='/surveys' render={props => <SurveyList {...props} surveys={surveys} />} />
                    <Route exact path='/surveys/:id' component={Survey} />
                    <Route exact path='/create' component={CreateSurvey} />
                    <Route exact path='/dashboard' component={Dashboard} />
                </Switch>
            </div>
        </Router>
    );
};

export default App;
