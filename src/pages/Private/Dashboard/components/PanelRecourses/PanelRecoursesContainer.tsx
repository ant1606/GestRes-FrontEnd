import React, { useEffect, useState } from 'react';
import PanelRecoursesView from './PanelRecoursesView';
import { getTop5Recourses } from '#/services/dashboard.services';
import {
  type Top5RecoursesErrorResponse,
  type Top5RecoursesSuccessResponse,
  type Top5Recourse
} from './index.type';
import { useFetch } from '#/hooks/useFetch';

export const PanelRecoursesContainer: React.FC = () => {
  const [isPorEmpezar, setIsPorEmpezar] = useState<boolean>(true);
  const [listRecourses, setListRecourses] = useState<Top5Recourse[]>([]);
  const [isLoadingSearch, setIsLoadingSearch] = useState(false);
  const { fetchWithSessionHandling } = useFetch();

  const handleCheckChange = (): void => {
    setIsPorEmpezar(!isPorEmpezar);
  };

  useEffect(() => {
    const getData = async (): Promise<void> => {
      setIsLoadingSearch(true);
      const response = await getTop5Recourses(isPorEmpezar, fetchWithSessionHandling);
      setIsLoadingSearch(false);
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

  return (
    <PanelRecoursesView
      handleChange={handleCheckChange}
      listRecourses={listRecourses}
      isLoadingSearch={isLoadingSearch}
    />
  );
};
