export interface RequestResult {
  success?: boolean;
  status?: number;
  message?: string;
  data?: any;
}

export interface IsLoadingType {
  isLoading: boolean;
  setLoading: (isLoading: boolean) => void;
}

export interface Tags {
  title: string;
}

export interface CategoryType {
  id: number;
  title: string;
}

export interface baseApiType {
  slug?: number;
  created_at?: string;
  updated_at?: string;
  is_active?: boolean;
}

export interface categoryListType extends IsLoadingType {
  categoryData: CategoryType[] | [];
  categoryList: () => Promise<void>;
}
