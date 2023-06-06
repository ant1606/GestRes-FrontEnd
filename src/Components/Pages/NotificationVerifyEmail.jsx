import React from "react";
import Icon from "@mdi/react";
import {mdiAccountCircle, mdiEmail, mdiLock, mdiLockCheck} from "@mdi/js";
import Field from "../Atoms/Field.jsx";
import Button from "../Atoms/Button.jsx";

const NotificationVerifyEmail = () => {
    return(
        <>
            <div className="flex flex-col h-screen">
                <div className="bg-gray-800 min-h-[5rem]">
                </div>
                <div className="bg-gray-200 h-full flex justify-center align-center">
                    <div className="flex flex-col justify-center align-center gap-14 min-w-[30rem] px-32">
                        <p className="text-5xl leading-10 font-bold text-center">
                            ¡Gracias por registarte!
                        </p>
                        <p className="text-3xl leading-9 font-medium text-center">
                            Hemos enviado un link a tu email, al que deberás acceder para verificar tu email y finalizar con tu registro en el sistema.
                        </p>
                        <p className="text-3xl leading-9 font-bold  text-center">
                            Si aún no haz recibido el link de verificación da click en el siguiente botón para solicitarlo nuevamente.
                        </p>

                        <form  className="flex flex-col justify-center gap-4">
                            <div className="flex">
                                <Button
                                    text="Solicitar Link de verificación de email"
                                    type="submit"
                                    btnType="main"
                                />
                            </div>
                        </form>
                        <p>
                            Ir a login
                        </p>
                    </div>
                </div>
                <div className="bg-gray-900 min-h-[5rem]">
                </div>
            </div>
        </>
    )
}

export default NotificationVerifyEmail;