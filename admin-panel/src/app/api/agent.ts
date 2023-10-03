import axios, { AxiosError, AxiosResponse } from "axios";
import { toast } from "react-toastify";
import { store } from "../store/ConfigureStore";
import { PaginatedResponse } from "../models/Pagination";

axios.defaults.baseURL = "https://motormate.azurewebsites.net/";
axios.defaults.headers.post["Content-Type"] = "application/json";
const responseBody = (response: AxiosResponse) => response.data;
axios.interceptors.request.use((config) => {
  const userToken = store.getState().account.user?.token;
  console.log("get user token from user state", userToken);
  if (userToken) config.headers.Authorization = `Bearer ${userToken}`;
  return config;
});

axios.interceptors.response.use(
  async (response) => {
    const pagination = response.headers["x-pagination"];
    if (pagination) {
      response.data = new PaginatedResponse(
        response.data,
        JSON.parse(pagination)
      );
      return response;
    }
    return response;
  },
  (error: AxiosError) => {
    const { data, status } = error.response!;
    // const navigate = useNavigate();
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
        console.log(data);
        toast.error((data as any).message);
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
        console.log("Catch 500");
        toast.error((data as any).message);
        // navigate("/server-error", {
        //   state: { error: data },
        // });
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
  put: (url: string, body: {}) => axios.put(url, body).then(responseBody),
  patch: (url: string, body: {}) => axios.patch(url, body).then(responseBody),
  delete: (url: string) => axios.delete(url).then(responseBody),
};

const Account = {
  userDetail: () => requests.get("api/user/details"),
  login: (values: {}) => requests.post("api/auth/login", values),
  loginGoogle: (values: { tokenCredential: string }) =>
    requests.post("api/auth/sso/google", values),
  Register: (values: {}) => requests.post("api/auth/sign-up", values),
};

const Brand = {
  all: () => requests.get("api/brand/all"),
  list: (params: URLSearchParams) => requests.get("api/brand", params),
  details: (id: string) => requests.get(`api/brand/${id}`),
  create: (values: {}) => requests.post("api/brand", values),
  update: (id: string, values: {}) => requests.put(`api/brand/${id}`, values),
  delete: (id: string) => requests.delete(`api/brand/${id}`),
};

const Collection = {
  all: () => requests.get("api/collection/all"),
  list: (params: URLSearchParams) => requests.get("api/collection", params),
  details: (id: string) => requests.get(`api/collection/${id}`),
  create: (values: {}) => requests.post("api/collection", values),
  update: (id: string, values: {}) =>
    requests.put(`api/collection/${id}`, values),
  delete: (id: string) => requests.delete(`api/collection/${id}`),
};

const ModelVehicle = {
  all: () => requests.get("api/model/all"),
  list: (params: URLSearchParams) => requests.get("api/model", params),
  details: (id: string) => requests.get(`api/model/${id}`),
  getByCollection: (collectionId: string) =>
    requests.get(`api/model/collection/${collectionId}`),
  create: (values: {}) => requests.post("api/model", values),
  update: (id: string, values: {}) => requests.put(`api/model/${id}`, values),
  delete: (id: string) => requests.delete(`api/model/${id}`),
};

const Color = {
  all: () => requests.get("api/color/all"),
  list: (params: URLSearchParams) => requests.get("api/color", params),
  details: (id: string) => requests.get(`api/color/${id}`),
  create: (values: {}) => requests.post("api/color", values),
  bulkCreate: (values: {}) => requests.post("api/color/bulk", values),
  update: (id: string, values: {}) => requests.put(`api/color/${id}`, values),
  delete: (id: string) => requests.delete(`api/color/${id}`),
};

const Vehicle = {
  list: (params: URLSearchParams) => requests.get("api/vehicle", params),
  listVehicleByStatus: (params: URLSearchParams, statusRoute: string) =>
    requests.get(`api/vehicle/status/${statusRoute}`, params),
  details: (id: string) => requests.get(`api/vehicle/${id}`),
  create: (values: {}) => requests.post("api/vehicle", values),
  update: (id: string, values: {}) => requests.put(`api/vehicle/${id}`, values),
  updateStatusVehicle: (vehicleId: string, statusNumber: number) => requests.post(`api/vehicle/${vehicleId}/status/${statusNumber}`, {}),
  delete: (id: string) => requests.delete(`api/vehicle/${id}`),
};

const User = {
  all: () => requests.get("api/user/all"),
  list: (params: URLSearchParams) => requests.get("api/user", params),
  details: (username: string) => requests.get(`api/user/${username}/details`),
  update: (username: string, values: {}) =>
    requests.put(`api/user/${username}`, values),
  delete: (username: string) => requests.delete(`api/user/${username}`),
};

const agent = {
  Account,
  Brand,
  Collection,
  ModelVehicle,
  Color,
  Vehicle,
  User,
};

export default agent;
