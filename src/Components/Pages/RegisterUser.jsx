import React from 'react';
import Icon from "@mdi/react";
import {mdiAccountCircle, mdiEmail, mdiLock, mdiLockCheck} from "@mdi/js";
import Field from "../Atoms/Field.jsx";
import Button from "../Atoms/Button.jsx";

const RegisterUser = () => {
    return (
        <div className="flex flex-col h-screen">
            <div className="bg-gray-800 min-h-[5rem]">
            </div>
            <div className="bg-gray-200 h-full flex justify-center align-center">
                <div className="flex flex-col justify-center align-center gap-6 min-w-[30rem]">
                    <p className="text-4xl leading-10 font-bold text-center">Registro de Usuario</p>
                    <form  className="flex flex-col justify-center gap-4">
                        <div className="flex gap-3 items-center">
                            <Icon path={mdiAccountCircle} size={1} />
                            <Field
                                type="text"
                                name="nombre"
                                label="Nombre"
                                classBox="my-3 grow"
                            />
                        </div>
                        <div className="flex gap-3 items-center">
                            <Icon path={mdiEmail} size={1} />
                            <Field
                                type="text"
                                name="email"
                                label="Email"
                                classBox="my-3 grow"
                            />
                        </div>
                        <div className="flex gap-3 items-center">
                            <Icon path={mdiLock} size={1} />
                            <Field
                                type="text"
                                name="password"
                                label="Password"
                                classBox="my-3 grow"
                            />
                        </div>
                        <div className="flex gap-3 items-center">
                            <Icon path={mdiLockCheck} size={1} />
                            <Field
                                type="text"
                                name="password_confirmation"
                                label="Confirmar Password"
                                classBox="my-3 grow"
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