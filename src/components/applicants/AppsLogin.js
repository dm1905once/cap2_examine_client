import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useFormik } from 'formik';
import { validateLogin as validate } from '../../formValidations/applicantForms';
import examineApi from '../../apis/examineApi';
// import { ApplicantContext } from "../../context";


const AppsLogin = () => {
    const history = useHistory();
    const [ formError, setFormError ] = useState(false);
    // const { doAuthenticate } = React.useContext(ApplicantContext);

    const formik = useFormik({
        initialValues: {
        emailAddress: '',
        password: ''
        },
        validate,
        onSubmit: async (values) => {
            try {
                const token = await examineApi.authenticateApplicant(values);
                localStorage.setItem("_token", token);
                // doAuthenticate();
                // history.push(`/orgs/${values.username}/exams`)
            } catch(e) {
                setFormError(true);
                formik.errors.emailAddress=e;
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
        <div className="ui error message ">
                <div className="header">Login Form errors:</div><p>&nbsp;</p>
                {formik.errors.emailAddress? (<p>{formik.errors.emailAddress}</p>) : null}
                {formik.errors.password? (<p>{formik.errors.password}</p>) : null}
            </div>
        );

   return (
        <div>
            {formError?
                <div className="ui left rail">
                    <div className="ui left aligned vertical segment">{showErrorBox}</div>
                </div>
            :''}
        <form className={`ui equal width form ${formError? 'error': ''}`} onSubmit={formik.handleSubmit}>
            <div className="fields">
                <div className="field required">
                    <label>Email Address</label>
                    <input type="text" placeholder="" name="emailAddress"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.emailAddress}/>
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

export default AppsLogin;