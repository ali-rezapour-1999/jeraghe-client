import { baseApiType, IsLoadingType, RequestResult } from "./baseType";

export interface PostType extends baseApiType {
  id?: number;
  title?: string;
  content?: string;
  status?: string;
  tags: { title: string }[];
  categories?: string | undefined | null;
  image?: File | null;
  views?: number;
  showDetail?: boolean;
  is_approve?: boolean;
}

export interface ViewPostType extends IsLoadingType {
  postData: PostType[] | null;
  requestPostView?: () => void;
  createUserPost?: (data: FormData) => Promise<RequestResult>;
}
