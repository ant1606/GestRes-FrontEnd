type ValidationInputResult = string | null;

interface PaginateResultMeta {
  path: string;
  currentPage: number;
  perPage: number;
  totalPages: number;
  from: number;
  to: number;
  total: number;
}
