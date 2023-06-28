import React, { useEffect, useRef, useState } from 'react';
import Icon from '@mdi/react';
import { mdiAccountCircle, mdiLock } from '@mdi/js';

import { Link } from 'react-router-dom';
import Button from '@/components/Components/Button.js';
import Field from '@/components/Components/Field.js';
import { useForm } from '@/utilities/hooks/useForm';

import {
  validateUserEmail,
  type User,
  type ValidationMessage,
  validateUserPassword
} from './LoginFormValidationInputs.js';
import { useLogin } from './context/login.context.js';
import { useDispatch } from 'react-redux';
import { isLoading } from '@/redux/slice/uiSlice.js';

type ValidationFunctions = Record<string, (values: User) => ValidationMessage>;

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
  // const [formIsValid, setFormIsValid] = useState(false);

  const dispatch = useDispatch();

  useEffect(() => {
    loginErrorRef.current = loginError;
  }, [loginError]);

  const handleCheckBoxClick = (evt: React.ChangeEvent<HTMLInputElement>): void => {
    setRememberMe(evt.target.checked);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();

    // TODO El loader no se esta mostrando, ya que se hace instantaneamente, verificar el motivo
    dispatch(isLoading(true));
    await validatedSubmitForm();
    const existValidationMessage = Object.keys(loginErrorRef.current).every(
      (el) => loginErrorRef.current[el] === null
    );

    if (existValidationMessage) {
      // const res = await logginUser({ email, password, remember_me });

      // if (res) {
      //   const usuario = JSON.parse(localStorage.getItem('user'));
      //   usuario.is_verified ? navigate('/dashboard') : navigate('/notifyVerifyEmail');
      // }
      console.log('Se hara login al backend');
    }
    dispatch(isLoading(false));
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
