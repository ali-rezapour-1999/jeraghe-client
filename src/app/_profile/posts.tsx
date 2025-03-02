import { IsLoading } from "@/components/common/isLoading";
import { useViewPostState } from "@/state/blogStore/viewPostState";
import React from "react";

const PostSection: React.FC = () => {
  const { postData, isLoading } = useViewPostState()
  if (isLoading) <IsLoading />

  return <div>{postData?.map((i, index) => <div key={index}>{i.title}</div>)}</div>;
};

export default PostSection;
