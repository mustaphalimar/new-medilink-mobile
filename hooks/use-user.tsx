import { create } from "zustand";

export interface UseUser {
  user: any;
  setUser: (user: null) => void;
}

export const useUser = create<UseUser>((set) => ({
  user: null,
  setUser: (user: any) => set({ user }),
}));
