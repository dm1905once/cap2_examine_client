import React, { useState, useEffect } from 'react';
import { useFormik } from 'formik';
import { validateLogin as validate } from '../../formValidations/applicantForms';
import appApi from '../../apis/appApi';
import { AuthContext } from "../../context";


const AppsLogin = () => {
    const [ formError, setFormError ] = useState(false);
    const { authApplicant } = React.useContext(AuthContext);

    const formik = useFormik({
        initialValues: {
        email: '',
        password: ''
        },
        validate,
        onSubmit: async (values) => {
            try {
                const token = await appApi.authenticateApplicant(values);
                localStorage.setItem("_token", token);
                authApplicant();
            } catch(e) {
                setFormError(true);
                formik.errors.email=e;
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
                {formik.errors.email? (<p>{formik.errors.email}</p>) : null}
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
                    <input type="text" placeholder="" name="email"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.email}/>
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