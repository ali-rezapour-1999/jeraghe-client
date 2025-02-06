export interface ProfileResult {
  success: boolean;
  status: number;
  message: string;
}

export interface ProfileResponse {
  age: string | null;
  gender: string | null;
  state: string | null;
  city: string | null;
  address: string | null;
  description_myself: string | null;
}

export interface WorkHistoryResponse {
  job_title: string | null;
  company_name: string | null;
  start_date: string | null;
  end_date: string | null;
  job_description: string | null;
  is_working: boolean;
}

export interface ProfileState {
  isLoading: boolean;
  error: string | null;
  personalData: ProfileResponse | null;
  workHistoryData: WorkHistoryResponse | null;
  profileRequest: () => Promise<void>;
  profileUpdate: (data: ProfileResponse) => Promise<ProfileResult>;
  workHistoryUpdate: (data: WorkHistoryResponse) => Promise<void>;
  setLoading: (isLoading: boolean) => void;
  setError: (error: string | null) => void;
}
