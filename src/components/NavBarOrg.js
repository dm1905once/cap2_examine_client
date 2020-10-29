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
        <div>
            <div className="ui hidden divider"></div>
            <div className="ui labeled icon menu nav_bar_org_menu_image">
                <Link to="/" className="item"><i className="blue home icon"></i>Home</Link>

                {(examinerInfo && examinerInfo.role==="examiner")?
                    <div className="right labeled blue icon menu">
                        <h4>
                            <strong>{examinerInfo.username}</strong> logged in as <strong>Examiner</strong>
                        </h4>
                        <a className="item" onClick={handleLogout}>
                            <i className="blue sign out alternate icon"></i>Logout
                        </a>
                    </div>
                    :
                    <div>
                        <h2 className="ui header access_header">Examine for Organizations</h2>
                    </div>
                }
            </div>
            <div className="ui hidden divider"></div>
        </div>
    )
}

export default NavBarOrg;