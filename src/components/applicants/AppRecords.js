import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from "../../context";
import appApi from '../../apis/appApi';

const AppRecords = () =>{
    const { applicantInfo } = useContext(AuthContext);
    const [ purchasedExams, setPurchasedExams ] = useState([]);
    const [ completedExams, setCompletedExams ] = useState([]);

    useEffect(() =>{
        async function retrievePurchasedExams(){
            const purchased = await appApi.getPurchasedExams(applicantInfo.email);
            setPurchasedExams(purchased);
        };
        async function retrieveCompletedExams(){
            const completed = await appApi.getCompletedExams(applicantInfo.email);
            setCompletedExams(completed);
        };
        if (applicantInfo) {
            retrievePurchasedExams();
            retrieveCompletedExams();
        }
    }, [applicantInfo])

    return (
        <div>
            <h2 className="ui block header">
                <i className="clipboard outline outline icon"></i>
                <div className="content">Purchased exams</div>
            </h2>

            {purchasedExams.length > 0 ?
                <table className="ui single line table">
                    <thead>
                        <tr>
                            <th>Exam Name</th>
                            <th>Passing Score (%)</th>
                            <th>Status</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {purchasedExams.map(exam => 
                        <tr key={exam.application_id}>
                            <td>{exam.exams.exam_name}</td>
                            <td>{exam.exams.exam_pass_score}</td>
                            <td>{exam.status}</td>
                            <td>
                                <Link  to={`/applicants/applyExam/${exam.application_id}`}>Take Exam Now</Link>
                            </td>
                        </tr>
                        )}
                    </tbody>
                </table>
            :<p>No purchased exams</p>}

            <h2 className="ui block header">
                <i className="certificate icon"></i>
                <div className="content">Completed exams</div>
            </h2>

            {completedExams.length > 0 ?
                <table className="ui single line table">
                    <thead>
                        <tr>
                            <th>Exam Name</th>
                            <th># Questions</th>
                            <th>Passing Score (%)</th>
                            <th>Your Score (%)</th>
                            <th>Results</th>
                        </tr>
                    </thead>
                    <tbody>
                        {completedExams.map(exam => 
                        <tr key={exam.application_id} className="positive">
                            <td>{exam.exams.exam_name}</td>
                            <td>{exam.questions_total}</td>
                            <td>{exam.exams.exam_pass_score}</td>
                            <td>{exam.eval_pct}</td>
                            {(exam.eval_pct>=exam.exams.exam_pass_score)
                                ?<td className="positive"><i className="yellow icon star"></i>Passed</td>
                                :<td className="negative"><i className="attention icon"></i>Failed</td>
                            }
                        </tr>
                        )}
                    </tbody>
                </table>
            :<p>No completed exams</p>}
        </div>
    )
}

export default AppRecords;