import { Color } from "./Color";
export interface ModelVehicle {
  id: string;
  name: string;
  year: number;
  capacity: number;
  collection: ModelCollection;
  colors: Color[];
}

export interface ModelCollection {
  id: string;
  name: string;
}

export interface ModelVehicleParams {
  pageNumber: number;
  pageSize: number;
}
