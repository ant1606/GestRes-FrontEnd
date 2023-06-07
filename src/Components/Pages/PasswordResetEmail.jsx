import React, {useState} from 'react';
import Button from "../Atoms/Button.jsx";
import Icon from "@mdi/react";
import { mdiEmail} from "@mdi/js";
import Field from "../Atoms/Field.jsx";

const PasswordResetEmail = () => {

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
                                            handleChange={()=>{}}
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
    )
}

export default  PasswordResetEmail;