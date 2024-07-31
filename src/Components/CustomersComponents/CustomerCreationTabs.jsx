import { Button } from "@mui/material";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import Tabs from "@mui/material/Tabs";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import { resetSingleCustomerDetails } from "../../Redux/Slices/CustomerSlice";

function CustomerCreationTabs({ handleValue, value }) {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const handleChange = (event, newValue) => {
        handleValue(newValue);
    };

    const handleBack = () => {
        dispatch(resetSingleCustomerDetails());
        navigate("/customers/CustomerDetails");
    };

    return (
        <Box
            sx={{
                display: { xs: "block", sm: "block" },
                backgroundColor: "#FAFBFC",
            }}
        >
            <Box
                sx={{
                    width: "100%",
                    padding: "0 10px",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                }}
            >
                <Tabs
                    variant="scrollable"
                    scrollButtons="auto"
                    value={value}
                    onChange={handleChange}
                    aria-label="secondary tabs example"
                    TabIndicatorProps={{
                        sx: {
                            backgroundColor: "#A42ED7", // Replace with your desired color
                        },
                    }}
                >
                    <Tab
                        sx={{
                            opacity: "50%",
                            fontSize: "13px",
                            "&.Mui-selected": {
                                color: "#000",
                                opacity: "100%",
                                fontWeight: "800",
                            },
                            "&.Mui-focusVisible": {
                                backgroundColor: "rgba(43, 47, 50, 1)",
                            },
                        }}
                        value="Customer Details"
                        label="Customer Details"
                    />
                    <Tab
                        sx={{
                            opacity: "50%",
                            fontSize: "13px",
                            "&.Mui-selected": {
                                color: "#000",
                                opacity: "100%",
                                fontWeight: "800",
                            },
                            "&.Mui-focusVisible": {
                                backgroundColor: "rgba(43, 47, 50, 1)",
                            },
                        }}
                        value="Address"
                        label="Address"
                    />
                    <Tab
                        sx={{
                            opacity: "50%",
                            fontSize: "13px",
                            "&.Mui-selected": {
                                color: "#000",
                                opacity: "100%",
                                fontWeight: "800",
                            },
                            "&.Mui-focusVisible": {
                                backgroundColor: "rgba(43, 47, 50, 1)",
                            },
                        }}
                        value="Card Details"
                        label="Card Details"
                    />
                    <Tab
                        sx={{
                            opacity: "50%",
                            fontSize: "13px",
                            "&.Mui-selected": {
                                color: "#000",
                                opacity: "100%",
                                fontWeight: "800",
                            },
                            "&.Mui-focusVisible": {
                                backgroundColor: "rgba(43, 47, 50, 1)",
                            },
                        }}
                        value="Transactions"
                        label="Transactions"
                    />
                    <Tab
                        sx={{
                            opacity: "50%",
                            fontSize: "13px",
                            "&.Mui-selected": {
                                color: "#000",
                                opacity: "100%",
                                fontWeight: "800",
                            },
                            "&.Mui-focusVisible": {
                                backgroundColor: "rgba(43, 47, 50, 1)",
                            },
                        }}
                        value="Points Management"
                        label="Points Management"
                    />
                </Tabs>
                <Button
                    color="secondary"
                    variant="outlined"
                    sx={{ height: "35px" }}
                    onClick={handleBack}
                >
                    Back
                </Button>
            </Box>
            <div
                style={{
                    marginTop: "5px 0",
                    height: "1px",
                    backgroundColor: "black",
                    opacity: "15%",
                }}
            ></div>
        </Box>
    );
}

export default CustomerCreationTabs;
