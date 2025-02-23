import ResetPassword from "./settingComponents/resetPassword";
import UpdateUserDetail from "./settingComponents/updateUserDetail";

const SettingSection: React.FC = () => {
  return (
    <div>
      <UpdateUserDetail />
      <ResetPassword />
    </div>
  );
};

export default SettingSection;
