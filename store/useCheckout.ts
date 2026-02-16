import { create } from "zustand";

export type PaymentMethod = "card" | "cash";
export type TipOption = 0 | 5 | 10 | 15 | 20;

type CheckoutState = {
  paymentMethod: PaymentMethod;
  tip: TipOption;
  driverNotes: string;

  setPaymentMethod: (m: PaymentMethod) => void;
  setTip: (t: TipOption) => void;
  setDriverNotes: (v: string) => void;

  resetCheckout: () => void;
};

export const useCheckout = create<CheckoutState>((set) => ({
  paymentMethod: "card",
  tip: 0,
  driverNotes: "",

  setPaymentMethod: (paymentMethod) => set({ paymentMethod }),
  setTip: (tip) => set({ tip }),
  setDriverNotes: (driverNotes) => set({ driverNotes }),

  resetCheckout: () => set({ paymentMethod: "card", tip: 0, driverNotes: "" }),
}));
