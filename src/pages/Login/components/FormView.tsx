import React from 'react';
import Button from '@/components/Button';
import Field from '@/components/Field';
import Icon from '@mdi/react';
import { Link } from 'react-router-dom';
import { mdiAccountCircle, mdiLock } from '@mdi/js';
import { type loginValidationError } from '../context/login.context';

interface Props {
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  handleInput: (evt: React.ChangeEvent<HTMLInputElement>) => void;
  handleCheckBoxClick: (evt: React.ChangeEvent<HTMLInputElement>) => void;
  email: string;
  password: string;
  rememberMe: boolean;
  loginError: loginValidationError;
}
const FormView: React.FC<Props> = ({
  handleSubmit,
  handleInput,
  handleCheckBoxClick,
  email,
  password,
  rememberMe,
  loginError
}) => {
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
            handleChange={handleInput}
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
            handleChange={handleInput}
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
              data-testid="remember_me"
            />{' '}
            Recordarme
          </label>
        </div>
        <div className="flex justify-between">
          <span className="text-sm leading-5 font-semibold">
            <Link to="/register" replace>
              Registrate
            </Link>
          </span>
          <span className="text-sm leading-5 font-semibold">
            <Link to="/forget-password" replace>
              ¿Olvidó su contraseña?
            </Link>
          </span>
        </div>
        <div className="flex">
          <Button text="Ingresar" type="submit" btnType="main" />
        </div>
      </form>
    </>
  );
};

export default FormView;
