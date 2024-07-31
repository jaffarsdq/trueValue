import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import Tabs from "@mui/material/Tabs";
import Typography from "@mui/material/Typography";
import PropTypes from "prop-types";
import * as React from "react";

import SideBar from "../Layouts/SideBar";
import Area from "./Area/area";
import City from "./City/city";
import Country from "./Country/country";
// import paymentMode from '../../pages/UserMangementPage/paymentMode'
// import PaymentType from '../../pages/UserMangementPage/paymentType'
// import OrderSource from '../MasterData/OrderSource/orderSource'

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

export default function CountryTabs() {
    const [value, setValue] = React.useState(0);
    // const { countryData, initialStateLoader, createDataLoader } = useSelector(
    //     (state) => state.CountrySlice
    // );
    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
        <SideBar>
            <Box sx={{ width: "100%" }}>
                <Box sx={{ borderColor: "divider" }}>
                    <Tabs
                        variant="scrollable"
                        scrollButtons="auto"
                        value={value}
                        onChange={handleChange}
                        indicatorColor="primary"
                        aria-label="secondary tabs example"
                        TabIndicatorProps={{
                            sx: {
                                backgroundColor: "#A42ED7",
                                display: "flex",
                                justifyContent: "space-between",
                                width: "100%",
                            },
                        }}
                        // value={value}
                        // onChange={handleChange}
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
                                    backgroundColor: "rgba(100, 95, 228, 0.32)",
                                },
                            }}
                            {...a11yProps(0)}
                            disabled={false}
                            label="Country"
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
                                    backgroundColor: "rgba(100, 95, 228, 0.32)",
                                },
                            }}
                            {...a11yProps(1)}
                            disabled={true}
                            label="City"
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
                                    backgroundColor: "rgba(100, 95, 228, 0.32)",
                                },
                            }}
                            {...a11yProps(2)}
                            disabled={true}
                            label="Area"
                        />
                    </Tabs>
                </Box>
                <CustomTabPanel value={value} index={0}>
                    <Country setValue={setValue} />
                </CustomTabPanel>
                <CustomTabPanel value={value} index={1}>
                    <City setValue={setValue} />
                </CustomTabPanel>
                <CustomTabPanel value={value} index={2}>
                    <Area setValue={setValue} />
                </CustomTabPanel>
            </Box>
        </SideBar>
    );
}
