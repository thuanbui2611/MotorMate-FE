import { Image } from "./Image";
export interface Vehicle {
  id: string;
  owner: Owner;
  specifications: Specifications;
  purchaseDate: string;
  isAvaiable: boolean;
  isActive: boolean;
  isLocked: boolean;
  price: number;
  address: string;
  district: string;
  ward: string;
  city: string;
  conditionPercentage: number;
  licensePlate: string;
  insuranceNumber: string;
  insuranceExpiry: string;
  unavailableDates: UnavailableDate[];
  status: string;
  rating: number;
  totalRating: string;
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
  createdDate: string;
}

export interface Specifications {
  modelId: string;
  modelName: string;
  year: string;
  capacity: string;
  color: string;
  hexCode: string;
  collectionId: string;
  collectionName: string;
  brandId: string;
  brandName: string;
}

export interface UnavailableDate {
  from: string;
  to: string;
}
export interface VehicleParams {
  pageNumber: number;
  pageSize: number;
  Brands?: string[];
  Collections?: string[];
  Models?: string[];
  Cities?: string[];
  IsSortPriceDesc: string | null;
  Search: string | null;
  DateRentFrom: string | null;
  DateRentTo: string | null;
}
