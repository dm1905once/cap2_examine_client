import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { useHistory } from 'react-router-dom';
import { AuthContext } from "../context";

const NavBarOrg = ()=> {
    const history = useHistory();
    const { examinerInfo, deauthExaminer } = useContext(AuthContext);

    const handleLogout = () =>{
        if (localStorage.getItem("_orgToken")){
            localStorage.removeItem("_orgToken");
        }
        deauthExaminer();
        history.push('/orgs');
    };


    return (
        <div className="ui secondary pointing menu">
            <Link to="/" className="item">Home</Link>

            {(examinerInfo && examinerInfo.role==="examiner")?
                <div className="right menu">
                    <div className="item">
                        <div className="ui primary button" onClick={handleLogout}>Logout Examiner</div>
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