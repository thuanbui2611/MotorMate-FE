export interface MetaData {
  totalItemCount: number;
  totalPageCount: number;
  pageSize: number;
  currentPage: number;
}

export class PaginatedResponse<T> {
  items: T;
  metaData: MetaData;

  constructor(items: T, metaData: MetaData) {
    this.items = items;
    this.metaData = metaData;
  }
}
