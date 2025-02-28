import { RequestResult } from "./mainType";

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

export interface SocialMediaResponse {
  user?: string | null;
  title: string | null;
  address: string | null;
  slug_id?: string | null;
}

export interface ProfileState {
  isLoading: boolean;
  profileData: ProfileResponse | null;
  workHistoryData: WorkHistoryResponse | null;
  socialMediaData: SocialMediaResponse[] | null;
  profileRequest: () => Promise<void>;
  socialMediaRequest: () => Promise<void>;
  profileUpdate: (data: ProfileResponse) => Promise<RequestResult>;
  workHistoryUpdate: (data: WorkHistoryResponse) => Promise<RequestResult>;
  socialMedia: (data: SocialMediaResponse) => Promise<RequestResult>;
  socialMediaDelete: (slug: string) => Promise<RequestResult>;
  setLoading: (isLoading: boolean) => void;
}
