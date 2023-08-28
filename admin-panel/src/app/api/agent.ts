import axios, { AxiosError, AxiosResponse } from "axios";
import { toast } from "react-toastify";
import { store } from "../store/ConfigureStore";
import { useNavigate } from "react-router-dom";
import { PaginatedResponse } from "../models/Pagination";

axios.defaults.baseURL = "https://motormate.azurewebsites.net/";
// const axios = axios.create({
//   baseURL: "https://motormate.azurewebsites.net/",
// });
axios.defaults.headers.post["Content-Type"] = "application/json";
const responseBody = (response: AxiosResponse) => response.data;
// axios.interceptors.request.use((config) => {
//   const userToken = store.getState().account.user?.token;
//   if (userToken) config.headers.Authorization = `Bearer ${userToken}`;
//   return config;
// });

axios.interceptors.response.use(
  async (response) => {
    const pagination = response.headers["x-pagination"];
    if (pagination) {
      response.data = new PaginatedResponse(
        response.data,
        JSON.parse(pagination)
      );
      console.log("pagination res :", response);
      return response;
    }
    console.log("Do not touch pagination");
    return response;
  },
  (error: AxiosError) => {
    const { data, status } = error.response!;
    const navigate = useNavigate();
    switch (status) {
      case 400:
        if ((data as any).errors) {
          const modalStateErrors: string[] = [];
          for (const key in (data as any).errors) {
            if ((data as any).errors[key]) {
              modalStateErrors.push((data as any).errors[key]);
            }
          }
          toast.error((data as any).errors[0].description);
          throw modalStateErrors.flat();
        }
        break;
      case 401:
        toast.error((data as any).title);
        break;
      case 403:
        toast.error((data as any).message);
        break;
      case 404:
        toast.error((data as any).message);
        break;
      case 409:
        toast.error((data as any).message);
        break;
      case 500:
        navigate("/server-error", {
          state: { error: data },
        });
        break;
      default:
        break;
    }
    return Promise.reject(error.response);
  }
);

const requests = {
  get: (url: string, params?: URLSearchParams) =>
    axios.get(url, { params }).then(responseBody),
  post: (url: string, body: {}) => axios.post(url, body).then(responseBody),
  patch: (url: string, body: {}) => axios.patch(url, body).then(responseBody),
  delete: (url: string) => axios.delete(url).then(responseBody),
};

const Account = {
  login: (values: {}) => requests.post("api/auth/login", values),
  loginGoogle: (values: { tokenCredential: string }) =>
    requests.post("api/auth/sso/google", values),
  Register: (values: {}) => requests.post("api/auth/sign-up", values),
};

const Brand = {
  list: (params: URLSearchParams) => requests.get("api/brand", params),
  details: (id: string) => requests.get(`api/brand/${id}`),
  create: (values: {}) => requests.post("api/brand", values),
  update: (id: string, values: {}) => requests.patch(`api/brand/${id}`, values),
  delete: (id: string) => requests.delete(`api/brand/${id}`),
};

const agent = {
  Account,
  Brand,
};

export default agent;
