import React, { useState } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Home from './Home';
import HomeApplicants from './HomeApplicants';
import HomeOrgs from './HomeOrgs';
import NavBarOrg from './NavBarOrg';
import ExamEdit from './ExamEdit';
import ExamList from './ExamList';
import { ExaminerContext } from "../context";
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
                    <Route path="/applicants" exact component={HomeApplicants} />

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
                                ? <ExamEdit />
                                : <HomeOrgs topMessage="Please authenticate first" />
                        )}/>
                    </ExaminerContext.Provider>

                    <Route><h2>404 Not found</h2></Route>
                </Switch>
            </BrowserRouter>
        </div>
    )
}

export default App;