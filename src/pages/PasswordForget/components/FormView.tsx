import Button from '#/components/Button';
import Field from '#/components/Field';
import { MdEmail } from 'react-icons/md';
import React from 'react';
import { IconContext } from 'react-icons';

interface Props {
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  handleInput: (evt: React.ChangeEvent<HTMLInputElement>) => void;
  email: string;
  userError: Record<string, string>;
}

const FormView: React.FC<Props> = ({ handleSubmit, handleInput, email, userError }) => {
  return (
    <>
      <p className="text-4xl leading-10 font-bold text-center">Ingrese el email del usuario</p>
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
        <div className="flex">
          <Button text="Siguiente" type="submit" btnType="main" />
        </div>
      </form>
    </>
  );
};

export default FormView;
