import { useAppDispatch } from '#/hooks/redux';
import { changeTitle } from '#/redux/slice/uiSlice';
import React, { useEffect } from 'react';
import PanelRecoursesContainer from './components/PanelRecourses';

const DashboardView: React.FC = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(changeTitle('Dashboard'));
  }, [dispatch]);

  return (
    <div className="grid grid-cols-6">
      <PanelRecoursesContainer />
    </div>
  );
};

export default DashboardView;
