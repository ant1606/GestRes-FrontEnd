import React, {useState} from 'react';
import Button from "../../Atoms/Button.jsx";
import Icon from "@mdi/react";
import { mdiEmail} from "@mdi/js";
import Field from "../../Atoms/Field.jsx";
import useUser from "../../../Context/UserContext.jsx";
import {validateUserEmail} from "../../Organisms/Authentication/RegisterFormValidationInputs.js";
import {useForm} from "../../../hooks/useForm.js";
import Loader from "../../Atoms/Loader.jsx";

const validateFunctionsFormInputs = {
    email: validateUserEmail,
}

const initialState = {
    email: '',
}

const PasswordForget = () => {

    const {
        forgetPassword,
        setIsLoading,
        addNewError,
        userError,
        userIsLoading
    } = useUser();

    const [formValues, handleInputChange, reset, validatedSubmitForm] = useForm(initialState, validateFunctionsFormInputs, addNewError);
    const {email} = formValues;

    const [validateEmail, setValidateEmail ] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        await  validatedSubmitForm();
        const isValid =Object.keys(userError).every(el=>userError[el]===null);
        if(isValid){

            let res = await forgetPassword(email);
            if(res){
                setValidateEmail(true);
            }
        }
        setIsLoading(false);
    }

    return (
        <>
        {userIsLoading&& <Loader/>}
        <div className="flex flex-col h-screen">
            <div className="bg-gray-800 min-h-[5rem]">
            </div>
            <div className="bg-gray-200 h-full flex justify-center align-center">
                <div className="flex flex-col justify-center align-center gap-14 min-w-[30rem] px-32">
                    { !validateEmail ?
                        (
                            <>
                                <p className="text-4xl leading-10 font-bold text-center">Ingrese el email del usuario</p>
                                <form onSubmit={handleSubmit} className="flex flex-col justify-center gap-4">
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
                                    <div className="flex">
                                        <Button
                                            text="Siguiente"
                                            type="submit"
                                            btnType="main"
                                        />
                                    </div>
                                </form>
                            </>

                        ) :
                        (
                            <>
                                <p className="text-5xl leading-10 font-bold text-center">
                                    Recuperación de contraseña
                                </p>
                                <p className="text-3xl leading-9 font-medium text-center">
                                    Hemos enviado un link a tu email, al que deberás acceder para poder actualizar tu contraseña.
                                </p>
                            </>
                        )
                    }

                </div>
            </div>
            <div className="bg-gray-900 min-h-[5rem]">
            </div>
        </div>
        </>
    )
}

export default  PasswordForget;