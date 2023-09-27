export interface Vehicle {
  id: string;
  owner: Owner;
  specifications: Specifications;
  purchaseDate: string;
  color: string;
  price: number;
  location: string;
  city: string;
  conditionPercentage: number;
  licensePlate: string;
  insuranceNumber: string;
  insuranceExpiry: string;
  status: number;
}

export interface Owner {
  name: string;
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
