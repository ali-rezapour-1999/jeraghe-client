import React from "react";
import ProfileInfo from "./profileComponents/profileInfo";
import { Toaster } from "react-hot-toast";
import SocialMedia from "./profileComponents/socialMedia";

const ProfileUpdateSection = () => {
  return (
    <div>
      <ProfileInfo />
      <SocialMedia />
      <Toaster position="top-right" />
    </div>
  );
};
export default ProfileUpdateSection;
