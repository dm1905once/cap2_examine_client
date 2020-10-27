import React from 'react';
import { useSelector } from 'react-redux';
import { Redirect  } from 'react-router-dom';
import ExamHeader from './ExamHeader'
import ExamCrumbs from './ExamCrumbs'
import Question from './Question'
import { AuthContext } from "../../context";


const ExamBuild = () => {
    const exam = useSelector(store => store.newExam);
    const { userInfo } = React.useContext(AuthContext);

    if (!exam.exam_id){
        if (userInfo) {
            return <Redirect to={ {pathname: `/orgs/${userInfo.username}/exams`}} />
        } else {
            return <Redirect to="/orgs" />
        }
    } else {
        return (
            <div>
                <ExamHeader examName={exam.exam_name} operation="create" />
                <ExamCrumbs questions={exam.questions} operation="create" />
                <Question nextSeq={exam.questions.length + 1}  operation="create" />
            </div>
        );
    };
}

export default ExamBuild;