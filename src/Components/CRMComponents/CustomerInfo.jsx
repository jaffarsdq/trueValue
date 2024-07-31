import { Box, Typography } from "@mui/material";

import { useSelector } from "react-redux";
import MiniCustomerCard from "./MiniCustomerCard";
// totalcustomers_bymonth
function CustomerInfo() {
    const {
        totalCustomers,
        loadingTotalCustomers,

        totalCustomersJoinedThisMonth,
        loadingTotalCustomersJoinedThisMonth,

        totalCustomersJoinedThisYear,
        loadingTotalCustomersJoinedThisYear,

        totalFeedbackByMonth,
        loadingTotalFeedbackByMonth,

        totalFeedbackByYear,
        loadingTotalFeedbackByYear,

        totalPointsEarnedByMonth,
        loadingTotalPointsEarnedByMonth,
        errorTotalPointsEarnedByMonth,

        totalPointsRedeemedByYear,
        loadingTotalPointsRedeemedByYear,
        errorTotalPointsRedeemedByYear,

        totalPointsEarnedByYear,
        loadingTotalPointsEarnedByYear,
        errorTotalPointsEarnedByYear,

        totalPointsRedeemedByMonth,
        loadingTotalPointsRedeemedByMonth,
        errorTotalPointsRedeemedByMonth,
    } = useSelector((state) => state.crm);

    // totalcustomers_bydate
    const CustomrerCardDetails = [
        {
            // cardTitle: "Total Customers",
            percentage: 12,
            value: totalCustomers && totalCustomers?.[0]?.totalcustomers,
            cardTitle: "Total Customer",
            fluctuationColor: "rgba(35, 193, 10, 1)",
            fluctuationBgColor: "rgba(35, 193, 10, 0.15)",
            loading: loadingTotalCustomers,
        },
        {
            // cardTitle: "Total Customers",
            percentage: 12,
            value:
                totalCustomersJoinedThisMonth &&
                totalCustomersJoinedThisMonth?.[0]?.totalcustomers_bymonth,
            cardTitle: "Joined within this month",
            fluctuationColor: "rgba(35, 193, 10, 1)",
            fluctuationBgColor: "rgba(35, 193, 10, 0.15)",
            loading: loadingTotalCustomersJoinedThisMonth,
        },
        {
            // cardTitle: "Total Customers",
            percentage: 7,
            value:
                totalCustomersJoinedThisYear &&
                totalCustomersJoinedThisYear?.[0]?.totalcustomers_bydate,
            cardTitle: "Joined within this year",
            fluctuationColor: "rgba(193, 10, 10, 1)",
            fluctuationBgColor: "rgba(193, 10, 10, 0.15)",
            loading: loadingTotalCustomersJoinedThisYear,
        },
    ];
    const customerPointsDetails = {
        Total_Points_Earned: [
            {
                // cardTitle: "Total Points Earned",
                percentage: 12,
                value:
                    totalPointsEarnedByMonth &&
                    totalPointsEarnedByMonth?.[0]?.totalpointsearned,
                cardTitle: "By month",
                fluctuationColor: "rgba(35, 193, 10, 1)",
                fluctuationBgColor: "rgba(35, 193, 10, 0.15)",
                loading: loadingTotalPointsEarnedByMonth,
            },

            {
                // cardTitle: "Total Points Earned",
                percentage: 12,
                value:
                    totalPointsEarnedByYear &&
                    totalPointsEarnedByYear?.[0]?.totalpoints,
                cardTitle: "By year",
                fluctuationColor: "rgba(35, 193, 10, 1)",
                fluctuationBgColor: "rgba(35, 193, 10, 0.15)",
                loading: loadingTotalPointsEarnedByYear,
            },
        ],
        Total_Points_Redeemed: [
            {
                // cardTitle: "Total Points Redeemed",
                percentage: 12,
                value:
                    totalPointsRedeemedByMonth &&
                    totalPointsRedeemedByMonth?.[0]?.totalpointredeemed,
                cardTitle: "By month",
                fluctuationColor: "rgba(35, 193, 10, 1)",
                fluctuationBgColor: "rgba(35, 193, 10, 0.15)",
                loading: loadingTotalPointsRedeemedByMonth,
            },
            {
                // cardTitle: "Total Points Redeemed",
                percentage: 12,
                value:
                    totalPointsRedeemedByYear &&
                    totalPointsRedeemedByYear?.[0]?.totalpointredeemed,
                cardTitle: "By year",
                fluctuationColor: "rgba(35, 193, 10, 1)",
                fluctuationBgColor: "rgba(35, 193, 10, 0.15)",
                loading: loadingTotalPointsRedeemedByYear,
            },
        ],
    };
    const customerFeedbackDetails = {
        month: [
            {
                // cardTitle: "Total Feedback",
                percentage: 12,
                value: totalFeedbackByMonth && totalFeedbackByMonth?.[0]?.TOTAL,
                cardTitle: "By Month",
                fluctuationColor: "rgba(35, 193, 10, 1)",
                fluctuationBgColor: "rgba(35, 193, 10, 0.15)",
                loading: loadingTotalFeedbackByMonth,
            },
        ],
        year: [
            {
                // cardTitle: "Total Feedback",
                percentage: 12,
                value: totalFeedbackByYear && totalFeedbackByYear?.[0]?.TOTAL,
                cardTitle: "By Year",
                fluctuationColor: "rgba(35, 193, 10, 1)",
                fluctuationBgColor: "rgba(35, 193, 10, 0.15)",
                loading: loadingTotalFeedbackByYear,
            },
        ],
    };
    return (
        <Box
            sx={{
                display: "flex",
                flexDirection: "column",
                gap: "1rem",
            }}
        >
            <Box
                sx={{
                    width: "98%",
                    margin: "0 auto",
                    bgcolor: "",
                    boxShadow: " 0px 4px 10px 5px rgba(238, 238, 238, 1)",
                    borderRadius: "6px",
                }}
            >
                <Box>
                    <Typography
                        sx={{
                            padding: "0.6rem 0 0rem 0.8rem",
                            color: "#05004E",
                            fontSize: "15px",
                            fontWeight: 800,
                            m: "-5px 0",
                        }}
                    >
                        Customer
                    </Typography>
                    <Box
                        sx={{
                            display: "flex",
                            flexWrap: "wrap",
                            justifyContent: "center",
                            width: "100%",
                        }}
                    >
                        {CustomrerCardDetails.map((detail, idx) => (
                            <MiniCustomerCard
                                key={idx}
                                loading={detail.loading}
                                cardTitle={detail.cardTitle}
                                percentage={detail.percentage}
                                value={detail.value}
                                SubTitle={detail.SubTitle}
                                fluctuationColor={detail.fluctuationColor}
                                fluctuationBgColor={detail.fluctuationBgColor}
                            />
                        ))}
                    </Box>
                </Box>
            </Box>
            <Box
                sx={{
                    width: "100%",
                    margin: "0 auto",
                    // bgcolor: "",
                    // boxShadow: " 0px 4px 10px 5px rgba(238, 238, 238, 1)",
                    // borderRadius: "6px",
                }}
            >
                <Box>
                    {/* <Typography
                        sx={{
                            padding: "0.6rem 0 0rem 0.8rem",
                            color: "#05004E",
                            fontSize: "15px",
                            fontWeight: 800,
                            m: "-5px 0",
                        }}
                    >
                        Points
                    </Typography> */}
                    <Box
                        sx={{
                            display: "flex",
                            flexDirection: { xs: "column", md: "row" },
                            gap: { xs: "1rem", md: "0" },
                            justifyContent: "center",
                            width: "100%",
                            padding: "1rem 0",
                        }}
                    >
                        <Box
                            sx={{
                                width: { xs: "98%", md: "48%" },
                                margin: "0 auto",
                                bgcolor: "",
                                boxShadow:
                                    " 0px 4px 10px 5px rgba(238, 238, 238, 1)",
                                borderRadius: "6px",
                            }}
                        >
                            <Typography
                                sx={{
                                    padding: "0.6rem 0 0rem 0.8rem",
                                    color: "#05004E",
                                    fontSize: "15px",
                                    fontWeight: 800,
                                    m: "-5px 0",
                                }}
                            >
                                Total Points Earned
                            </Typography>
                            <Box
                                sx={{
                                    display: "flex",
                                    width: "100%",
                                    margin: "0 auto",
                                    // bgcolor: "",
                                    // boxShadow:
                                    //     " 0px 4px 10px 5px rgba(238, 238, 238, 1)",
                                    // borderRadius: "6px",
                                    flexWrap: "wrap",
                                }}
                            >
                                {customerPointsDetails?.Total_Points_Earned?.map(
                                    (detail, idx) => (
                                        <MiniCustomerCard
                                            key={idx}
                                            loading={detail.loading}
                                            cardTitle={detail.cardTitle}
                                            percentage={detail.percentage}
                                            value={detail.value}
                                            SubTitle={detail.SubTitle}
                                            fluctuationColor={
                                                detail.fluctuationColor
                                            }
                                            fluctuationBgColor={
                                                detail.fluctuationBgColor
                                            }
                                        />
                                    )
                                )}
                            </Box>
                        </Box>

                        <Box
                            sx={{
                                width: { xs: "98%", md: "48%" },
                                margin: "0 auto",
                                bgcolor: "",
                                boxShadow:
                                    " 0px 4px 10px 5px rgba(238, 238, 238, 1)",
                                borderRadius: "6px",
                            }}
                        >
                            <Typography
                                sx={{
                                    padding: "0.6rem 0 0rem 0.8rem",
                                    color: "#05004E",
                                    fontSize: "15px",
                                    fontWeight: 800,
                                    m: "-5px 0",
                                }}
                            >
                                Total Points Redeemed
                            </Typography>
                            <Box
                                sx={{
                                    display: "flex",
                                    width: "100%",
                                    margin: "0 auto",
                                    // bgcolor: "",
                                    // boxShadow:
                                    //     " 0px 4px 10px 5px rgba(238, 238, 238, 1)",
                                    // borderRadius: "6px",
                                    flexWrap: "wrap",
                                }}
                            >
                                {customerPointsDetails?.Total_Points_Redeemed?.map(
                                    (detail, idx) => (
                                        <MiniCustomerCard
                                            key={idx}
                                            loading={detail.loading}
                                            cardTitle={detail.cardTitle}
                                            percentage={detail.percentage}
                                            value={detail.value}
                                            SubTitle={detail.SubTitle}
                                            fluctuationColor={
                                                detail.fluctuationColor
                                            }
                                            fluctuationBgColor={
                                                detail.fluctuationBgColor
                                            }
                                        />
                                    )
                                )}
                            </Box>
                        </Box>
                    </Box>
                </Box>
            </Box>
            <Box
                sx={{
                    width: "98%",
                    margin: "0 auto",
                    bgcolor: "",
                    boxShadow: " 0px 4px 10px 5px rgba(238, 238, 238, 1)",
                    borderRadius: "6px",
                }}
            >
                <Box>
                    <Typography
                        sx={{
                            padding: "0.6rem 0 0rem 0.8rem",
                            color: "#05004E",
                            fontSize: "15px",
                            fontWeight: 800,
                            m: "-5px 0",
                        }}
                    >
                        Total Feedback
                    </Typography>
                    <Box
                        sx={{
                            display: "flex",
                            flexWrap: "wrap",
                            justifyContent: "center",
                            width: "100%",
                        }}
                    >
                        {customerFeedbackDetails?.month?.map((detail, idx) => (
                            <MiniCustomerCard
                                key={idx}
                                loading={detail.loading}
                                cardTitle={detail.cardTitle}
                                percentage={detail.percentage}
                                value={detail.value}
                                SubTitle={detail.SubTitle}
                                fluctuationColor={detail.fluctuationColor}
                                fluctuationBgColor={detail.fluctuationBgColor}
                            />
                        ))}
                        {customerFeedbackDetails?.year?.map((detail, idx) => (
                            <MiniCustomerCard
                                key={idx}
                                loading={detail.loading}
                                cardTitle={detail.cardTitle}
                                percentage={detail.percentage}
                                value={detail.value}
                                SubTitle={detail.SubTitle}
                                fluctuationColor={detail.fluctuationColor}
                                fluctuationBgColor={detail.fluctuationBgColor}
                            />
                        ))}
                    </Box>
                </Box>
            </Box>
        </Box>
    );
}

export default CustomerInfo;
