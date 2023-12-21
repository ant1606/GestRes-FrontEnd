import Button from '#/components/Button';
import Field from '#/components/Field';
import React from 'react';
import { IconContext } from 'react-icons';
import { BsFillShieldLockFill } from 'react-icons/bs';
import { MdEmail } from 'react-icons/md';
import { RiAccountCircleFill, RiLock2Fill } from 'react-icons/ri';
interface Props {
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  handleInputChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  name: string;
  userError: Record<string, string>;
  email: string;
  password: string;
  passwordConfirmation: string;
}
const FormView: React.FC<Props> = ({
  handleSubmit,
  handleInputChange,
  name,
  userError,
  email,
  password,
  passwordConfirmation
}) => {
  return (
    <>
      <p className="text-4xl leading-10 font-bold text-center">Registro de Usuario</p>
      <form onSubmit={handleSubmit} className="flex flex-col justify-center gap-4">
        <div className="flex gap-3 items-center">
          <IconContext.Provider value={{ size: '2em' }}>
            <RiAccountCircleFill />
          </IconContext.Provider>
          <Field
            type="text"
            name="name"
            label="Nombre"
            classBox="my-3 grow"
            handleChange={handleInputChange}
            value={name}
            errorInput={userError?.name}
          />
        </div>
        <div className="flex gap-3 items-center">
          <IconContext.Provider value={{ size: '2em' }}>
            <MdEmail />
          </IconContext.Provider>
          <Field
            type="text"
            name="email"
            label="Email"
            classBox="my-3 grow"
            handleChange={handleInputChange}
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
            label="Password"
            classBox="my-3 grow"
            handleChange={handleInputChange}
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
            label="Confirmar Password"
            classBox="my-3 grow"
            handleChange={handleInputChange}
            value={passwordConfirmation}
            errorInput={userError?.passwordConfirmation}
          />
        </div>
        <div className="flex">
          <Button text="Registrar" type="submit" btnType="main" />
        </div>
      </form>
    </>
  );
};

export default FormView;
