import { useEffect, useState } from 'react';

interface useFormOutput<T> {
  values: Record<string, any>;
  handleInputChange: (evt: React.ChangeEvent<HTMLInputElement>) => void;
  reset: (newFormState?: Record<string, any>) => void;
  validatedSubmitForm: () => void;
}

export const useForm = <T>(
  initialState: Record<string, any> = {},
  validateInputs: T,
  dispatchError: (error: Record<string, string>) => void
): useFormOutput<T> => {
  const [values, setValues] = useState(initialState);
  const [inputValidate, setInputValidate] = useState<string | null>(null);
  // TODO Verificar el uso de isValid y isValidated
  // const [isValid, setIsValid] = useState(false);
  const [, setIsValidated] = useState<Record<string, boolean>>(
    Object.keys(initialState).reduce(
      (acc, curr) => ({
        ...acc,
        [curr]: false
      }),
      {}
    )
  );

  useEffect(() => {
    validatedInput();
  }, [values]);

  // Cuando se pasa el tipoId de RecourseForm, si se pasa 1, el values lo pasa a 0, no se encontro porque pasa eso (Verificar si haciendo el reset en el form se soluciona esto
  const reset = (newFormState: Record<string, any> = initialState): void => {
    setValues(newFormState);
  };

  const handleInputChange = (evt: React.ChangeEvent<HTMLInputElement>): void => {
    setInputValidate(evt.target.name);
    setValues({
      ...values,
      [evt.target.name]: evt.target.value
    });
  };

  const validatedInput = (): void => {
    if (inputValidate !== null) {
      const validateMsg = validateInputs[inputValidate](values);
      /* Disparar los errores de validacion aqui */
      dispatchError({
        [inputValidate]: validateMsg
      });

      // Definiendo si el input es valido o no en el objeto isValidated
      if (validateMsg.trim.length === 0) {
        setIsValidated((state) => ({ ...state, [inputValidate]: true }));
      } else {
        setIsValidated((state) => ({ ...state, [inputValidate]: false }));
      }
    }

    setInputValidate(null);
  };

  // Usado en el caso el tagActive este seleccionado y este es enviado a values como initialState del customHook
  const validatedSubmitForm = (): void => {
    const res = Object.keys(values).reduce((acc, curr) => {
      if (curr in validateInputs) {
        // if (Object.hasOwn(validateInputs, curr)) {
        return {
          ...acc,
          [curr]: validateInputs[curr](values)
        };
      }
      return { ...acc };
    }, {});

    Object.keys(res).forEach((x) => {
      dispatchError({
        [x]: res[x]
      });

      // Definiendo si el input es valido o no en el objeto isValidated
      if (!res[x]) {
        setIsValidated((state) => ({ ...state, [x]: true }));
      } else {
        setIsValidated((state) => ({ ...state, [x]: false }));
      }
    });
  };

  return { values, handleInputChange, reset, validatedSubmitForm };
};
