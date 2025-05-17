import { IsLoadingType, RequestResult } from "./baseType";

export interface ProfileResponse {
  age?: string | null;
  gender?: string | null
  state?: string | null;
  city?: string | null;
  address?: string | null;
  description?: string | null;
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

export interface ProfileState extends IsLoadingType {
  profileData: ProfileResponse | null;
  profileRequest: () => Promise<void>;
  profileUpdate: (data: ProfileResponse) => Promise<RequestResult>;
}

export interface SocialMediaState extends IsLoadingType {
  socialMediaData: SocialMediaResponse[] | null;
  socialMediaRequest: () => Promise<void>;
  socialMedia: (data: SocialMediaResponse) => Promise<RequestResult>;
  socialMediaDelete: (slug: string) => Promise<RequestResult>;
}

export interface WorkHistoryState extends IsLoadingType {
  workHistoryData: WorkHistoryResponse | null;
  workHistoryUpdate: (data: WorkHistoryResponse) => Promise<RequestResult>;
}

export interface SkillState extends IsLoadingType {
  skillData: [] | null;
  skillRequest: () => Promise<void>;
  createSkill: (data: string) => Promise<RequestResult>;
}
