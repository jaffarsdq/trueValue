import { Box, Typography } from "@mui/material";
import { useCallback, useEffect, useRef } from "react";
import { Bar, Doughnut, Line } from "react-chartjs-2";

import ExportButton from "../CommonComponents/ExportButton";

const ChartWithDownloadPAI = ({
    data,
    chartType,
    chartData,
    chartOptions,
    chartHeading,
    isLoading,
}) => {
    // eslint-disable-next-line no-unused-vars
    let chartRef = useRef(null);

    const downloadChartAsImage = useCallback(() => {
        const link = document.createElement("a");
        link.download = `${chartHeading}_chart.png`;
        link.href = chartRef.current.toBase64Image();
        link.click();
    }, [chartHeading]);

    const ChartComponent =
        {
            line: Line,
            bar: Bar,
            doughnut: Doughnut,
            // Add other chart types as needed
        }[chartType] || Line;

    const boxRef = useRef(null);

    useEffect(() => {
        // Scroll to the bottom of the div when it's loaded
        if (boxRef.current) {
            boxRef.current.scrollTop = boxRef.current.scrollHeight;
        }
    }, [chartData]);

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
                    {chartHeading}
                </Typography>
                <ExportButton downloadChart={downloadChartAsImage} />
            </Box>
            {isLoading ? (
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
            ) : !isLoading && !data.length ? (
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
                <Box
                    ref={boxRef}
                    className="custom-scrollbar"
                    sx={{
                        height:
                            chartType == "bar"
                                ? chartHeading === "Stock by Group"
                                    ? "102%"
                                    : "100%"
                                : "100%",
                        width: "100%",
                        overflow: "auto",
                    }}
                >
                    <Box
                        sx={{
                            backgroundColor: "white",
                            height: "100%",
                            width:
                                chartType == "doughnut"
                                    ? { xs: "95%", sm: "70%", md: "68%" }
                                    : "100%",
                            margin: "0 auto",
                            color: "white",
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                        }}
                    >
                        <ChartComponent
                            ref={chartRef}
                            data={chartData}
                            options={chartOptions}
                        />
                    </Box>
                </Box>
            )}
        </Box>
    );
};

export default ChartWithDownloadPAI;
