import { create } from "zustand";

interface DrawerType {
  isOpenUserDrawer: boolean;
  setUserDrawer: (state: boolean) => void;
}

const useDrawerState = create<DrawerType>((set) => ({
  isOpenUserDrawer: false,
  setUserDrawer: (state) => set({ isOpenUserDrawer: state }),
}));

export default useDrawerState;
