export interface ApiResponseStatus {
  identificador: number;
  fecha: string;
  comentario: string;
  estadoId: number;
  estadoNombre: string;
}

export const adapterStatus = (status: ApiResponseStatus): Status => {
  return {
    id: status.identificador,
    date: status.fecha,
    comment: status.comentario,
    statusId: status.estadoId,
    statusName: status.estadoNombre
  };
};

export const adapterStatusesData = (statuses: ApiResponseStatus[]): Status[] => {
  return statuses.map((status: ApiResponseStatus) => adapterStatus(status));
};
