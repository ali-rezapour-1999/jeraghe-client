export interface ProfileResponse {
  first_name: string | null;
  last_name: string | null;
  age: string | null;
  gender: string | null;
  state: string | null;
  city: string | null;
  address: string | null;
  description_myself: string | null;
  my_skill: [{ name: string; id: number }] | null;
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
  profileRequest: (slug_id: string) => Promise<void>;
  profileUpdate: (data: ProfileResponse) => Promise<void>;
  workHistoryUpdate: (data: WorkHistoryResponse) => Promise<void>;
  setLoading: (isLoading: boolean) => void;
  setError: (error: string | null) => void;
}
