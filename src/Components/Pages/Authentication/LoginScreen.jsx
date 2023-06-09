import React from 'react';
import LoginForm from "../../Organisms/Authentication/LoginForm.jsx";

const LoginScreen = () => {
    return (
        <div className="relative bg-slate-50">

            <div className="login_background_top">
            </div>
            <div className="login_background_bottom">
            </div>

            <div className="absolute top-[6rem] left-auto right-auto ml-16 flex flex-col gap-4 min-w-[23rem] rounded-2xl">
                <LoginForm/>
            </div>
        </div>
    );
}
export default LoginScreen
