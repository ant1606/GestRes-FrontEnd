import React, {useEffect} from 'react';
import {useNavigate, useParams} from "react-router-dom";
import useSecurity from "../../Context/SecurityContext.jsx";

const VerifyEmail = () => {
    let {id, hash} = useParams();
    const {verifyUserEmail} = useSecurity();
    const navigate = useNavigate();

    useEffect( ()=>{
        async function verifiedUserEmail(id, hash) {
            let res = await verifyUserEmail(id, hash);
            if(res){
                navigate("/dashboard");
            }
        }

        verifiedUserEmail(id, hash);
    },[]);



    return (
        <>
        <div>Verificando email</div>
        </>
    );
}
export default VerifyEmail;