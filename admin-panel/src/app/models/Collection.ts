export interface Collection {
  id: string;
  name: string;
  models: Model[];
}

export interface Model {
  id: string;
  name: string;
}

export interface CollectionParams {
  pageNumber: number;
  pageSize: number;
}
