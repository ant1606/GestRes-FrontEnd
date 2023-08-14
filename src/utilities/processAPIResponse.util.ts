/**
 * proccessErrorResponse
 * Cambia los valores de las propiedades del objeto error.detail obtenido por la api
 * de un array ["mensajeError1", "mensajeError2"] a un string uniendo cada elemento del array
 * a "mensajeError1/nmensajeError2"
 */
export const processErrorResponse = (error: any): Record<string, string | any> => {
  console.log(error);
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
