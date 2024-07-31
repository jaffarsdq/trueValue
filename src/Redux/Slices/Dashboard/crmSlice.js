import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import initializeAxiosInstance from "../../../config/axiosInstance";
import generatePayloadForCrm from "../../../Utils/generatePayloadForCrm";
import axiosInstance from "../../../config/axiosInstance";

// Initial state
const initialState = {
    totalCustomers: null,
    loadingTotalCustomers: false,
    errorTotalCustomers: null,

    totalCustomersJoinedThisMonth: null,
    loadingTotalCustomersJoinedThisMonth: false,
    errorTotalCustomersJoinedThisMonth: null,

    totalCustomersJoinedThisYear: null,
    loadingTotalCustomersJoinedThisYear: false,
    errorTotalCustomersJoinedThisYear: null,

    pointsEarnedVsRedeemedByMonth: null,
    loadingPointsEarnedVsRedeemedByMonth: false,
    errorPointsEarnedVsRedeemedByMonth: null,

    pointsEarnedVsRedeemedPercentage: null,
    loadingPointsEarnedVsRedeemedPercentage: false,
    errorPointsEarnedVsRedeemedPercentage: null,

    customerActivity: null,
    loadingCustomerActivity: false,
    errorCustomerActivity: null,

    customerSatisfaction: null,
    loadingCustomerSatisfaction: false,
    errorCustomerSatisfaction: null,

    ongoingCampaigns: [],
    loadingOngoingCampaigns: false,
    errorOngoingCampaigns: null,

    totalPointsEarnedByMonth: null,
    loadingTotalPointsEarnedByMonth: false,
    errorTotalPointsEarnedByMonth: null,

    totalPointsRedeemedByYear: null,
    loadingTotalPointsRedeemedByYear: false,
    errorTotalPointsRedeemedByYear: null,

    totalPointsEarnedByYear: null,
    loadingTotalPointsEarnedByYear: false,
    errorTotalPointsEarnedByYear: null,

    totalPointsRedeemedByMonth: null,
    loadingTotalPointsRedeemedByMonth: false,
    errorTotalPointsRedeemedByMonth: null,

    totalFeedbackByMonth: null,
    loadingTotalFeedbackByMonth: false,
    errorTotalFeedbackByMonth: null,

    totalFeedbackByYear: null,
    loadingTotalFeedbackByYear: false,
    errorTotalFeedbackByYear: null,

    customerVisitsByMonth: null,
    loadingCustomerVisitsByMonth: false,
    errorCustomerVisitsByMonth: null,

    customerBaseByGender: null,
    loadingCustomerBaseByGender: false,
    errorCustomerBaseByGender: null,

    // Customer_Base_By_Gender
    // Points_Earned_Redeemed_Month_wise
};

// Async thunk for fetching total customers joined this year
export const fetchTotalCustomersJoined = createAsyncThunk(
    "True_Value_CRM_Total_Customers",
    async (filters) => {
        const payload = generatePayloadForCrm(filters);
        try {
            const response = await axiosInstance.post(
                "True_Value_CRM_Total_Customers",
                payload
            );
            const responseData = await response.data;
            return responseData;
        } catch (error) {
            throw error.response.data;
        }
    }
);
// Async thunk for fetching total customers joined this month
export const fetchTotalCustomersJoinedThisMonth = createAsyncThunk(
    "True_Value_CRM_Total_Customers_Month",
    async (filters) => {
        const payload = generatePayloadForCrm(filters);
        try {
            const response = await axiosInstance.post(
                "True_Value_CRM_Total_Customers_Month",
                // payload
                payload
            );
            const responseData = await response.data;
            return responseData;
        } catch (error) {
            throw error.response.data;
        }
    }
);

export const fetchTotalCustomersJoinedThisYear = createAsyncThunk(
    "True_Value_CRM_Total_Customers_Year",
    async (filters) => {
        const payload = generatePayloadForCrm(filters);
        try {
            const response = await axiosInstance.post(
                "True_Value_CRM_Total_Customers_Year",
                // payload
                payload
            );
            const responseData = await response.data;
            return responseData;
        } catch (error) {
            throw error.response.data;
        }
    }
);

