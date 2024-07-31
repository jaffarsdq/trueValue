import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import { selectAuthClientId } from "./AuthSlice";
import axiosInstance from "../../config/axiosInstance";

// const axiosInstance = await initializeAxiosInstance();

const initialState = {
    rewardsDetails: {
        REWARD_SETUP: [],
    },
    rewardsFetchData: {
        REWARD_VALUE: [],
        REWARD_SETUP: [],
    },
    button: true,
    pointsButton: true,
    createRewards: true,
    benefitsAndCriteriaValues: [],
    loading: false,
    benefitsAndCriteriaPoints: [],
    rewardsValue: {
        REWARD_VALUE: [],
        REWARD_SETUP: [],
    },
    toggleLocation: true,
    locationList: "",
    selectedLocation: [],
    deletedPoints: [],
    locationloader: false,
    validationErrors: {},
};

export const fetchRewardsDetails = createAsyncThunk(
    "promotion/rewardsDetails",
    async (data, { getState }) => {
        const ClientID = selectAuthClientId(getState());
        try {
            // console.log(data)
            const response = await axiosInstance.post("/Loy_getAllRewards", {
                DATA: {
                    AUTH_KEY: "TXlDb206TG95QVBJMTIz",
                    client_id: ClientID,
                },
            });
            // console.log(response.data, 'Done'); // Verify response data structure
            return response.data;
        } catch (error) {
            throw error.response.data;
        }
    }
);

export const updateRewardsDetails = createAsyncThunk(
    "promotion/updateRewardsDetails",
    async (data, { dispatch }) => {
        try {
            // const isEnabled = data.REWARD_SETUP.enabled;
            // console.log(isEnabled, 'enable');
            // const updatedData = {
            //     ...data,
            //     REWARD_SETUP: {
            //         ...data.REWARD_SETUP,
            //         client_id: "client id",
            //         rewards_code: "RC-0001",
            //         ...(isEnabled ? {} : { enabled: "Y" })
            //     }
            // };

            const response = await axiosInstance.post(
                "/Loy_UpdateRewardSetup",
                {
                    DATA: data,
                }
            );
            dispatch(fetchRewardsDetails());
            return response.data;
        } catch (error) {
            throw error.response.data;
        }
    }
);

// GET LOCATION
export const fetchLocationList = createAsyncThunk(
    "promotion/fetchLocationList",
    async (data) => {
        try {
            // console.log(data)
            const response = await axiosInstance.post(
                "/CRM_Get_Location_By_Code",
                {
                    DATA: {},
                }
            );
            // console.log(response.data, 'Done'); // Verify response data structure
            return response.data;
        } catch (error) {
            console.log(error, "error");
            throw error.response.data;
        }
    }
);

