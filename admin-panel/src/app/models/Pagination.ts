export interface MetaData {
  TotalItemCount: number;
  TotalPageCount: number;
  PageSize: number;
  CurrentPage: number;
}

export class PaginatedResponse<T> {
  items: T;
  metaData: MetaData;

  constructor(items: T, metaData: MetaData) {
    this.items = items;
    this.metaData = metaData;
  }
}
