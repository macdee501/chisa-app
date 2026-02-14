import { create } from "zustand";
import type { MenuItem } from "@/data/menuItems";

export type CartLine = {
  itemId: string;
  name: string;
  unitPrice: number;
  qty: number;
};

type CartState = {
  lines: CartLine[];
  addItem: (item: MenuItem, qty: number) => void;
  setQty: (itemId: string, qty: number) => void;
  removeItem: (itemId: string) => void;
  clear: () => void;

  getQty: (itemId: string) => number;
  total: () => number;
};

export const useCart = create<CartState>((set, get) => ({
  lines: [],

  addItem: (item, qty) =>
    set((state) => {
      const existing = state.lines.find((l) => l.itemId === item.id);
      if (existing) {
        return {
          lines: state.lines.map((l) =>
            l.itemId === item.id ? { ...l, qty: l.qty + qty } : l
          ),
        };
      }
      return {
        lines: [
          ...state.lines,
          { itemId: item.id, name: item.name, unitPrice: item.priceFrom, qty },
        ],
      };
    }),

  setQty: (itemId, qty) =>
    set((state) => ({
      lines:
        qty <= 0
          ? state.lines.filter((l) => l.itemId !== itemId)
          : state.lines.map((l) => (l.itemId === itemId ? { ...l, qty } : l)),
    })),

  removeItem: (itemId) =>
    set((state) => ({ lines: state.lines.filter((l) => l.itemId !== itemId) })),

  clear: () => set({ lines: [] }),

  getQty: (itemId) => get().lines.find((l) => l.itemId === itemId)?.qty ?? 0,

  total: () => get().lines.reduce((sum, l) => sum + l.unitPrice * l.qty, 0),
}));
