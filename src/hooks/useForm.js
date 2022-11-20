import {useEffect, useState} from 'react';

export const useForm = (initialState = {}, dispatchError, validateInputs) => {

    const [values, setValues] = useState(initialState);


    // Cuando se pasa el tipoId de RecourseForm, si se pasa 1, el values lo pasa a 0, no se encontro porque pasa eso
    const reset = (newFormState = initialState) => {
        setValues(newFormState);
    };

    const handleInputChange = (e) => {
        setValues({
            ...values,
            [e.target.name]: e.target.value,
        });

        /* Disparar los errores de validacion aqui */
        dispatchError({
            [e.target.name]: validateInputs[e.target.name](e.target.value)
        });
    };

    return [values, handleInputChange, reset];
};
