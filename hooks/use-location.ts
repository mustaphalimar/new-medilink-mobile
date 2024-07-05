import { create } from "zustand";
import { type LocationObject } from "expo-location";

export interface UseLocation {
  location: LocationObject | null;
  setLocation: (location: LocationObject) => void;
}

export const useLocation = create<UseLocation>((set) => ({
  location: null,
  setLocation: (location) => set({ location }),
}));
