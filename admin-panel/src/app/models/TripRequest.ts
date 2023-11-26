export interface ParentOrder {
  parentOrderId: string;
  userId: string;
  username: string;
  fullName: string;
  email: string;
  phone: string;
  address: string;
  avatar: string;
  status: string;
  totalAmmount: string;
  dateRent: {
    from: string;
    to: string;
  };
  createdAt: string;
  shops: Shop[];
}

export interface Shop {
  lessorId: string;
  lessorName: string;
  lessorImage: string;
  vehicles: Vehicle[];
}

export interface Vehicle {
  requestId: string;
  vehicleId: string;
  status: string;
  vehicleName: string;
  pickUpLocation: string;
  dropOffLocation: string;
  pickUpDateTime: string;
  dropOffDateTime: string;
  brand: string;
  color: string;
  price: number;
  licensePlate: string;
  image: string;
}

export interface TripRequestParams {
  pageNumber: number;
  pageSize: number;
  SearchQuery: string;
}
