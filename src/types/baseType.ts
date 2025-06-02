export interface RequestResult {
  success?: boolean;
  status?: number;
  message?: string;
  result?: any;
}

export interface IsLoadingType {
  isLoading: boolean;
  setLoading: (isLoading: boolean) => void;
}

export interface Tags extends BaseApiType {
  title: string;
}

export interface Category {
  ID: number;
  title: string;
}

export interface BaseApiType {
  ID?: number;
  CreatedAt?: string;
  UpdatedAt?: string;
  IsActive?: boolean;
  DeletedAt?: string;
  slug_id?: string;
}

export interface categoryListType extends IsLoadingType {
  categoryData: Category[] | [];
  categoryList: () => Promise<void>;
}
