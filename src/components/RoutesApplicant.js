import React from 'react';
import { Route } from 'react-router-dom';
import NavBarApp from './applicants/NavBarApp';
import ApplyExam from './applicants/ApplyExam';
import HomeApps from './HomeApps';

const RoutesApplicant = () =>{

    return (
        <div className="ui container">
            <Route path="/applicants" component={NavBarApp} />
            <Route path="/applicants" exact component={HomeApps} />
            <Route path="/applicants/applyExam/:appId" exact component={ApplyExam} />
        </div>
    )
}

export default RoutesApplicant;