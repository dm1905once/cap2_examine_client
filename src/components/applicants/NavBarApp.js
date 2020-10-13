import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { useHistory } from 'react-router-dom';
import { AuthContext } from "../../context";
import { getTokenFromLS } from '../../helpers';

const NavBarApp = ()=> {
    const history = useHistory();
    const { userInfo, deauthApplicant } = useContext(AuthContext);

    const handleLogout = () =>{
        const hasToken = localStorage.getItem("_token");
        if (hasToken){
            const tokenUserInfo = getTokenFromLS();
            if (tokenUserInfo.role === "applicant"){
                localStorage.removeItem("_token");
            }
        }
        deauthApplicant();
        history.push('/applicants');
    };


    return (
        <div className="ui secondary pointing menu">
            <Link to="/" className="item">Home</Link>

            {userInfo?
                <div className="right menu">
                    <div className="item">
                        <div className="ui primary button" onClick={handleLogout}>Logout Applicant</div>
                    </div>
                </div>
                :
                <div className="right menu">
                    <div className="item">
                    <Link to="/applicants" className="ui primary button">Login</Link>
                    </div>
                </div>
            }
        </div>
    )
}

export default NavBarApp;