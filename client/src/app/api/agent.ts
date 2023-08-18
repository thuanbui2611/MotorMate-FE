import axios, { AxiosResponse } from "axios";

axios.defaults.baseURL = "https://fakestoreapi.com/";
axios.defaults.headers.post["Content-Type"] = "application/json";

const responseBody = (response: AxiosResponse) => response.data;

const requests = {
  get: (url: string) => axios.get(url).then(responseBody),
  post: (url: string, body: {}) => axios.post(url, body).then(responseBody),
  put: (url: string, body: {}) => axios.put(url, body).then(responseBody),
  delete: (url: string) => axios.delete(url).then(responseBody),
};

const Product = {
  all: () => requests.get("products"),
  details: (id: number) => requests.get(`products/${id}`),
};

const Account = {
  login: (values: any) => requests.post("auth/login", values),
};

const Carts = {
  getUserCart: (id: number) => requests.get(`carts/user/${id}`),
  // addProduct: (values: Cart) => requests.post("carts", values),
};

const agent = {
  Product,
  Account,
  Carts,
};

export default agent;
