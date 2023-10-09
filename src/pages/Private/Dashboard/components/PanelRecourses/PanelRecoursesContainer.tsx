import React, { useEffect, useState } from 'react';
import PanelRecoursesView from './PanelRecoursesView';
import { getTop5Recourses } from '#/services/dashboard.services';
import { RecourseSuccessResponse, type RecourseTop5 } from './index.type';

export const PanelRecoursesContainer: React.FC = () => {
  const [isPorEmpezar, setIsPorEmpezar] = useState<boolean>(true);
  const [listRecourses, setListRecourses] = useState<RecourseTop5[]>([]);

  const handleCheckChange = (): void => {
    setIsPorEmpezar(!isPorEmpezar);
  };

  useEffect(() => {
    const getData = async (): Promise<void> => {
      const response = await getTop5Recourses(isPorEmpezar);
      setListRecourses(response.data);
    };

    getData();
  }, [isPorEmpezar]);

  return <PanelRecoursesView handleChange={handleCheckChange} listRecourses={listRecourses} />;
};
