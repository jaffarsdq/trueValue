import { Box, Typography } from "@mui/material";
import { useState } from "react";

import CustomInputField from "../CommonComponents/CustomInputField";
import CustomSelectButton from "../CommonComponents/CustomSelectButton";

function TargetAudience() {
    const [gender, setGender] = useState("");

    const handleInputChange = (field, value) => {
        setGender(value);
    };
    const genderData = [{ name: "male" }, { name: "female" }];
    const Country = [{ name: "India" }, { name: "UAE" }];
    const City = [{ name: "Chennai" }, { name: "Dubai" }];

    return (
        <Box sx={{ width: "98%", margin: "0 auto", padding: "1rem 0" }}>
            <Box
                sx={{
                    display: "flex",
                    gap: { xs: "0rem", sm: "1rem" },
                    width: "100%",
                    flexDirection: { xs: "column", sm: "row", md: "row" },
                }}
            >
                <Box
                    sx={{
                        width: { xs: "100%", sm: "50%" },
                        display: "flex",
                        gap: "1rem",
                    }}
                >
                    <CustomSelectButton
                        height="35px"
                        sx={{
                            margin: "4px 0px",
                            padding: "7px 0",
                            width: {
                                xs: "100%",
                                md: "30%",
                                lg: "100%",
                            },
                        }}
                        name="Gender"
                        obj="loc_code"
                        value={gender}
                        placeholder="gender"
                        option={genderData}
                        // disabled={disable}
                        handleInputChange={handleInputChange}
                    />
                </Box>
                <Box
                    sx={{
                        width: { xs: "100%", sm: "50%" },
                        display: "flex",
                        gap: "1rem",
                    }}
                >
                    <Box
                        sx={{
                            width: { xs: "98%", md: "50%" },
                            margin: "0 auto",
                        }}
                    >
                        <CustomInputField
                            label="Age From"
                            value={""}
                            // onChange={(e) =>
                            //     handleInputChange("Po Number", e.target.value)
                            // }
                            type="number"
                        />
                    </Box>
                    <Box
                        sx={{
                            width: { xs: "98%", md: "50%" },
                            margin: "0 auto",
                        }}
                    >
                        <CustomInputField
                            label="Age To"
                            value={""}
                            // onChange={(e) =>
                            //     handleInputChange("Po Number", e.target.value)
                            // }
                            type="number"
                        />
                    </Box>
                </Box>
            </Box>

            <Typography
                sx={{
                    fontSize: "13px",
                    fontWeight: "600",
                    opacity: "70%",
                    fontFamily: "Poppins",
                    padding: "1rem 0.2rem",
                }}
            >
                Geography Location
            </Typography>
            <Box
                sx={{
                    width: "99%",
                    margin: "0 auto",
                    boxShadow: " 0px 4px 10px 8px rgba(238, 238, 238, 0.5)",
                    padding: "1rem",
                    borderRadius: "4px",
                }}
            >
                <Box
                    sx={{ width: { xs: "98%", sm: "100%" }, margin: "0 auto" }}
                >
                    <CustomSelectButton
                        height="35px"
                        sx={{
                            margin: "4px 0px",
                            padding: "7px 0",
                            width: {
                                xs: "100%",
                                md: "30%",
                                lg: "100%",
                            },
                        }}
                        name="Country"
                        obj="loc_code"
                        value={gender}
                        placeholder="Country"
                        option={Country}
                        // disabled={disable}
                        handleInputChange={handleInputChange}
                    />
                </Box>
                <Box
                    sx={{ width: { xs: "98%", sm: "100%" }, margin: "0 auto" }}
                >
                    <CustomSelectButton
                        height="35px"
                        sx={{
                            margin: "4px 0px",
                            padding: "7px 0",
                            width: {
                                xs: "100%",
                                md: "30%",
                                lg: "100%",
                            },
                        }}
                        name="City"
                        obj="loc_code"
                        value={gender}
                        placeholder="City"
                        option={City}
                        // disabled={disable}
                        handleInputChange={handleInputChange}
                    />
                </Box>
            </Box>
        </Box>
    );
}

export default TargetAudience;
