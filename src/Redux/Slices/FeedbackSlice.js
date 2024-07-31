import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import { selectAuthClientId } from "./AuthSlice";
import axiosInstance from "../../config/axiosInstance";

// const axiosInstance = await initializeAxiosInstance();

// Define async thunk to fetch ratings and options
export const fetchRatingsAndOptions = createAsyncThunk(
    "feedback/fetchRatingsAndOptions",
    async (_, { getState }) => {
        const ClientID = selectAuthClientId(getState());
        try {
            const response = await axiosInstance.post(
                "/Loy_getRatingsAndOptions",
                {
                    DATA: {
                        client_id: ClientID,
                    },
                }
            );
            return response.data;
        } catch (error) {
            throw error.response.data;
        }
    }
);

// Define async thunk to fetch feedback ratings within a specified date range
export const fetchFeedbackRatings = createAsyncThunk(
    "feedback/fetchFeedbackRatings",
    async (dateRange) => {
        try {
            const response = await axiosInstance.post(
                "/Loy_RP_GetFeebackRatings",
                {
                    DATA: {
                        FROM_DATE: dateRange.fromDate,
                        TO_DATE: dateRange.toDate,
                    },
                }
            );
            return response.data;
        } catch (error) {
            throw error.response.data;
        }
    }
);

export const createAndUpdateInsertRatings = createAsyncThunk(
    "promotion/updateFeedbackDetails",
    async (data, { dispatch }) => {
        try {
            const response = await axiosInstance.post(
                "/Loy_UpdateInsertRatings",
                {
                    // "DATA" : data
                    DATA: data,
                }
            );
            dispatch(fetchRatingsAndOptions());
            return response.data;
        } catch (error) {
            throw error.response.data;
        }
    }
);

export const fetchDeleteRatings = createAsyncThunk(
    "fetchDeleteRatings",
    async (data, { dispatch }) => {
        try {
            const response = await axiosInstance.post(
                "/Loy_UpdateInsertRatings",
                {
                    DATA: {
                        RATINGS: [data],
                    },
                }
            );
            dispatch(fetchRatingsAndOptions());
            return response.data;
        } catch (error) {
            throw error.response.data;
        }
    }
);

// const defaultOption = {
//     client_id: client id,
//     options_desc: "",
//     options_desc2: "",
//     image: "",
// };

const initialState = {
    feedbackDetails: {
        // id: "",
        // index: "",
        // group: "",
        // enabled: "N",
        // description: "",
        // secondLanguage: "",
        // option1: "",
        // option2: "",
        // option3: "",
        // option4: "",
    },
    updateRatingsAndOptions: {
        active: "N",
        rating_id: "",
        description: "",
        secondLanguage: "",
        rating_type: "",
        count_value: "",
        Deleted: 0,
    },
    ratingOptions: "", //FOR OPTIONS
    createRatingOptions: [], //FOR SEND
    ratingsAndOptions: {
        DATA: {
            RATINGS: [],
            RATING_OPTIONS: [],
        },
    }, //FOR TABLE
    feedbackRatings: null,
    loadingRatingsAndOptions: false,
    loadingUpdateRatingsAndOptions: false,
    error: null,
    button: true,
};

const feedbackSlice = createSlice({
    name: "feedback",
    initialState,
    reducers: {
        setFeedbackDetails: (state, action) => {
            state.feedbackDetails = {
                ...state.feedbackDetails,
                ...action.payload,
            };
        },
        toggleCreateAndUpdatebtn: (state, action) => {
            state.button = action.payload;
        },
        setUpdateRatingsAndOptions: (state, action) => {
            state.updateRatingsAndOptions = {
                ...state.updateRatingsAndOptions,
                ...action.payload,
                //   ratingOptions: [...state.updateRatingsAndOptions.ratingOptions, ...action.payload.options]
            };
            // {console.log(...action.payload, 'from payload')}
        },
        setRatingOptions: (state, action) => {
            // state.ratingOptions.push(action.payload)
            const { index, field, value } = action.payload;
            // state.ratingOptions[0][index][field] = value;

            if (typeof index !== "undefined") {
                const updatedOption = { ...state.ratingOptions[index] };

                // Update the specified field with the new value
                updatedOption[field] = value;

                // Update the ratingOptions array with the updated option
                state.ratingOptions[index] = updatedOption;
            } else {
                state.ratingOptions = action.payload;
            }
        },
        // setCreateRatingOptions: (state, action) => {
        //     // state.createRatingOptions =action.payload;
        //     const updatedOptions = action.payload.map((item) => ({
        //         ...defaultOption,
        //         ...item, // Merge item properties with defaultOption
        //     }));
        //     state.createRatingOptions = updatedOptions;
        // },
        setInitialStageFeedbackDetails: (state) => {
            state.updateRatingsAndOptions = {
                active: "N",
                rating_id: "",
                description: "",
                secondLanguage: "",
                rating_type: "",
                count_value: "",
                Deleted: 0,
            };
            //     (state.createRatingOptions = [defaultOption]);
            // state.ratingOptions = "";
        },
        // setUpdateFeedbackDetails: (state, action) => {
        //     state.updateFeedbackDetails = {...state.updateFeedbackDetails, ...action.payload};
        // }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchRatingsAndOptions.pending, (state) => {
                state.loadingRatingsAndOptions = true;
                state.error = null;
            })
            .addCase(fetchRatingsAndOptions.fulfilled, (state, action) => {
                state.loadingRatingsAndOptions = false;
                state.ratingsAndOptions = action.payload;
            })
            .addCase(fetchRatingsAndOptions.rejected, (state, action) => {
                state.loadingRatingsAndOptions = false;
                state.error = action.error.message;
            })
            .addCase(createAndUpdateInsertRatings.pending, (state) => {
                state.loadingUpdateRatingsAndOptions = true;
                state.error = null;
            })
            .addCase(
                createAndUpdateInsertRatings.fulfilled,
                (state, action) => {
                    state.loadingUpdateRatingsAndOptions = false;
                    state.ratingsAndOptions = action.payload;
                    // Handle success if needed
                }
            )
            .addCase(createAndUpdateInsertRatings.rejected, (state, action) => {
                state.loadingUpdateRatingsAndOptions = false;
                state.updateRatingsAndOptions = action.payload;
                state.error = action.error.message;
            })
            .addCase(fetchFeedbackRatings.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchFeedbackRatings.fulfilled, (state, action) => {
                state.loading = false;
                state.feedbackRatings = action.payload;
            })
            .addCase(fetchFeedbackRatings.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            });
    },
});

export const {
    setFeedbackDetails,
    setUpdateFeedbackDetails,
    toggleCreateAndUpdatebtn,
    setUpdateRatingsAndOptions,
    setRatingOptions,
    setCreateRatingOptions,
    setInitialStageFeedbackDetails,
} = feedbackSlice.actions;

export default feedbackSlice.reducer;
