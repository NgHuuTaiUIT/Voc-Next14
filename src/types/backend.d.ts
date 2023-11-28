export interface IMeta {
  current: number;
  pageSize: number;
  total: number;
}
export interface IFilterGet {
  page: number;
  limit: number;
  sort: SortOrder;
}