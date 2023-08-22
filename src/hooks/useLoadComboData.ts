import { useState } from 'react';

export const useLoadComboData = () => {
  const [comboData, setComboData] = useState([]);

  const fetchData = (endpoint) => {
    // settings/${import.meta.env.VITE_SETTINGS_TYPE}
    fetch(`${import.meta.env.VITE_BACKEND_ENDPOINT}/${endpoint}`)
      .then((res) => res.json())
      .then((data) => {
        setComboData(data.data);
      });
  };

  return [comboData, fetchData];
};
