import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import ExamEdit from './ExamEdit';
import ExamList from './ExamList';

const App = () => {
    return (
        <div className="ui container">
            <BrowserRouter>
                <Route path="/" exact component={ExamList} />
                <Route path="/exams" exact component={ExamList} />
                <Route path="/exams/new" exact component={ExamEdit} />
            </BrowserRouter>
        </div>
    )
}

export default App;