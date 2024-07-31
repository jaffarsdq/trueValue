import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import { selectAuthClientId } from "./AuthSlice";
import { selectCountryCode } from "./countrySlice";
import axiosInstance from "../../config/axiosInstance";

// const axiosInstance = await initializeAxiosInstance();
const initialState = {
    cityData: [],
    initialStateLoader: false,
    error: null,
    CityStatus: null,
    createDataLoader: false,
    selectedCity: "",
    selectedCityCode: "",
};
export const fetchCity = createAsyncThunk(
    "City/fetchCity",
    async (_, { getState }) => {
        const ClientID = selectAuthClientId(getState());
        const country_code = selectCountryCode(getState());
        // const Authkey=selectAuthKey(getState())
        // const Loc=selectAuthLoc(getState())
        try {
            const response = await axiosInstance.post("CRM_DownloadCou_Ci_Ar", {
                DATA: {
                    client_id: ClientID,
                    data_type: "M_CITY",
                    country_code: country_code,
                },
            });
            return response.data;
        } catch (error) {
            throw error.response.data;
        }
    }
);
export const CreateCity = createAsyncThunk(
    "City/CreateCity",
    async (data, { getState, dispatch }) => {
        try {
            const response = await axiosInstance.post("CRM_UpdateCity", {
                DATA: [data],
            });
            dispatch(fetchCity());
            return response.data;
        } catch (error) {
            throw error.response.data;
        }
    }
);

// Define an asynchronous thunk for updating order source data

// Create the order source slice
const City = createSlice({
    name: "City",
    initialState,
    reducers: {
        setSelectedCity: (state, action) => {
            state.selectedCity = action.payload;
        },
        setSelectedCityCode: (state, action) => {
            state.selectedCityCode = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchCity.pending, (state) => {
                state.error = null;
                state.initialStateLoader = true;
            })
            .addCase(fetchCity.fulfilled, (state, action) => {
                state.initialStateLoader = false;
                state.createDataLoader = false;
                state.cityData = action.payload;
            })
            .addCase(fetchCity.rejected, (state, action) => {
                state.loading = false;
                state.error = true;
                state.initialStateLoader = false;
            })
            .addCase(CreateCity.pending, (state) => {
                state.createDataLoader = true;
                state.error = null;
            })
            .addCase(CreateCity.fulfilled, (state, action) => {
                state.CityStatus = action.payload;
            })
            .addCase(CreateCity.rejected, (state, action) => {
                state.loading = false;
                state.error = true;
            });
    },
});

export const selectCityCode = (state) => state.CitySlice.selectedCityCode;
export const { setSelectedCity, setSelectedCityCode } = City.actions;

export default City.reducer;
