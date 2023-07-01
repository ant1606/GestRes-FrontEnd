import Button from '@/components/Button';
import Field from '@/components/Field';
import { mdiEmail, mdiLock, mdiLockCheck } from '@mdi/js';
import Icon from '@mdi/react';
import React from 'react';

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
        <Icon path={mdiEmail} size={1} />
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
        <Icon path={mdiLock} size={1} />
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
        <Icon path={mdiLockCheck} size={1} />
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
