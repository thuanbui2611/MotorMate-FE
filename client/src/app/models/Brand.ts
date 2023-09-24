export interface Brand {
  id: string;
  name: string;
  image: Image;
  collections?:
    | [
        {
          id: string;
          name: string;
        }
      ]
    | null;
}

export interface Image {
  image: string;
  publicId: string;
}

export interface BrandParams {
  pageNumber: number;
  pageSize: number;
}
