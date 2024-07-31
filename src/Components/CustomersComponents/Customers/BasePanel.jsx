import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import Tabs from "@mui/material/Tabs";
import Typography from "@mui/material/Typography";
import PropTypes from "prop-types";
import * as React from "react";

import Card from "../Card";
import Address from "./Address/Address";
import CustomerDetails from "./CustomersDetails/customerDetails";
function CustomTabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box sx={{ p: 0 }}>
                    <Typography>{children}</Typography>
                </Box>
            )}
        </div>
    );
}

CustomTabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
};

function a11yProps(index) {
    return {
        id: `simple-tab-${index}`,
        "aria-controls": `simple-tabpanel-${index}`,
    };
}

export default function BasicTabs() {
    const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };
    return (
        <Box sx={{ width: "100%", paddingTop: "0" }}>
            <Box
                sx={{
                    borderTop: 1,
                    borderColor: "divider",
                    padding: "10px 0px",
                    marginTop: "5px",
                }}
            >
                <Tabs
                    value={value}
                    onChange={handleChange}
                    aria-label="basic tabs example"
                >
                    <Tab
                        sx={{
                            fontWeight: "500",
                            fontFamily: "Inter",
                            fontSize: { xs: "11px", sm: "14px" },
                        }}
                        label="Customer Details"
                        {...a11yProps(0)}
                    />
                    <Tab
                        sx={{
                            fontWeight: "500",
                            fontFamily: "Inter",
                            fontSize: { xs: "11px", sm: "14px" },
                        }}
                        label="Address"
                        {...a11yProps(1)}
                    />
                    <Tab
                        sx={{
                            fontWeight: "500",
                            fontFamily: "Inter",
                            fontSize: { xs: "11px", sm: "14px" },
                        }}
                        label="Card Details"
                        {...a11yProps(2)}
                    />
                    <Tab
                        sx={{
                            fontWeight: "500",
                            fontFamily: "Inter",
                            fontSize: { xs: "11px", sm: "14px" },
                        }}
                        label="Transaction History"
                        {...a11yProps(3)}
                    />
                </Tabs>
            </Box>
            <CustomTabPanel value={value} index={0}>
                <CustomerDetails />
            </CustomTabPanel>
            <CustomTabPanel value={value} index={1}>
                <Address />
            </CustomTabPanel>
            <CustomTabPanel value={value} index={2}>
                <Card />
            </CustomTabPanel>
            <CustomTabPanel value={value} index={3}></CustomTabPanel>
        </Box>
    );
}
