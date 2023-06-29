import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import Icon from '@mdi/react';
import { mdiAccountCircle, mdiLock } from '@mdi/js';
import Button from '@/components/Components/Button.js';
import Field from '@/components/Components/Field.js';
import { isLoading } from '@/redux/slice/uiSlice.js';
import { useAppDispatch } from '@/hooks/redux/index.js';
import { useForm } from '@/hooks/useForm.js';

import {
  validateUserEmail,
  type User,
  type ValidationMessage,
  validateUserPassword
} from './LoginFormValidationInputs.js';
import { useLogin } from './context/login.context.js';
import { logginUser } from '@/services/login.services.js';
import { processErorrResponse } from '@/utilities/processAPIResponse.util.js';
import { toastNotifications } from '@/utilities/notificationsSwal.js';
import { setCookie } from '@/utilities/manageCookies.js';

type ValidationFunctions = Record<string, (values: User) => ValidationMessage>;
interface ResponseAPI {
  data?: Record<string, any>;
  error?: Record<string, any>;
}
const validateFunctionsFormInputs: ValidationFunctions = {
  email: validateUserEmail,
  password: validateUserPassword
};

const initialValue = {
  email: '',
  password: ''
};

const LoginForm: React.FC = () => {
  const { loginError, addValidationError } = useLogin();
  const {
    values: formValues,
    handleInputChange,
    validatedSubmitForm
  } = useForm(
    initialValue,
    validateFunctionsFormInputs as Record<string, (values: unknown) => string | null>,
    addValidationError
  );
  const { email, password } = formValues;

  // const navigate = useNavigate();
  const [rememberMe, setRememberMe] = useState(false);
  const loginErrorRef = useRef<Record<string, string | null>>({});

  const dispatch = useAppDispatch();

  useEffect(() => {
    loginErrorRef.current = loginError;
  }, [loginError]);

  const handleCheckBoxClick = (evt: React.ChangeEvent<HTMLInputElement>): void => {
    setRememberMe(evt.target.checked);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();

    try {
      dispatch(isLoading(true));
      await validatedSubmitForm();
      const existValidationMessage = Object.keys(loginErrorRef.current).every(
        (el) => loginErrorRef.current[el] === null
      );

      if (existValidationMessage) {
        // TODO Mandar tambien el remember_me al logginUser
        const response: ResponseAPI = await logginUser({
          email,
          password,
          remember_me: rememberMe
        });

        if ('data' in response) {
          // TODO Se almacenará el bearerToken en cookie y los datos del usuario en el localStorage y luego lo gestionare en el store
          // El cookie es porque permite manejar fecha de expiración
          // Pero queda pendiente implementar JWT para obtener los datos del usuario en un token encriptado
          // console.log(response);
          setCookie('bearerToken', response.data?.bearer_token, response.data?.bearer_expire);
          localStorage.setItem('rememberToken', response.data?.user.remember_token);
          localStorage.setItem('user', JSON.stringify(response.data?.user));
          //   // setUserIsLogged(data.data.user);
          // setUserIsLogged(data.data.user);
          // usuario.is_verified ? navigate('/dashboard') : navigate('/notifyVerifyEmail');
        } else if ('error' in response) {
          const errorProcesed = processErorrResponse(response.error?.detail);
          Object.keys(errorProcesed).forEach((key) => {
            // TODO colocar el nombre api_response de manera global en una constante o cambiar nombre
            if (key !== 'api_response') {
              addValidationError({ [key]: errorProcesed[key] });
            }
          });

          if ('api_response' in errorProcesed) {
            throw new Error(errorProcesed.api_response);
          }
        }
      }
    } catch (error) {
      toastNotifications().notificationError(error.message);
    } finally {
      dispatch(isLoading(false));
    }
  };

  const handleSubmitWrapper = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    handleSubmit(e); // Invocar la función handleSubmit sin esperar la promesa
  };

  return (
    <>
      <div className="flex justify-center">
        <img src="https://picsum.photos/120/120" alt="user" className="rounded-full" />
      </div>
      <div className="flex justify-center">
        <p className="text-4xl leading-10 font-bold">Login</p>
      </div>
      <form onSubmit={handleSubmitWrapper} className="flex flex-col justify-center gap-4">
        <div className="flex gap-3 items-center">
          <Icon path={mdiAccountCircle} size={1} />
          <Field
            type="text"
            name="email"
            label="Email"
            classBox="my-3 grow"
            handleChange={handleInputChange}
            value={email}
            errorInput={loginError?.email}
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
            errorInput={loginError?.password}
          />
        </div>
        <div>
          <label className="text-sm leading-5 font-semibold">
            <input
              type="checkbox"
              name="remember_me"
              checked={rememberMe}
              onChange={handleCheckBoxClick}
            />{' '}
            Recordarme
          </label>
        </div>
        <div className="flex justify-between">
          <span className="text-sm leading-5 font-semibold">
            <Link to="/register">Registrate</Link>
          </span>
          <span className="text-sm leading-5 font-semibold">
            <Link to="/forget-password">¿Olvidó su contraseña?</Link>
          </span>
        </div>
        <div className="flex">
          <Button text="Ingresar" type="submit" btnType="main" />
        </div>
      </form>
    </>
  );
};

export default LoginForm;
