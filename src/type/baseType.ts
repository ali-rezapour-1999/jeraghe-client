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
  title: string
}

export interface baseType {
  slug: number
  created_at: string
  updated_at: string
  is_active: boolean
}
