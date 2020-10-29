import React from 'react';
import { Route } from 'react-router-dom';
import HomeOrgs from './HomeOrgs';
import NavBarOrg from './NavBarOrg';
import ExamBuild from './examiners/ExamBuild';
import ExamEdit from './examiners/ExamEdit';
import ExamList from './examiners/ExamList';
import { AuthContext } from "../context";


const RoutesExaminer = () =>{

    const { isExaminerAuth } = React.useContext(AuthContext);

    return (
        <div className="ui container">
            <Route path="/orgs"  component={NavBarOrg} />
            <Route path="/orgs" exact component={HomeOrgs} />
            <Route path="/orgs/:examiner" exact render={()=>(
                isExaminerAuth
                    ? <ExamList />
                    : <HomeOrgs topMessage="Please authenticate first" />
            )}/>
            <Route path="/orgs/:examiner/exams" exact render={()=>(
                isExaminerAuth
                    ? <ExamList />
                    : <HomeOrgs topMessage="Please authenticate first" />
            )}/>
            <Route path="/orgs/:examiner/exams/new" exact render={()=>(
                isExaminerAuth
                    ? <ExamBuild />
                    : <HomeOrgs topMessage="Please authenticate first" />
            )}/>
            <Route path="/orgs/:examiner/exams/:examId/edit/:seq" component={
                isExaminerAuth? ExamEdit: HomeOrgs
            } />
        </div>
    )
}

export default RoutesExaminer;