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
    const [ examinerAuthenticated, setExaminerAuthenticated ] = useState(false);
    const [ userInfo, setUserInfo ] = useState('');

    React.useEffect(()=>{
        setUserInfo(getTokenFromLS("_token"));
        console.log("cargue");
    })

    React.useEffect(()=> {
        if (localStorage.getItem("_token")){
            setExaminerAuthenticated(true);
        } else {
            setExaminerAuthenticated(false);
        }
      }, [examinerAuthenticated]);

    function doAuthenticateExaminer(values){
        setExaminerAuthenticated(true);
        // setExaminerInfo(values);
    }

    function undoAuthenticateExaminer(){
        setExaminerAuthenticated(false);
        // setExaminerInfo('');
    }



    return (
        <div className="ui container">
            <BrowserRouter>
                <Switch>
                    <Route path="/" exact component={Home} />
                    <Route path="/applicants" exact component={HomeApplicants} />

                    <ExaminerContext.Provider value={ { userInfo } }>
                        <NavBarOrg />
                        <Route path="/orgs" exact component={HomeOrgs} />
                        <Route path="/orgs/:examiner" exact render={()=>(
                            userInfo
                                ? <ExamList />
                                : <HomeOrgs topMessage="Please authenticate first" />
                        )}/>
                        <Route path="/orgs/:examiner/exams" exact render={()=>(
                            userInfo
                                ? <ExamList />
                                : <HomeOrgs topMessage="Please authenticate first" />
                        )}/>
                        <Route path="/orgs/:examiner/exams/new" exact render={()=>(
                            userInfo
                                ? <ExamEdit />
                                : <HomeOrgs topMessage="Please authenticate first" />
                        )}/>
                        {/* <Route path="/orgs/:examiner/exams/new" exact component={ExamEdit} /> */}
                    </ExaminerContext.Provider>

                    <Route><h2>404 Not found</h2></Route>
                </Switch>
            </BrowserRouter>
        </div>
    )
}

export default App;