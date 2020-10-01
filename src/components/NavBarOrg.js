import React from 'react';
import { Link } from 'react-router-dom';
import { useHistory } from 'react-router-dom';
import { ExaminerContext } from "../context";

const NavBarOrg = ()=> {
    const history = useHistory();
    const { userInfo, undoAuthenticate } = React.useContext(ExaminerContext);

    const handleLogout = () =>{
        localStorage.removeItem("_token");
        undoAuthenticate();
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