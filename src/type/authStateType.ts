export interface User {
  email: string;
  slug: string;
  profile_image?: string;
  username: string;
  phone_number?: string;
}

export interface AuthResult {
  success: boolean;
  status: number;
  message: string;
  data?: {
    access: string;
    refresh: string;
    user: User;
  };
}

export interface AuthState {
  isAuthenticated: boolean;
  user: User | null;
  token: string | null;
  isLoading: boolean;
  error: string | null;
  setLoading: (isLoading: boolean) => void;
  setError: (error: string | null) => void;
  restoreAuthState: () => void;
  login: (email: string, password: string) => Promise<AuthResult>;
  register: (
    email: string,
    password: string,
    first_last_name: string,
  ) => Promise<AuthResult>;
  logout: () => void;
  userPersonal: () => Promise<void>;
}
