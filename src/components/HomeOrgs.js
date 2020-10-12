import React from 'react';
import { Redirect } from 'react-router-dom';
import OrgsLogin from './OrgsLogin';
import OrgsRegister from './OrgsRegister';
import { AuthContext } from "../context";


const HomeOrgs = ( {topMessage=''})=> {
    const { userInfo } = React.useContext(AuthContext);

    // const location = useLocation();
    // const usernameInUrl = location.pathname.split("/")[2];

    if ( userInfo  ){
        return <Redirect to={`/orgs/${userInfo.username}/exams`} />;
    } else {
        return (
            <div>
                {topMessage?<div className="ui warning message">{topMessage}</div>:''}
                <div className="ui placeholder segment">
                    <div className="ui two column very relaxed stackable grid">
                        <div className="middle aligned row">
                        <div className="column">
                            <h1>Login</h1>
                            <OrgsLogin />
                        </div>
                        <div className="column">
                            <h1>Register</h1>
                            <OrgsRegister />
                        </div>
                        </div>
                    </div>
                    <div className="ui vertical divider">
                        Or
                    </div>
                </div>
            </div>
        )
    }
}

export default HomeOrgs;