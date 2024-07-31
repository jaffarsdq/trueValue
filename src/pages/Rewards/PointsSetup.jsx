import { Box, Button, Typography } from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

import AdvancedSettings from "../../Components/PointsComponents/AdvancedSettings";
import EarningSetup from "../../Components/PointsComponents/EarningSetup";
import ExpirySetup from "../../Components/PointsComponents/ExpirySetup";
import RedemptionSetup from "../../Components/PointsComponents/RedemptionSetup";
import SideBar from "../../Layouts/SideBar";
import PointsSetupTabs from "./PointsSetupTabs";
function PointsSetup() {
    const [value, setValue] = useState("one");

    const navigator = useNavigate();

    const handleValue = (value) => {
        setValue(value);
    };

    const handleClick = () => {
        navigator("/rewards/PointsSetup");
    };

    return (
        <SideBar>
            <div
                style={{
                    backgroundColor: "#FAFBFC",
                    fontFamily: "poppins",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    flexDirection: "column",
                }}
            >
                {/* Buttons */}
                <Box
                    sx={{
                        display: "flex",
                        gap: "15px",
                        justifyContent: "space-between",
                        width: "100%",
                        padding: "1rem",
                    }}
                >
                    <Typography
                        sx={{
                            fontWeight: "600",
                        }}
                    >
                        Points Setup
                    </Typography>
                    <Button
                        sx={{ height: "30px" }}
                        color="secondary"
                        variant="outlined"
                        onClick={handleClick}
                    >
                        Back
                    </Button>
                </Box>

                <Box
                    sx={{
                        width: "97%",
                        margin: "0 auto",
                        height: "auto",
                        bgcolor: "white",
                        boxShadow: " 0px 4px 15px 8px rgba(238, 238, 238, 1)",
                        borderRadius: "4px",
                    }}
                >
                    <PointsSetupTabs handleValue={handleValue} value={value} />
                    {value === "one" && <EarningSetup />}
                    {value === "two" && <RedemptionSetup />}
                    {value === "three" && <ExpirySetup />}
                    {value === "four" && <AdvancedSettings />}
                </Box>
            </div>
        </SideBar>
    );
}

export default PointsSetup;
