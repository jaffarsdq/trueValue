import { Box, Skeleton, Typography } from "@mui/material";
// import formatFieldLabel from "../../../utils/formatFieldLabel";
// import sortReportFilters from "../../../utils/sortReportFilters";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import FeedBackReportTable from "../../Components/ReportsComponents/FeedBackReportTable";
import FeedBackSummaryTable from "../../Components/ReportsComponents/FeedBackSummaryTable";
import GetLeastActiveCustomers from "../../Components/ReportsComponents/GetLeastActiveCustomers";
import GetLoyaltyCustomers from "../../Components/ReportsComponents/GetLoyaltyCustomers";
import GetPointsStatement from "../../Components/ReportsComponents/GetPointsStatement";
import GetTopActiveCustomers from "../../Components/ReportsComponents/GetTopActiveCustomers";
import GetTopCustomersBasketAnalysis from "../../Components/ReportsComponents/GetTopCustomersBasketAnalysis";
import FilterBar from "../../Layouts/FilterBar";
import SideBar from "../../Layouts/SideBar";
import {
    fetchFeedBackSummary,
    fetchGetFeedbackForm,
    fetchGetLeastActiveCustomers,
    fetchGetLoyaltyCustomerReport,
    fetchGetPointsStatement,
    fetchGetTopActiveCustomers,
    fetchGetTopCustomersBasketAnalysis,
} from "../../Redux/Slices/Reports/ReportsSlice";
import formatFieldLabel from "../../Utils/formatFieldLabel";
import sortReportFilters from "../../Utils/sortReportFilters";

