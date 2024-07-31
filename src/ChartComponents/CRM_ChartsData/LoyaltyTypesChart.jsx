import {
    ArcElement,
    BarElement,
    CategoryScale,
    Chart as ChartJS,
    Filler,
    Legend,
    LinearScale,
    LineElement,
    PointElement,
    Title,
    Tooltip,
} from "chart.js";

ChartJS.register(
    ArcElement,
    Legend,
    Title,
    Tooltip,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    BarElement,
    Filler,
    ChartDataLabels
);

import { Man, Woman } from "@mui/icons-material";
import { Box, Typography } from "@mui/material";
import ChartDataLabels from "chartjs-plugin-datalabels";
import { useCallback, useRef } from "react";
import { Doughnut } from "react-chartjs-2";
import { useSelector } from "react-redux";

import ExportButton from "../../Components/CommonComponents/ExportButton";

function LoyaltyTypesChart() {
    let chartRef = useRef(null);

    const { customerBaseByGender, loadingCustomerBaseByGender } = useSelector(
        (state) => state.crm
    );

    const downloadChartAsImage = useCallback(() => {
        const link = document.createElement("a");
        link.download = `LoyaltyTypes_chart.png`;
        link.href = chartRef.current.toBase64Image();
        link.click();
    }, []);

    const {
        male,
        female,
        male_percentage,
        female_percentage,
        Total_customers,
    } = customerBaseByGender?.[0] || {};

    const doughnutData = {
        labels: ["WOMEN", "MEN"],
        datasets: [
            {
                data: [female, male],
                backgroundColor: [
                    "rgba(255, 99, 132, 1)", // Red for women
                    "rgba(54, 162, 235, 1)", // Blue for men
                ],
            },
        ],
    };

    const options = {
        type: "doughnut",
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
                    Customer Base by Gender
                </Typography>
                <ExportButton downloadChart={downloadChartAsImage} />
            </Box>
            {loadingCustomerBaseByGender ? (
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
            ) : !loadingCustomerBaseByGender &&
              !customerBaseByGender?.length ? (
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
                                boxShadow:
                                    " 0px 4px 6px rgba(238, 238, 238, 1)",
                                padding: {
                                    xs: "0.4rem 0.5rem",
                                    md: "0.4rem 1rem",
                                },
                                borderRadius: "8px",
                                alignItems: "center",
                            }}
                        >
                            <Man
                                sx={{
                                    color: "rgba(54, 162, 235, 1)", // Blue for men
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
                                {male_percentage}%
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
                            <Doughnut
                                ref={chartRef}
                                data={doughnutData}
                                options={options}
                            />
                        </Box>
                        <Box
                            sx={{
                                display: "flex",
                                backgroundColor: "white",
                                boxShadow:
                                    " 0px 4px 6px rgba(238, 238, 238, 1)",
                                padding: {
                                    xs: "0.4rem 0.5rem",
                                    md: "0.4rem 1rem",
                                },
                                borderRadius: "8px",
                                alignItems: "center",
                            }}
                        >
                            <Woman
                                sx={{
                                    color: "rgba(255, 99, 132, 1)", // Red for women
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
                                {female_percentage}%
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
                            Total customers {Total_customers}
                        </Typography>
                    </Box>
                </>
            )}
        </Box>
    );
}

export default LoyaltyTypesChart;
