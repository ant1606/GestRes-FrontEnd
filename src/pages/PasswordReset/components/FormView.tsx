import Button from '#/components/Button';
import Field from '#/components/Field';
import React from 'react';
import { IconContext } from 'react-icons';
import { MdEmail } from 'react-icons/md';
import { RiLock2Fill } from 'react-icons/ri';
import { BsFillShieldLockFill } from 'react-icons/bs';

interface Props {
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  handleInput: (evt: React.ChangeEvent<HTMLInputElement>) => void;
  email: string;
  password: string;
  passwordConfirmation: string;
  userError: Record<string, string>;
}
const FormView: React.FC<Props> = ({
  handleSubmit,
  handleInput,
  email,
  password,
  passwordConfirmation,
  userError
}) => {
  return (
    <form onSubmit={handleSubmit} className="flex flex-col justify-center gap-4">
      <div className="flex gap-3 items-center">
        <IconContext.Provider value={{ size: '2em' }}>
          <MdEmail />
        </IconContext.Provider>
        <Field
          type="text"
          name="email"
          label="Email"
          classBox="my-3 grow"
          handleChange={handleInput}
          value={email}
          errorInput={userError?.email}
        />
      </div>
      <div className="flex gap-3 items-center">
        <IconContext.Provider value={{ size: '2em' }}>
          <RiLock2Fill />
        </IconContext.Provider>
        <Field
          type="password"
          name="password"
          label="Nueva Contraseña"
          classBox="my-3 grow"
          handleChange={handleInput}
          value={password}
          errorInput={userError?.password}
        />
      </div>
      <div className="flex gap-3 items-center">
        <IconContext.Provider value={{ size: '2em' }}>
          <BsFillShieldLockFill />
        </IconContext.Provider>
        <Field
          type="password"
          name="passwordConfirmation"
          label="Confirmar Nueva Contraseña"
          classBox="my-3 grow"
          handleChange={handleInput}
          value={passwordConfirmation}
          errorInput={userError?.passwordConfirmation}
        />
      </div>
      <div className="flex">
        <Button text="Cambiar Contraseña" type="submit" btnType="main" />
      </div>
    </form>
  );
};

export default FormView;
