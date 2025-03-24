import { baseApiType } from "./baseType";

export interface User extends baseApiType {
  email: string;
  profile_image?: any;
  username: string;
  phone_number?: string;
}

export type AuthResult<T = any> = {
  success?: boolean;
  status?: number;
  message?: string;
  data?: T;
};

export interface AuthState {
  isAuthenticated: boolean;
  user: User | any | null;
  token: string | null;
  isLoading: boolean;
  setLoading: (isLoading: boolean) => void;
  restoreAuthState: (isConnect?: boolean) => void;
  getUserInformation: () => void;
  login: (email: string, password: string) => Promise<AuthResult>;
  register: (
    email: string,
    password: string,
    username: string
  ) => Promise<AuthResult>;
  logout: () => void;
  userUpdate: (data: User) => Promise<AuthResult>;
}
