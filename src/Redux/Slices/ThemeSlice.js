import { createSlice } from '@reduxjs/toolkit';


const initialState = {
    darkMode: false,
    BaseColor: "#FAFAFB",
    WhiteColor: "white",
    BorderColor: "#E6EBF1"
};

const themeSlice = createSlice({
    name: 'theme',
    initialState,
    reducers: {
        toggleTheme: state => {
            state.darkMode = !state.darkMode;
        },
        toggleBaseColor: (state, action) => {
            state.BaseColor = action.payload
        },
        setBorderColor: (state, action) => {
            state.BorderColor = action.payload
        },
        setWhiteColor: (state, action) => {
            state.WhiteColor = action.payload
        }

    },
});

export const { toggleTheme, setBorderColor, toggleBaseColor, setWhiteColor } = themeSlice.actions;

export default themeSlice.reducer;