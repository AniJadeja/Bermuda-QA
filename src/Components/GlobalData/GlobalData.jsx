import create from 'zustand';

const useCounterStore = create((set) => ({
  Orbitcontroll: false,
  increment: () => set((state) => ({ Orbitcontroll: true })),
  decrement: () => set((state) => ({ Orbitcontroll: false })),
}));

export default useCounterStore;




const cameraLookAt=create((set)=>{



})