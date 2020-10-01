import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch } from "react-redux";
import { createNewExam } from '../actions';
import uniqid from 'uniqid';
import { decodeItemFromLS } from '../helpers';


const ExamCreate = () => {
    const dispatch = useDispatch();
    const history = useHistory();
    const [ examName, setExamName ] = useState('');
    const [ validationErrors, setValidationErrors ] = useState([]);
    // const [ authToken ] = useState(localStorage.getItem("_token") || '');
    // const [ userInfo, setUserInfo ] = useState('');

    // useEffect(()=>{
    //     setUserInfo(JSON.parse(JSON.stringify(jwt.decode(authToken)))); 
    // },[authToken]);
    // const userInfo = (JSON.parse(JSON.stringify(jwt.decode(localStorage.getItem("_token") || '')))); 
    const userInfo = decodeItemFromLS("_token");

    const handleNameChange = (e) =>{
        setExamName(e.target.value)
        setValidationErrors('');
    }

    const submitCreateExam = () =>{

        const errorMessages = [];
        if (examName === '') errorMessages.push("Please enter a name");
        setValidationErrors(errorMessages);

        if (errorMessages.length === 0 ){
            const examDetails = {
                exam_id: uniqid.process('E_'),
                exam_name: examName,
                exam_owner: userInfo.username
            }
            dispatch(createNewExam(examDetails));
            history.push(`/orgs/${userInfo.username}/exams/new`);
        }

    }

    return (
            <div className="ui relaxed grid">
                <div className="row">
                    <div className="eight wide column">
                        <div className="ui fluid action input">
                            <input type="text" 
                                placeholder="Enter exam name and click Create"
                                value={examName} 
                                onChange={(handleNameChange)} />
                            <div className="ui blue button" onClick={submitCreateExam} >Create</div>
                        </div>
                    </div>
                    <div className="four wide column">
                        {
                            validationErrors.length > 0 ?
                            <div className="ui left pointing red basic label">
                                {validationErrors.map((message, i)=><p key={i}>{message}</p>)}
                            </div>
                            :''
                        }
                    </div>
                </div>
            </div>        
    )
};

export default ExamCreate;