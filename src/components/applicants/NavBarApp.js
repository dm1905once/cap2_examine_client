import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { useHistory } from 'react-router-dom';
import { AuthContext } from "../../context";
import '../NavBars.css';

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
        <div>
            <div className="ui hidden divider"></div>
            <div className="ui labeled icon menu nav_bar_app_menu_image">
                <Link to="/" className="item"><i className="blue home icon"></i>Home</Link>

                {(applicantInfo && applicantInfo.role==="applicant")?
                    <div className="right labeled blue icon menu ">
                        <h4>
                            <strong>{applicantInfo.email}</strong> logged in as <strong>Applicant</strong>
                        </h4>
                        <a className="blue item" onClick={handleLogout}>
                            <i className="blue sign out alternate icon"></i>Logout
                        </a>
                    </div>
                    :
                    <div>
                        <h2 className="ui header access_header">Examine for Applicants</h2>
                    </div>
                }
            </div>
            <div className="ui hidden divider"></div>
        </div>
    )
}

export default NavBarApp;