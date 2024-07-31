import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../../../config/axiosInstance";

// const axiosInstance = await initializeAxiosInstance();

const initialState = {
    filters: [],
    crmFilters: [],
    reportFilters: [],
    field: "",
    condition: "",
    value: "",
    reqParamsLoading: false,
    addedFilters: [],
    selectableFields: [],
    updatedRoutesConfig: [],
    requiredParams: [],
    requiredParamsLoading: false,
};

export const fetchReportFilters = createAsyncThunk(
    "Reports/Loy_RP_ReportParameters",
    async (selectedReport) => {
        try {
            const response = await axiosInstance.post(
                "Loy_RP_ReportParameters",
                {
                    DATA: {
                        report_id: selectedReport,
                    },
                }
            );

            return response.data;
        } catch (error) {
            throw error.response.data;
        }
    }
);

const dashboardFilterSlice = createSlice({
    name: "dashboardFilter",
    initialState,
    reducers: {
        addFiltersDashboard: (state, action) => {
            state.filters = action.payload;
        },
        addField: (state, action) => {
            state.field = action.payload;
        },
        addCondition: (state, action) => {
            state.condition = action.payload;
        },
        addValue: (state, action) => {
            state.value = action.payload;
        },
        addFilter: (state, action) => {
            state.filters.push(action.payload);
        },
        setCrmFilters: (state, action) => {
            state.crmFilters.push(action.payload);
        },
        removeFilter: (state, action) => {
            state.filters = state.filters.filter(
                (filter, index) => index !== action.payload
            );
        },
        setAddedFilters: (state, action) => {
            state.addedFilters = action.payload;
        },
        resetFilters: (state) => {
            state.filters = [];
        },
        setSelectableFields: (state, action) => {
            state.selectableFields = action.payload;
        },
        // New reducers for reportFilters
        addReportFilter: (state, action) => {
            state.reportFilters.push(action.payload);
        },
        removeReportFilter: (state, action) => {
            state.reportFilters = state.reportFilters.filter(
                (filter, index) => index !== action.payload
            );
        },
        setReportFilters: (state, action) => {
            state.reportFilters = action.payload;
        },
        resetReportFilters: (state) => {
            state.reportFilters = [];
        },
        setUpdatedRoutesConfig: (state, action) => {
            state.updatedRoutesConfig = action.payload;
        },
        resetFiltersOnPageChange: (state) => {
            state.addedFilters = [];
            state.filters = [];
            state.crmFilters = [];
            state.reportFilters = [];
            state.selectableFields = [];
            state.requiredParams = [];
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchReportFilters.pending, (state) => {
                state.requiredParamsLoading = true;
            })
            .addCase(fetchReportFilters.fulfilled, (state, action) => {
                state.requiredParamsLoading = false;
                state.requiredParams = action.payload;
                state.selectableFields = action.payload;
                const newFilters = action.payload.map((param) => ({
                    field: param.field_name,
                    value: param.field_value,
                    mandatory: param.mandatory_field,
                }));
                state.addedFilters = [...newFilters];
            })
            .addCase(fetchReportFilters.rejected, (state, action) => {
                state.requiredParamsLoading = false;
                state.error = action.error.message;
                state.requiredParams = [];
            });
    },
});

export const {
    addField,
    addCondition,
    addValue,
    addFilter,
    removeFilter,
    resetFilters,
    setAddedFilters,
    setSelectableFields,
    addReportFilter,
    removeReportFilter,
    setReportFilters,
    setUpdatedRoutesConfig,
    resetReportFilters,
    addFiltersDashboard,
    setCrmFilters,
    resetFiltersOnPageChange,
} = dashboardFilterSlice.actions;
export const selectFilters = (state) => state.dashboardFilterSlice.filters;
export const selectReportFilters = (state) =>
    state.dashboardFilterSlice.reportFilters;
export default dashboardFilterSlice.reducer;
