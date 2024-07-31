import { Box, Typography, useTheme } from "@mui/material";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import CustomerActivityChart from "../../ChartComponents/CRM_ChartsData/CustomerActivityChart";
import CustomerVisitsByMonth from "../../ChartComponents/CRM_ChartsData/CustomerVisitsByMonth";
import FeedbackChart from "../../ChartComponents/CRM_ChartsData/FeedbackChart";
import LoyaltyTypesChart from "../../ChartComponents/CRM_ChartsData/LoyaltyTypesChart";
import PointsEarnedVsRedeemedChart from "../../ChartComponents/CRM_ChartsData/PointsEarnedVsRedeemedChart";
import PointsEarnedVsRedeemedPieChart from "../../ChartComponents/CRM_ChartsData/PointsEarnedVsRedeemedPieChart";
import CustomerInfo from "../../Components/CRMComponents/CustomerInfo";
import OngoingCampaignsTable from "../../Components/CRMComponents/OngoingCampaignsTable/OngoingCampaignsTable";
import SideBar from "../../Layouts/SideBar";
import {
    fetchCustomerBaseByGender,
    fetchCustomerVisitsByMonth,
    fetchPointsEarnedVsRedeemedByMonth,
    fetchPointsEarnedVsRedeemedPercentage,
    fetchTotalCustomersJoined,
    fetchTotalCustomersJoinedThisMonth,
    fetchTotalCustomersJoinedThisYear,
    fetchTotalFeedbackByMonth,
    fetchTotalFeedbackByYear,
    fetchTotalPointsEarnedByMonth,
    fetchTotalPointsEarnedByYear,
    fetchTotalPointsRedeemedByMonth,
    fetchTotalPointsRedeemedByYear,
} from "../../Redux/Slices/Dashboard/crmSlice";
import {
    addFilter,
    resetFilters,
    setAddedFilters,
    setSelectableFields,
} from "../../Redux/Slices/filter/filterSlice";
import { fetchReqParamsCrm } from "../../Redux/Slices/reqParamsDashboardSlice";

