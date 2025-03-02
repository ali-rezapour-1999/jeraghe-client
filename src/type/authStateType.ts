import { baseType } from "./baseType";

export interface User extends baseType {
  email: string;
  profile_image?: any;
  username: string;
  phone_number?: string;
}

export type AuthResult = {
  success?: boolean;
  status?: number;
  message?: string;
  data?: {
    email?: string;
    slug?: string;
    profile_image?: any;
    username?: string;
    phone_number?: string;
  };
};

export interface AuthState {
  isAuthenticated: boolean;
  user: User | null;
  token: string | null;
  isLoading: boolean;
  setLoading: (isLoading: boolean) => void;
  restoreAuthState: () => void;
  login: (email: string, password: string) => Promise<AuthResult>;
  register: (
    email: string,
    password: string,
    username: string,
  ) => Promise<AuthResult>;
  logout: () => void;
  userUpdate: (data: User) => Promise<AuthResult>;
}
