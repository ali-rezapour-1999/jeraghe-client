import { create } from "zustand";

interface DrawerType {
  isOpenUserDrawer: boolean;
  isOpenProfileDrawer: boolean;
  setUserDrawer: (state: boolean) => void;
  setProfileDrawer: (state: boolean) => void;
}

const useDrawerState = create<DrawerType>((set) => ({
  isOpenUserDrawer: false,
  isOpenProfileDrawer: false,
  setUserDrawer: (state) => set({ isOpenUserDrawer: state }),
  setProfileDrawer: (state) => set({ isOpenProfileDrawer: state }),
}));

export default useDrawerState;
