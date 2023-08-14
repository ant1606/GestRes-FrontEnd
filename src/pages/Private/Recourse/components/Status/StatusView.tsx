import Button from '@/components/Button';
import React from 'react';
import Table from './components/Table';
import FooterTable from '@/components/FooterTable';
import { useStatus } from './context/status.context';
interface Props {
  handleClick: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  handlePageChange: (selectedItem: { selected: number }) => void;
}
const StatusView: React.FC<Props> = ({ handleClick, handlePageChange }) => {
  const { statuses, statusMeta } = useStatus();
  return (
    <>
      <Button text="Registrar Nuevo" handleClick={handleClick} btnType="main" type="button" />
      {statuses.length === 0 ? (
        <p>No se encontraron resultados</p>
      ) : (
        <>
          <Table />
          {statusMeta !== null && (
            <FooterTable handlePageChange={handlePageChange} {...statusMeta} />
          )}
        </>
      )}
    </>
  );
};

export default StatusView;
