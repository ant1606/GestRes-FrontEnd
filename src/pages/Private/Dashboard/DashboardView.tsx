import { useAppDispatch } from '#/hooks/redux';
import { changeTitle } from '#/redux/slice/uiSlice';
import React, { useEffect } from 'react';

const DashboardView: React.FC = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(changeTitle('Dashboard'));
  }, [dispatch]);

  return <div>DashboardView</div>;
};

export default DashboardView;
