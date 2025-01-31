import ProfileSectionContainer from "@/components/container/prfileContainer";
import React from "react";

const ProfileAboutMeSection: React.FC = () => {
  return (
    <ProfileSectionContainer delay={0.4}>
      <h4 className="border-b-1 w-full py-2 text-center text-darkPrimary dark:text-light text-lg font-bold">
        درباره من
      </h4>
      <p className="dark:bg-darkPrimary text-darkPrimary dark:text-light bg-light rounded-3xl p-5">
        Explanation: delay prop in ProfileSectionContainer: This allows each
        section to have a different delay for animation. The delay is passed as
        a prop and added to the transition object. Dynamic Delays: Each section
        uses the delay prop to stagger its animation by 0.3s increments: 0s,
        0.3s, 0.6s, and 0.9s. Styling: Each section has a different background
        color and padding for better visual distinction. You can customize these
        as needed. Result: When rendered, the sections will appear one after the
        other with a 0.3s delay between them, creating a smooth staggered
        animation effect.
      </p>
    </ProfileSectionContainer>
  );
};

export default ProfileAboutMeSection;
