export interface City {
  Id: string;
  Name: string;
  Districts: District[];
}
export interface District {
  Id: string;
  Name: string;
  Wards: Ward[];
}
export interface Ward {
  Id: string;
  Name: string;
  Level: string;
}
