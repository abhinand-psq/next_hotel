import { create } from 'zustand'
import { persist } from "zustand/middleware";

export const useStore = create(persist((set) => ({
  datas:[],
  adddata: (value) => set((state) => ({datas:[...state.datas,value]})),
  
}),{name:'sdf',}))
