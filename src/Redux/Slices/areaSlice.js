import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import axiosInstance from "../../config/axiosInstance";
import { selectAuthClientId } from "./AuthSlice";
import { selectCityCode } from "./citySlice";
import { selectCountryCode } from "./countrySlice";

// const axiosInstance = await initializeAxiosInstance();

const initialState = {
    areaData: [],
    initialStateLoader: false,
    error: null,
    AreaStatus: null,
    createDataLoader: false,
};
export const fetchArea = createAsyncThunk(
    "Area/fetchArea",
    async (_, { getState }) => {
        const ClientID = selectAuthClientId(getState());
        // const Authkey=selectAuthKey(getState())
        // const Loc=selectAuthLoc(getState())
        const country_code = selectCountryCode(getState());
        const city_code = selectCityCode(getState());
        try {
            const response = await axiosInstance.post("CRM_DownloadCou_Ci_Ar", {
                DATA: {
                    client_id: ClientID,
                    // "auth_key": Authkey
                    data_type: "M_AREA",
                    country_code: country_code,
                    city_code: city_code,
                },
            });

            return response.data;
        } catch (error) {
            throw error.response.data;
        }
    }
);
export const CreateArea = createAsyncThunk(
    "Area/CreateArea",
    async (data, { getState, dispatch }) => {
        const country_code = selectCountryCode(getState());
        const ClientID = selectAuthClientId(getState());
        try {
            const response = await axiosInstance.post("CRM_UpdateArea", {
                DATA: [
                    {
                        ...data,
                        country_code: country_code,
                        client_id: ClientID,
                    },
                ],
            });
            dispatch(fetchArea());
            return response.data;
        } catch (error) {
            throw error.response.data;
        }
    }
);

// Define an asynchronous thunk for updating order source data

// Create the order source slice
const Area = createSlice({
    name: "Area",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchArea.pending, (state) => {
                state.error = null;
                state.initialStateLoader = true;
            })
            .addCase(fetchArea.fulfilled, (state, action) => {
                state.initialStateLoader = false;
                state.createDataLoader = false;
                state.areaData = action.payload;
            })
            .addCase(fetchArea.rejected, (state, action) => {
                state.loading = false;
                state.error = true;
                state.initialStateLoader = false;
            })
            .addCase(CreateArea.pending, (state) => {
                state.createDataLoader = true;
                state.error = null;
            })
            .addCase(CreateArea.fulfilled, (state, action) => {
                state.AreaStatus = action.payload;
            })
            .addCase(CreateArea.rejected, (state, action) => {
                state.loading = false;
                state.error = true;
            });
    },
});

export default Area.reducer;
