import Button from '@/components/Button';
import React from 'react';
import Table from './components/Table';
interface Props {
  handleClick: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
}
const StatusView: React.FC<Props> = ({ handleClick }) => {
  return (
    <>
      <Button text="Registrar Nuevo" handleClick={handleClick} btnType="main" type="button" />
      <Table />
    </>
  );
};

export default StatusView;
