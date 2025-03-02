import { baseType, IsLoadingType, Tags } from "./baseType"

export interface PostType extends baseType {
  title?: string
  image?: File
  content?: string
  category?: string
  tag?: Tags[]
  viewCount?: number
  publish?: string
  is_approve?: boolean
}

export interface ViewPostType extends IsLoadingType {
  postData: PostType[] | null
  requestPostView: () => void
}
