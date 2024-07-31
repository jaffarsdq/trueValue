import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import axiosInstance from "../../config/axiosInstance";
import { selectAuthClientId } from "./AuthSlice";

// const axiosInstance = await initializeAxiosInstance();
const today = new Date().toISOString().split("T")[0]; // "YYYY-MM-DD"
const [year, month, day] = today.split("-");
const formattedDate = `${day}-${month}-${year}`; // Get today's date in YYYY-MM-DD format

const initialState = {
    customersList: [],
    customersListLoading: false,
    isCustomerSelected: false,
    selectedCustomerType: "All Customers",
    selectedCustomersTab: "",
    selectedCustomerId: "",
    singleCustomerDetailsLoading: false,
    isCreate: false,
    profileImg: "",
    singleCustomerDetails: {
        BASICINFO: [
            {
                upd_flag: 1,
            },
        ],
        CREDITINFO: [],
        ADDRESS: [],
        LOY_CARDS: [],
        MOBILENUMBER: [],
    },
    customerDetailsToDelete: {
        BASICINFO: [
            {
                customer_id: "",
                client_id: "",
                user_id: 0,
                address_id: 0,
                phone_number: "",
                customer_type: "2",
                name: "AK",
                email: "ak@gmail.com",
                profile_img: "/profile/istockphoto-1386479313-612x612.jpg",
                password: "",
                created_by: "",
                deleted_at: "",
                loyalty_customer_id: "",
                employee_id: "",
                credit_customer_id: "",
                payment_type: "Credit Card",
                group_type: "",
                upd_flag: 0,
                updTimeStamp: "1900-01-01T00:00:00",
                description: "none",
                Nationality: "UAE",
                Birth_day: "19",
                Birth_month: "04",
                Last_Name: "AK",
                Created_Source: "Location",
                Gender: "Female",
                Deleted: 0,
            },
        ],
        CREDITINFO: [],
        ADDRESS: [],
        LOY_CARDS: [],
        MOBILENUMBER: [],
    },
    tranPayload: [{ FROM_DATE: "", TO_DATE: "" }],
    tranData: [],
    tranDataLoading: false,
    pointsStatementData: [],
    pointsStatementDataLoading: false,
    currentPoints: [],
    currentPointsLoading: false,
    createUpdateCustomerLoading: false,
    createUpdateCustomerMsg: false,
    deleteCustomerMsg: false,
    managePointsLoading: false,
    managePointsMsg: "",
    imagePath: "",
    imagePathLoading: "",
    isCreateAddress: false,
    addressData: {
        Customer_Add_id: "",
        Country: "",
        Phone_number: "",
        Address_line: "",
        City: "",
        Address_line_2: "",
        Address_line_3: "",
        Deleted: 0,
        default_status: "N",
    },

    isCreateCard: false,
    cardData: {
        card_no: "",
        cardname: "",
        cust_birthday: "",
        card_issue_date: formattedDate,
        card_exp_date: "",
        start_date: "",
        upd_flag: 0,
        valid: "N",
        first_name: "",
        last_name: "",
        Deleted: 0,
    },
};

export const fetchCreateUpdateCustomer = createAsyncThunk(
    "LoyCreateCustomerAdmin",
    async (payload, { dispatch, getState }) => {
        const ClientID = selectAuthClientId(getState());
        try {
            const response = await axiosInstance.post(
                "LoyCreateCustomerAdmin",
                payload
            );
            dispatch(fetchCustomersList(ClientID));
            return response.data;
        } catch (error) {
            throw error.response.data;
        }
    }
);

export const fetchCustomersList = createAsyncThunk(
    "LoyGetAllCustomersAdmin",
    async (client_id) => {
        try {
            const response = await axiosInstance.post(
                "LoyGetAllCustomersAdmin",
                {
                    DATA: {
                        client_id: client_id,
                    },
                }
            );
            return response.data;
        } catch (error) {
            throw error.response.data;
        }
    }
);
export const fetchDeleteCustomer = createAsyncThunk(
    "DeleteCustomer",
    async ({ payload, client_id }, { dispatch }) => {
        try {
            const response = await axiosInstance.post(
                "LoyCreateCustomerAdmin",

                {
                    DATA: payload,
                }
            );
            dispatch(fetchCustomersList(client_id));
            return response.data;
        } catch (error) {
            throw error.response.data;
        }
    }
);

