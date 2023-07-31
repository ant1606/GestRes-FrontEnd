import Button from '@/components/Button';
import React from 'react';

interface Props {
  handleClick: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
}

const ProgressView: React.FC<Props> = ({ handleClick }) => {
  return (
    <>
      <Button text="Registrar Nuevo" handleClick={handleClick} btnType="main" type="button" />
    </>
  );
};

export default ProgressView;
