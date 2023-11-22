export interface Cart {
  userId: string;
  shops: Shop[];
}

export interface Shop {
  lessorId: string;
  lessorName: string;
  lessorImage: string;
  vehicles: Vehicle[];
}

export interface Vehicle {
  vehicleId: string;
  vehicleName: string;
  brand: string;
  color: string;
  price: string;
  licensePlate: string;
  image: string;
  pickUpDateTime: Date;
  dropOffDateTime: Date;
  unavailableDates: UnavailableDates[];
}
export interface UnavailableDates {
  from: string;
  to: string;
}
