import { Image } from "./Image";

export interface Vehicle {
  id: string;
  owner: Owner;
  specifications: Specifications;
  purchaseDate: string;
  isAvaiable: boolean;
  isActive: boolean;
  isLocked: boolean;
  color: string;
  price: number;
  address: string;
  district: string;
  ward: string;
  city: string;
  conditionPercentage: number;
  licensePlate: string;
  insuranceNumber: string;
  insuranceExpiry: string;
  status: string;
  images: Image[];
}

export interface Owner {
  ownerId: string;
  username: string;
  name: string;
  picture: string;
  phoneNumber: string;
  email: string;
  address: string;
}

export interface Specifications {
  modelId: string;
  modelName: string;
  year: string;
  capacity: string;
  collectionId: string;
  collectionName: string;
  brandId: string;
  brandName: string;
}

export interface VehicleParams {
  pageNumber: number;
  pageSize: number;
}
