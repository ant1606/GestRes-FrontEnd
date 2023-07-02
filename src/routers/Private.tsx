import React, { useEffect } from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';

export const Private: React.FC = () => {
  const userIsVerified = false;
  const navigate = useNavigate();
  useEffect(() => {
    if (userIsVerified) navigate('/notifyVerifyEmail', { replace: true });
  }, []);

  return (
    <Route>
      {!userIsVerified ? (
        <Route path="/notifyVerifyEmail" element={<>Verifica email</>}></Route>
      ) : (
        <Route path="/dashboard" element={<>Dashboard</>}></Route>
      )}
    </Route>
  );
};
