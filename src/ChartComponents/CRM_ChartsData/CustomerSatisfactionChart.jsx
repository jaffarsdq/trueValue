import { Box, Typography } from "@mui/material";

import ChartWithDownloadCRM from "../../Components/CRMComponents/ChartWithDownloadCRM";

function CustomerSatisfactionChart() {
    const labels = ["Jan", "Feb", "Mar", "Apr", "May", "June", "July"];

    const generateRandomData = () => {
        return labels.map(() => Math.floor(Math.random() * 2000) - 1000);
    };

    const data = {
        labels,
        datasets: [
            {
                label: "This month",
                data: generateRandomData(),
                borderColor: "rgba(7, 224, 152, 1)",
                backgroundColor: "rgba(7, 224, 152, 0.2)",
                pointBackgroundColor: "rgba(7, 224, 152, 1)",
                fill: "start",
                yAxisID: "y",
            },
            {
                label: "Last Month",
                data: generateRandomData(),
                borderColor: "rgba(0, 149, 255, 1)",
                backgroundColor: "rgba(0, 149, 255, 0.2)",
                pointBackgroundColor: "rgba(0, 149, 255, 1)",
                fill: "start",
                yAxisID: "y1",
            },
        ],
    };

    const options = {
        responsive: true,
        interaction: {
            mode: "index",
            intersect: false,
        },
        stacked: false,
        plugins: {
            datalabels: false,
            legend: {
                display: true,
                position: "bottom",
                labels: {
                    color: ["#7B91B0"],
                },
            },
        },
        scales: {
            x: {
                ticks: {
                    color: "#7B91B0",
                },
                grid: {
                    display: false,
                },
            },
            y: {
                type: "linear",
                display: true,
                position: "left",
                ticks: {
                    color: "#7B91B0",
                },
            },
            y1: {
                type: "linear",
                display: true,
                position: "right",
                grid: {
                    drawOnChartArea: false,
                },
                ticks: {
                    color: "#7B91B0",
                },
            },
        },
        elements: {
            line: {
                tension: 0.4,
            },
        },
        maintainAspectRatio: false,
    };

    return (
        <>
            <ChartWithDownloadCRM
                chartType="line"
                chartData={data}
                chartOptions={options}
                chartHeading="Customer Satisfaction"
            />
            <Box
                sx={{
                    marginTop: "19px",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    gap: "5rem",
                }}
            >
                <Typography
                    sx={{
                        color: "rgba(34, 43, 69, 1)",
                        fontFamily: "Poppins",
                        fontSize: "13px",
                        fontWeight: "500",
                        lineHeight: "20px",
                    }}
                >
                    $3,004
                </Typography>
                <Typography
                    sx={{
                        color: "rgba(34, 43, 69, 1)",
                        fontFamily: "Poppins",
                        fontSize: "13px",
                        fontWeight: "500",
                        lineHeight: "20px",
                    }}
                >
                    $4,988
                </Typography>
            </Box>
        </>
    );
}

export default CustomerSatisfactionChart;
