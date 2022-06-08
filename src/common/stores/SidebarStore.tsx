import { createState, State, useState } from '@hookstate/core';

// Internal variables
const sidebarState = createState(false);
const wrapState = (s: State<boolean>) => ({
  sidebarOpen: s.value,
  toggleSidebarOpen: () => s.set((prev) => !prev),
  setSidebarOpen: (value: boolean) => s.set(value),
});

export const useSidebar = () => wrapState(useState(sidebarState));
