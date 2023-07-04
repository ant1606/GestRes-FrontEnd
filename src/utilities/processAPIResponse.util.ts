export const processErrorResponse = (error: any): Record<string, string | any> => {
  const errorDetailToArray = Object.entries(error.error?.detail);
  const errorDetailSanitized = errorDetailToArray.reduce((acc, current) => {
    let value = current[1];
    if (Array.isArray(value)) {
      value = value.join('\n');
    }
    if (typeof value === 'string') {
      value = value.trim().length !== 0 ? value : null;
    }
    if (typeof value === 'number') {
      value = value > -1 ? value : null;
    }

    return {
      ...acc,
      [current[0]]: value
    };
  }, {});

  return {
    error: {
      status: error.error.status,
      detail: { ...errorDetailSanitized }
    }
  };
};
