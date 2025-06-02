import { BaseApiType, baseApiType, Category, IsLoadingType, RequestResult, Tags } from "./baseType";
import { SkillLevel } from "./enumType";


export interface ProfileResponse {
  ID: number;
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

export interface SkillResponse {
  ID: number;
  title: string | null;
  profile_id?: number | null;
  category?: Category | null;
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

export interface SkillItemsList extends BaseApiType {
  level: SkillLevel;
  profile_id: number;
  skill_id: number;
  tag: Tags
}

export interface SkillState extends IsLoadingType {
  skillData: SkillResponse | null;
  skillItemListData: SkillItemsList[] | null;
  skillRequest: () => Promise<void>;
  createSkill: ({ title, profile, category }: { title: string, profile: number, category: number }) => Promise<RequestResult>;
  skillItem: ({ skill, profile, level }: { skill: string, profile: number, level: string }) => Promise<RequestResult>;
  skillItemListRequest: () => Promise<void>
}
