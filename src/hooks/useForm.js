import {useEffect, useState} from 'react';

export const useForm = (initialState = {}) => {
    const [values, setValues] = useState(initialState);

    // Cuando se pasa el tipoId de RecourseForm, si se pasa 1, el values lo pasa a 0, no se encontro porque pasa eso
    const reset = (newFormState = initialState) => {
        setValues(newFormState);
    };

    const handleInputChange = (e) => {
        console.log("Desde el inputChange");
        console.log(e.target.value);
        setValues({
            ...values,
            [e.target.name]: e.target.value,
        });
    };

    const resetValue = (name) =>{
        setValues({
            ...values,
            [name]: initialState.name,
        });
    }

    return [values, handleInputChange, reset, resetValue];
};
