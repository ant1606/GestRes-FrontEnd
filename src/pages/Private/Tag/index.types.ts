export interface TagsSuccessResponse {
  meta: PaginateResultMeta | null;
  data: Tag[];
  links: PaginateResultLinks | null;
}

export interface TagErrorDetailResponse extends ApiErrorResponse {
  name: string | null;
  [key: string]: string | null;
}

export interface TagErrorResponse {
  error: {
    status: string;
    detail: TagErrorDetailResponse;
  };
}
export interface ApiResponseTag {
  identificador: string;
  nombre: string;
  estilos: string;
}

export interface TagSuccessResponse {
  data: Tag;
}
