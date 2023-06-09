import React, {useState} from 'react';
import Button from "../../Atoms/Button.jsx";
import Icon from "@mdi/react";
import {mdiEmail} from "@mdi/js";
import Field from "../../Atoms/Field.jsx";
import useUser from "../../../Context/UserContext.jsx";
import {validateUserEmail} from "../../Organisms/Authentication/RegisterFormValidationInputs.js";
import {useForm} from "../../../hooks/useForm.js";
import Loader from "../../Atoms/Loader.jsx";
import AuthenticationTemplate from "./AuthenticationTemplate.jsx";
import PasswordForgetForm from "../../Organisms/Authentication/PasswordForgetForm.jsx";
import PasswordForgetMessage from "../../Organisms/Authentication/PasswordForgetMessage.jsx";

const PasswordForgetScreen = () => {
    const {userIsLoading} = useUser();
    const [validateEmail, setValidateEmail] = useState(false);

    return (
        <>
            {userIsLoading && <Loader/>}
            <AuthenticationTemplate>
                {!validateEmail ?
                    ( <PasswordForgetForm handleSendValidateEmail={setValidateEmail}/> )
                    :
                    ( <PasswordForgetMessage/> )
                }

            </AuthenticationTemplate>
        </>
    )
}

export default PasswordForgetScreen;