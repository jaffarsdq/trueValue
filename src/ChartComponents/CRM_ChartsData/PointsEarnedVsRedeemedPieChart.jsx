import { Cancel, CheckCircle } from "@mui/icons-material";
import { Box, Typography } from "@mui/material";
import { formatNumber } from "chart.js/helpers";
import { useCallback, useRef } from "react";
import { Pie } from "react-chartjs-2";
import { useSelector } from "react-redux";
import ExportButton from "../../Components/CommonComponents/ExportButton";

function PointsEarnedVsRedeemedPieChart() {
    const {
        pointsEarnedVsRedeemedPercentage,
        loadingPointsEarnedVsRedeemedPercentage,
    } = useSelector((state) => state.crm);

    let chartRef = useRef(null);

    const downloadChartAsImage = useCallback(() => {
        const link = document.createElement("a");
        link.download = `PointsEarnedVsRedeemed_chart.png`;
        link.href = chartRef.current.toBase64Image();
        link.click();
    }, []);

    const pieData = {
        labels: ["Points Earned", "Points Redeemed"],
        datasets: [
            {
                data: [
                    pointsEarnedVsRedeemedPercentage?.Earned || 0,
                    pointsEarnedVsRedeemedPercentage?.Redeemed || 0,
                ],
                backgroundColor: [
                    "rgba(89, 50, 234, 1)",
                    "rgba(22, 192, 152, 1)",
                ],
            },
        ],
    };

    const options = {
        type: "pie",
        plugins: {
            datalabels: { color: "white" },
            legend: {
                display: false,
                position: "right",
            },
        },
        maintainAspectRatio: false,
        responsive: true,
    };

    return (
        <Box
            sx={{
                backgroundColor: "white",
                height: "90%",
                width: "100%",
                color: "white",
            }}
        >
            <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                <Typography
                    sx={{
                        color: "#05004E",
                        fontSize: "14px",
                        fontWeight: 600,
                    }}
                >
                    Points Earned vs Redeemed
                </Typography>
                <ExportButton downloadChart={downloadChartAsImage} />
            </Box>
            {loadingPointsEarnedVsRedeemedPercentage ? (
                <Box
                    sx={{
                        display: "flex",
                        alignItems: "end",
                        minHeight: "200px",
                        width: "100%",
                        justifyContent: "center",
                    }}
                >
                    <Box
                        className="loader"
                        sx={{
                            height: "20%",
                            width: "90%",
                        }}
                    >
                        <div className="bar"></div>
                        <div className="bar"></div>
                        <div className="bar"></div>
                        <div className="bar"></div>
                        <div className="bar"></div>
                        <div className="bar"></div>
                        <div className="bar"></div>
                        <div className="bar"></div>
                    </Box>
                </Box>
            ) : !loadingPointsEarnedVsRedeemedPercentage &&
              !pointsEarnedVsRedeemedPercentage ? (
                <Box
                    sx={{
                        color: "black",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        height: "100%",
                    }}
                >
                    There is no data or Something went wrong
                </Box>
            ) : (
                <>
                    <Box
                        sx={{
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            width: "50%",
                            height: "80%",
                            margin: "0 auto",
                        }}
                    >
                        <Box
                            sx={{
                                display: "flex",
                                backgroundColor: "white",
                                boxShadow: "0px 4px 6px rgba(238, 238, 238, 1)",
                                padding: {
                                    xs: "0.4rem 0.5rem",
                                    md: "0.4rem 1rem",
                                },
                                borderRadius: "8px",
                                alignItems: "center",
                            }}
                        >
                            <CheckCircle
                                sx={{
                                    color: "rgba(22, 192, 152, 1)",
                                    fontSize: "30px",
                                }}
                            />
                            <Typography
                                sx={{
                                    fontFamily: "DM Sans",
                                    fontWeight: "700",
                                    color: "black",
                                }}
                            >
                                {formatNumber(
                                    pointsEarnedVsRedeemedPercentage?.RedeemedPerc,
                                    2
                                ) || 0}
                                %
                            </Typography>
                        </Box>
                        <Box
                            sx={{
                                backgroundColor: "white",
                                height: "92%",
                                width: "98%",
                                margin: "0 auto",
                                color: "white",
                                display: "flex",
                                justifyContent: "center",
                            }}
                        >
                            <Pie
                                ref={chartRef}
                                data={pieData}
                                options={options}
                            />
                        </Box>
                        <Box
                            sx={{
                                display: "flex",
                                backgroundColor: "white",
                                boxShadow: "0px 4px 6px rgba(238, 238, 238, 1)",
                                padding: {
                                    xs: "0.4rem 0.5rem",
                                    md: "0.4rem 1rem",
                                },
                                borderRadius: "8px",
                                alignItems: "center",
                            }}
                        >
                            <Cancel
                                sx={{
                                    color: "rgba(89, 50, 234, 1)",
                                    fontSize: "30px",
                                }}
                            />
                            <Typography
                                sx={{
                                    fontFamily: "DM Sans",
                                    fontWeight: "700",
                                    color: "black",
                                }}
                            >
                                {formatNumber(
                                    pointsEarnedVsRedeemedPercentage?.EarnedPerc,
                                    2
                                ) || 0}
                                %
                            </Typography>
                        </Box>
                    </Box>
                    <Box
                        sx={{
                            display: "flex",
                            justifyContent: "center",
                        }}
                    >
                        <Typography
                            sx={{
                                color: "rgba(148, 148, 148, 1)",
                                fontSize: "12px",
                                fontFamily: "DM Sans",
                                paddingTop: "0.3rem",
                            }}
                        >
                            Year-to-date points statistics
                        </Typography>
                    </Box>
                </>
            )}
        </Box>
    );
}

export default PointsEarnedVsRedeemedPieChart;
