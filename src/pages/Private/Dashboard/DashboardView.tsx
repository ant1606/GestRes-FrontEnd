import { useAppDispatch } from '#/hooks/redux';
import { changeTitle } from '#/redux/slice/uiSlice';
import React, { useEffect } from 'react';
import PanelRecourses from './components/PanelRecourses';
import PanelCountStatus from './components/PanelCountStatus';

const DashboardView: React.FC = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(changeTitle('Dashboard'));
  }, [dispatch]);

  return (
    <div className="grid grid-cols-6 gap-8">
      <PanelRecourses />
      <PanelCountStatus />
    </div>
  );
};

export default DashboardView;
