import React, { useEffect, useState } from 'react';
import PanelRecoursesView from './PanelRecoursesView';
import { getTop5Recourses } from '#/services/dashboard.services';
import {
  type Top5RecoursesErrorResponse,
  type Top5RecoursesSuccessResponse,
  type Top5Recourse
} from './index.type';

export const PanelRecoursesContainer: React.FC = () => {
  const [isPorEmpezar, setIsPorEmpezar] = useState<boolean>(true);
  const [listRecourses, setListRecourses] = useState<Top5Recourse[]>([]);

  const handleCheckChange = (): void => {
    setIsPorEmpezar(!isPorEmpezar);
  };

  useEffect(() => {
    const getData = async (): Promise<void> => {
      const response = await getTop5Recourses(isPorEmpezar);
      if (response.status === 'error') {
        const responseError = response as Top5RecoursesErrorResponse;
        // Mensaje de error general por parte del backend
        if (responseError.message !== '') {
          throw new Error(responseError.message);
        }
      } else {
        const responseSuccess = response as Top5RecoursesSuccessResponse;
        setListRecourses(responseSuccess.data);
      }
    };

    getData();
  }, [isPorEmpezar]);

  return <PanelRecoursesView handleChange={handleCheckChange} listRecourses={listRecourses} />;
};
