import { create } from "zustand";

export type UserRole = "INVESTOR" | "ADVISOR" | "AMC" | "RESEARCHER" | "ADMIN";

export interface Fund {
  id: string;
  schemeCode: string;
  schemeName: string;
  amcName: string;
  category: string;
  subCategory?: string;
  nav: number;
  aum: number | null;
  expenseRatio: number | null;
  sharpeRatio: number | null;
  alpha: number | null;
  beta: number | null;
  stdDeviation: number | null;
  returns1y: number | null;
  returns3y: number | null;
  returns5y: number | null;
  returns10y: number | null;
  managerName?: string;
}

interface AppState {
  isSidebarOpen: boolean;
  toggleSidebar: () => void;
  activeRole: UserRole;
  setActiveRole: (role: UserRole) => void;
  
  // Wealthtech Screener States
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  selectedCategory: string;
  setSelectedCategory: (category: string) => void;
  sortBy: string;
  setSortBy: (field: string) => void;
  
  // Fund Comparison State Queue
  compareList: Fund[];
  addToCompare: (fund: Fund) => void;
  removeFromCompare: (fundId: string) => void;
  clearCompare: () => void;
}

export const useAppStore = create<AppState>((set) => ({
  isSidebarOpen: false,
  toggleSidebar: () => set((state) => ({ isSidebarOpen: !state.isSidebarOpen })),
  activeRole: "INVESTOR",
  setActiveRole: (role) => set({ activeRole: role }),
  
  // Screener Defaults
  searchQuery: "",
  setSearchQuery: (query) => set({ searchQuery: query }),
  selectedCategory: "All",
  setSelectedCategory: (category) => set({ selectedCategory: category }),
  sortBy: "returns3y",
  setSortBy: (field) => set({ sortBy: field }),
  
  // Comparison Defaults
  compareList: [],
  addToCompare: (fund) => set((state) => {
    // Limit comparison to maximum of 3 funds to fit screen columns perfectly
    if (state.compareList.find((f) => f.id === fund.id)) return state;
    if (state.compareList.length >= 3) return state;
    return { compareList: [...state.compareList, fund] };
  }),
  removeFromCompare: (fundId) => set((state) => ({
    compareList: state.compareList.filter((f) => f.id !== fundId),
  })),
  clearCompare: () => set({ compareList: [] }),
}));
