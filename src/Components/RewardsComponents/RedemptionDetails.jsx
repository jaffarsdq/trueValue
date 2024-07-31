import { Box } from "@mui/material";
import { useState } from "react";

import CustomInputField from "../CommonComponents/CustomInputField";
import CustomSelectButton from "../CommonComponents/CustomSelectButton";

function RedemptionDetails() {
    const [product, setproduct] = useState("");
    const handleInputChange = (field, value) => {
        setproduct(value);
    };

    const productsData = [{ name: "product x" }, { name: "product y" }];
    const exclustionsData = [
        { name: "exclustion x" },
        { name: "exclustion y" },
    ];
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
                        name="Applicable product/services"
                        obj="loc_code"
                        value={product}
                        placeholder="products"
                        option={productsData}
                        // disabled={disable}
                        handleInputChange={handleInputChange}
                    />
                </Box>
                <Box sx={{ width: { xs: "98%", md: "50%" }, margin: "0 auto" }}>
                    <CustomInputField
                        label="Minimum Spend"
                        value={""}
                        // onChange={(e) =>
                        //     handleInputChange("Po Number", e.target.value)
                        // }
                        type="text"
                    />
                </Box>
            </Box>

            <Box sx={{ width: { xs: "98%", sm: "100%" }, margin: "0 auto" }}>
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
                    name="Exclusions"
                    obj="loc_code"
                    value={product}
                    placeholder="Exclusions"
                    option={exclustionsData}
                    // disabled={disable}
                    handleInputChange={handleInputChange}
                />
            </Box>
        </Box>
    );
}

export default RedemptionDetails;
