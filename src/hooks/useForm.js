import {useEffect, useState} from 'react';

export const useForm = (initialState = {}, validateInputs, dispatchError) => {
    const [values, setValues] = useState(initialState);
    const [isValidated, setIsValidated] = useState(Object.keys(initialState).reduce((acc, curr) => ({
        ...acc,
        [curr]: false
    }), {}));

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

        //Verificar que todos los atributos son validos
        if( !validateInputs[e.target.name](e.target.value)){
            setIsValidated(state => ({...state, [e.target.name]: true}));
        }else {
            setIsValidated(state => ({...state, [e.target.name]: false}));
        }
    };

    const isValid=() => {
        return Object.values(isValidated).every(el=>el===true);
    }

    return [values, handleInputChange, reset, isValid];
};
