import React, { useEffect } from 'react';
import Form from '../../components/Form';
import { useRecourse } from '../../context/recourse.context';

export const EditPage: React.FC = () => {
  const { cleanSelectedRecourse } = useRecourse();
  useEffect(() => {
    return () => {
      cleanSelectedRecourse();
    };
  }, []);
  return <Form />;
};
