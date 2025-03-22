import { create } from "zustand";

interface DrawerType {
  isOpenWriteDrawer: boolean;
  setWriteOptionDrawer: (state: boolean) => void;
}

const useDrawerState = create<DrawerType>((set) => ({
  isOpenWriteDrawer: false,
  setWriteOptionDrawer: (state) => set({ isOpenWriteDrawer: state }),
}));

export default useDrawerState;
