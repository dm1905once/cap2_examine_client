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
    const [ userInfo, setUserInfo ] = useState();

    React.useEffect(()=> {
        const hasToken = localStorage.getItem("_token");
        if (hasToken){
            const tokenUserInfo = getTokenFromLS();
            if (tokenUserInfo.role === "examiner"){
                setExaminerAuth(true);
                setUserInfo(tokenUserInfo);
            } else if (tokenUserInfo.role === "applicant"){
                setApplicantAuth(true);
                setUserInfo(tokenUserInfo);
            }
        } else {
            setExaminerAuth(false);
            setUserInfo();
        }
      }, [isExaminerAuth, isApplicantAuth]);

    function authExaminer(){
        setExaminerAuth(true);
        setUserInfo(getTokenFromLS());
    }

    function authApplicant(){
        setApplicantAuth(true);
        setUserInfo(getTokenFromLS());
    }

    function deauthExaminer(){
        setExaminerAuth(false);
        setUserInfo();
    }

    function deauthApplicant(){
        setApplicantAuth(false);
        setUserInfo();
    }

    return (
        <div className="ui container">
            <BrowserRouter>
                <Switch>
                    <Route path="/" exact component={Home} />
                    <AuthContext.Provider value={ 
                        { 
                            userInfo, 
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
        </div>
    )
}

export default App;