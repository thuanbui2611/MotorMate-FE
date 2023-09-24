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
  email: string;
  address: any;
  phoneNumber: any;
  dateOfBirth: any;
}
