import React, { useState } from 'react';
import Icon from '@mdi/react';
import { mdiAccountCircle, mdiLock } from '@mdi/js';
import Field from '../../Atoms/Field.js';
import { Link, useNavigate } from 'react-router-dom';
import Button from '../../Atoms/Button.js';
import { validateUserEmail, validateUserPassword } from './LoginFormValidationInputs.js';
import { useSecurity } from '../../../Context/SecurityContext.jsx';
import { useForm } from '../../../hooks/useForm.js';

const validateFunctionsFormInputs = {
  email: validateUserEmail,
  password: validateUserPassword
};

const initialState = {
  email: '',
  password: ''
};

const LoginForm = ({ myContext = useSecurity }) => {
  const { addNewError, setIsLoading, securityError, logginUser } = myContext();

  const [formValues, handleInputChange, reset, validatedSubmitForm] = useForm(
    initialState,
    validateFunctionsFormInputs,
    addNewError
  );
  const { email, password } = formValues;
  const navigate = useNavigate();
  const [remember_me, setRemember_me] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    await validatedSubmitForm();
    const isValid = Object.keys(securityError).every((el) => securityError[el] === null);

    if (isValid) {
      const res = await logginUser({ email, password, remember_me });

      if (res) {
        const usuario = JSON.parse(localStorage.getItem('user'));
        usuario.is_verified ? navigate('/dashboard') : navigate('/notifyVerifyEmail');
      }
    }
    setIsLoading(false);
  };

  const handleCheckBoxClick = (e) => {
    setRemember_me(e.target.checked);
  };

  return (
    <>
      <div className="flex justify-center">
        <img src="https://picsum.photos/120/120" alt="user picture" className="rounded-full" />
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
          <label className="text-sm leading-5 font-semibold">
            <input
              type="checkbox"
              name="remember_me"
              value={remember_me}
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