export const fetchSingleCustomer = createAsyncThunk(
    "LoyGetSingleCustMast",
    async ({ customer_id, client_id }) => {
        try {
            const response = await axiosInstance.post("LoyGetSingleCustMast", {
                DATA: {
                    customer_id: customer_id,
                    client_id: client_id,
                },
            });
            return response.data;
        } catch (error) {
            throw error.response.data;
        }
    }
);

export const fetchTran = createAsyncThunk(
    "Loy_GetLoyaltyTran",
    async (payload) => {
        try {
            const response = await axiosInstance.post("Loy_GetLoyaltyTran", {
                DATA: payload,
            });
            return response.data;
        } catch (error) {
            throw error.response.data;
        }
    }
);

export const fetchPointStatement = createAsyncThunk(
    "Loy_CRM_PointStmnt",
    async (payload) => {
        try {
            const response = await axiosInstance.post(
                "Loy_CRM_PointStmnt",
                payload
            );
            return response.data;
        } catch (error) {
            throw error.response.data;
        }
    }
);

export const fetchCurrentPoints = createAsyncThunk(
    "Loy_CRM_CurrentPointStmnt",
    async (payload) => {
        try {
            const response = await axiosInstance.post(
                "Loy_CRM_PointStmnt",
                payload
            );
            return response.data;
        } catch (error) {
            throw error.response.data;
        }
    }
);

export const fetchManagePoints = createAsyncThunk(
    "Loy_CRM_ManagePoints",
    async ({ payload, payloadForPoints }, { dispatch }) => {
        try {
            const response = await axiosInstance.post("Loy_CRM_ManagePoints", {
                DATA: payload,
            });
            dispatch(fetchCurrentPoints(payloadForPoints));
            return response.data;
        } catch (error) {
            throw error.response.data;
        }
    }
);

export const fetchCustomerImageFileName = createAsyncThunk(
    "FileAndImageUploader",
    async (formData) => {
        try {
            const response = await axiosInstance.post(
                "FileAndImageUploader",
                formData
            );
            return response.data;
        } catch (error) {
            throw error.response.data;
        }
    }
);

