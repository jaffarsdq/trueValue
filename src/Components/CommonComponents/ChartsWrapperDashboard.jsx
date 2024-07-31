import { Box, Typography } from "@mui/material";

import BranchDropDown from "./BranchDropDown";
import ExportButton from "./ExportButton";

function ChartsWrapperDashboard({ children, chartHeading, downloadChart }) {
    return (
        <Box
            sx={{
                width: { xs: "95%", sm: "100%", md: "99%" },
                minHeight: "100%",
                margin: "0 auto",
                boxShadow: " 0px 4px 10px 5px rgba(238, 238, 238, 1)",
                borderRadius: "8px",
                padding: "1rem 1rem 0 1rem",
                backgroundColor: "white",
            }}
        >
            <Box
                sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    color: "#05004E",
                    fontFamily: "poppins",
                    width: "100%",
                }}
            >
                <Typography
                    style={{
                        fontSize: "14px",
                        fontWeight: "600",
                        fontFamily: "Poppins",
                    }}
                >
                    {chartHeading}
                </Typography>
                <Box
                    sx={{ display: "flex", gap: "2rem", alignItems: "center" }}
                >
                    <BranchDropDown />
                    <ExportButton downloadChart={downloadChart} />
                </Box>
            </Box>
            <Box
                sx={{
                    display: "flex",
                    flexDirection: "column", // Updated to column
                    width: "100%",
                    minHeight: "100%", // Updated to 100%
                }}
            >
                {children}
            </Box>
        </Box>
    );
}

export default ChartsWrapperDashboard;
