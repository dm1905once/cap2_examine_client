import React, { useState, useEffect } from 'react';
import { useFormik } from 'formik';
import { validateLogin as validate } from '../formValidations/examinerForms';


const OrgsLogin = () => {
    const [ formError, setFormError ] = useState(false);

    const formik = useFormik({
        initialValues: {
        username: '',
        password: ''
        },
        validate,
        onSubmit: values => {
        alert(JSON.stringify(values, null, 2));
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
                <div className="field">
                    <label>Username</label>
                    <input type="text" placeholder="Username" name="username"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.username}/>
                </div>
                <div className="field">
                    <label>Password</label>
                    <input type="password" name="password"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.password}/>
                </div>
            </div>

            {formError?showErrorBox:''}
            <button
                className="ui primary blue right floated right labeled icon button">
                Login
                <i className="arrow circle right icon"></i>
            </button>
        </form>
    </div>
   );
};

export default OrgsLogin;