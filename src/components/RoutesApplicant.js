import React from 'react';
import { Route } from 'react-router-dom';
import NavBarApp from './applicants/NavBarApp';
import HomeApps from './HomeApps';

const RoutesApplicant = () =>{

    return (
        <>
            <Route path="/applicants"  component={NavBarApp} />
            <Route path="/applicants" exact component={HomeApps} />
        </>
    )
}

export default RoutesApplicant;