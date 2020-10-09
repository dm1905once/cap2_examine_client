import React, { useState } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Home from './Home';
import HomeApps from './HomeApps';
import HomeOrgs from './HomeOrgs';
import NavBarOrg from './NavBarOrg';
import ExamBuild from './ExamBuild';
import ExamEdit from './ExamEdit';
import ExamList from './ExamList';
import { ExaminerContext, ApplicantContext } from "../context";
import { getTokenFromLS } from '../helpers';

const App = () => {
    const [ authenticated, setAuthenticated ] = useState(false);
    const [ userInfo, setUserInfo ] = useState();

    React.useEffect(()=> {
        if (localStorage.getItem("_token")){
            setAuthenticated(true);
            setUserInfo(getTokenFromLS());
        } else {
            setAuthenticated(false);
            setUserInfo();
        }
      }, [authenticated]);

    function doAuthenticate(){
        setAuthenticated(true);
        setUserInfo(getTokenFromLS());
    }

    function undoAuthenticate(){
        setAuthenticated(false);
        setUserInfo();
    }

    return (
        <div className="ui container">
            <BrowserRouter>
                <Switch>
                    <Route path="/" exact component={Home} />
                    <ApplicantContext.Provider value={ { userInfo, doAuthenticate, undoAuthenticate } }>
                        <Route path="/applicants" exact component={HomeApps} />
                    </ApplicantContext.Provider>

                    <ExaminerContext.Provider value={ { userInfo, doAuthenticate, undoAuthenticate } }>
                        <NavBarOrg />
                        <Route path="/orgs" exact component={HomeOrgs} />
                        <Route path="/orgs/:examiner" exact render={()=>(
                            authenticated
                                ? <ExamList />
                                : <HomeOrgs topMessage="Please authenticate first" />
                        )}/>
                        <Route path="/orgs/:examiner/exams" exact render={()=>(
                            authenticated
                                ? <ExamList />
                                : <HomeOrgs topMessage="Please authenticate first" />
                        )}/>
                        <Route path="/orgs/:examiner/exams/new" exact render={()=>(
                            authenticated
                                ? <ExamBuild />
                                : <HomeOrgs topMessage="Please authenticate first" />
                        )}/>
                        <Route path="/orgs/:examiner/exams/:examId/edit/:seq" component={
                            authenticated? ExamEdit: HomeOrgs
                        } />

                    </ExaminerContext.Provider>

                    <Route><h2>404 Not found</h2></Route>
                </Switch>
            </BrowserRouter>
        </div>
    )
}

export default App;