import { create } from "zustand";

type MenuNavState = {
  scrollToCategoryId: string | null;
  requestScrollTo: (categoryId: string) => void;
  clearRequest: () => void;
};

export const useMenuNav = create<MenuNavState>((set) => ({
  scrollToCategoryId: null,
  requestScrollTo: (categoryId) => set({ scrollToCategoryId: categoryId }),
  clearRequest: () => set({ scrollToCategoryId: null }),
}));
