import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { useHistory } from 'react-router-dom';
import { AuthContext } from "../../context";

const NavBarApp = ()=> {
    const history = useHistory();
    const { applicantInfo, deauthApplicant } = useContext(AuthContext);

    const handleLogout = () =>{
        if (localStorage.getItem("_appToken")){
            localStorage.removeItem("_appToken");
        }
        deauthApplicant();
        history.push('/applicants');
    };


    return (
        <div className="ui secondary pointing menu">
            <Link to="/" className="item">Home</Link>

            {(applicantInfo && applicantInfo.role==="applicant")?
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