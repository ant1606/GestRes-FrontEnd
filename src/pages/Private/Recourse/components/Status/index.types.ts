export interface StatusSuccessResponse {
  meta: PaginateResultMeta | null;
  data: Status[];
  links: PaginateResultLinks | null;
}
