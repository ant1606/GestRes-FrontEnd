export interface ApiResponseProgress {
  identificador: number;
  realizado: number;
  pendiente: number;
  fecha: string;
  comentario: string;
}

export const adapterprogress = (progress: ApiResponseProgress): Progress => {
  return {
    id: progress.identificador,
    done: progress.realizado,
    pending: progress.pendiente,
    date: progress.fecha,
    comment: progress.comentario
  };
};

export const adapterProgressesData = (progresses: ApiResponseProgress[]): Progress[] => {
  return progresses?.map((progress: ApiResponseProgress) => adapterprogress(progress));
};
