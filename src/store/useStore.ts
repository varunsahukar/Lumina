import { create } from "zustand";

export type UserRole = "INVESTOR" | "ADVISOR" | "AMC" | "RESEARCHER" | "ADMIN";

interface AppState {
  isSidebarOpen: boolean;
  toggleSidebar: () => void;
  activeRole: UserRole;
  setActiveRole: (role: UserRole) => void;
}

export const useAppStore = create<AppState>((set) => ({
  isSidebarOpen: false,
  toggleSidebar: () => set((state) => ({ isSidebarOpen: !state.isSidebarOpen })),
  activeRole: "INVESTOR",
  setActiveRole: (role) => set({ activeRole: role }),
}));
