export interface Brand {
  id: string;
  name: string;
  logo?: string;
  // collection?: [];
}

export interface BrandParams {
  pageNumber: number;
  pageSize: number;
}
