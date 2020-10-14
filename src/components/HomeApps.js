import React, { useState, useEffect, useContext } from 'react';
import { useLocation, useHistory } from 'react-router-dom';
// import { useDispatch } from "react-redux";
import { AuthContext } from "../context";
import examineApi from '../apis/examineApi';
import ExamList from './applicants/ExamList';
import AppAccess from './applicants/AppAccess';
import AppRecords from './applicants/AppRecords';

const HomeApps = () => {
    const location = useLocation();
    const history = useHistory();
    // const dispatch = useDispatch();
    const { isApplicantAuth, userInfo } = useContext(AuthContext);
    const [ examList, setExamList ] = useState([]);
    // const [ refreshList, setRefreshList ] = useState(true);
    let topMessage = location.state? location.state.topMessage : '';

    
    useEffect(()=>{
        async function retrieveExamList(){
            const applicableExams = await examineApi.getApplicableExams();
            setExamList(applicableExams);
        };
        retrieveExamList();
        // setRefreshList(false);
    },[]);


    const handleBuyExam = (e, exam_id, application_id) =>{
        if (!isApplicantAuth) {
            alert("Please login or register first");
        } else {
            e.currentTarget.className += " loading";
            const applicationDetails = {
                application_id,
                applicant_email: userInfo.email,
                exam_id
            }

            async function registerPurchasedExam(){
                const newApplication = await examineApi.acquireExam(applicationDetails);
                
                if (newApplication === null ) {
                    history.push("/applicants");
                } else {
                    // dispatch(loadExam(exam));
                    console.log("nada");
                }
            };
            registerPurchasedExam();

        }

    };

    return (
        <div className="ui container">
            {topMessage?<div className={`ui  message`}>{topMessage}</div>:''}

            {isApplicantAuth? <AppRecords /> : <AppAccess />}

            <h2 className="ui block header">
                <i className="tasks icon"></i>
                <div className="content">Browse exams</div>
            </h2>
            {
                examList.length === 0
                ?   <div>
                        <h2 className="ui blue header">Loading exam list</h2>
                        {[1,2,3,4,5,6,7,8,9,0].map(x=>
                            <div className="ui placeholder" key={x}>
                                <div className="image header">
                                    <div className="line"></div>
                                    <div className="line"></div>
                                    <div className="line"></div>
                                </div>
                            </div>
                        )}
 
                    </div>
                :   
                    <div className="ui cards">
                        {examList.map(exam=>
                            <ExamList exam={exam} 
                                    key={exam.exam_id}
                                    handleBuyExam={handleBuyExam} />)}
                    </div>
            }
        </div>
    )
}

export default HomeApps;