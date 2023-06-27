import React, { useState } from 'react';
import Icon from '@mdi/react';
import { mdiEmail } from '@mdi/js';
import Field from '../../Atoms/Field.js';
import Button from '../../Button.js';
import { validateUserEmail } from './RegisterFormValidationInputs.js';
import useUser from '../../../Context/UserContext.jsx';
import { useForm } from '../../../hooks/useForm.js';

const validateFunctionsFormInputs = {
  email: validateUserEmail
};

const initialState = {
  email: ''
};

const PasswordForgetForm = ({ handleSendValidateEmail }) => {
  const { forgetPassword, setIsLoading, addNewError, userError } = useUser();

  const [formValues, handleInputChange, reset, validatedSubmitForm] = useForm(
    initialState,
    validateFunctionsFormInputs,
    addNewError
  );
  const { email } = formValues;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    await validatedSubmitForm();
    const isValid = Object.keys(userError).every((el) => userError[el] === null);
    if (isValid) {
      const res = await forgetPassword(email);
      if (res) {
        handleSendValidateEmail(true);
      }
    }
    setIsLoading(false);
  };

  return (
    <>
      <p className="text-4xl leading-10 font-bold text-center">Ingrese el email del usuario</p>
      <form onSubmit={handleSubmit} className="flex flex-col justify-center gap-4">
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
        <div className="flex">
          <Button text="Siguiente" type="submit" btnType="main" />
        </div>
      </form>
    </>
  );
};

export default PasswordForgetForm;
