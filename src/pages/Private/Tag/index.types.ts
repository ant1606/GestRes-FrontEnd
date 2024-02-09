// Respuesta desde el API
export interface ApiResponseSuccessTag {
  status: string;
  code: number;
  data: ApiResponseTag;
}
export interface ApiResponseTag {
  identificador: string;
  nombre: string;
  estilos: string;
  total: number;
}

export interface TagFormData {
  name: string;
}
export interface TagsPaginatedSuccessResponse {
  status: string;
  code: number;
  meta: PaginateResultMeta | null;
  data: Tag[];
  links: PaginateResultLinks | null;
}

export interface TagPaginatedErrorResponse {
  status: string;
  code: number;
  message: string;
  details: {
    searchNombre?: string;
    sortNombre?: string;
  };
}

export interface TagsSelectorSuccessResponse {
  status: string;
  code: number;
  data: Tag[];
}
export interface TagSuccessResponse {
  status: string;
  code: number;
  data: Tag;
}
export interface TagErrorResponse {
  status: string;
  code: number;
  message: string;
  details: TagErrorDetailResponse;
}
export interface TagErrorDetailResponse {
  name: string | null;
  [key: string]: string | null;
}
