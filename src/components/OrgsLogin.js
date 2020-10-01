import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useFormik } from 'formik';
import { validateLogin as validate } from '../formValidations/examinerForms';
import examineApi from '../apis/examineApi';
import { ExaminerContext } from "../context";
import jwt from 'jsonwebtoken';


const OrgsLogin = () => {
    const history = useHistory();
    const [ formError, setFormError ] = useState(false);
    // const { doAuthenticateExaminer } = React.useContext(ExaminerContext);
    const { userInfo } = React.useContext(ExaminerContext);

    const formik = useFormik({
        initialValues: {
        username: '',
        password: ''
        },
        validate,
        onSubmit: async (values) => {
            try {
                const token = await examineApi.authenticateExaminer(values);
                localStorage.setItem("_token", token);
                // const userInfo = jwt.decode(token);
                // doAuthenticateExaminer(userInfo);
                history.push(`/orgs/${values.username}/exams`)
            } catch(e) {
                setFormError(true);
                formik.errors.username=e;
            }
        },
    });

    useEffect(()=>{
        if (Object.keys(formik.errors).length > 0 ) {
            setFormError(true);
        } else {
            setFormError(false);
        };
    }, [formik.errors]);


    const showErrorBox = (
            <div className="ui error message">
                <div className="header">Please review the following validations before submitting:</div>
                {formik.errors.username? (<p>{formik.errors.username}</p>) : null}
                {formik.errors.password? (<p>{formik.errors.password}</p>) : null}
            </div>
        );

   return (
    <div>
        <form className={`ui equal width form ${formError? 'error': ''}`} onSubmit={formik.handleSubmit}>
            <div className="fields">
                <div className="field required">
                    <label>Username</label>
                    <input type="text" placeholder="Username" name="username"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.username}/>
                </div>
            </div>
            <div className="fields">
                <div className="field required">
                    <label>Password</label>
                    <input type="password" name="password"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.password}/>
                </div>
            </div>

            {formError?showErrorBox:<div className="ui basic segment"><p>&nbsp;</p><p>&nbsp;</p><p>&nbsp;</p></div>}
            <button
                type="submit"
                className="ui primary blue right floated right labeled icon button">
                Login
                <i className="arrow circle right icon"></i>
            </button>
        </form>
    </div>
   );
};

export default OrgsLogin;