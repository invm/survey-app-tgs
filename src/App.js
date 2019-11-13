import React from 'react';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';

import Navbar from './components/layout/Navbar';
import Dashboard from './components/pages/Dashboard';
import Home from './components/pages/Home';
import SignIn from './components/pages/SignIn';
import SignUp from './components/pages/SignUp';
import CreateSurvey from './components/surveys/CreateSurvey';
import Survey from './components/surveys/Survey';
import SurveyList from './components/surveys/SurveyList';
import Admin from './components/pages/Admin';
import User from './components/pages/User';

const App = () => {
    return (
        <Router>
            <Navbar />
            <div className='container '>
                <Switch>
                    <Route exact path='/' component={Home} />
                    <Route exact path='/signin' component={SignIn} />
                    <Route exact path='/signup' component={SignUp} />
                    <Route exact path='/admin' component={Admin} />} />
                    <Route exact path='/user' component={User} />
                    <Route exact path='/surveys' render={props => <SurveyList {...props} />} />
                    <Route exact path='/surveys/:id' component={Survey} />
                    <Route exact path='/create' render={props => <CreateSurvey {...props} />} />
                    <Route exact path='/dashboard' component={Dashboard} />
                    <Route render={() => <Redirect to='/' />} />
                </Switch>
            </div>
        </Router>
    );
};

export default App;
