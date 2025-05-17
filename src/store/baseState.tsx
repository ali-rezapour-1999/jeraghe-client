import { create } from "zustand";

interface baseType {
  isOpenWriteDrawer: boolean;
  isOpenAuthRequireModal: boolean;
  isOpenUserProfile: boolean;
  isOpenSkillProfileModal: boolean;

  setWriteOptionDrawer: (state: boolean) => void;
  setOpenAuthRequireModel: (state: boolean) => void;
  setOpenUserProfile: (state: boolean) => void;
  setOpneSkillProfileModal: (state: boolean) => void;

}

const useBaseState = create<baseType>((set) => ({
  isOpenWriteDrawer: false,
  isOpenAuthRequireModal: false,
  isOpenUserProfile: false,
  isOpenSkillProfileModal: false,
  setWriteOptionDrawer: (state) => set({ isOpenWriteDrawer: state }),
  setOpenAuthRequireModel: (state) => set({ isOpenAuthRequireModal: state }),
  setOpenUserProfile: (state) => set({ isOpenAuthRequireModal: state }),
  setOpneSkillProfileModal: (state) => set({ isOpenSkillProfileModal: state }),
}));

export default useBaseState;
