import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import { selectAuthClientId } from "./AuthSlice";
import axiosInstance from "../../config/axiosInstance";

// const axiosInstance = await initializeAxiosInstance();
const initialState = {
    countryData: [],
    initialStateLoader: false,
    error: null,
    countryStatus: null,
    createDataLoader: false,
    selectedCountry: "",
    selectedCountryCode: "",
};

export const fetchCountry = createAsyncThunk(
    "Country/fetchCountry",
    async (_, { getState }) => {
        const ClientID = selectAuthClientId(getState());
        // const Authkey=selectAuthKey(getState())
        // const Loc=selectAuthLoc(getState())
        try {
            const response = await axiosInstance.post("CRM_DownloadCou_Ci_Ar", {
                DATA: {
                    client_id: ClientID,
                    // auth_key: Authkey,
                    data_type: "M_COUNTRY",
                },
            });

            return response.data;
        } catch (error) {
            throw error.response.data;
        }
    }
);

export const CreateCountry = createAsyncThunk(
    "Country/CreateCountry",
    async (data, { getState, dispatch }) => {
        const ClientID = selectAuthClientId(getState());
        try {
            const response = await axiosInstance.post("CRM_UpdateCountry", {
                DATA: data,
            });
            dispatch(fetchCountry());
            return response.data;
        } catch (error) {
            throw error.response.data;
        }
    }
);

// Define an asynchronous thunk for updating order source data

// Create the order source slice
const Country = createSlice({
    name: "Country",
    initialState,
    reducers: {
        setSelectedCountry: (state, action) => {
            state.selectedCountry = action.payload;
        },
        setSelectedCountryCode: (state, action) => {
            state.selectedCountryCode = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchCountry.pending, (state) => {
                state.error = null;
                state.initialStateLoader = true;
            })
            .addCase(fetchCountry.fulfilled, (state, action) => {
                state.initialStateLoader = false;
                state.createDataLoader = false;
                state.countryData = action.payload;
            })
            .addCase(fetchCountry.rejected, (state, action) => {
                // state.loading = false;
                state.error = true;
                state.initialStateLoader = false;
            })
            .addCase(CreateCountry.pending, (state) => {
                state.createDataLoader = true;
                state.error = null;
            })
            .addCase(CreateCountry.fulfilled, (state, action) => {
                state.countryStatus = action.payload;
            })
            .addCase(CreateCountry.rejected, (state, action) => {
                state.loading = false;
                state.error = true;
            });
    },
});
export const selectCountryCode = (state) =>
    state.CountrySlice.selectedCountryCode;
export const { setSelectedCountry, setSelectedCountryCode } = Country.actions;

export default Country.reducer;
