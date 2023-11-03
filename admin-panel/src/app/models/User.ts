export interface User {
  username: string;
  name: string;
  email: string;
  role: string;
  token?: string;
}

export interface UserDetail {
  id: string;
  firstName: string;
  lastName: string;
  fullName: string;
  username: string;
  image: Image;
  email: string;
  address: string;
  phoneNumber: string;
  dateOfBirth: string;
}

export interface Image {
  imageUrl: string;
  publicId: string;
}

export interface UserParams {
  pageNumber: number;
  pageSize: number;
}
