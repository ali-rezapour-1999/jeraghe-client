import { Category } from "./baseType";

export interface CategoryState {
  categoryData: Category[];
  categoryList: () => void;
  isLoading: boolean;
}

export interface IdeaStatusItem {
  key: string;
  title: string;
}

export interface IdeaNeededCollaborator {
  key: string;
  title: string;
}

export interface FormState {
  title: string;
  category: Category | null;
  ideaStatus: IdeaStatusItem | null;
  neededCollaborator: IdeaNeededCollaborator | null;
  content: string;
  isOpenContent: boolean;
  needColabration: boolean;
  imageLogo: File | null;
  imageBanner: File | null;
}

export interface PageStepProps {
  step: number;
  setStep: (step: number) => void;
}
