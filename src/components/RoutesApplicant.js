import React from 'react';
import { Route } from 'react-router-dom';
import HomeApps from './HomeApps';

const RoutesApplicant = () =>{

    return (
        <Route path="/applicants" exact component={HomeApps} />
    )
}

export default RoutesApplicant;