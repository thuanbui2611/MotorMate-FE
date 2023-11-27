export interface ReviewProduct {
  reviewProduct: Review[];
}
export interface Review {
  vehicleId: string;
  userId: string;
  username: string;
  email: string;
  avatar: string;
  rating: number;
  title: string;
  content: string;
  images: string[];
}

export interface ReviewParams {
  pageNumber: number;
  pageSize: number;
}
