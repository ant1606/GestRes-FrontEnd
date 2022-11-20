import {useEffect, useState} from 'react';

export const useForm = (initialState = {}, validateInputs, dispatchError) => {
    const [values, setValues] = useState(initialState);
    const [inputValidate, setInputValidate] = useState(null);
    const [isValidated, setIsValidated] = useState(Object.keys(initialState).reduce((acc, curr) => ({
        ...acc,
        [curr]: false
    }), {}));

    useEffect(()=>{
        validateInput();
    },[values]);

    // Cuando se pasa el tipoId de RecourseForm, si se pasa 1, el values lo pasa a 0, no se encontro porque pasa eso (Verificar si haciendo el reset en el form se soluciona esto
    const reset = (newFormState = initialState) => {
        setValues(newFormState);
    };

    const handleInputChange = (e) => {
        setInputValidate(e.target.name);
        setValues({
            ...values,
            [e.target.name]: e.target.value,
        });
    };

    const validateInput = () => {
        if(inputValidate!==null){
            const validateMsg = validateInputs[inputValidate](values);

            /* Disparar los errores de validacion aqui */
            dispatchError({
                [inputValidate]: validateMsg
            });

            //Definiendo si el input es valido o no en el objeto isValidated
            if( !validateMsg){
                setIsValidated(state => ({...state, [inputValidate]: true}));
            }else {
                setIsValidated(state => ({...state, [inputValidate]: false}));
            }
        }

        setInputValidate(null);
    }

    const isValid=() => {
        return Object.values(isValidated).every(el=>el===true);
    }

    return [values, handleInputChange, reset, isValid];
};
