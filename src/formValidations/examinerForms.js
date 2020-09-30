

export const validateRegistration = values => {
    const errors = {};
    if (!values.username) {
      errors.username = "'Username' is a required field";
    } else if (values.username.length < 4 || values.username.length > 20) {
      errors.username = "'Username' must be between 4 and 20 characters";
    }

    if (!values.password) {
      errors.password = "'Password' is a required field";
    } else if (values.password.length < 4 || values.password.length > 20) {
      errors.password = "'Password' must be between 4 and 20 characters";
    } else if (values.password !== values.password2){
      errors.password = "'Password' must match in both password fields";
    }

    if (!values.first_name) {
      errors.first_name = "'First name' is a required field";
    } else if (values.first_name.length < 2) {
      errors.first_name = "'First name' must be at least 2 characters long";
    }
  
    if (!values.email) {
      errors.email = "'Email' is a required field";
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
      errors.email = 'Invalid email address';
    }
    return errors;
  };


export const validateLogin = values => {
    const errors = {};
    if (!values.username) {
      errors.username = "'Username' is a required field";
    } else if (values.username.length < 4 || values.username.length > 20) {
      errors.username = "'Username' must be between 4 and 20 characters";
    }

    if (!values.password) {
      errors.password = "'Password' is a required field";
    } else if (values.password.length < 4 || values.password.length > 20) {
      errors.password = "'Password' must be between 4 and 20 characters";
    }
    return errors;
}