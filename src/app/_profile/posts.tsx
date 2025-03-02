import UserPostCart from "@/components/ui/cart/userPostCart";
import { useViewPostState } from "@/state/blogStore/viewPostState";
import React, { useEffect } from "react";

const PostSection: React.FC = () => {
  const { requestPostView, postData } = useViewPostState()
  useEffect(() => { requestPostView() }, [requestPostView])
  return <div className="px-3 md:px-10">
    {postData?.map((item, index) => <UserPostCart key={index} image={item?.image} content={item?.content} viewCount={item?.viewCount} title={item?.title} category={item?.category} status={item?.status} />)}
  </div>
}
export default PostSection;
