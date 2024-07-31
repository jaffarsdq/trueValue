import { Box, Checkbox, FormControlLabel, Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { setSingleCustomerDetailsForMoreInfo } from "../../../../Redux/Slices/CustomerSlice";
import CustomInputField from "../../../CommonComponents/CustomInputField";

function MoreCustomerDetails() {
    const dispatch = useDispatch();

    // Example of fetching data from Redux state (replace with your actual implementation)
    const data = useSelector(
        (state) => state?.customer?.singleCustomerDetails?.CREDITINFO[0]
    );

    // Example of handling input change with Redux dispatch (replace with your actual implementation)
    const handleInputChange = (field, value) => {
        dispatch(setSingleCustomerDetailsForMoreInfo({ [field]: value }));
    };

    return (
        <Box
            sx={{
                paddingTop: "0.5rem",
                minHeight: "100%",
                fontFamily: "Poppins",
                width: "100%",
            }}
        >
            <Box sx={{ display: "flex", flexDirection: "column" }}>
                <Box
                    sx={{
                        backgroundColor: "#FAFAFB",
                        border: "2px solid #E6EBF1",
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        padding: "0.5rem 1rem",
                        borderRadius: "10px",
                        flexDirection: "column",
                        marginBottom: "1rem",
                    }}
                >
                    <Box
                        sx={{
                            display: "flex",
                            gap: { xs: "0rem", sm: "1rem" },
                            width: "100%",
                            flexDirection: {
                                xs: "column",
                                sm: "row",
                                md: "row",
                            },
                        }}
                    >
                        <Box
                            sx={{
                                width: { xs: "98%", md: "33%" },
                                margin: "0 auto",
                            }}
                        >
                            <CustomInputField
                                label="Credit Limit"
                                value={data?.c_credit_limit}
                                onChange={(e) =>
                                    handleInputChange(
                                        "c_credit_limit",
                                        e.target.value
                                    )
                                }
                                type="text"
                            />
                        </Box>
                        <Box
                            sx={{
                                width: { xs: "98%", md: "33%" },
                                margin: "0 auto",
                            }}
                        >
                            <CustomInputField
                                label="Balance"
                                value={data?.c_balance}
                                onChange={(e) =>
                                    handleInputChange(
                                        "c_balance",
                                        e.target.value
                                    )
                                }
                                type="text"
                            />
                        </Box>
                        <Box
                            sx={{
                                width: { xs: "98%", md: "33%" },
                                margin: "0 auto",
                            }}
                        >
                            <CustomInputField
                                label="Open Balance"
                                value={data?.c_open_balance}
                                onChange={(e) =>
                                    handleInputChange(
                                        "c_open_balance",
                                        e.target.value
                                    )
                                }
                                type="text"
                            />
                        </Box>
                    </Box>

                    <Box
                        sx={{
                            display: "flex",
                            gap: { xs: "0rem", sm: "1rem" },
                            width: "100%",
                            flexDirection: {
                                xs: "column",
                                sm: "row",
                                md: "row",
                            },
                            alignItems: "center",
                        }}
                    >
                        <Box
                            sx={{
                                width: { xs: "98%", md: "80%" },
                                margin: {
                                    xs: "1.2rem auto 0 auto",
                                    sm: "0 auto",
                                },
                            }}
                        >
                            <CustomInputField
                                label="Current Balance"
                                value={data?.curr_bal}
                                onChange={(e) =>
                                    handleInputChange(
                                        "curr_bal",
                                        e.target.value
                                    )
                                }
                                type="text"
                            />
                        </Box>

                        <Box
                            sx={{
                                width: { xs: "98%", md: "20%" },
                                margin: "0 auto",
                                display: "flex",
                                alignItems: "center",
                            }}
                        >
                            <FormControlLabel
                                control={
                                    <Checkbox
                                        color="secondary"
                                        checked={
                                            data?.cust_status?.toUpperCase() ===
                                            "Y"
                                        }
                                        onChange={(e) =>
                                            handleInputChange(
                                                "cust_status",
                                                e.target.checked ? "Y" : "N"
                                            )
                                        }
                                    />
                                }
                                label={
                                    <Typography
                                        sx={{
                                            fontSize: "12px",
                                            marginTop: "2px",
                                            fontWeight: "500",
                                            opacity: "95%",
                                        }}
                                    >
                                        Active
                                    </Typography>
                                }
                                sx={{
                                    "& .MuiSvgIcon-root": {
                                        fontSize: {
                                            xs: "12px",
                                            sm: "12px",
                                            md: "18px",
                                            lg: "18px",
                                        },
                                    },
                                }}
                            />
                        </Box>
                    </Box>
                </Box>
            </Box>
        </Box>
    );
}

export default MoreCustomerDetails;