// Async thunk for fetching total points earned by month
export const fetchTotalPointsEarnedByMonth = createAsyncThunk(
    "True_Value_CRM_Total_Poinst_Earned_By_Month",
    async (filters) => {
        const payload = generatePayloadForCrm(filters);
        try {
            const response = await axiosInstance.post(
                "True_Value_CRM_Total_Poinst_Earned_By_Month",
                // payload
                payload
            );
            const responseData = await response.data;
            return responseData;
        } catch (error) {
            throw error.response.data;
        }
    }
);

// Async thunk for fetching total points redeemed by year
export const fetchTotalPointsRedeemedByYear = createAsyncThunk(
    "True_Value_CRM_Total_Poinst_Earned_Redeemd_By_Year",
    async (filters) => {
        const payload = generatePayloadForCrm(filters);
        try {
            const response = await axiosInstance.post(
                "True_Value_CRM_Total_Poinst_Earned_Redeemd_By_Year",
                payload
            );
            const responseData = await response.data;
            return responseData;
        } catch (error) {
            throw error.response.data;
        }
    }
);

// Async thunk for fetching total points earned by year
export const fetchTotalPointsEarnedByYear = createAsyncThunk(
    "True_Value_CRM_Total_Poinst_Earned_By_Year",
    async (filters) => {
        const payload = generatePayloadForCrm(filters);
        try {
            const response = await axiosInstance.post(
                "True_Value_CRM_Total_Poinst_Earned_By_Year",
                payload
            );
            const responseData = await response.data;
            return responseData;
        } catch (error) {
            throw error.response.data;
        }
    }
);

// Async thunk for fetching total points redeemed by month
export const fetchTotalPointsRedeemedByMonth = createAsyncThunk(
    "True_Value_CRM_Total_Points_Redeemded_By_Month",
    async (filters) => {
        const payload = generatePayloadForCrm(filters);
        try {
            const response = await axiosInstance.post(
                "True_Value_CRM_Total_Points_Redeemded_By_Month",
                payload
            );
            const responseData = await response.data;
            return responseData;
        } catch (error) {
            throw error.response.data;
        }
    }
);

// Async thunk for fetching total feedback by month
export const fetchTotalFeedbackByMonth = createAsyncThunk(
    "True_Value_CRM_Total_FeedBack_by_month",
    async (filters) => {
        const payload = generatePayloadForCrm(filters);
        try {
            const response = await axiosInstance.post(
                "True_Value_CRM_Total_FeedBack_by_month",
                payload
            );
            const responseData = await response.data;
            return responseData;
        } catch (error) {
            throw error.response.data;
        }
    }
);

// Async thunk for fetching total feedback by year
export const fetchTotalFeedbackByYear = createAsyncThunk(
    "True_Value_CRM_Total_FeedBack_By_Year",
    async (filters) => {
        const payload = generatePayloadForCrm(filters);
        try {
            const response = await axiosInstance.post(
                "True_Value_CRM_Total_FeedBack_By_Year",
                payload
            );
            const responseData = await response.data;
            return responseData;
        } catch (error) {
            throw error.response.data;
        }
    }
);

// Async thunk for fetching customer visits by month
export const fetchCustomerVisitsByMonth = createAsyncThunk(
    "True_Value_CRM_CustomerVisit_By_Month",
    async (filters) => {
        const payload = generatePayloadForCrm(filters);
        try {
            const response = await axiosInstance.post(
                "True_Value_CRM_CustomerVisit_By_Month",
                payload
            );
            const responseData = await response.data;
            return responseData;
        } catch (error) {
            throw error.response.data;
        }
    }
);

// Async thunk for fetching customer base by gender
export const fetchCustomerBaseByGender = createAsyncThunk(
    "True_Value_CRM_Customer_Base_By_Gender",
    async (filters) => {
        const payload = generatePayloadForCrm(filters);
        try {
            const response = await axiosInstance.post(
                "True_Value_CRM_Customer_Base_By_Gender",
                payload
            );
            const responseData = await response.data;
            return responseData;
        } catch (error) {
            throw error.response.data;
        }
    }
);

