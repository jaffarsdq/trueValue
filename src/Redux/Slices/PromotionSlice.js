import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

// import initializeAxiosInstance from '../../config/axiosInstance';
import axiosInstance from '../../config/axiosInstance';
import { selectAuthClientId } from './AuthSlice';

// const axiosInstance = await initializeAxiosInstance();

const initialState = {
    promotion: {
        // id: '',
        // code: '',
        // promoDescription: '',
        // validFrom: '',
        // validTo: '',
        // timeFrom: '',
        // timeTo: '',
        // promoValue: '',
        // description: '',
        // flyerPath: '',
        // promoImage: '',
    },
    createPromotions: {
        client_id: '',
        PROMO_ID: '',
        LOC_ID: '',
        PROMO_CODE: '',
        ACTIVE: 'TRUE',
        PROMO_DESC: '',
        PROMO_VALUE: '',
        VALID_FROM: '',
        VALID_TO: '',
        TIME_FROM: '',
        TIME_TO: '',
        PROMO_BIG_DESC: '',
        FlyerPath: '',
        PROMO_IMAGE: '',
        valid: '',
        cust_gender: '',
    },
    createPromotionStatus: '',
    loading: false, // Adjusted initial loading state to false
    message: false,
    button: true,
    imageUploader: '',
    imageFlyer: '',
    flyerStatus: true,
    saveFileName: '',
    locationList: '',
};

export const fetchPromotion = createAsyncThunk(
    'promotion/fetchPromotion',
    async (_, { getState }) => {
        const ClientID = selectAuthClientId(getState());
        try {
            const response = await axiosInstance.post('Loy_CRM_GetPromotions', {
                DATA: {
                    AUTH_KEY: 'TXlDb206TG95QVBJMTIz',
                    CLIENT_ID: ClientID,
                    LOC_ID: 'ALL',
                    LOY_EXC: 0,
                },
            });
            return response.data;
        } catch (error) {
            throw error.response.data;
        }
    }
);

export const createAndUpdatePromotion = createAsyncThunk(
    'promotion/createPromotion',
    async (Data, { dispatch, getState }) => {
        const ClientID = selectAuthClientId(getState());
        try {
            const response = await axiosInstance.post(
                'Loy_CRM_CreatePromotions',
                {
                    DATA: {
                        AUTH_KEY: 'TXlDb206TG95QVBJMTIz',
                        CLIENT_ID: ClientID,
                        PROMOTIONS: [Data],
                    },
                }
            );
            dispatch(fetchPromotion()); // Automatically refetch promotions after creating one
            return response.data;
        } catch (error) {
            throw error.response.data;
        }
    }
);

export const deletePromotion = createAsyncThunk(
    'promotion/deletePromotion',
    async (Data, { dispatch, getState }) => {
        const ClientID = selectAuthClientId(getState());
        try {
            const response = await axiosInstance.post(
                'Loy_CRM_CreatePromotions',
                {
                    DATA: {
                        AUTH_KEY: 'TXlDb206TG95QVBJMTIz',
                        CLIENT_ID: ClientID,
                        PROMOTIONS: [Data],
                    },
                }
            );
            dispatch(fetchPromotion()); // Automatically refetch promotions after creating one
            return response.data;
        } catch (error) {
            throw error.response.data;
        }
    }
);

export const fetchImageUploader = createAsyncThunk(
    'promotion/FileAndImageUploader_promo',
    async (fileName) => {
        try {
            const response = await axiosInstance.post(
                'FileAndImageUploader_promo',
                fileName
            );

            // dispatch(fetchPromotion()); // Automatically refetch promotions after creating one
            return response.data;
        } catch (error) {
            throw error.response.data;
        }
    }
);

export const fetchImageFlyer = createAsyncThunk(
    'promotion/FileAndImageUploader_flyer',
    async (fileName) => {
        try {
            const response = await axiosInstance.post(
                'FileAndImageUploader_Flyer',
                fileName
            );

            // dispatch(fetchPromotion()); // Automatically refetch promotions after creating one
            return response.data;
        } catch (error) {
            throw error.response.data;
        }
    }
);

