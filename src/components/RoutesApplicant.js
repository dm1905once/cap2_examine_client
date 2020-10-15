import React from 'react';
import { Route } from 'react-router-dom';
import NavBarApp from './applicants/NavBarApp';
import TakeExam from './applicants/TakeExam';
import HomeApps from './HomeApps';

const RoutesApplicant = () =>{

    return (
        <>
            <Route path="/applicants"  component={NavBarApp} />
            <Route path="/applicants" exact component={HomeApps} />
            <Route path="/applicants/takeExam/:appId" exact component={TakeExam} />
        </>
    )
}

export default RoutesApplicant;