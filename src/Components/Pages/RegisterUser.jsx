import React from 'react';
import Icon from "@mdi/react";
import {mdiAccountCircle, mdiEmail, mdiLock, mdiLockCheck} from "@mdi/js";
import Field from "../Atoms/Field.jsx";
import Button from "../Atoms/Button.jsx";
import {
    validateUserEmail,
    validateUserName,
    validateUserPassword,
    validateUserPasswordConfirmation
} from "./RegisterFormValidationInputs.js";
import {useForm} from "../../hooks/useForm.js";
import useUser from "../../Context/UserContext.jsx";
import {useNavigate} from "react-router-dom";

const validateFunctionsFormInputs = {
    name: validateUserName,
    email: validateUserEmail,
    password: validateUserPassword,
    password_confirmation: validateUserPasswordConfirmation
}

const initialState = {
    name: '',
    email: '',
    password: '',
    password_confirmation: ''
}

const RegisterUser = () => {
    const {addNewError, userError, savingUser} = useUser();

    const [formValues, handleInputChange, reset, validatedSubmitForm] = useForm(initialState, validateFunctionsFormInputs, addNewError);
    const {name, email, password, password_confirmation} = formValues;
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        await  validatedSubmitForm();
        const isValid =Object.keys(userError).every(el=>userError[el]===null);

        if(isValid){
            let res = await savingUser({
                name,
                email,
                password,
                password_confirmation
            });
            if(res){
                navigate("/notifyVerifyEmail")
            }
        }
    }
    return (
        <div className="flex flex-col h-screen">
            <div className="bg-gray-800 min-h-[5rem]">
            </div>
            <div className="bg-gray-200 h-full flex justify-center align-center">
                <div className="flex flex-col justify-center align-center gap-6 min-w-[30rem]">
                    <p className="text-4xl leading-10 font-bold text-center">Registro de Usuario</p>
                    <form onSubmit={handleSubmit} className="flex flex-col justify-center gap-4">
                        <div className="flex gap-3 items-center">
                            <Icon path={mdiAccountCircle} size={1} />
                            <Field
                                type="text"
                                name="name"
                                label="Nombre"
                                classBox="my-3 grow"
                                handleChange={handleInputChange}
                                value={name}
                                errorInput={userError.name}
                            />
                        </div>
                        <div className="flex gap-3 items-center">
                            <Icon path={mdiEmail} size={1} />
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
                            <Icon path={mdiLock} size={1} />
                            <Field
                                type="password"
                                name="password"
                                label="Password"
                                classBox="my-3 grow"
                                handleChange={handleInputChange}
                                value={password}
                                errorInput={userError.password}
                            />
                        </div>
                        <div className="flex gap-3 items-center">
                            <Icon path={mdiLockCheck} size={1} />
                            <Field
                                type="password"
                                name="password_confirmation"
                                label="Confirmar Password"
                                classBox="my-3 grow"
                                handleChange={handleInputChange}
                                value={password_confirmation}
                                errorInput={userError.password_confirmation}
                            />
                        </div>
                        <div className="flex">
                            <Button
                                text="Registrar"
                                type="submit"
                                btnType="main"
                            />
                        </div>
                    </form>
                </div>
            </div>
            <div className="bg-gray-900 min-h-[5rem]">
            </div>
        </div>

    )
}
export default RegisterUser;