import {useEffect, useState} from 'react';

export const useForm = (initialState = {}, validateInputs, dispatchError) => {
    const [values, setValues] = useState(initialState);
    const [inputValidate, setInputValidate] = useState(null);
    //TODO Verificar el uso de isValid y isValidated
    const [isValid, setIsValid] = useState(false);
    const [isValidated, setIsValidated] = useState(Object.keys(initialState).reduce((acc, curr) => ({
        ...acc,
        [curr]: false
    }), {}));


    useEffect(()=>{
        validatedInput();
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

    const validatedInput = () => {
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

    //Usado en el caso el tagActive este seleccionado y este es enviado a values como initialState del customHook
    const validatedSubmitForm = () => {
        const res = Object.keys(values).reduce((acc, curr) => {
            if (Object.hasOwn(validateInputs, curr)){
                return {
                    ...acc,
                    [curr] : validateInputs[curr](values)
                };
            }
            return {...acc};
        }, {});

        Object.keys(res).map( x => {
            dispatchError({
                [x]: res[x]
            });

            //Definiendo si el input es valido o no en el objeto isValidated
            if( !res[x]){
                setIsValidated(state => ({...state, [x]: true}));
            }else {
                setIsValidated(state => ({...state, [x]: false}));
            }
        });
    }

    return [values, handleInputChange, reset, validatedSubmitForm];
};