function Reports() {
    const dispatch = useDispatch();

    const { reportFilters } = useSelector(
        (state) => state.dashboardFilterSlice
    );
    console.log(reportFilters, "filtersssssssssss");

    const { requiredParamsLoading, selectedReport } = useSelector(
        (state) => state.reports
    );

    const sortedFilters = sortReportFilters(reportFilters);

    useEffect(() => {
        if (
            Object.keys(selectedReport).length > 0 &&
            reportFilters.length > 0
        ) {
            switch (selectedReport.ReportName) {
                case "Loyalty Customer List":
                    dispatch(fetchGetLoyaltyCustomerReport(reportFilters));
                    break;
                case "Top Active Customers":
                    dispatch(fetchGetTopActiveCustomers(reportFilters));
                    break;
                case "Least Active Customers":
                    dispatch(fetchGetLeastActiveCustomers(reportFilters));
                    break;
                case "Top Customer Basket Analysis":
                    dispatch(fetchGetTopCustomersBasketAnalysis(reportFilters));
                    break;
                case "Customer Points Statement":
                    dispatch(fetchGetPointsStatement(reportFilters));
                    break;
                case "Feeback Analysis":
                    dispatch(fetchGetFeedbackForm(sortedFilters));
                    break;
                case "Feeback Summary":
                    dispatch(fetchFeedBackSummary(sortedFilters));
                    break;
                default:
                    console.error(
                        `Unknown report name: ${selectedReport.ReportName}`
                    );
            }
        }
    }, [reportFilters]);

    return (
        <SideBar>
            <div style={{ backgroundColor: "#FAFBFC" }}>
                <Box
                    sx={{
                        display: "flex",
                        flexDirection: "column",
                        gap: "1rem",
                        fontSize: "14px",
                        padding: "10px 1rem",
                        fontWeight: "600",
                    }}
                >
                    <Box
                        sx={{
                            display: "flex",
                            gap: "1rem",
                            justifyContent: "start",
                            flexWrap: "wrap",
                            alignItems: "center",
                        }}
                    >
                        {Object.keys(selectedReport).length > 0 &&
                            sortedFilters && (
                                <Box
                                    sx={{
                                        fontFamily: "Roboto",
                                        color: "rgba(36, 87, 197, 1)",
                                        fontWeight: "400",
                                    }}
                                >
                                    <i>Applied Filters :</i>
                                </Box>
                            )}
                        {/* If reportFilters length is 0, render default filters */}
                        {!requiredParamsLoading &&
                        Object.keys(selectedReport).length > 0 &&
                        sortedFilters.length === 0
                            ? null
                            : Object.keys(selectedReport).length > 0 &&
                              sortedFilters.length === 0 &&
                              Array(3) // Adjust the number of skeleton loaders as needed
                                  .fill(1)
                                  .map((_, index) => (
                                      <Box
                                          key={index}
                                          sx={{
                                              display: "flex",
                                              gap: "0.2rem",
                                              backgroundColor: "white",
                                              padding: "0.3rem 0.8rem",
                                              borderRadius: "20px",
                                              border: "1px solid rgba(36, 87, 197, 0.2)",
                                          }}
                                      >
                                          <Skeleton
                                              variant="text"
                                              sx={{
                                                  fontSize: "14px",
                                                  width: "100px", // Adjust the width of the skeleton loader as needed
                                                  height: "20px", // Adjust the height of the skeleton loader as needed
                                              }}
                                          />
                                      </Box>
                                  ))}
                        {/* Map through filters array and render JSX for each filter */}
                        {Object.keys(selectedReport).length > 0 &&
                            sortedFilters &&
                            sortedFilters.map((filter, index) => (
                                <Box
                                    key={index}
                                    sx={{
                                        display: "flex",
                                        gap: "0.2rem",
                                        backgroundColor: "white",
                                        padding: "0.3rem 0.8rem",
                                        borderRadius: "20px",
                                        border: "1px solid rgba(36, 87, 197, 0.2)",
                                    }}
                                >
                                    {filter.field === "date_from" ? (
                                        <Box
                                            sx={{
                                                display: "flex",
                                                gap: "0.2rem",
                                            }}
                                        >
                                            <Typography
                                                fontWeight="bold"
                                                fontSize="14px"
                                            >
                                                Date From:
                                            </Typography>{" "}
                                            <Typography
                                                sx={{
                                                    fontWeight: "400",
                                                    fontSize: "14px",
                                                }}
                                            >
                                                {filter.value}
                                            </Typography>
                                        </Box>
                                    ) : filter.field === "date_to" ? (
                                        <Box
                                            sx={{
                                                display: "flex",
                                                gap: "0.2rem",
                                            }}
                                        >
                                            <Typography
                                                fontWeight="bold"
                                                fontSize="14px"
                                            >
                                                Date to:
                                            </Typography>{" "}
                                            <Typography
                                                sx={{
                                                    fontWeight: "400",
                                                    fontSize: "14px",
                                                }}
                                            >
                                                {filter.value}
                                            </Typography>
                                        </Box>
                                    ) : (
                                        <Box
                                            sx={{
                                                display: "flex",
                                                gap: "0.2rem",
                                            }}
                                        >
                                            <Typography
                                                fontWeight="bold"
                                                fontSize="12px"
                                            >
                                                {filter.field &&
                                                    formatFieldLabel(
                                                        filter.field
                                                    )}
                                                :
                                            </Typography>{" "}
                                            <Typography
                                                sx={{
                                                    fontWeight: "400",
                                                    fontSize: "12px",
                                                }}
                                            >
                                                {filter.value}
                                            </Typography>
                                        </Box>
                                    )}
                                </Box>
                            ))}
                    </Box>
                </Box>

                <Box sx={{ margin: "0 auto" }}>
                    {Object.keys(selectedReport).length > 0 &&
                        selectedReport.ReportId == "LOY_001" && (
                            <GetLoyaltyCustomers />
                        )}
                    {Object.keys(selectedReport).length > 0 &&
                        selectedReport.ReportId == "LOY_002" && (
                            <GetTopActiveCustomers />
                        )}
                    {Object.keys(selectedReport).length > 0 &&
                        selectedReport.ReportId == "LOY_003" && (
                            <GetLeastActiveCustomers />
                        )}
                    {Object.keys(selectedReport).length > 0 &&
                        selectedReport.ReportId == "LOY_004" && (
                            <GetTopCustomersBasketAnalysis />
                        )}
                    {Object.keys(selectedReport).length > 0 &&
                        selectedReport.ReportId == "LOY_005" && (
                            <GetPointsStatement />
                        )}
                    {Object.keys(selectedReport).length > 0 &&
                        selectedReport.ReportId == "LOY_006" && (
                            <FeedBackReportTable />
                        )}
                    {Object.keys(selectedReport).length > 0 &&
                        selectedReport.ReportId == "LOY_007" && (
                            <FeedBackSummaryTable />
                        )}
                </Box>
            </div>
        </SideBar>
    );
}

export default Reports;
