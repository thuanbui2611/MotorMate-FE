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
  userName: string;
  picture: string;
  email: string;
  address: string;
  phoneNumber: string;
  dateOfBirth: string;
}
