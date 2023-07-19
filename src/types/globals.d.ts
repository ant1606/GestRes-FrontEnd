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

interface PaginateResultLinks {
  self: string | null;
  first: string | null;
  last: string | null;
  next: string | null;
  prev: string | null;
}
