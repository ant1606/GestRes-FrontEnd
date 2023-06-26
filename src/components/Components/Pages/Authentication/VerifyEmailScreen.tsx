import React, { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useSecurity } from '../../../Context/SecurityContext.jsx';
import AuthenticationTemplate from './AuthenticationTemplate.js';

const VerifyEmailScreen = () => {
  const { id, hash } = useParams();
  const { verifyUserEmail } = useSecurity();
  const navigate = useNavigate();

  useEffect(() => {
    async function verifiedUserEmail(id, hash) {
      const res = await verifyUserEmail(id, hash);
      if (res) {
        navigate('/dashboard');
      }
    }

    verifiedUserEmail(id, hash);
  }, []);

  return (
    <>
      <AuthenticationTemplate>
        <p className="text-5xl leading-10 font-bold text-center">
          Estamos verificando tu correo electrónico ...
        </p>
      </AuthenticationTemplate>
    </>
  );
};
export default VerifyEmailScreen;
