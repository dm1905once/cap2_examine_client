import React, { useState, useEffect, useContext } from 'react';
import { useLocation, useHistory  } from 'react-router-dom';
// import { useDispatch } from "react-redux";
// import { ExaminerContext } from "../context";
import { loadExam } from '../actions';
import examineApi from '../apis/examineApi';
import ExamList from './applicants/ExamList';
import AppsLogin from './applicants/AppsLogin';
import AppsRegister from './applicants/AppsRegister';

const HomeApps = () => {
    const location = useLocation();
    const history = useHistory();
    // const dispatch = useDispatch();
    // const { userInfo } = useContext(ExaminerContext);
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


    const handleBuyExam = e =>{
    //     e.currentTarget.className += " loading";
    //     const examId = e.target.parentNode.getAttribute('data-examid');

    //     async function retrieveExam(){
    //         const exam = await examineApi.getEditableExam(userInfo.username, examId);
    //         if (exam === null ) {
    //             history.push("/orgs");
    //         } else {
    //             dispatch(loadExam(exam));
    //         }
    //     };
    //     retrieveExam();

        // setTimeout(()=>{
            // history.push(`/orgs/${userInfo.username}/exams/${examId}/edit/1`);
        // }, 5000);
    };

    return (
        <div className="ui container">
            {topMessage?<div className={`ui  message`}>{topMessage}</div>:''}

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

            <h2 className="ui block header">
                <i className="tasks icon"></i>
                <div className="content">Select an exam</div>
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