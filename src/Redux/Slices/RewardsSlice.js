import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    earningSetUp: {
        pointsPerSpend: "",
        pointsPer: "",
        maximumPoints: "",
        bonusPoints: [],
        pointsOn: []
    },
    redemptionSetUp: [{
        pointsValue: "",
        points: "",
        minimumPoints: "",
        maximumPoints: "",
        redemptionFrequency: ""
    }],
    expirySetUp: [{
        pointsValidityFrom: "",
        pointsvalidityTo: "",
        expiryNotifications: "",
        notificationMessage: "",
        email: "",
        sms: "",
        pushNotification: ""
    }],
    advancedSetting: [{
        excludesPointsOn: "",
        maximumPointsBalance: ""
    }]
}

const RewardsSlice = createSlice({
    name: "rewards",
    initialState,
    reducers: {
        setEarningSetUp: (state, action) => {
            const { index, field, value } = action.payload;
            state.earningSetUp[index][field] = value; // Update the specific field
        },
        setRedemptionSetUp: (state, action) => {
            state.redemptionSetUp = { ...state.redemptionSetUp, ...action.payload };
        },
        setExpirySetUp: (state, action) => {
            state.expirySetUp = { ...state.expirySetUp, ...action.payload };
        },
        setAdvancedSetting: (state, action) => {
            state.advancedSetting = { ...state.advancedSetting, ...action.payload };
        }
    }
})

export const { setEarningSetUp, setRedemptionSetUp, setExpirySetUp, setAdvancedSetting } = RewardsSlice.actions;

export default RewardsSlice.reducer;