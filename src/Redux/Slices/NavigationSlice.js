// Redux/Slices/NavigationSlice.js

import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    ThemeBarOpen: false,
    module: "",
    moduleType: "",
    bgColors: {
        Dashboard: "#3f51b5",
        Customers: "#2196f3",
        "Loyalty Ads": "#f55246",
        Rewards: "#ff9800",
        Reports: "#4caf50",
        Settings: "#607d8b",
        "Feedback Settings": "#9c27b0",
    },
    selectedPage: "",
    selectedSubPage: "", // Add this line to track sub-menu
};

const navigationSlice = createSlice({
    name: "navigation",
    initialState,
    reducers: {
        setSelectedPage: (state, action) => {
            state.selectedPage = action.payload;
        },
        setSelectedSubPage: (state, action) => {
            state.selectedSubPage = action.payload;
        },
        SetThemeBarOpen: (state, action) => {
            state.ThemeBarOpen = action.payload;
        },
        SetModule: (state, action) => {
            state.module = action.payload;
        },
        SetModuleType: (state, action) => {
            state.moduleType = action.payload;
        },
    },
});

export const {
    setSelectedPage,
    setSelectedSubPage,
    SetThemeBarOpen,
    SetModule,
    SetModuleType,
} = navigationSlice.actions;

export default navigationSlice.reducer;
