import React, { useState } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Home from './Home';
import HomeApplicants from './HomeApplicants';
import HomeOrgs from './HomeOrgs';
import NavBarOrg from './NavBarOrg';
import ExamEdit from './ExamEdit';
import ExamList from './ExamList';
import { ExaminerContext } from "../context";

const App = () => {
    const [ examinerAuthenticated, setExaminerAuthenticated ] = useState(false);
    const [ examinerInfo, setExaminerInfo ] = useState('');

    React.useEffect(()=> {
        if (localStorage.getItem("_token")){
            setExaminerAuthenticated(true);
        } else {
            setExaminerAuthenticated(false);
        }
      }, [examinerAuthenticated]);

    function doAuthenticateExaminer(values){
        setExaminerAuthenticated(true);
        setExaminerInfo(values);
    }

    function undoAuthenticateExaminer(){
        setExaminerAuthenticated(false);
        setExaminerInfo('');
    }



    return (
        <div className="ui container">
            <BrowserRouter>
                <Switch>
                    <Route path="/" exact component={Home} />
                    <Route path="/applicants" exact component={HomeApplicants} />

                    <ExaminerContext.Provider value={ {doAuthenticateExaminer, undoAuthenticateExaminer, examinerInfo} }>
                        <NavBarOrg />
                        <Route path="/orgs" exact component={HomeOrgs} />
                        <Route path="/orgs/:examiner/exams" exact render={()=>(
                            examinerAuthenticated
                                ? <ExamList />
                                : <HomeOrgs topMessage="Please authenticate first" />
                        )}/>
                        <Route path="/exams/new" exact component={ExamEdit} />
                    </ExaminerContext.Provider>

                    <Route><h2>404 Not found</h2></Route>
                </Switch>
            </BrowserRouter>
        </div>
    )
}

export default App;