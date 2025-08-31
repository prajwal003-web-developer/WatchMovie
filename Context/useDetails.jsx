import { create } from "zustand";

export const useDetailsStore = create((set) => ({
  isOpen: false,   // modal open state
  openId: null,    // currently opened item ID
  type: null,      // "movie" or "tv"

  // open modal with a specific ID and type
  setOpen: (id, type) => set({ isOpen: true, openId: id, type }),

  // close modal
  setClose: () => set({ isOpen: false, openId: null, type: null }),
}));