// GET LOCATION
export const fetchLocationList = createAsyncThunk(
    'promotion/fetchLocationList',
    async (data) => {
        try {
            // console.log(data)
            const response = await axiosInstance.post(
                '/CRM_Get_Location_By_Code',
                {
                    DATA: {},
                }
            );
            // console.log(response.data, 'Done'); // Verify response data structure
            return response.data;
        } catch (error) {
            console.log(error, 'error');
            throw error.response.data;
        }
    }
);

const PromotionSlice = createSlice({
    name: 'promotionSlice',
    initialState,
    reducers: {
        setPromotionDetails: (state, action) => {
            state.promotion = action.payload;
        },
        setFileName: (state, action) => {
            state.saveFileName = action.payload;
        },
        setFlyer: (state, action) => {
            state.imageFlyer = action.payload;
        },
        setCreatePromotions: (state, action) => {
            state.createPromotions = {
                ...state.createPromotions,
                ...action.payload,
            };
        },
        setUpdatePromotion: (state, action) => {
            state.createPromotions = action.payload;
        },
        setInitialStageCreatePromotions: (state) => {
            state.createPromotions = initialState.createPromotions; // Reset to initial state
        },
        setToggleCreateAndUpdatebtn: (state, action) => {
            state.button = action.payload;
        },
        setTogglerFlyer: (state, action) => {
            state.flyerStatus = action.payload;
        },
        setLoading: (state, action) => {
            state.loading = action.payload;
        },
        clearImageUploader: (state, action) => {
            state.imageUploader = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchPromotion.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchPromotion.fulfilled, (state, action) => {
                state.loading = false;
                state.promotion = { ...state.promotion, ...action.payload }; // Merge with existing promotion state
                // if (action.payload?.PROMO_IMAGE) {
                //     let baseURL = 'http://devp.mycomsys.com:8806/files/loyalty/';
                //     state.promotion = {
                //         ...state.promotion,
                //         ...action.payload,
                //         PROMO_IMAGE: `${baseURL}${action.payload.PROMO_IMAGE}`
                //     };
                // } else {
                //     state.promotion = {
                //         ...state.promotion,
                //         ...action.payload
                //     };
                // }

                // const updatedPromotion = action.payload.PROMOTIONS.map(
                //     (promo) => {
                //         let baseURL =
                //             "http://devp.mycomsys.com:8806/files/loyalty/";

                //         // Check if PROMO_IMAGE exists and concatenate baseURL if so
                //         if (promo.PROMO_IMAGE) {
                //             promo.PROMO_IMAGE = `${baseURL}${promo.PROMO_IMAGE}`;
                //         }
                //         if (promo.promo_flyer) {
                //             promo.promo_flyer = `${baseURL}${promo.promo_flyer}`;
                //         }

                //         // return promo;
                //     }
                // );

                // state.promotion = updatedPromotion;
            })
            .addCase(fetchPromotion.rejected, (state, action) => {
                state.loading = false;
            })
            .addCase(createAndUpdatePromotion.pending, (state) => {
                state.loading = true;
                state.message = false;
            })
            .addCase(createAndUpdatePromotion.fulfilled, (state, action) => {
                state.loading = false;
                state.message = true;
                state.createPromotionStatus = action.payload;
            })
            .addCase(createAndUpdatePromotion.rejected, (state, action) => {
                state.loading = false;
                state.loading = false;
            })
            .addCase(fetchImageUploader.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchImageUploader.fulfilled, (state, action) => {
                state.loading = false;
                state.imageUploader = action.payload;
            })
            .addCase(fetchImageUploader.rejected, (state, action) => {
                state.loading = false;
            })
            .addCase(fetchImageFlyer.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchImageFlyer.fulfilled, (state, action) => {
                state.loading = false;
                state.imageFlyer = action.payload;
            })
            .addCase(fetchImageFlyer.rejected, (state, action) => {
                state.loading = false;
            })
            .addCase(fetchLocationList.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchLocationList.fulfilled, (state, action) => {
                state.loading = false;
                state.locationList = action.payload;
            })
            .addCase(fetchLocationList.rejected, (state, action) => {
                state.loading = false;
                state.locationList = action.payload;
            });
    },
});

export const {
    setPromotionDetails,
    setInitialStageCreatePromotions,
    setUpdatePromotion,
    setCreatePromotions,
    setToggleCreateAndUpdatebtn,
    setTogglerFlyer,
    setFileName,
    setLoading,
    clearImageUploader,
    setFlyer,
} = PromotionSlice.actions;

export default PromotionSlice.reducer;
