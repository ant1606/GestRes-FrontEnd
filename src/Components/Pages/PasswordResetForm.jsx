import React, {useState} from 'react';
import Button from "../Atoms/Button.jsx";
import Icon from "@mdi/react";
import {mdiEmail, mdiLock, mdiLockCheck} from "@mdi/js";
import Field from "../Atoms/Field.jsx";

const PasswordResetForm = () => {

    const [validateEmail,setValidateEmail ] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
    }

    const handleClick = () =>{return null;}


    return (
        <div className="flex flex-col h-screen">
            <div className="bg-gray-800 min-h-[5rem]">
            </div>
            <div className="bg-gray-200 h-full flex justify-center align-center">
                <div className="flex flex-col justify-center align-center gap-14 min-w-[30rem] px-32">
                    <p className="text-4xl leading-10 font-bold text-center">Ingrese su nueva contraseña</p>
                    <form onSubmit={handleSubmit} className="flex flex-col justify-center gap-4">
                        <div className="flex gap-3 items-center">
                            <Icon path={mdiLock} size={1} />
                            <Field
                                type="password"
                                name="password"
                                label="Password"
                                classBox="my-3 grow"
                                handleChange={()=>{}}
                            />
                        </div>
                        <div className="flex gap-3 items-center">
                            <Icon path={mdiLockCheck} size={1} />
                            <Field
                                type="password"
                                name="password_confirmation"
                                label="Confirmar Password"
                                classBox="my-3 grow"
                                handleChange={()=>{}}
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
                </div>
            </div>
            <div className="bg-gray-900 min-h-[5rem]">
            </div>
        </div>
    )
}

export default  PasswordResetForm;