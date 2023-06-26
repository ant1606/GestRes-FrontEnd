export const validateUserName = (values) => {
    const nameToValidate = values.name.trim();
    if(!nameToValidate){
        return "Debe ingresar el nombre del usuario";
    }
    return null;
}

export const validateUserEmail = (values) => {
    const emailToValidate = values.email.trim();
    const regExFormatEmail = /^[\w-\\.]+@([\w-]+\.)+[\w-]{2,4}$/;
    const emailValidFormat = regExFormatEmail.test(emailToValidate);
    if(!emailToValidate){
        return "Debe ingresar el email del usuario";
    }
    if(!emailValidFormat){
        return "Formato incorrecto ingresado del email";
    }
    return null;
}

export const validateUserPassword = (values) => {
    const passwordToValidate = values.password.trim();
    if(!passwordToValidate){
        return "Debe ingresar el password del usuario";
    }
    return null;
}
export const validateUserPasswordConfirmation = (values) => {
    const passwordConfirmationToValidate = values.password_confirmation.trim();
    const passwordToValidate = values.password.trim();
    if(!passwordConfirmationToValidate){
        return "Debe ingresar el password del usuario";
    }
    if(passwordConfirmationToValidate !== passwordToValidate){
        return "Las contraseñas ingresadas no son iguales";
    }
    return null;
}