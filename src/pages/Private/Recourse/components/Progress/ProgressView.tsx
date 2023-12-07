import Button from '#/components/Button';
import React from 'react';
import Table from './components/Table';
import { useProgress } from './context/progress.context';
import FooterTable from '#/components/FooterTable';

interface Props {
  handleClick: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  handlePageChange: (selectedItem: { selected: number }) => void;
}

const ProgressView: React.FC<Props> = ({ handleClick, handlePageChange }) => {
  const { progresses, progressMeta } = useProgress();
  return (
    <>
      <Button text="Registrar Nuevo" onClick={handleClick} btnType="main" type="button" />
      {progresses.length === 0 ? (
        <p>No se encontraron resultados</p>
      ) : (
        <>
          <Table />
          {progressMeta !== null && (
            <FooterTable handlePageChange={handlePageChange} {...progressMeta} />
          )}
        </>
      )}
    </>
  );
};

export default ProgressView;
