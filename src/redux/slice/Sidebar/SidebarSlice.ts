import { createSlice } from "@reduxjs/toolkit";

interface SidebarState {
    isOpen: boolean;
}
  
const initialState: SidebarState = {
    isOpen: false,
}

const SidebarSlice = createSlice({
    name: 'SidebarSlice',
    initialState,
    reducers: {
        openSidebar(state) {
            state.isOpen = true;
        },
        closeSidebar(state) {
            state.isOpen = false;
        },
    }
});

export const { openSidebar, closeSidebar } = SidebarSlice.actions;
export default SidebarSlice.reducer;