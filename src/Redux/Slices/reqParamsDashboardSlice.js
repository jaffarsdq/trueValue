import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../../config/axiosInstance";

// const axiosInstance = await initializeAxiosInstance();

const initialState = {
    reqParams: [],
    reqParamsLoading: false,
    error: null,
};

export const fetchReqParamsCrm = createAsyncThunk(
    "True_Value_CRM_ParameterList",
    async () => {
        try {
            const response = await axiosInstance.post(
                "True_Value_CRM_ParameterList",
                {
                    DATA: {},
                }
            );
            return response.data;
        } catch (error) {
            throw error.response.data;
        }
    }
);

export const fetchReqParamsAccounts = createAsyncThunk(
    "reqParamsDashboard/fetchReqParamsAccounts",
    async () => {
        try {
            const response = await axiosInstance.post(
                "ErpDashboardAccountsAPI/ErpDB_Acct_GetDashboard_parameterList",
                {
                    DIV_DES: "",
                    DIV_ID: "1",
                    FUNCTION: "ErpDB_Acct_GetDashboard_parameterList",
                    SEND_KEY: "123456",
                    DATA: {},
                }
            );
            return response.data;
        } catch (error) {
            throw error.response.data;
        }
    }
);

// Define async thunk to fetch the purchase dashboard parameter list
export const fetchReqParamsPurchases = createAsyncThunk(
    "reqParamsDashboard/fetchReqParamsPurchase",
    async () => {
        try {
            const response = await axiosInstance.post(
                "ErpDashboardPurchaseAPI/ErpDB_Pur_parameter_list",
                {
                    DIV_DES: "",
                    DIV_ID: "1",
                    FUNCTION: "ErpDB_Pur_parameter_list",
                    SEND_KEY: "123456",
                    DATA: {},
                }
            );
            return response.data;
        } catch (error) {
            throw error.response.data;
        }
    }
);

const reqParamsDashboardSlice = createSlice({
    name: "reqParamsDashboard",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchReqParamsCrm.pending, (state) => {
                state.reqParamsLoading = true;
            })
            .addCase(fetchReqParamsCrm.fulfilled, (state, action) => {
                state.reqParamsLoading = false;
                state.reqParams = action.payload;
            })
            .addCase(fetchReqParamsCrm.rejected, (state, action) => {
                state.reqParamsLoading = false;
                state.error = action.error.message;
                state.reqParams = [];
            })
            .addCase(fetchReqParamsAccounts.pending, (state) => {
                state.reqParamsLoading = true;
            })
            .addCase(fetchReqParamsAccounts.fulfilled, (state, action) => {
                state.reqParamsLoading = false;
                state.reqParams = action.payload;
            })
            .addCase(fetchReqParamsAccounts.rejected, (state, action) => {
                state.reqParamsLoading = false;
                state.error = action.error.message;
                state.reqParams = [];
            })
            .addCase(fetchReqParamsPurchases.pending, (state) => {
                state.reqParamsLoading = true;
                state.error = null;
            })
            .addCase(fetchReqParamsPurchases.fulfilled, (state, action) => {
                state.reqParamsLoading = false;
                state.reqParams = action.payload;
            })
            .addCase(fetchReqParamsPurchases.rejected, (state, action) => {
                state.reqParamsLoading = false;
                state.error = action.error.message;
                state.reqParams = [];
            });
    },
});

export default reqParamsDashboardSlice.reducer;
