import React, { useState, useEffect } from 'react';
import { useFormik } from 'formik';
import { validateRegistration as validate } from '../formValidations/examinerForms';


const OrgsRegister = () => {
    const [ formError, setFormError ] = useState(false);

    const formik = useFormik({
        initialValues: {
        username: '',
        password: '',
        password2: '',
        firstName: '',
        lastName: '',
        email: '',
        },
        validate,
        onSubmit: values => {
        alert(JSON.stringify(values, null, 2));
        },
    });

    useEffect(()=>{
        if (Object.keys(formik.errors).length > 0 ) {
            console.log(formik.errors);
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
            {formik.errors.firstName? (<p>{formik.errors.firstName}</p>) : null}
            {formik.errors.email? (<p>{formik.errors.email}</p>) : null}
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
                <div className="field required">
                    <label>Password</label>
                    <input type="password" name="password"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.password}/>
                </div>
                <div className="field required">
                    <label>Re-enter password</label>
                    <input type="password" name="password2"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.password2}/>
                </div>
            </div>
            <div className="fields">
                <div className="field required">
                    <label>First name</label>
                    <input type="text" placeholder="First Name" name="firstName"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.firstName}/>
                </div>
                <div className="field">
                    <label>Last name</label>
                    <input type="text" placeholder="Last Name" name="lastName"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.lastName}/>
                </div>
                <div className="field required">
                    <label>Email</label>
                    <input type="text" placeholder="Email" name="email"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.email}/>
                </div>

            </div>
            {formError?showErrorBox:<div className="ui basic segment"><p>&nbsp;</p><p>&nbsp;</p><p>&nbsp;</p></div>}
            <button
                className="ui blue primary right floated right labeled icon button">
                Register
                <i className="arrow circle right icon"></i>
            </button>
        </form>
    </div>
   );
};

export default OrgsRegister;