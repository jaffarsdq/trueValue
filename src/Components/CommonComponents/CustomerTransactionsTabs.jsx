import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import Tabs from "@mui/material/Tabs";

function CustomerTransactionsTabs({ handleValue, value }) {
    const handleChange = (event, newValue) => {
        handleValue(newValue);
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
                    indicatorColor="primary"
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
                                backgroundColor: "rgba(100, 95, 228, 0.32)",
                            },
                        }}
                        value="one"
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
                                backgroundColor: "rgba(100, 95, 228, 0.32)",
                            },
                        }}
                        value="two"
                        label="Points"
                    />
                </Tabs>
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

export default CustomerTransactionsTabs;
