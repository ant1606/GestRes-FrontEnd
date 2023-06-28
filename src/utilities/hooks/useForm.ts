import { useCallback, useEffect, useState } from 'react';

interface useFormOutput {
  values: Record<string, any>;
  handleInputChange: (evt: React.ChangeEvent<HTMLInputElement>) => void;
  // TODO Cambiar el tipo de validatedSubmitForm
  validatedSubmitForm: any;
}

// TODO Ver si el initialState puede recibir un tipo Genérico para poder tipar el initialState desde el componente en donde se usa useForm()
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

      dispatcherErrorValidations({
        [inputToValidate]: validateMsg
      });
    }

    setInputToValidate(null);
  }, [inputToValidate, values, functionsToValidateInputs, dispatcherErrorValidations]);

  useEffect(() => {
    validatedInput();
  }, [validatedInput]);

  const validatedSubmitForm = async (): Promise<void> => {
    await new Promise<void>((resolve) => {
      const res = Object.keys(values).reduce((acc, curr) => {
        if (curr in functionsToValidateInputs) {
          return {
            ...acc,
            [curr]: functionsToValidateInputs[curr](values)
          };
        }
        return { ...acc };
      }, {});

      // TODO Corregir la advertencia Eslint
      Object.keys(res).map((x) =>
        dispatcherErrorValidations({
          [x]: res[x]
        })
      );
      resolve();
    });
  };

  return { values, handleInputChange, validatedSubmitForm };
};