const CustomerSlice = createSlice({
    name: "customer",
    initialState,
    reducers: {
        setProfileImg: (state, action) => {
            state.profileImg = action.payload;
        },
        setIsCreate: (state, action) => {
            state.isCreate = action.payload;
        },
        setSelectedCustomerId: (state, action) => {
            state.selectedCustomerId = action.payload;
        },
        setIsCustomerSelected: (state, action) => {
            state.isCustomerSelected = action.payload;
        },
        setSelectedCustomerType: (state, action) => {
            state.selectedCustomerType = action.payload;
        },
        setSelectedCustomersTab: (state, action) => {
            state.selectedCustomersTab = action.payload;
        },
        resetTranData: (state) => {
            state.tranData = [];
        },
        setTranPayload: (state, action) => {
            state.tranPayload[0] = {
                ...state.tranPayload[0],
                ...action.payload,
            };
        },
        setSingleCustomerDetails: (state, action) => {
            state.singleCustomerDetails = action.payload;
        },
        setSingleCustomerDetailsForBasicInfo: (state, action) => {
            state.singleCustomerDetails.BASICINFO[0] = {
                ...state.singleCustomerDetails.BASICINFO[0],
                ...action.payload,
            };
        },
        setSingleCustomerDetailsForMoreInfo: (state, action) => {
            state.singleCustomerDetails.CREDITINFO[0] = {
                ...state.singleCustomerDetails.CREDITINFO[0],
                ...action.payload,
            };
        },
        setSingleCustomerDetailsForMobileNumber: (state, action) => {
            const { frontEndId, ID, mobile_number, default_num } =
                action.payload;
            const contact = state.singleCustomerDetails.MOBILENUMBER.find(
                (contact) =>
                    contact.ID === ID || contact.frontEndId === frontEndId
            );
            if (contact) {
                if (typeof default_num !== "undefined") {
                    contact.default_num = default_num;
                }
                if (typeof mobile_number !== "undefined") {
                    contact.mobile_number = mobile_number;
                }
            }
        },

        addContactNumber: (state, action) => {
            state.singleCustomerDetails.MOBILENUMBER.push(action.payload);
        },
        deleteContactNumber: (state, action) => {
            const contact = state.singleCustomerDetails.MOBILENUMBER.find(
                (contact) =>
                    contact.ID === action.payload ||
                    contact.frontEndId === action.payload
            );
            if (contact) {
                contact.Deleted = 1;
            }
        },
        setMoreCustomerDetails: (state, action) => {
            state.moreCustomerDetails = action.payload;
        },

        setIsCreateAddress: (state, action) => {
            state.isCreateAddress = action.payload;
        },
        createNewAddressForSingleCustomer: (state, action) => {
            state.singleCustomerDetails.ADDRESS.push(action.payload);
        },
        updateAddress: (state, action) => {
            const updatedAddress = action.payload;
            const { Customer_Add_id, frontEndId } = action.payload;
            state.singleCustomerDetails.ADDRESS =
                state.singleCustomerDetails.ADDRESS.map((address) => {
                    if (
                        Customer_Add_id &&
                        address.Customer_Add_id === Customer_Add_id
                    ) {
                        return {
                            ...address,
                            ...updatedAddress,
                        };
                    }
                    if (frontEndId && address.frontEndId === frontEndId) {
                        return {
                            ...address,
                            ...updatedAddress,
                        };
                    }
                    return address;
                });
        },
        updateFieldInAddress: (state, action) => {
            const { Customer_Add_id, frontEndId, field, value } =
                action.payload;

            state.singleCustomerDetails.ADDRESS =
                state.singleCustomerDetails.ADDRESS.map((address) => {
                    if (
                        Customer_Add_id &&
                        address.Customer_Add_id === Customer_Add_id
                    ) {
                        return {
                            ...address,
                            [field]: value, // Use computed property name
                        };
                    }
                    if (frontEndId && address.frontEndId === frontEndId) {
                        return {
                            ...address,
                            [field]: value, // Use computed property name
                        };
                    }
                    return address;
                });
        },

        deleteAddress: (state, action) => {
            const { Customer_Add_id, frontEndId, Deleted } = action.payload;

            state.singleCustomerDetails.ADDRESS =
                state.singleCustomerDetails.ADDRESS.map((address) => {
                    if (
                        Customer_Add_id &&
                        address.Customer_Add_id === Customer_Add_id
                    ) {
                        return {
                            ...address,
                            Deleted: Deleted === 0 ? 1 : 0,
                        };
                    }
                    if (frontEndId && address.frontEndId === frontEndId) {
                        return {
                            ...address,
                            Deleted: Deleted === 0 ? 1 : 0,
                        };
                    }
                    return address;
                });
        },
        resetAddressData: (state) => {
            state.addressData = {
                Customer_Add_id: "",
                Country: "",
                Phone_number: "",
                Address_line: "",
                City: "",
                Address_line_2: "",
                Address_line_3: "",
                State: "",
                Zip_code: "",
                Deleted: 0,
                default: "N",
            };
            state.isCreateAddress = true;
        },
        setAddressData: (state, action) => {
            state.addressData = {
                ...state.addressData,
                ...action.payload,
            };
        },
        setAddressDetails: (state, action) => {
            state.singleCustomerDetails.ADDRESS = {
                ...state.singleCustomerDetails.ADDRESS,
                ...action.payload,
            };
        },
        setSingleCustomerDetailsForAddress: (state, action) => {
            state.singleCustomerDetails.ADDRESS = {
                ...state.singleCustomerDetails.ADDRESS,
                ...action.payload,
            };
        },

        setIsCreateCard: (state, action) => {
            state.isCreateCard = action.payload;
        },
        createNewCardForSingleCustomer: (state, action) => {
            state.singleCustomerDetails.LOY_CARDS.push(action.payload);
        },
        updateCard: (state, action) => {
            const updatedCard = action.payload;
            const { card_no, frontEndId } = action.payload;
            state.singleCustomerDetails.LOY_CARDS =
                state.singleCustomerDetails.LOY_CARDS.map((card) => {
                    if (card_no && card.card_no === card_no) {
                        return {
                            ...card,
                            ...updatedCard,
                        };
                    }
                    if (frontEndId && card.frontEndId === frontEndId) {
                        return {
                            ...card,
                            ...updatedCard,
                        };
                    }
                    return card;
                });
        },
        deleteCard: (state, action) => {
            const { card_no, frontEndId, Deleted } = action.payload;

            state.singleCustomerDetails.LOY_CARDS =
                state.singleCustomerDetails.LOY_CARDS.map((card) => {
                    if (card_no && card.card_no === card_no) {
                        return {
                            ...card,
                            Deleted: Deleted === 0 ? 1 : 0,
                        };
                    }
                    if (frontEndId && card.frontEndId === frontEndId) {
                        return {
                            ...card,
                            Deleted: Deleted === 0 ? 1 : 0,
                        };
                    }
                    return card;
                });
        },
        resetCardData: (state) => {
            state.cardData = {
                card_no: "",
                cardname: "",
                cust_birthday: "",
                card_issue_date: new Date(),
                card_exp_date: "",
                start_date: "",
                upd_flag: 0,
                valid: "N",
                first_name: "",
                last_name: "",
                Deleted: 0,
            };
            state.isCreateCard = true;
        },
        setCardData: (state, action) => {
            state.cardData = {
                ...state.cardData,
                ...action.payload,
            };
        },
        setCardDetails: (state, action) => {
            state.singleCustomerDetails.LOY_CARDS = {
                ...state.singleCustomerDetails.LOY_CARDS,
                ...action.payload,
            };
        },
        setSingleCustomerDetailsForCard: (state, action) => {
            state.singleCustomerDetails.LOY_CARDS = {
                ...state.singleCustomerDetails.LOY_CARDS,
                ...action.payload,
            };
        },

        setContactDetails: (state, action) => {
            state.contactDetails = action.payload;
        },
        setTransactionHistory: (state, action) => {
            state.transactionHistory = action.payload;
        },
        resetCustomerId: (state) => {
            state.selectedCustomerId = "";
        },
        resetSingleCustomerDetails: (state) => {
            state.singleCustomerDetails = {
                BASICINFO: [{ upd_flag: 0 }],
                CREDITINFO: [],
                ADDRESS: [],
                LOY_CARDS: [],
                MOBILENUMBER: [],
            };
        },
    },
    extraReducers: (builder) => {
        builder.addCase(fetchCustomersList.pending, (state) => {
            state.customersListLoading = true;
        });
        builder.addCase(fetchCustomersList.fulfilled, (state, action) => {
            state.customersListLoading = false;
            state.customersList = action.payload.DATA || [];
        });
        builder.addCase(fetchCustomersList.rejected, (state) => {
            state.customersListLoading = false;
        });
        builder.addCase(fetchSingleCustomer.pending, (state) => {
            state.singleCustomerDetailsLoading = true;
        });
        builder.addCase(fetchSingleCustomer.fulfilled, (state, action) => {
            state.singleCustomerDetailsLoading = false;
            state.singleCustomerDetails = action.payload.DATA || [];
        });
        builder.addCase(fetchSingleCustomer.rejected, (state) => {
            state.singleCustomerDetailsLoading = false;
        });
        builder.addCase(fetchTran.pending, (state) => {
            state.tranDataLoading = true;
        });
        builder.addCase(fetchTran.fulfilled, (state, action) => {
            state.tranDataLoading = false;
            state.tranData = action.payload.DATA || [];
        });
        builder.addCase(fetchTran.rejected, (state) => {
            state.tranDataLoading = false;
        });
        builder.addCase(fetchPointStatement.pending, (state) => {
            state.pointsStatementDataLoading = true;
        });
        builder.addCase(fetchPointStatement.fulfilled, (state, action) => {
            state.pointsStatementDataLoading = false;
            state.pointsStatementData = action.payload.LOYALTY_POINTS || [];
        });
        builder.addCase(fetchPointStatement.rejected, (state) => {
            state.pointsStatementDataLoading = false;
        });
        builder.addCase(fetchCurrentPoints.pending, (state) => {
            state.currentPointsLoading = true;
        });
        builder.addCase(fetchCurrentPoints.fulfilled, (state, action) => {
            state.currentPointsLoading = false;
            state.currentPoints = action.payload || [];
        });
        builder.addCase(fetchCurrentPoints.rejected, (state) => {
            state.currentPointsLoading = false;
        });
        builder.addCase(fetchCreateUpdateCustomer.pending, (state) => {
            state.createUpdateCustomerLoading = true;
            state.createUpdateCustomerMsg = false;
        });
        builder.addCase(
            fetchCreateUpdateCustomer.fulfilled,
            (state, action) => {
                state.createUpdateCustomerLoading = false;
                state.createUpdateCustomerMsg = true;
            }
        );
        builder.addCase(fetchCreateUpdateCustomer.rejected, (state, action) => {
            state.createUpdateCustomerLoading = false;
            state.createUpdateCustomerMsg = false;
        });
        builder.addCase(fetchDeleteCustomer.pending, (state) => {
            state.createUpdateCustomerLoading = true;
            state.deleteCustomerMsg = false;
        });
        builder.addCase(fetchDeleteCustomer.fulfilled, (state, action) => {
            state.createUpdateCustomerLoading = false;
            state.deleteCustomerMsg = true;
        });
        builder.addCase(fetchDeleteCustomer.rejected, (state, action) => {
            state.createUpdateCustomerLoading = false;
            state.deleteCustomerMsg = false;
        });
        builder.addCase(fetchManagePoints.pending, (state) => {
            state.managePointsLoading = true;
        });
        builder.addCase(fetchManagePoints.fulfilled, (state, action) => {
            state.managePointsLoading = false;
            state.managePointsMsg = action.payload;
        });
        builder.addCase(fetchManagePoints.rejected, (state) => {
            state.managePointsLoading = false;
        });
        builder.addCase(fetchCustomerImageFileName.pending, (state) => {
            state.imagePathLoading = true;
        });
        builder.addCase(
            fetchCustomerImageFileName.fulfilled,
            (state, action) => {
                state.imagePathLoading = false;
                state.imagePath = action.payload?.fileName || "";
            }
        );
        builder.addCase(fetchCustomerImageFileName.rejected, (state) => {
            state.imagePathLoading = false;
        });
    },
});

export const {
    setIsCreate,
    setSelectedCustomerId,
    setIsCustomerSelected,
    setSelectedCustomerType,
    setSelectedCustomersTab,
    resetTranData,
    setTranPayload,
    setSingleCustomerDetails,
    setSingleCustomerDetailsForBasicInfo,
    setSingleCustomerDetailsForMoreInfo,
    setSingleCustomerDetailsForAddress,
    setSingleCustomerDetailsForMobileNumber,
    setMoreCustomerDetails,
    setAddressDetails,
    updateFieldInAddress,
    setContactDetails,
    setTransactionHistory,
    resetSingleCustomerDetails,
    resetCustomerId,
    addContactNumber,
    deleteContactNumber,
    setAddressData,
    setIsCreateAddress,
    resetAddressData,
    updateAddress,
    deleteAddress,

    setIsCreateCard,
    createNewCardForSingleCustomer,
    updateCard,
    deleteCard,
    resetCardData,
    setCardData,
    setCardDetails,
    setSingleCustomerDetailsForCard,
    setProfileImg,
} = CustomerSlice.actions;

export default CustomerSlice.reducer;
