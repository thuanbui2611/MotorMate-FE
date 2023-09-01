export interface Brand {
  id: string;
  name: string;
  image: Image;
  collections?: any[];
}

export interface Image {
  image: string;
  publicId: string;
}

export interface BrandParams {
  pageNumber: number;
  pageSize: number;
}
