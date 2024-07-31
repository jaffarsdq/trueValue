import { Box, Button, Skeleton, Typography } from "@mui/material";
import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import hexToRgbOpac from "../../Utils/hexToRgbOpac";

function HeaderDashboard({ dashboardName, toggle }) {
    const location = useLocation();
    // Dummy data for filters
    const addedFilters = useSelector(
        (state) => state.dashboardFilterSlice.filters
    );

    const { bgColors, module } = useSelector((state) => state.navigation);
    const { reqParamsLoading } = useSelector(
        (state) => state.reqParamsDashboard
    );
    // const location = 'Dashboard'
    if (location.pathname !== "/Dashboard") {
        return;
    }

    return (
        <Box sx={{ padding: "1rem", backgroundColor: "#FAFBFC" }}>
            <Box
                sx={{
                    display: "flex",
                    flexDirection: { xs: "column", sm: "row" },
                    justifyContent: "space-between",
                    alignItems: "center",
                    paddingInline: { xs: "20px", sm: "28px" },
                    paddingBlock: "5px",
                    backgroundColor: "white",
                    borderRadius: "10px",
                    width: "99%",
                    margin: "0 auto",
                    boxShadow: " 0px 4px 10px 5px rgba(238, 238, 238, 0.5)",
                }}
            >
                <Box
                    sx={{
                        fontSize: { xs: "12px", sm: "14px" },
                        fontWeight: "800",
                        padding: "5px 10px",
                        marginRight: { xs: "auto", sm: "auto" },
                    }}
                >
                    <Box
                        sx={{
                            display: { xs: "", sm: "flex" },
                            alignItems: "start",
                        }}
                    >
                        <Typography
                            sx={{
                                fontSize: {
                                    xs: "15px",
                                    md: "15px",
                                    lg: "17px",
                                },
                                fontWeight: "800",
                                // color: "#000", // Retaining the original color
                                letterSpacing: "0.06rem",
                                color: bgColors[module],
                            }}
                        >
                            {"CRM"}
                        </Typography>
                    </Box>
                    <Box
                        sx={{
                            display: "flex",
                            flexDirection: "column",
                            fontSize: "14px",
                            fontWeight: "600",
                        }}
                    >
                        <Box
                            sx={{
                                display: "flex",
                                gap: "0.5rem",
                                justifyContent: "start",
                                flexWrap: "wrap",
                                alignItems: "center",
                            }}
                        >
                            <Typography
                                sx={{
                                    fontSize: {
                                        xs: "12px",
                                        md: "15px",
                                        lg: "15px",
                                    },
                                    fontWeight: "400",
                                    color: "#05004E",
                                }}
                            >
                                Applied filters :
                            </Typography>
                            {/* Dummy skeleton loaders */}
                            {reqParamsLoading &&
                                Array(3)
                                    .fill(1)
                                    .map((_, index) => (
                                        <Box
                                            key={index}
                                            sx={{
                                                display: "flex",
                                                gap: "0.2rem",
                                                backgroundColor: "white",
                                                padding: "0.1rem 0.3rem",
                                                borderRadius: "20px",
                                                border: `1px solid ${hexToRgbOpac(
                                                    bgColors[module],
                                                    0.5
                                                )}`,
                                            }}
                                        >
                                            <Skeleton
                                                variant="text"
                                                sx={{
                                                    fontSize: "14px",
                                                    width: "100px",
                                                    height: "20px",
                                                }}
                                            />
                                        </Box>
                                    ))}
                            {/* Rendering dummy filters */}
                            {!reqParamsLoading && addedFilters?.map((filter, index) => (
                                <Box
                                    key={index}
                                    sx={{
                                        display: "flex",
                                        backgroundColor: `${hexToRgbOpac(
                                            bgColors[module],
                                            0.04
                                        )}`,
                                        padding: "0.1rem 0.3rem",
                                        borderRadius: "20px",
                                        border: `1px solid ${hexToRgbOpac(
                                            bgColors[module],
                                            0.5
                                        )}`,
                                    }}
                                >
                                    <Box
                                        sx={{
                                            display: "flex",
                                            gap: "0.2rem",
                                        }}
                                    >
                                        <Typography
                                            sx={{
                                                fontWeight: "600",
                                                fontSize: "13px",
                                            }}
                                        >
                                            {filter.field}:{" "}
                                        </Typography>{" "}
                                        <Typography
                                            sx={{
                                                fontWeight: "400",
                                                fontSize: "13px",
                                            }}
                                        >
                                            {filter.value}
                                        </Typography>
                                    </Box>
                                </Box>
                            ))}
                        </Box>
                    </Box>
                </Box>

                <Box
                    sx={{
                        display: "flex",
                        gap: "10px",
                        marginLeft: { xs: "auto", sm: "0" },
                        padding: "5px 10px",
                        alignItems: "center",
                    }}
                >
                    <Button
                        onClick={toggle}
                        variant="contained"
                        color="secondary"
                        sx={{
                            height: "30px",
                            width: "90px",
                            textTransform: "capitalize",
                            fontSize: "12px",
                            fontWeight: "400",
                        }}
                    >
                        Filter
                    </Button>
                </Box>
            </Box>
        </Box>
    );
}

export default HeaderDashboard;
