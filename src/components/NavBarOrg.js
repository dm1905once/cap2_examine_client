import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useHistory } from 'react-router-dom';
import jwt from 'jsonwebtoken';
import { ExaminerContext } from "../context";

const NavBarOrg = ()=> {
    const history = useHistory();
    const [ authToken, setAuthToken ] = useState('');
    const { userInfo } = React.useContext(ExaminerContext);
    // const [ userInfo, setUserInfo ] = useState('');

    // useEffect(()=>{
    //     setAuthToken(localStorage.getItem("_token") || '');
    // });

    // useEffect(()=>{
    //     setUserInfo(JSON.parse(JSON.stringify(jwt.decode(authToken)))); 
    // },[authToken]);

    const handleLogout = () =>{
        localStorage.removeItem("_token");
        // setAuthToken('');
        history.push('/orgs');
    };


    return (
        <div className="ui secondary pointing menu">
            <Link to="/" className="item">Home</Link>

            {userInfo?
                <div className="right menu">
                    <div className="item">
                        <div className="ui primary button" onClick={handleLogout}>Logout</div>
                    </div>
                </div>
                :
                <div className="right menu">
                    <div className="item">
                    <Link to="/orgs" className="ui primary button">Login</Link>
                    </div>
                </div>
            }
        </div>
    )
}

export default NavBarOrg;