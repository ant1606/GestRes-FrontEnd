import React, { useEffect, useState } from 'react';
import PanelCountStatusView from './PanelCountStatusView';
import { getAmountsByState } from '#/services/dashboard.services';
import {
  type AmountByStateSuccessResponse,
  type AmountByStateData,
  type AmountByStateErrorResponse
} from './index.type';
import { useFetch } from '#/hooks/useFetch';

export const PanelCountStatusContainer: React.FC = () => {
  const [summaryStatus, setSummaryStatus] = useState<AmountByStateData[]>([]);
  const { fetchWithSessionHandling } = useFetch();
  const [isLoadingSearch, setIsLoadingSearch] = useState(false);

  useEffect(() => {
    const getData = async (): Promise<void> => {
      setIsLoadingSearch(true);
      const response = await getAmountsByState(fetchWithSessionHandling);
      setIsLoadingSearch(false);
      if (response.status === 'error') {
        const responseError = response as AmountByStateErrorResponse;
        // Mensaje de error general por parte del backend
        if (responseError.message !== '') {
          throw new Error(responseError.message);
        }
      } else {
        const responseSuccess = response as AmountByStateSuccessResponse;
        setSummaryStatus(responseSuccess.data);
      }
    };

    getData();
  }, []);

  return <PanelCountStatusView summaryStatus={summaryStatus} isLoadingSearch={isLoadingSearch} />;
};
