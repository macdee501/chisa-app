import { create } from "zustand";

export type Address = {
  title: string;
  line: string;
};

type ProfileState = {
  phone: string;
  deliveryAddress: Address;
  setPhone: (v: string) => void;
  setDeliveryAddress: (a: Address) => void;
};

export const useProfile = create<ProfileState>((set) => ({
  phone: "+27849198928",
  deliveryAddress: {
    title: "Bridges Road",
    line: "13 Bridges Road, Orkney, North West 2619, South Africa",
  },
  setPhone: (phone) => set({ phone }),
  setDeliveryAddress: (deliveryAddress) => set({ deliveryAddress }),
}));
