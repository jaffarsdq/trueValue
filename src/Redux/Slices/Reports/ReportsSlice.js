import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

import generatePayloadForReport from "../../../Utils/generatePayloadForStocks";
import axiosInstance from "../../../config/axiosInstance";

const initialState = {
    reportList: [],
    reportListLoading: false,
    selectedReport: {},
    reportData: [],
    status: "idle",
    error: null,
    reportByIdLoading: false,
    requiredParams: [],
    requiredParamsLoading: false,
};

// const axiosInstance = await initializeAxiosInstance();

export const fetchReportList = createAsyncThunk(
    "loyalty/Loy_RP_GetReportNames",
    async () => {
        try {
            const response = await axiosInstance.post(
                "/Loy_RP_GetReportNames",
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

export const fetchReportParamsById = createAsyncThunk(
    "sales/fetchReportParamsById",
    async (selectedReport) => {
        try {
            const response = await axios.post(
                "http://devp.mycomsys.com:8806/api/Restpos_parameter_list",
                {
                    DIV_DES: "",
                    DIV_ID: "1",
                    FUNCTION: "Restpos_parameter_list",
                    SEND_KEY: "123456",
                    DATA: selectedReport,
                }
            );
            return response.data;
        } catch (error) {
            throw error.response.data;
        }
    }
);

export const fetchGetLoyaltyCustomerReport = createAsyncThunk(
    "loyalty/Loy_RP_GetLoyaltyCustomer",
    async (filters) => {
        try {
            const payload = generatePayloadForReport(filters);
            const response = await axiosInstance.post(
                "/Loy_RP_GetLoyaltyCustomer",
                payload
            );
            return response.data;
        } catch (error) {
            throw error.response.data;
        }
    }
);

export const fetchGetTopActiveCustomers = createAsyncThunk(
    "loyalty/Loy_RP_GetTopActiveCustomers",
    async (filters) => {
        try {
            const payload = generatePayloadForReport(filters);
            const response = await axiosInstance.post(
                "/Loy_RP_GetTopActiveCustomers",
                payload
            );
            return response.data;
        } catch (error) {
            throw error.response.data;
        }
    }
);

export const fetchGetLeastActiveCustomers = createAsyncThunk(
    "loyalty/Loy_RP_GetLeastActiveCustomers",
    async (filters) => {
        try {
            const payload = generatePayloadForReport(filters);
            const response = await axiosInstance.post(
                "/Loy_RP_GetLeastActiveCustomers",
                payload
            );
            return response.data;
        } catch (error) {
            throw error.response.data;
        }
    }
);

export const fetchGetTopCustomersBasketAnalysis = createAsyncThunk(
    "loyalty/Loy_RP_GetTopCustomersBasketAnalysis",
    async (filters) => {
        try {
            const payload = generatePayloadForReport(filters);
            const response = await axiosInstance.post(
                "/Loy_RP_GetTopCustomersBasketAnalysis",
                payload
            );
            return response.data;
        } catch (error) {
            throw error.response.data;
        }
    }
);

export const fetchGetPointsStatement = createAsyncThunk(
    "loyalty/Loy_RP_GetPointsStatement",
    async (filters) => {
        try {
            const payload = generatePayloadForReport(filters);
            const response = await axiosInstance.post(
                "/Loy_RP_GetPointsStatement",
                payload
            );
            return response.data;
        } catch (error) {
            throw error.response.data;
        }
    }
);

export const fetchGetFeedbackForm = createAsyncThunk(
    "v1/customer/Loy_RP_GetFeebackRatings",
    async (filters) => {
        try {
            const payload = generatePayloadForReport(filters);
            const response = await axiosInstance.post(
                "/Loy_RP_GetFeebackRatings",
                payload
            );
            return response.data;
        } catch (error) {
            throw error.response.data;
        }
    }
);

export const fetchFeedBackSummary = createAsyncThunk(
    "v1/customer/Loy_RP_FeebackRatingSummary",
    async (filters) => {
        try {
            const payload = generatePayloadForReport(filters);
            const response = await axiosInstance.post(
                "/Loy_RP_FeebackRatingSummary",
                payload
            );
            return response.data;
        } catch (error) {
            throw error.response.data;
        }
    }
);

const ReportsSlice = createSlice({
    name: "Reports",
    initialState,
    reducers: {
        setSelectedReport: (state, action) => {
            state.selectedReport = action.payload;
        },
        setRequiredParams: (state, action) => {
            state.requiredParams = action.payload;
        },
        setReportData: (state, action) => {
            state.reportData = action.payload;
        },
        setReportDataEmpty: (state) => {
            state.reportData = [];
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchReportList.pending, (state) => {
                state.status = "loading";
                state.reportListLoading = true;
            })
            .addCase(fetchReportList.fulfilled, (state, action) => {
                state.status = "succeeded";
                state.reportList = action.payload;
                state.reportListLoading = false;
            })
            .addCase(fetchReportList.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.error.message;
                state.reportListLoading = false;
            })
            .addCase(fetchGetFeedbackForm.pending, (state) => {
                state.status = "loading";
                state.reportByIdLoading = true;
            })
            .addCase(fetchGetFeedbackForm.fulfilled, (state, action) => {
                state.status = "succeeded";
                state.reportData =
                    action.payload.SUCCESS === "True"
                        ? action.payload.DATA
                        : [];
                state.reportByIdLoading = false;
            })
            .addCase(fetchGetFeedbackForm.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.error.message;
                state.reportByIdLoading = false;
            })
            .addCase(fetchFeedBackSummary.pending, (state) => {
                state.status = "loading";
                state.reportByIdLoading = true;
            })
            .addCase(fetchFeedBackSummary.fulfilled, (state, action) => {
                state.status = "succeeded";
                state.reportData =
                    action.payload.SUCCESS === "True"
                        ? action.payload.DATA
                        : [];
                state.reportByIdLoading = false;
            })
            .addCase(fetchFeedBackSummary.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.error.message;
                state.reportByIdLoading = false;
            })
            .addMatcher(
                (action) =>
                    action.type.endsWith("/pending") &&
                    action.type.startsWith("loyalty/"),
                (state) => {
                    state.reportByIdLoading = true;
                }
            )
            .addMatcher(
                (action) =>
                    action.type.endsWith("/fulfilled") &&
                    action.type.startsWith("loyalty/"),
                (state, action) => {
                    state.reportByIdLoading = false;
                    state.reportData =
                        action.payload.SUCCESS === "True"
                            ? action.payload.DATA
                            : [];
                }
            )
            .addMatcher(
                (action) =>
                    action.type.endsWith("/rejected") &&
                    action.type.startsWith("loyalty/"),
                (state, action) => {
                    state.reportByIdLoading = false;
                    state.error = action.error.message;
                    state.reportData = [];
                }
            );
    },
});

export const {
    setSelectedReport,
    setRequiredParams,
    setReportData,
    setReportDataEmpty,
} = ReportsSlice.actions;
export default ReportsSlice.reducer;
