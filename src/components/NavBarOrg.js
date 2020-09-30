import React from 'react';
import { Link, Redirect } from 'react-router-dom';
import { ExaminerContext } from "../context";
import { useHistory } from 'react-router-dom';

const NavBarOrg = ()=> {
    const {examinerInfo, undoAuthenticateExaminer} = React.useContext(ExaminerContext);
    const history = useHistory();

    const handleLogout = () =>{
        undoAuthenticateExaminer();
        localStorage.removeItem("_token");
        history.push('/orgs');
    };


    return (
        <div className="ui secondary pointing menu">
            <Link to="/orgs" className="item">Home</Link>

            {examinerInfo?
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