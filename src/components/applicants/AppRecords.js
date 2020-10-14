import React, { useEffect } from 'react';
import { AuthContext } from "../context";

const AppRecords = () =>{

    const { userInfo } = useContext(AuthContext);

    return (
        <div>
            <h2 className="ui block header">
                <i className="clipboard outline outline icon"></i>
                <div className="content">Purchased exams</div>
            </h2>

            <h2 className="ui block header">
                <i className="certificate icon"></i>
                <div className="content">Completed exams</div>
            </h2>
        </div>
    )
}

export default AppRecords;