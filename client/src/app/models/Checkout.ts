import { Shop } from "./Cart";

export interface Checkout {
  userId: string;
  username: string;
  shops: Shop[];
  paymentIntentId: string;
  clientSecret: string;
}
