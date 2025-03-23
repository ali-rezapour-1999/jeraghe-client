import { baseApiType } from "@/type/baseType";
import { create } from "zustand";

interface baseType {
  isOpenWriteDrawer: boolean;
  isOpenAuthRequireModal: boolean;
  setWriteOptionDrawer: (state: boolean) => void;
  setOpenAuthRequireModel: (state: boolean) => void;
}

const useBaseState = create<baseType>((set) => ({
  isOpenWriteDrawer: false,
  isOpenAuthRequireModal: false,
  setWriteOptionDrawer: (state) => set({ isOpenWriteDrawer: state }),
  setOpenAuthRequireModel: (state) => set({ isOpenAuthRequireModal: state }),
}));

export default useBaseState;
