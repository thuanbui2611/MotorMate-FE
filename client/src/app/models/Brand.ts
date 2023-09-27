export interface Brand {
  id: string;
  name: string;
  image: Image;
  collections?: Collection[];
}

export interface Collection {
  id: string;
  name: string;
}

export interface Image {
  image: string;
  publicId: string;
}

export interface BrandParams {
  pageNumber: number;
  pageSize: number;
}
