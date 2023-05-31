import React from 'react';
import Field from "../Atoms/Field.jsx";
import Button from "../Atoms/Button.jsx";
import useSecurity from '../../Context/SecurityContext';
import Icon from '@mdi/react';

import { mdiAccountCircle } from '@mdi/js';
import { mdiLock } from '@mdi/js';

import {validateUserEmail, validateUserPassword} from "./LoginFormValidationInputs.js";
import {useForm} from "../../hooks/useForm.js";

const validateFunctionsFormInputs ={
    email: validateUserEmail,
    password: validateUserPassword
};

const initialState = {
    email: '',
    password: ''
};

const Login = () => {
    const {
        addNewError,
        setIsLoading,
        securityError,
    } = useSecurity();
    const [formValues, handleInputChange, reset, validatedSubmitForm] = useForm(initialState, validateFunctionsFormInputs, addNewError);
    const {email, password} = formValues;

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        await validatedSubmitForm();
        const isValid =Object.keys(securityError).every(el=>securityError[el]===null);
        console.log(isValid);
        if(isValid){
            //Guardamos la cookie ya que el formulario fue validado
            fetch('http://localhost/api/login',{
                method: 'POST',
                headers: {
                    "Content-Type": "application/json",
                    "accept": "application/json"
                },
                body: JSON.stringify({
                    email:"test@example.com",
                    password:"password"
                })
            }).then( res => res.json())
                .then(data =>{
                    setCookie("bearerToken", data.data.token, data.data.expire_date);
                    // setCookie("miprueba", "valor1", "Wed 31 May 2023 20:40:24 GMT");
                } );
            //TODO setear que el usuario fue logeado
        }
        setIsLoading(false);
    }

    function setCookie(key, value, expire=null ){
        let cookieValue =`${key}=${value}`;
        if(expire!==null){
            cookieValue += `; expires=${expire};`;
        }
        document.cookie =`${key}=${value}; expires=${expire}`;
    }
    function getCookie(name) {
        // Separa las cookies individuales en un arreglo
        var cookies = document.cookie.split(';');

        // Itera sobre cada cookie
        for (var i = 0; i < cookies.length; i++) {
            var cookie = cookies[i].trim();

            // Verifica si la cookie comienza con el nombre buscado
            if (cookie.startsWith(name + '=')) {
                // Extrae y devuelve el valor de la cookie
                return cookie.substring(name.length + 1);
            }
        }

        // Retorna null si no se encontró la cookie
        return null;
    }

    return (
        <div className="relative bg-slate-50">

            <div className="login_background_top">
            </div>
            <div className="login_background_bottom">
            </div>

            <div className="absolute top-[6rem] left-auto right-auto ml-16 flex flex-col gap-4 min-w-[23rem] rounded-2xl">
                <div className="flex justify-center">
                    <img src="https://picsum.photos/120/120" alt="user picture"
                         className="rounded-full"/>
                </div>
                <div className="flex justify-center">
                    <p className="text-4xl leading-10 font-bold">Login</p>
                </div>
                <form onSubmit={handleSubmit} className="flex flex-col justify-center gap-4">
                    <div className="flex gap-3 items-center">
                        <Icon path={mdiAccountCircle} size={1} />
                        <Field
                            type="text"
                            name="email"
                            label="Email"
                            classBox="my-3 grow"
                            handleChange={handleInputChange}
                            value={email}
                            errorInput={securityError.email}
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
                            errorInput={securityError.password}
                        />
                    </div>
                    <div>
                        <label className="text-sm leading-5 font-semibold"><input type="checkbox" value="" /> Recordarme</label>
                    </div>
                    <div className="flex justify-between">
                        <a href="#" className="text-sm leading-5 font-semibold">Registrate</a>
                        <a href="#" className="text-sm leading-5 font-semibold">¿Olvidó su contraseña?</a>
                    </div>
                    <div className="flex">
                        <Button
                            text="Ingresar"
                            type="submit"
                            btnType="main"
                        />
                    </div>
                </form>
            </div>
        </div>
    );
}
export default Login