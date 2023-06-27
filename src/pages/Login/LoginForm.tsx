import React, { useState } from 'react';
import Icon from '@mdi/react';
import { mdiAccountCircle, mdiLock } from '@mdi/js';

import { Link } from 'react-router-dom';
import Button from '../../components/Components/Button.js';
// import {
//   type User,
//   validateUserEmail,
//   validateUserPassword,
//   type ValidationMessage
// } from './LoginFormValidationInputs.js';
// import { useSecurity } from '../../../Context/SecurityContext.jsx';

import Field from '@/components/Components/Field.js';
import { useForm } from '@/utilities/hooks/useForm';
import {
  validateUserEmail,
  type User,
  type ValidationMessage,
  validateUserPassword
} from './LoginFormValidationInputs.js';
import { useLogin } from './context/login.context.js';
// import { useForm } from '@/utilities/hooks/useForm.js';

type ValidationFunctions = Record<string, (values: User) => ValidationMessage>;

const validateFunctionsFormInputs: ValidationFunctions = {
  email: validateUserEmail,
  password: validateUserPassword
};

// const initialState = {
//   email: '',
//   password: ''
// };

// const addNewError = {};

const LoginForm: React.FC = () => {
  const { loginError, addValidationError } = useLogin();
  // console.log({ loginError }, 'desde componente');
  // const { addNewError, setIsLoading, securityError, logginUser } = myContext();

  // const [formValues, handleInputChange, ,] = useForm<ValidationFunctions>(
  //   initialState,
  //   validateFunctionsFormInputs,
  //   addNewError
  // );
  const initialValue = {
    email: '',
    password: ''
  };

  const { values: formValues, handleInputChange } = useForm(
    initialValue,
    validateFunctionsFormInputs as Record<string, (values: unknown) => string | null>,
    addValidationError
  );
  const { email, password } = formValues;

  // const securityError = {
  //   email: '',
  //   password: ''
  // };

  // const { email, password } = formValues;
  // const navigate = useNavigate();
  const [rememberMe, setRememberMe] = useState(false);

  // const handleInputChange = (evt: React.ChangeEvent<HTMLInputElement>): void => {
  //   console.log(evt.target.value);
  // };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    // console.log(formValues);
    // setIsLoading(true);
    // await validatedSubmitForm();
    // const isValid = Object.keys(securityError).every((el) => securityError[el] === null);

    // if (isValid) {
    //   const res = await logginUser({ email, password, remember_me });

    //   if (res) {
    //     const usuario = JSON.parse(localStorage.getItem('user'));
    //     usuario.is_verified ? navigate('/dashboard') : navigate('/notifyVerifyEmail');
    //   }
    // }
    // setIsLoading(false);
  };

  const handleCheckBoxClick = (evt: React.ChangeEvent<HTMLInputElement>): void => {
    setRememberMe(evt.target.checked);
  };
  // console.log(loginError.email, 'mensaje');
  return (
    <>
      <div className="flex justify-center">
        <img src="https://picsum.photos/120/120" alt="user" className="rounded-full" />
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
