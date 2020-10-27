import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useFormik } from 'formik';
import { validateRegistration as validate } from '../formValidations/examinerForms';
import orgApi from '../apis/orgApi';
import { AuthContext } from "../context";


const OrgsRegister = () => {
    const history = useHistory();
    const [ formError, setFormError ] = useState(false);
    const { authExaminer } = React.useContext(AuthContext);

    const formik = useFormik({
        initialValues: {
        org_handle: 'ORG1',
        org_key: 'org1',
        username: '',
        password: '',
        password2: '',
        first_name: '',
        last_name: '',
        email: '',
        photo_url: 'http://placeimg.com/640/480/people'
        },
        validate,
        onSubmit: async (values) => {
            try {
                const token = await orgApi.registerExaminer(values);
                localStorage.setItem("_orgToken", token);
                authExaminer();
                history.push(`/orgs/${values.username}/exams`);
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
            {formik.errors.first_name? (<p>{formik.errors.first_name}</p>) : null}
            {formik.errors.email? (<p>{formik.errors.email}</p>) : null}
        </div>
    );

   return (
    <div>
        <form className={`ui equal width form ${formError? 'error': ''}`} onSubmit={formik.handleSubmit}>
        <div className="fields">
                <div className="field required">
                    <label>Org Handle</label>
                    <input type="text" name="org_handle" readOnly disabled value={formik.values.org_handle}/>
                </div>
                <div className="field required">
                    <label>Org Key</label>
                    <input type="text" name="org_key" readOnly disabled value={formik.values.org_key}/>
                </div>

            </div>
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
                    <input type="text" placeholder="First Name" name="first_name"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.first_name}/>
                </div>
                <div className="field">
                    <label>Last name</label>
                    <input type="text" placeholder="Last Name" name="last_name"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.last_name}/>
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
                type="submit"
                className="ui blue primary right floated right labeled icon button">
                Register
                <i className="arrow circle right icon"></i>
            </button>
        </form>
    </div>
   );
};

export default OrgsRegister;