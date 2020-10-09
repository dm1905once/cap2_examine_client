import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useFormik } from 'formik';
import { validateRegistration as validate } from '../../formValidations/applicantForms';
import examineApi from '../../apis/examineApi';
import { ApplicantContext } from "../../context";


const AppsRegister = () => {
    const history = useHistory();
    const [ formError, setFormError ] = useState(false);
    const { doAuthenticate } = React.useContext(ApplicantContext);

    const formik = useFormik({
        initialValues: {
        emailAddress: '',
        password: '',
        password2: '',
        full_name: ''
        },
        validate,
        onSubmit: async (values) => {
            try {
                const token = await examineApi.registerApplicant(values);
                localStorage.setItem("_token", token);
                doAuthenticate();
            } catch(e) {
                setFormError(true);
                formik.errors.emailAddress=e;
            }
        },
    });

    useEffect(()=>{
        if (Object.keys(formik.errors).length > 0 ) {
            setFormError(true);
            console.log("HArr errores");
        } else {
            setFormError(false);
        };
    }, [formik.errors]);

    const showErrorBox = (
        <div className="ui error message ">
            <div className="header">Registration Form errors:</div><p>&nbsp;</p>
            {formik.errors.emailAddress? (<p>{formik.errors.emailAddress}</p>) : null}
            {formik.errors.password? (<p>{formik.errors.password}</p>) : null}
            {formik.errors.full_name? (<p>{formik.errors.full_name}</p>) : null}
        </div>
    );

   return (
    <div>
        {formError?
            <div className="ui right rail">
                <div className="ui left aligned vertical segment">{showErrorBox}</div>
            </div>
        :''}
        <form className={`ui equal width form ${formError? 'error': ''}`} onSubmit={formik.handleSubmit}>
            <div className="fields">
                <div className="field required">
                    <label>Full name</label>
                    <input type="text" placeholder="First and Last Name" name="full_name"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.full_name}/>
                </div>
                <div className="field required">
                    <label>Password</label>
                    <input type="password" name="password"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.password}/>
                </div>
            </div>
            <div className="fields">
                <div className="field required">
                    <label>Email Address</label>
                    <input type="text" placeholder="" name="emailAddress"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.emailAddress}/>
                </div>
                <div className="field required">
                    <label>Re-enter password</label>
                    <input type="password" name="password2"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.password2}/>
                </div>
            </div>
            <button
                type="submit"
                className="ui blue primary right floated right labeled icon button">
                Register
                <i className="arrow circle right icon"></i>
            </button>
        </form>
    </div>
   );
};

export default AppsRegister;