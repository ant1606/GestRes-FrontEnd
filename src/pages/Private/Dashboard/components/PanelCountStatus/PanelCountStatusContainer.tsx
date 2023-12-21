import React, { useEffect, useState } from 'react';
import PanelCountStatusView from './PanelCountStatusView';
import { useAppSelector } from '#/hooks/redux';
import { type RootState } from '#/redux/store';
import { getAmountByState } from '#/services/dashboard.services';
import { type settingsDashboard } from './index.type';

export const PanelCountStatusContainer: React.FC = () => {
  const { settingsStatus } = useAppSelector((state: RootState) => state.settings);
  const [statusList, setStatusList] = useState<settingsDashboard[]>([]);

  useEffect(() => {
    const response = async (): Promise<void> => {
      const res = await getAmountByState();
      const newSettings = settingsStatus.map((status) => {
        return { ...status, amount: res.data[status.value] };
      });
      setStatusList(newSettings);
    };

    response();
  }, [settingsStatus]);

  return <PanelCountStatusView statusList={statusList} />;
};
