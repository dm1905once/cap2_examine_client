import React from 'react';
import OrgsLogin from './OrgsLogin';
import OrgsRegister from './OrgsRegister';

const HomeOrgs = ( {topMessage=''})=> {

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

export default HomeOrgs;