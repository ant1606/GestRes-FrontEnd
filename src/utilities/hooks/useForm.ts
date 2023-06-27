import { useCallback, useEffect, useState } from 'react';

interface useFormOutput {
  values: Record<string, any>;
  handleInputChange: (evt: React.ChangeEvent<HTMLInputElement>) => void;
}

interface useFormInput {
  initialState: Record<string, unknown>;
  functionsToValidateInputs: Record<string, (values: unknown) => string | null>;
  dispatcherErrorValidations: (values: unknown) => string | null;
}

export const useForm = <T extends useFormInput>(
  initialState: T['initialState'],
  functionsToValidateInputs: T['functionsToValidateInputs'],
  dispatcherErrorValidations: T['dispatcherErrorValidations']
): useFormOutput => {
  const [values, setValues] = useState(initialState);
  const [inputToValidate, setInputToValidate] = useState<string | null>(null);

  const handleInputChange = (evt: React.ChangeEvent<HTMLInputElement>): void => {
    setValues({
      ...values,
      [evt.target.name]: evt.target.value
    });
    setInputToValidate(evt.target.name);
  };

  const validatedInput = useCallback(() => {
    if (inputToValidate !== null) {
      const validateMsg = functionsToValidateInputs[inputToValidate](values);
      // console.log({ validateMsg });

      dispatcherErrorValidations({
        [inputToValidate]: validateMsg
      });

      // Definiendo si el input es valido o no en el objeto isValidated
      // if (validateMsg.trim.length === 0) {
      //   setIsValidated((state) => ({ ...state, [inputValidate]: true }));
      // } else {
      //   setIsValidated((state) => ({ ...state, [inputValidate]: false }));
      // }
    }

    setInputToValidate(null);
  }, [inputToValidate, values, functionsToValidateInputs, dispatcherErrorValidations]);

  useEffect(() => {
    validatedInput();
  }, [validatedInput]);

  return { values, handleInputChange };
};
