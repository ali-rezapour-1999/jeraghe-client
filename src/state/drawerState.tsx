import { create } from "zustand";

interface DrawerType {
  isOpenUserDrawer: boolean;
  isOpenProfileDrawer: boolean;
  isOpenWriteDrawer: boolean;
  setUserDrawer: (state: boolean) => void;
  setProfileDrawer: (state: boolean) => void;
  setWriteOptionDrawer: (state: boolean) => void;
}

const useDrawerState = create<DrawerType>((set) => ({
  isOpenUserDrawer: false,
  isOpenProfileDrawer: false,
  isOpenWriteDrawer: false,
  setUserDrawer: (state) => set({ isOpenUserDrawer: state }),
  setProfileDrawer: (state) => set({ isOpenProfileDrawer: state }),
  setWriteOptionDrawer: (state) => set({ isOpenWriteDrawer: state }),
}));

export default useDrawerState;
