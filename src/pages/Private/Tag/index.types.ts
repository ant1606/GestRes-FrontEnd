export interface TagsSuccessResponse {
  meta: PaginateResultMeta;
  data: Tag[];
  links: PaginateResultLinks;
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