const RewardsSetupSlice = createSlice({
    name: "RewardsSetupSlice",
    initialState,
    reducers: {
        setRewardsDetails: (state, action) => {
            // if (typeof state.rewardsDetails.REWARD_SETUP === 'object' && !Array.isArray(state.rewardsDetails.REWARD_SETUP)) {
            state.rewardsDetails.REWARD_SETUP = {
                ...state.rewardsDetails.REWARD_SETUP,
                ...action.payload,
            };
            // } else {
            //     // Handle the case where REWARD_SETUP is not an object
            //     console.error('REWARD_SETUP is not an object:', state.rewardsDetails.REWARD_SETUP);
            // }
        },
        toggleCreateAndUpdatebtn: (state, action) => {
            state.button = action.payload;
        },
        setToggelePointsButton: (state, action) => {
            state.pointsButton = action.payload;
        },
        setToggleCreateRewards: (state, action) => {
            state.createRewards = action.payload;
        },
        setInitialStageRewardsDetails: (state) => {
            state.rewardsDetails = {
                REWARD_SETUP: [],
                // Type: '',
                // Description: '',
                // Valid_from: '',
                // Valid_to: '',
                // LocationType: '',
                // CardType: '',
                // Enabled: '',
                // FromValue: '',
                // ToValue: '',
                // PointsValue: ''
            };
        },
        setBenefitsAndCriteriaValues: (state, action) => {
            // state.rewardsDetails.REWARDS_VALUE = action.payload
            state.benefitsAndCriteriaValues = action.payload;
        },
        setValidationErrors: (state, action) => {
            console.log("validation call");
            state.validationErrors = action.payload;
        },

        setBenefitsAndCriteriaPoints: (state, action) => {
            const updatedData = action.payload;

            // Find the index of the object to update based on ID (if any)
            const existingIndex = state.benefitsAndCriteriaPoints?.findIndex(
                (item) => item.id === updatedData.id
            );

            // Perform update if object with the same ID exists
            if (existingIndex !== -1) {
                return {
                    ...state,
                    benefitsAndCriteriaPoints: [
                        ...state.benefitsAndCriteriaPoints.slice(
                            0,
                            existingIndex
                        ), // Slice up to the existing object
                        { ...updatedData }, // Spread the updated data to overwrite existing properties
                        ...state.benefitsAndCriteriaPoints.slice(
                            existingIndex + 1
                        ), // Slice from after the existing object
                    ],
                };
            }

            // Otherwise, add the new object
            return {
                ...state,
                benefitsAndCriteriaPoints: [
                    ...state.benefitsAndCriteriaPoints,
                    updatedData,
                ],
            };
        },
        deleteBenefitAndCriteriaPoint: (state, action) => {
            state.benefitsAndCriteriaPoints = action.payload;
        },
        setDeletedPoints: (state, action) => {
            state.deletedPoints.push(action.payload);
        },
        setRewardsFetchData: (state, action) => {
            const deletedData = action.payload;

            const updatedData = state.rewardsFetchData.REWARD_VALUE;

            const existingData = updatedData.map((row) => {
                // if (row.ID === deletedData[0].ID) {
                //     updatedData.push({ "deleted": 1, ...row })
                // }
                // else {
                //     updatedData.push({ "deleted": 0, ...row })
                // }
            });

            // data.map((row) => {
            //     if (row.ID === deleteRow) {
            //         updatedData.push({"deleted":1, ...storeEditValue})
            //     }
            //     else {
            //         updatedData.push({"deleted": 0 , ...row})
            //     }
            // })
            // console.log(deletedRow, 'updated data');
            state.rewardsFetchData.REWARD_VALUE = action.payload;
        },
        setRewardsValue: (state, action) => {
            state.rewardsValue.REWARD_VALUE = action.payload;
        },
        setLoading: (state, action) => {
            state.loading = action.payload;
        },
        setToggleLocation: (state, action) => {
            state.toggleLocation = action.payload;
        },
        setSelectedLocation: (state, action) => {
            state.selectedLocation = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchRewardsDetails.pending, (state) => {
                state.loading = true;
                // state.rewardsDetails = [action.payload];
                // state.rewardsFetchData = [action.payload]
            })
            .addCase(fetchRewardsDetails.fulfilled, (state, action) => {
                state.loading = false;
                // state.rewardsDetails = [action.payload];
                state.rewardsFetchData = action.payload;
                state.rewardsValue = action.payload;
            })
            .addCase(fetchRewardsDetails.rejected, (state, action) => {
                state.loading = false;
                // state.rewardsDetails = [action.payload];
                state.rewardsFetchData = action.payload;
            })
            .addCase(updateRewardsDetails.pending, (state, action) => {
                state.loading = true;
            })
            .addCase(updateRewardsDetails.fulfilled, (state, action) => {
                state.loading = false;
                state.updateStatus = action.payload;
            })
            .addCase(updateRewardsDetails.rejected, (state, action) => {
                state.loading = false;
                state.updateStatus = action.payload;
            })
            .addCase(fetchLocationList.pending, (state, action) => {
                state.locationloader = true;
            })
            .addCase(fetchLocationList.fulfilled, (state, action) => {
                state.locationloader = true;
                state.locationList = action.payload;
            })
            .addCase(fetchLocationList.rejected, (state, action) => {
                state.locationloader = true;
                state.locationList = action.payload;
            });
    },
});

export const {
    setRewardsDetails,
    toggleCreateAndUpdatebtn,
    setCreateRewardsDetails,
    setInitialStageRewardsDetails,
    setButton,
    setBenefitsAndCriteriaValues,
    setToggelePointsButton,
    setToggleCreateRewards,
    setBenefitsAndCriteriaPoints,
    setRewardsFetchData,
    deleteBenefitAndCriteriaPoint,
    setRewardsValue,
    setLoading,
    setToggleLocation,
    setSelectedLocation,
    setDeletedPoints,
    setValidationErrors,
} = RewardsSetupSlice.actions;

export default RewardsSetupSlice.reducer;
