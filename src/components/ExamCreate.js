import React from 'react';
import { useFormik } from 'formik';
import { useHistory } from 'react-router-dom';
import { useDispatch } from "react-redux";
import { initializeNewExam } from '../actions';
import uniqid from 'uniqid';
import { ExaminerContext } from "../context";
import { validateExamCreate as validate } from '../formValidations/examinerForms';

const ExamCreate = () => {
    const dispatch = useDispatch();
    const history = useHistory();
    const { userInfo } = React.useContext(ExaminerContext);

    const formik = useFormik({
        initialValues: {
            exam_id: uniqid.process('E_'),
            exam_owner: '',
            exam_name: '',
            exam_description: '',
            exam_pass_score: '',
            exam_fee:''
        },
        validate,
        onSubmit: async (values) => {
            const examDetails = {
                exam_id: uniqid.process('E_'),
                exam_owner: userInfo.username,
                exam_name: values.examName,
                exam_description: values.examDescription,
                exam_pass_score: parseInt(values.examPassScore),
                exam_fee: parseFloat(values.examFee)
            }
            dispatch(initializeNewExam(examDetails));
            history.push(`/orgs/${userInfo.username}/exams/new`);
        },
    });

    return (
        <div className="">
            <form className="ui form" onSubmit={formik.handleSubmit}>
                <div className="fields">
                    <div className="four wide field">
                        {   formik.errors.examName?
                                <div className="ui pointing below red basic label">{formik.errors.examName}</div>
                            :   <p>&nbsp;</p>
                        }   
                    </div>
                    <div className="four wide field">
                        {   formik.errors.examPassScore?
                                <div className="ui pointing below red basic label">{formik.errors.examPassScore}</div>
                            :   <p>&nbsp;</p>
                        }   
                    </div>
                    <div className="four wide field">
                        {   formik.errors.examFee?
                                <div className="ui pointing below red basic label">{formik.errors.examFee}</div>
                            :   <p>&nbsp;</p>
                        }   
                    </div>
                </div>
                <div className="fields">
                    <div className="four wide field required">
                        <label>Exam identifier</label>
                        <input type="text" placeholder="Enter a name for the exam" name="examName"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.examName}/>
                    </div>
                    <div className="four wide field required">
                        <label>Passing score</label>
                        <input type="text" placeholder="Number between 0 and 100" name="examPassScore"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.examPassScore}/>
                    </div>
                    <div className="four wide field required">
                        <label htmlFor="examFee" >Exam fee</label>
                        <div className="ui left labeled input">
                        <div className="ui label">$</div>
                            <input type="text" placeholder="Amount" name="examFee"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.examFee}/>
                        </div>
                    </div>
                    <div className="four wide field">
                        <label>&nbsp;</label>
                        <button type="submit" className="ui right labeled icon green right floated button">
                            <i className="right arrow icon"></i>
                            Create New Exam
                        </button>
                    </div>
                </div>
                <div className="fields">
                    <div className="twelve wide field">
                        <label htmlFor="examDescription" >Exam Description</label>
                        <input type="text" placeholder="Enter a brief description" name="examDescription"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.examDescription}/>
                    </div>
                </div>
                
            </form>
        </div>
    )
};

export default ExamCreate;