export interface Review {
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
