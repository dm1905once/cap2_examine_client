import React, { useState } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Home from './Home';
import RoutesApplicant from './RoutesApplicant';
import RoutesExaminer from './RoutesExaminer';
import { AuthContext } from "../context";
import { getTokenFromLS } from '../helpers';

const App = () => {

    const [ isExaminerAuth, setExaminerAuth ] = useState(false);
    const [ isApplicantAuth, setApplicantAuth ] = useState(false);
    const [ examinerInfo, setExaminerInfo ] = useState();
    const [ applicantInfo, setApplicantInfo ] = useState();

    React.useEffect(()=> {
        let hasToken = false;

        if (localStorage.getItem("_orgToken")){
            setExaminerAuth(true);
            setExaminerInfo(getTokenFromLS("_orgToken"));
            hasToken = true;
        } 
        
        if (localStorage.getItem("_appToken")){
            setApplicantAuth(true);
            setApplicantInfo(getTokenFromLS("_appToken"));
            hasToken = true;
        }

        if (!hasToken) {
            setExaminerAuth(false);
            setApplicantAuth(false)
            setExaminerInfo();
            setApplicantInfo();
        }
      }, [isExaminerAuth, isApplicantAuth]);



    function authExaminer(){
        setExaminerAuth(true);
        setExaminerInfo(getTokenFromLS("_orgToken"));
    }

    function authApplicant(){
        setApplicantAuth(true);
        setApplicantInfo(getTokenFromLS("_appToken"));
    }

    function deauthExaminer(){
        setExaminerAuth(false);
        setExaminerInfo();
    }

    function deauthApplicant(){
        setApplicantAuth(false);
        setApplicantInfo();
    }

    return (
        // <div className="ui container">
            <BrowserRouter>
                <Switch>
                    <Route path="/" exact component={Home} />
                    <AuthContext.Provider value={ 
                        { 
                            examinerInfo, 
                            applicantInfo,
                            isExaminerAuth, 
                            authExaminer, 
                            deauthExaminer, 
                            isApplicantAuth, 
                            authApplicant, 
                            deauthApplicant 
                        } 
                    }>
                        <RoutesApplicant />
                        <RoutesExaminer />
                    </AuthContext.Provider>
                        
                    <Route><h2>404 Not found</h2></Route>
                </Switch>
            </BrowserRouter>
        // {/* </div> */}
    )
}

export default App;