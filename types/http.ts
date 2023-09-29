export interface HttpPaginationResponseI<T> {
  data: T;
  lastPage: number;
  currentPage: number;
  limit: number;
  total: number;
}
