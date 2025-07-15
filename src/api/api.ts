import axios, {
  AxiosResponse,
  AxiosError,
  InternalAxiosRequestConfig,
} from "axios";

const API_BASE_URL = process.env.NEXT_PUBLIC_API + "/api";

// Create an Axios instance
const api = axios.create({
  baseURL: API_BASE_URL,
});

// Add request interceptor
api.interceptors.request.use(
  (config: InternalAxiosRequestConfig): InternalAxiosRequestConfig => {
    const token =
      typeof window !== "undefined" ? localStorage.getItem("jwt_token") : null;

    if (token && config.headers) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error: AxiosError): Promise<AxiosError> => {
    return Promise.reject(error);
  }
);

// Add response interceptor
api.interceptors.response.use(
  (response: AxiosResponse): AxiosResponse => {
    return response;
  },
  (error: AxiosError): Promise<never> => {
    if (error.response?.status === 401) {
      if (typeof window !== "undefined") {
        console.log(error.response?.data);
        localStorage.removeItem("jwt_token");
        localStorage.removeItem("user_data");
        window.location.href = "/login";
      }
      return Promise.reject(new Error("Unauthorized - Redirecting to login"));
    }
    return Promise.reject(error);
  }
);

// Function to handle login and store token in localStorage
export const login = async (
  email: string,
  password: string
): Promise<string> => {
  try {
    const response = await api.post("/Auth/login", {
      email,
      password,
    });

    const token = response.data.accessToken;
    // Store token in localStorage
    if (typeof window !== "undefined") {
      localStorage.setItem("jwt_token", token);
    }

    return token;
  } catch (error) {
    console.error("Login failed:", error);
    throw error;
  }
};

// Function to logout and clear token
export const logout = (): void => {
  if (typeof window !== "undefined") {
    localStorage.removeItem("jwt_token");
    localStorage.removeItem("user_data");
    window.location.href = "/login";
  }
};

export default api;
