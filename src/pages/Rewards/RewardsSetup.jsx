import { Box, Button, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import BasicInformation from "../../Components/RewardsComponents/BasicInformation";
import BenefitsAndCriteria from "../../Components/RewardsComponents/BenefitsAndCriteria";
import Location from "../../Components/RewardsComponents/Location";
import RewardsSetupTabs from "../../Components/RewardsComponents/RewardsSetupTabs";
import SideBar from "../../Layouts/SideBar";
import { deleteBenefitAndCriteriaPoint, setToggelePointsButton } from "../../Redux/Slices/RewardsSetupSlice";

function RewardsSetup({ togglecreate, setToggleCreate }) {
    const [value, setValue] = useState("one");
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleValue = (value) => {
        setValue(value);
        console.log(value);
    };

    useEffect(() => {
        dispatch(deleteBenefitAndCriteriaPoint([]));
        handleValue("one")
    }, [togglecreate])

    const handleBack = () => {
        navigate("/rewards/RewardsSetup");
        dispatch(setToggelePointsButton(true));
    };

    return (
        <>
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
                {/* <Box
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
                        Rewards Setup
                    </Typography>
                    <Button
                        sx={{
                            height: "30px",
                            fontSize: { xs: "10px", sm: "14px" },
                        }}
                        color="secondary"
                        variant="outlined"
                        onClick={handleBack}
                    >
                        Back
                    </Button>
                </Box> */}

                <Box
                    sx={{
                        width: "97%",
                        margin: "0 auto",
                        // height: "600px",
                        bgcolor: "white",
                        boxShadow: " 0px 4px 15px 8px rgba(238, 238, 238, 1)",
                        borderRadius: "4px",
                    }}
                >
                    <RewardsSetupTabs handleValue={handleValue} value={value} setToggleCreate={setToggleCreate} />
                    {value === "one" && <BasicInformation handleValue={handleValue} />}
                    {value === "two" && <BenefitsAndCriteria />}
                    {value === "three" && <Location />}
                </Box>
            </div>
        </>
    );
}

export default RewardsSetup;
