import create from "zustand";

export const useCounterStore = create((set) => ({
  Orbitcontroll: false,
  increment: () => set((state) => ({ Orbitcontroll: true })),
  decrement: () => set((state) => ({ Orbitcontroll: false })),
}));

export const useCameraControlStore = create((set) => ({
  cameraControlMode: "character",
  setCameraControlMode: (mode) => set({ cameraControlMode: mode }),
}));


const cameraLookAt=create((set)=>{



})
