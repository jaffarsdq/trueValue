import { configureStore } from "@reduxjs/toolkit";

import authSliceReducer from "../Redux/Slices/AuthSlice";
import areaSlice from "./Slices/areaSlice";
import citySlice from "./Slices/citySlice";
import countrySlice from "./Slices/countrySlice";
import CustomerSlice from "./Slices/CustomerSlice";
import crmSlice from "./Slices/Dashboard/crmSlice";
import FeedbackSlice from "./Slices/FeedbackSlice";
import filterSlice from "./Slices/filter/filterSlice";
import NavigationSliceReducer from "./Slices/NavigationSlice";
import PromotionSlice from "./Slices/PromotionSlice";
import ReportsSlice from "./Slices/Reports/ReportsSlice";
import reqParamsDashboardSlice from "./Slices/reqParamsDashboardSlice";
import RewardsSetupSlice from "./Slices/RewardsSetupSlice";
import RewardsSlice from "./Slices/RewardsSlice";
import ThemeSlice from "./Slices/ThemeSlice";
import notificationSlice from "./Slices/notificationSlice";

const store = configureStore({
    reducer: {
        auth: authSliceReducer,
        navigation: NavigationSliceReducer,
        crm: crmSlice,
        reqParamsDashboard: reqParamsDashboardSlice,
        customer: CustomerSlice,
        rewards: RewardsSlice,
        reports: ReportsSlice,
        dashboardFilterSlice: filterSlice,
        rewardsManagement: RewardsSetupSlice,
        feedback: FeedbackSlice,
        themeSlice: ThemeSlice,
        promotionSlice: PromotionSlice,
        CountrySlice: countrySlice,
        CitySlice: citySlice,
        AreaSlice: areaSlice,
        notification: notificationSlice
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({ serializableCheck: false }),
    devTools: true,
});

export default store;
