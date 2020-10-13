import React from 'react';
import AppsLogin from './AppsLogin';
import AppsRegister from './AppsRegister';

const AppAccess = () =>{
    return (
        <div>
            <h2 className="ui block header">
                <i className="address card outline icon"></i>
                <div className="content">Login or Register</div>
            </h2>
            <div className="ui placeholder segment">
                <div className="ui two column very relaxed stackable grid">
                    <div className="middle aligned row">
                    <div className="column">
                        <h1>Applicant Login</h1>
                        <AppsLogin />
                    </div>
                    <div className="column">
                        <h1>Register</h1>
                        <AppsRegister />
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

export default AppAccess;