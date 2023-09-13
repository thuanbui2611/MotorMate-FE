export interface Collection {
  id: string;
  name: string;
  models: Model[];
  brand: {
    id: string;
    name: string;
  };
}

export interface Model {
  id: string;
  name: string;
}

export interface CollectionParams {
  pageNumber: number;
  pageSize: number;
}
