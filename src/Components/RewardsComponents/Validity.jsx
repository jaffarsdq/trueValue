import { Box } from "@mui/material";

import CustomInputField from "../CommonComponents/CustomInputField";

function Validity() {
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
                <Box sx={{ width: { xs: "98%", md: "50%" }, margin: "0 auto" }}>
                    <CustomInputField
                        label="Start Date"
                        value={""}
                        // onChange={(e) =>
                        //     handleInputChange("Po Number", e.target.value)
                        // }
                        type="date"
                    />
                </Box>
                <Box sx={{ width: { xs: "98%", md: "50%" }, margin: "0 auto" }}>
                    <CustomInputField
                        label="End Date"
                        value={""}
                        // onChange={(e) =>
                        //     handleInputChange("Po Number", e.target.value)
                        // }
                        type="date"
                    />
                </Box>
            </Box>

            <Box sx={{ width: { xs: "98%", sm: "100%" }, margin: "0 auto" }}>
                <CustomInputField
                    label="Total Uses"
                    value={""}
                    // onChange={(e) =>
                    //     handleInputChange("Po Number", e.target.value)
                    // }
                    type="text"
                />
            </Box>
            <Box sx={{ width: { xs: "98%", sm: "100%" }, margin: "0 auto" }}>
                <CustomInputField
                    label="Per Customer"
                    value={""}
                    // onChange={(e) =>
                    //     handleInputChange("Po Number", e.target.value)
                    // }
                    type="text"
                />
            </Box>
        </Box>
    );
}

export default Validity;
