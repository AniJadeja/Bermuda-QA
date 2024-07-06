import { create } from "zustand";
export const useAuthStore = create((set) => ({
    userName: "",
    email : "",
    setuserName: (newUserName) => set({ userName: newUserName }),
    setEmail: (newEmail) => set({ email: newEmail }),
  }));
  

  