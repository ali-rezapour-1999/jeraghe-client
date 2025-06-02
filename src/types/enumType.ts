import { IsLoadingType } from "./baseType";

export interface EnumItemType {
  value: string;
  label: string;
}

export interface EnumType extends IsLoadingType {
  enumData: EnumItemType[] | [];
  skillLevelEnumRequest: () => Promise<void>;
}


export enum SkillLevel {
  Novice = "NOVICE",
  Beginner = "BEGINNER",
  Intermediate = "INTERMEDIATE",
  Advanced = "ADVANCED",
  Expert = "EXPERT",
}
