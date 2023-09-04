import axios, { AxiosError, AxiosResponse } from "axios";
import { toast } from "react-toastify";
import { store } from "../store/ConfigureStore";
import { useNavigate } from "react-router-dom";

// axios.defaults.baseURL = "https://motormate.azurewebsites.net/";
const testApi = axios.create({
  baseURL: "https://motormate.azurewebsites.net/",
});
testApi.defaults.headers.post["Content-Type"] = "application/json";
const responseBody = (response: AxiosResponse) => response.data;

testApi.interceptors.request.use((config) => {
  const userToken = store.getState().account.user?.token;
  if (userToken) config.headers.Authorization = `Bearer ${userToken}`;
  return config;
});

testApi.interceptors.response.use(
  (response) => {
    return response;
  },

  (error: AxiosError) => {
    console.log("Catch intercepter");
    const { data, status } = error.response!;
    console.log(data);
    console.log("Status:", status);
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
        console.log("catch 401");
        toast.error((data as any).title);
        break;
      case 403:
        toast.error((data as any).message);
        break;
      case 404:
        console.log("catch 404");
        toast.error((data as any).message);
        break;
      case 409:
        toast.error((data as any).message);
        break;
      case 500:
        // navigate("/server-error", {
        //   state: { error: data },
        // });
        console.log("Catch error 500");
        break;
      default:
        break;
    }
    return Promise.reject(error.response);
  }
);

const requests = {
  get: (url: string) => testApi.get(url).then(responseBody),
  post: (url: string, body: {}) => testApi.post(url, body).then(responseBody),
  put: (url: string, body: {}) => testApi.put(url, body).then(responseBody),
  delete: (url: string) => testApi.delete(url).then(responseBody),
};

const Account = {
  userDetail: () => requests.get("api/user/details"),
  login: (values: {}) => requests.post("api/auth/login", values),
  loginGoogle: (values: { tokenCredential: string }) =>
    requests.post("api/auth/sso/google", values),
  Register: (values: {}) => requests.post("api/auth/sign-up", values),
  ForgotPassword: (values: any) =>
    requests.post("api/auth/change/password", values),
  ChangePassword: (values: any, resetCode: string) =>
    requests.post(`api/auth/change/password/${resetCode}`, values),
};

const agentTest = {
  Account,
};

export default agentTest;