// Async thunk for fetching customer base by gender
export const fetchPointsEarnedVsRedeemedByMonth = createAsyncThunk(
    "True_Value_CRM_Points_Earned_Redeemed_Month_wise",
    async (filters) => {
        const payload = generatePayloadForCrm(filters);
        try {
            const response = await axiosInstance.post(
                "True_Value_CRM_Points_Earned_Redeemed_Month_wise",
                payload
            );
            const responseData = await response.data;
            return responseData;
        } catch (error) {
            throw error.response.data;
        }
    }
);
export const fetchPointsEarnedVsRedeemedPercentage = createAsyncThunk(
    "True_Value_CRM_Points_Earned_Redeemed_Percentage",
    async (filters) => {
        const payload = generatePayloadForCrm(filters);
        try {
            const response = await axiosInstance.post(
                "True_Value_CRM_Points_Earned_Redeemed_Percentage",
                payload
            );
            const responseData = await response.data;
            return responseData;
        } catch (error) {
            throw error.response.data;
        }
    }
);

// Create slice
const crmDashboardSlice = createSlice({
    name: "crmDashboard",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            // Handle fetchTotalCustomers
            .addCase(fetchTotalCustomersJoined.pending, (state) => {
                state.loadingTotalCustomers = true;
                state.errorTotalCustomers = null;
            })
            .addCase(fetchTotalCustomersJoined.fulfilled, (state, action) => {
                state.loadingTotalCustomers = false;
                state.totalCustomers = action.payload.DATA || [];
            })
            .addCase(fetchTotalCustomersJoined.rejected, (state, action) => {
                state.loadingTotalCustomers = false;
                state.errorTotalCustomers = action.error.message;
            })
            // Handle fetchPointsEarnedVsRedeemed
            .addCase(fetchPointsEarnedVsRedeemedByMonth.pending, (state) => {
                state.loadingPointsEarnedVsRedeemedByMonth = true;
                state.errorPointsEarnedVsRedeemedByMonth = null;
            })
            .addCase(
                fetchPointsEarnedVsRedeemedByMonth.fulfilled,
                (state, action) => {
                    state.loadingPointsEarnedVsRedeemedByMonth = false;
                    state.pointsEarnedVsRedeemedByMonth = action.payload.DATA || [];
                }
            )
            .addCase(
                fetchPointsEarnedVsRedeemedByMonth.rejected,
                (state, action) => {
                    state.loadingPointsEarnedVsRedeemedByMonth = false;
                    state.errorPointsEarnedVsRedeemedByMonth =
                        action.error.message;
                }
            )
            .addCase(fetchPointsEarnedVsRedeemedPercentage.pending, (state) => {
                state.loadingPointsEarnedVsRedeemedPercentage = true;
                state.errorPointsEarnedVsRedeemedPercentage = null;
            })
            .addCase(
                fetchPointsEarnedVsRedeemedPercentage.fulfilled,
                (state, action) => {
                    state.loadingPointsEarnedVsRedeemedPercentage = false;
                    state.pointsEarnedVsRedeemedPercentage = action.payload.DATA || [];
                }
            )
            .addCase(
                fetchPointsEarnedVsRedeemedPercentage.rejected,
                (state, action) => {
                    state.loadingPointsEarnedVsRedeemedPercentage = false;
                    state.errorPointsEarnedVsRedeemedPercentage =
                        action.error.message;
                }
            )
            // // Handle fetchCustomerActivity
            // .addCase(fetchCustomerActivity.pending, (state) => {
            //     state.loadingCustomerActivity = true;
            //     state.errorCustomerActivity = null;
            // })
            // .addCase(fetchCustomerActivity.fulfilled, (state, action) => {
            //     state.loadingCustomerActivity = false;
            //     state.customerActivity = action.payload.DATA || [];
            // })
            // .addCase(fetchCustomerActivity.rejected, (state, action) => {
            //     state.loadingCustomerActivity = false;
            //     state.errorCustomerActivity = action.error.message;
            // })
            // // Handle fetchCustomerSatisfaction
            // .addCase(fetchCustomerSatisfaction.pending, (state) => {
            //     state.loadingCustomerSatisfaction = true;
            //     state.errorCustomerSatisfaction = null;
            // })
            // .addCase(fetchCustomerSatisfaction.fulfilled, (state, action) => {
            //     state.loadingCustomerSatisfaction = false;
            //     state.customerSatisfaction = action.payload.DATA || [];
            // })
            // .addCase(fetchCustomerSatisfaction.rejected, (state, action) => {
            //     state.loadingCustomerSatisfaction = false;
            //     state.errorCustomerSatisfaction = action.error.message;
            // })
            // // Handle fetchOngoingCampaigns
            // .addCase(fetchOngoingCampaigns.pending, (state) => {
            //     state.loadingOngoingCampaigns = true;
            //     state.errorOngoingCampaigns = null;
            // })
            // .addCase(fetchOngoingCampaigns.fulfilled, (state, action) => {
            //     state.loadingOngoingCampaigns = false;
            //     state.ongoingCampaigns = action.payload.DATA || [];
            // })
            // .addCase(fetchOngoingCampaigns.rejected, (state, action) => {
            //     state.loadingOngoingCampaigns = false;
            //     state.errorOngoingCampaigns = action.error.message;
            // })
            // Handle fetchTotalCustomersJoinedThisMonth
            .addCase(fetchTotalCustomersJoinedThisMonth.pending, (state) => {
                state.loadingTotalCustomersJoinedThisMonth = true;
                state.errorTotalCustomersJoinedThisMonth = null;
            })
            .addCase(
                fetchTotalCustomersJoinedThisMonth.fulfilled,
                (state, action) => {
                    state.loadingTotalCustomersJoinedThisMonth = false;
                    state.totalCustomersJoinedThisMonth = action.payload.DATA || [];
                }
            )
            .addCase(
                fetchTotalCustomersJoinedThisMonth.rejected,
                (state, action) => {
                    state.loadingTotalCustomersJoinedThisMonth = false;
                    state.errorTotalCustomersJoinedThisMonth =
                        action.error.message;
                }
            )
            // Handle fetchTotalCustomersJoinedThisYear
            .addCase(fetchTotalCustomersJoinedThisYear.pending, (state) => {
                state.loadingTotalCustomersJoinedThisYear = true;
                state.errorTotalCustomersJoinedThisYear = null;
            })
            .addCase(
                fetchTotalCustomersJoinedThisYear.fulfilled,
                (state, action) => {
                    state.loadingTotalCustomersJoinedThisYear = false;
                    state.totalCustomersJoinedThisYear = action.payload.DATA || [];
                }
            )
            .addCase(
                fetchTotalCustomersJoinedThisYear.rejected,
                (state, action) => {
                    state.loadingTotalCustomersJoinedThisYear = false;
                    state.errorTotalCustomersJoinedThisYear =
                        action.error.message;
                }
            )
            // Handle fetchTotalPointsEarnedByMonth
            .addCase(fetchTotalPointsEarnedByMonth.pending, (state) => {
                state.loadingTotalPointsEarnedByMonth = true;
                state.errorTotalPointsEarnedByMonth = null;
            })
            .addCase(
                fetchTotalPointsEarnedByMonth.fulfilled,
                (state, action) => {
                    state.loadingTotalPointsEarnedByMonth = false;
                    state.totalPointsEarnedByMonth = action.payload.DATA || [];
                }
            )
            .addCase(
                fetchTotalPointsEarnedByMonth.rejected,
                (state, action) => {
                    state.loadingTotalPointsEarnedByMonth = false;
                    state.errorTotalPointsEarnedByMonth = action.error.message;
                }
            )
            // Handle fetchTotalPointsRedeemedByYear
            .addCase(fetchTotalPointsRedeemedByYear.pending, (state) => {
                state.loadingTotalPointsRedeemedByYear = true;
                state.errorTotalPointsRedeemedByYear = null;
            })
            .addCase(
                fetchTotalPointsRedeemedByYear.fulfilled,
                (state, action) => {
                    state.loadingTotalPointsRedeemedByYear = false;
                    state.totalPointsRedeemedByYear = action.payload.DATA || [];
                }
            )
            .addCase(
                fetchTotalPointsRedeemedByYear.rejected,
                (state, action) => {
                    state.loadingTotalPointsRedeemedByYear = false;
                    state.errorTotalPointsRedeemedByYear = action.error.message;
                }
            )
            // Handle fetchTotalPointsEarnedByYear
            .addCase(fetchTotalPointsEarnedByYear.pending, (state) => {
                state.loadingTotalPointsEarnedByYear = true;
                state.errorTotalPointsEarnedByYear = null;
            })
            .addCase(
                fetchTotalPointsEarnedByYear.fulfilled,
                (state, action) => {
                    state.loadingTotalPointsEarnedByYear = false;
                    state.totalPointsEarnedByYear = action.payload.DATA || [];
                }
            )
            .addCase(fetchTotalPointsEarnedByYear.rejected, (state, action) => {
                state.loadingTotalPointsEarnedByYear = false;
                state.errorTotalPointsEarnedByYear = action.error.message;
            })
            // Handle fetchTotalPointsRedeemedByMonth
            .addCase(fetchTotalPointsRedeemedByMonth.pending, (state) => {
                state.loadingTotalPointsRedeemedByMonth = true;
                state.errorTotalPointsRedeemedByMonth = null;
            })
            .addCase(
                fetchTotalPointsRedeemedByMonth.fulfilled,
                (state, action) => {
                    state.loadingTotalPointsRedeemedByMonth = false;
                    state.totalPointsRedeemedByMonth = action.payload.DATA || [];
                }
            )
            .addCase(
                fetchTotalPointsRedeemedByMonth.rejected,
                (state, action) => {
                    state.loadingTotalPointsRedeemedByMonth = false;
                    state.errorTotalPointsRedeemedByMonth =
                        action.error.message;
                }
            )
            // Handle fetchTotalFeedbackByMonth
            .addCase(fetchTotalFeedbackByMonth.pending, (state) => {
                state.loadingTotalFeedbackByMonth = true;
                state.errorTotalFeedbackByMonth = null;
            })
            .addCase(fetchTotalFeedbackByMonth.fulfilled, (state, action) => {
                state.loadingTotalFeedbackByMonth = false;
                state.totalFeedbackByMonth = action.payload.DATA || [];
            })
            .addCase(fetchTotalFeedbackByMonth.rejected, (state, action) => {
                state.loadingTotalFeedbackByMonth = false;
                state.errorTotalFeedbackByMonth = action.error.message;
            })
            // Handle fetchTotalFeedbackByYear
            .addCase(fetchTotalFeedbackByYear.pending, (state) => {
                state.loadingTotalFeedbackByYear = true;
                state.errorTotalFeedbackByYear = null;
            })
            .addCase(fetchTotalFeedbackByYear.fulfilled, (state, action) => {
                state.loadingTotalFeedbackByYear = false;
                state.totalFeedbackByYear = action.payload.DATA || [];
            })
            .addCase(fetchTotalFeedbackByYear.rejected, (state, action) => {
                state.loadingTotalFeedbackByYear = false;
                state.errorTotalFeedbackByYear = action.error.message;
            })
            // Handle fetchCustomerVisitsByMonth
            .addCase(fetchCustomerVisitsByMonth.pending, (state) => {
                state.loadingCustomerVisitsByMonth = true;
                state.errorCustomerVisitsByMonth = null;
            })
            .addCase(fetchCustomerVisitsByMonth.fulfilled, (state, action) => {
                state.loadingCustomerVisitsByMonth = false;
                state.customerVisitsByMonth = action.payload.DATA || [];
            })
            .addCase(fetchCustomerVisitsByMonth.rejected, (state, action) => {
                state.loadingCustomerVisitsByMonth = false;
                state.errorCustomerVisitsByMonth = action.error.message;
            })
            // Handle customerBaseByGender
            .addCase(fetchCustomerBaseByGender.pending, (state) => {
                state.loadingCustomerBaseByGender = true;
                state.errorCustomerBaseByGender = null;
            })
            .addCase(fetchCustomerBaseByGender.fulfilled, (state, action) => {
                state.loadingCustomerBaseByGender = false;
                state.customerBaseByGender = action.payload.DATA || [];
            })
            .addCase(fetchCustomerBaseByGender.rejected, (state, action) => {
                state.loadingCustomerBaseByGender = false;
                state.errorCustomerBaseByGender = action.error.message;
            });
    },
});

export default crmDashboardSlice.reducer;
