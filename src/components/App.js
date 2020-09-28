import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Home from './Home';
import HomeApplicants from './HomeApplicants';
import HomeOrgs from './HomeOrgs';
import ExamEdit from './ExamEdit';
import ExamList from './ExamList';

const App = () => {
    return (
        <div className="ui container">
            <BrowserRouter>
                <Switch>
                    <Route path="/" exact component={Home} />
                    <Route path="/applicants" exact component={HomeApplicants} />
                    <Route path="/orgs" exact component={HomeOrgs} />
                    <Route path="/exams" exact component={ExamList} />
                    <Route path="/exams/new" exact component={ExamEdit} />
                    <Route><h2>404 Not found</h2></Route>
                </Switch>
            </BrowserRouter>
        </div>
    )
}

export default App;