import React from 'react';
import Icon from '@mdi/react';
import { mdiAccountCircle, mdiEmail, mdiLock, mdiLockCheck } from '@mdi/js';
import Field from '../../Atoms/Field.js';
import Button from '../../Atoms/Button.js';
import {
  validateUserEmail,
  validateUserName,
  validateUserPassword,
  validateUserPasswordConfirmation
} from './RegisterFormValidationInputs.js';
import useUser from '../../../Context/UserContext.jsx';
import { useForm } from '../../../hooks/useForm.js';

const validateFunctionsFormInputs = {
  name: validateUserName,
  email: validateUserEmail,
  password: validateUserPassword,
  password_confirmation: validateUserPasswordConfirmation
};

const initialState = {
  name: '',
  email: '',
  password: '',
  password_confirmation: ''
};

const RegisterUserForm = ({ handleUserRegistered }) => {
  const { addNewError, userError, savingUser, setIsLoading } = useUser();

  const [formValues, handleInputChange, reset, validatedSubmitForm] = useForm(
    initialState,
    validateFunctionsFormInputs,
    addNewError
  );
  const { name, email, password, password_confirmation } = formValues;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    await validatedSubmitForm();
    const isValid = Object.keys(userError).every((el) => userError[el] === null);
    if (isValid) {
      const res = await savingUser({
        name,
        email,
        password,
        password_confirmation
      });

      if (res) {
        handleUserRegistered(true);
      }
    }
    setIsLoading(false);
  };

  return (
    <>
      <p className="text-4xl leading-10 font-bold text-center">Registro de Usuario</p>
      <form onSubmit={handleSubmit} className="flex flex-col justify-center gap-4">
        <div className="flex gap-3 items-center">
          <Icon path={mdiAccountCircle} size={1} />
          <Field
            type="text"
            name="name"
            label="Nombre"
            classBox="my-3 grow"
            handleChange={handleInputChange}
            value={name}
            errorInput={userError.name}
          />
        </div>
        <div className="flex gap-3 items-center">
          <Icon path={mdiEmail} size={1} />
          <Field
            type="text"
            name="email"
            label="Email"
            classBox="my-3 grow"
            handleChange={handleInputChange}
            value={email}
            errorInput={userError.email}
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
            errorInput={userError.password}
          />
        </div>
        <div className="flex gap-3 items-center">
          <Icon path={mdiLockCheck} size={1} />
          <Field
            type="password"
            name="password_confirmation"
            label="Confirmar Password"
            classBox="my-3 grow"
            handleChange={handleInputChange}
            value={password_confirmation}
            errorInput={userError.password_confirmation}
          />
        </div>
        <div className="flex">
          <Button text="Registrar" type="submit" btnType="main" />
        </div>
      </form>
    </>
  );
};
export default RegisterUserForm;
