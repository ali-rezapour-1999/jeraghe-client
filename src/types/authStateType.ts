import { BaseApiType } from "./baseType";

export interface User extends BaseApiType {
  email: string;
  image_url?: any;
  username: string;
  phone_number?: string;
  create_at: string;
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
  restoreAuthState: () => Promise<AuthResult>;
  login: (email: string, password: string) => Promise<AuthResult>;
  register: (email: string, password: string, username: string) => Promise<AuthResult>;
  logout: () => void;
  userUpdate: (data: FormData) => Promise<AuthResult>;
  userInformation: () => void;
}
