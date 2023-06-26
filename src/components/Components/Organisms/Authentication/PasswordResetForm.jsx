import React from 'react';
import Icon from "@mdi/react";
import {mdiEmail, mdiLock, mdiLockCheck} from "@mdi/js";
import Field from "../../Atoms/Field.jsx";
import Button from "../../Atoms/Button.jsx";
import {
    validateUserEmail,
    validateUserPassword,
    validateUserPasswordConfirmation
} from "./RegisterFormValidationInputs.js";
import useUser from "../../../Context/UserContext.jsx";
import {useForm} from "../../../hooks/useForm.js";
import {useNavigate, useSearchParams} from "react-router-dom";

const validateFunctionsFormInputs = {
    email: validateUserEmail,
    password: validateUserPassword,
    password_confirmation: validateUserPasswordConfirmation
}

const initialState = {
    email: '',
    password: '',
    password_confirmation: ''
}

const PasswordResetForm = () => {

    const {
        addNewError,
        userError,
        setIsLoading,
        resetPassword
    } = useUser();

    const [formValues, handleInputChange, reset, validatedSubmitForm] = useForm(initialState, validateFunctionsFormInputs, addNewError);
    const {email, password, password_confirmation} = formValues;
    const navigate = useNavigate();
    let [searchParams, setSearchParams] = useSearchParams();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);

        await validatedSubmitForm();
        const isValid = Object.keys(userError).every(el => userError[el] === null);
        if (isValid) {
            let res = await resetPassword({
                "token": searchParams.get("token"),
                email,
                password,
                password_confirmation
            });
            if (res) {
                navigate("/login");
            }
        }
        setIsLoading(false);
    }

    return (
        <>
            <p className="text-4xl leading-10 font-bold text-center">Ingrese su nueva contraseña</p>
            <form onSubmit={handleSubmit} className="flex flex-col justify-center gap-4">
                <div className="flex gap-3 items-center">
                    <Icon path={mdiEmail} size={1}/>
                    <Field
                        type="text"
                        name="email"
                        label="Email"
                        classBox="my-3 grow"
                        handleChange={handleInputChange}
                        value={email}
                        errorInput={userError.email}
                    />
                </div>
                <div className="flex gap-3 items-center">
                    <Icon path={mdiLock} size={1}/>
                    <Field
                        type="password"
                        name="password"
                        label="Nueva Contraseña"
                        classBox="my-3 grow"
                        handleChange={handleInputChange}
                        value={password}
                        errorInput={userError.password}
                    />
                </div>
                <div className="flex gap-3 items-center">
                    <Icon path={mdiLockCheck} size={1}/>
                    <Field
                        type="password"
                        name="password_confirmation"
                        label="Confirmar Nueva Contraseña"
                        classBox="my-3 grow"
                        handleChange={handleInputChange}
                        value={password_confirmation}
                        errorInput={userError.password_confirmation}
                    />
                </div>
                <div className="flex">
                    <Button
                        text="Cambiar Contraseña"
                        type="submit"
                        btnType="main"
                    />
                </div>
            </form>
        </>
    );
}
export default PasswordResetForm;