function Crm() {
    const theme = useTheme();

    const dispatch = useDispatch();

    const filters = useSelector((state) => state.dashboardFilterSlice.filters);

    const { reqParams, reqParamsLoading } = useSelector(
        (state) => state.reqParamsDashboard
    );

    useEffect(() => {
        console.log("called");
        dispatch(fetchReqParamsCrm());
        setAddedFilters([]);
    }, []);

    useEffect(() => {
        if (reqParams) {
            const newFilters = reqParams.map((param) => ({
                field: param.field_name,
                value: param.field_value,
                mandatory: param.mandatory_field,
            }));
            dispatch(setAddedFilters([...newFilters]));
            dispatch(setSelectableFields(reqParams));
            dispatch(resetFilters())
            newFilters.forEach((filter) => {
                dispatch(addFilter(filter));
            });
        }
    }, [reqParams]);

    // Fetching data on component mount and when filters change
    useEffect(() => {
        if (filters.length > 0 && !reqParamsLoading) {
            dispatch(fetchTotalCustomersJoined(filters));
            dispatch(fetchTotalCustomersJoinedThisMonth(filters));
            dispatch(fetchTotalCustomersJoinedThisYear(filters));

            dispatch(fetchTotalFeedbackByMonth(filters));
            dispatch(fetchTotalFeedbackByYear(filters));

            dispatch(fetchTotalPointsEarnedByMonth(filters));
            dispatch(fetchTotalPointsRedeemedByMonth(filters));
            dispatch(fetchTotalPointsEarnedByYear(filters));
            dispatch(fetchTotalPointsRedeemedByYear(filters));

            dispatch(fetchCustomerVisitsByMonth(filters));
            dispatch(fetchCustomerBaseByGender(filters));

            dispatch(fetchPointsEarnedVsRedeemedByMonth(filters));
            dispatch(fetchPointsEarnedVsRedeemedPercentage(filters));
        }
    }, [filters]);

    return (
        <SideBar>
            <div
                style={{
                    backgroundColor: theme.palette.background.default,
                    fontFamily: "poppins",
                    minHeight: "100vh",
                }}
            >
                {/* <div style={{ backgroundColor: "#FAFBFC", fontFamily: "poppins" }}> */}
                <CustomerInfo />

                <Box
                    sx={{
                        display: "flex",
                        flexDirection: "column",
                        padding: "0rem 1rem",
                        paddingBottom: "0.5rem",
                    }}
                >
                    {/* 1st row of cards */}
                    <Box
                        sx={{
                            display: "flex",
                            flexDirection: { xs: "column", md: "row" },
                            width: "100%",
                            minHeight: "260px",
                            justifyContent: "space-between",
                        }}
                    >
                        {/* Customer Satisfaction */}
                        <Box
                            sx={{
                                width: { xs: "98%", md: "49%" },
                                backgroundColor: "white",
                                boxShadow:
                                    " 0px 4px 10px 5px rgba(238, 238, 238, 1)",
                                color: "black",
                                marginBlock: "1rem",
                                borderRadius: "4px",
                                padding: "1rem",
                                height: "280px",
                            }}
                        >
                            <CustomerVisitsByMonth />
                        </Box>

                        {/* Loyalty Types */}
                        <Box
                            sx={{
                                width: { xs: "98%", md: "49%" },
                                backgroundColor: "white",
                                boxShadow:
                                    " 0px 4px 10px 5px rgba(238, 238, 238, 1)",
                                color: "black",
                                marginBlock: "1rem",
                                borderRadius: "4px",
                                padding: "1rem",
                                height: "280px",
                            }}
                        >
                            <LoyaltyTypesChart />
                        </Box>
                    </Box>

                    {/* 2nd row of cards */}
                    <Box
                        sx={{
                            display: "flex",
                            flexDirection: { xs: "column", md: "row" },
                            width: "100%",
                            minHeight: "260px",
                            justifyContent: "space-between",
                        }}
                    >
                        {/* Customer Activity */}
                        <Box
                            sx={{
                                width: { xs: "98%", md: "49%" },
                                backgroundColor: "white",
                                boxShadow:
                                    " 0px 4px 10px 5px rgba(238, 238, 238, 1)",
                                color: "black",
                                marginBlock: "1rem",
                                borderRadius: "4px",
                                padding: "1rem",
                                minHeight: "280px",
                            }}
                        >
                            {/* Chart */}
                            <PointsEarnedVsRedeemedChart />
                        </Box>

                        {/* Customer Activity */}
                        <Box
                            sx={{
                                width: { xs: "98%", md: "49%" },
                                backgroundColor: "white",
                                boxShadow:
                                    " 0px 4px 10px 5px rgba(238, 238, 238, 1)",
                                color: "black",
                                marginBlock: "1rem",
                                borderRadius: "4px",
                                padding: "1rem",
                                minHeight: "280px",
                            }}
                        >
                            {/* Chart */}
                            <PointsEarnedVsRedeemedPieChart />
                        </Box>
                    </Box>

                    {/* 3rd row of cards */}
                    <Box
                        sx={{
                            display: "flex",
                            flexDirection: { xs: "column", md: "row" },
                            width: "100%",
                            minHeight: "260px",
                            justifyContent: "space-between",
                        }}
                    >
                        {/* Customer Activity */}
                        <Box
                            sx={{
                                width: { xs: "98%", md: "49%" },
                                backgroundColor: "white",
                                boxShadow:
                                    " 0px 4px 10px 5px rgba(238, 238, 238, 1)",
                                color: "black",
                                marginBlock: "1rem",
                                borderRadius: "4px",
                                padding: "1rem",
                                minHeight: "280px",
                            }}
                        >
                            {/* Chart */}
                            <CustomerActivityChart />
                        </Box>

                        {/* Ongoing Campaigns */}
                        <Box
                            sx={{
                                width: { xs: "98%", md: "49%" },
                                backgroundColor: "white",
                                boxShadow:
                                    " 0px 4px 10px 5px rgba(238, 238, 238, 1)",
                                color: "black",
                                marginBlock: "1rem",
                                borderRadius: "4px",
                                padding: "1rem",
                                minHeight: "280px",
                            }}
                        >
                            <Box
                                sx={{
                                    display: "flex",
                                    width: "100%",
                                    justifyContent: "space-between",
                                }}
                            >
                                <Typography
                                    sx={{
                                        color: "#05004E",
                                        fontSize: "14px",
                                        fontWeight: 600,
                                    }}
                                >
                                    Ongoing Campaigns
                                </Typography>
                            </Box>
                            <Box
                                sx={{
                                    display: "flex",
                                    justifyContent: "center",
                                    alignItems: "center",
                                    width: "100%",
                                    height: "80%",
                                    margin: "0 auto",
                                }}
                            >
                                <Box
                                    sx={{
                                        backgroundColor: "white",
                                        height: "92%",
                                        width: "100%",
                                        margin: "0 auto",
                                        color: "black",
                                        display: "flex",
                                        justifyContent: "center",
                                    }}
                                >
                                    {/* Ongoing Table */}
                                    <OngoingCampaignsTable />
                                </Box>
                            </Box>
                        </Box>
                    </Box>

                    {/* 4th row of cards */}
                    <Box
                        sx={{
                            display: "flex",
                            flexDirection: { xs: "column", md: "row" },
                            width: "100%",
                            minHeight: "260px",
                            justifyContent: "space-between",
                        }}
                    >
                        {/* Customer Satisfaction */}
                        <Box
                            sx={{
                                width: { xs: "98%", md: "100%" },
                                backgroundColor: "white",
                                boxShadow:
                                    " 0px 4px 10px 5px rgba(238, 238, 238, 1)",
                                color: "black",
                                marginBlock: "1rem",
                                borderRadius: "4px",
                                padding: "1rem",
                                height: "280px",
                            }}
                        >
                            <FeedbackChart />
                        </Box>
                    </Box>
                </Box>
            </div>
        </SideBar>
    );
}

export default Crm;
