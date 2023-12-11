import Loader from '#/components/Loader';
import { useAppDispatch, useAppSelector } from '#/hooks/redux';
import { changeTitle } from '#/redux/slice/uiSlice';
import { type RootState } from '#/redux/store';
import React, { useEffect } from 'react';

const SuscriptionView: React.FC = () => {
  const uiLoading = useAppSelector((state: RootState) => state.ui.loadingState);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(changeTitle('Mantenimiento de Suscripciones de Youtube'));
  }, []);

  return (
    <>
      {uiLoading && <Loader />}
      <p>Suscripciones de Youtube</p>
    </>
  );
};

export default SuscriptionView;
