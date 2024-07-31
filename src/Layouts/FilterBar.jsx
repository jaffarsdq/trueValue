import ClearIcon from "@mui/icons-material/Clear";
import {
    Box,
    Button,
    Drawer,
    IconButton,
    Skeleton,
    Typography,
} from "@mui/material";
import * as React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import TopNavigator from "../Components/BottomNavigator/TopNavigator";
import HeaderDashboard from "../Components/CommonComponents/HeaderDashboard";
import ReportFilterBox from "../Components/ReportsComponents/ReportFilterBox";
import {
    addCondition,
    addField,
    addFilter,
    addReportFilter,
    addValue,
    resetFilters,
    resetReportFilters,
    setAddedFilters,
} from "../Redux/Slices/filter/filterSlice";
import formatFieldLabel from "../Utils/formatFieldLabel";
import sortReportFilters from "../Utils/sortReportFilters";
import FilterBarAccordion from "./FilterBarAccordion";

// import alterRoutesConfig from "../../config/routesConfig";

export default function FilterBar() {
    const location = useLocation();
    const currentRoute = location.pathname;
    const isItReportsPage = currentRoute.includes("/Reports");

    const dispatch = useDispatch();

    const filters = useSelector((state) => state.dashboardFilterSlice.filters);
    // const {  requiredParams, selectedReport } =
    //     useSelector((state) => state.reports);
    const { requiredParamsLoading } = useSelector(
        (state) => state.dashboardFilterSlice
    );
    const addedFilters = useSelector(
        (state) => state.dashboardFilterSlice.addedFilters
    );

    const selectableFields = useSelector(
        (state) => state.dashboardFilterSlice.selectableFields
    );

    const [errorMsgSelectFields, setErrorMsgSelectFields] = React.useState("");

    const showErrorMsg = (message) => {
        setErrorMsgSelectFields(message);

        // Set a timeout to remove the error message after 5 seconds
        setTimeout(() => {
            setErrorMsgSelectFields("");
        }, 5000);
    };

    const [isFilterBarOpen, setIsFilterBarOpen] = React.useState(false);
    const [closeFilterBar, setCloseFilterBar] = React.useState(false);
    const toggleDrawer = (open) => (event) => {
        if (
            event.type === "keydown" &&
            (event.key === "Tab" || event.key === "Shift")
        ) {
            return;
        }

        setIsFilterBarOpen(Boolean(open));
    };

    const handleRemoveFilter = (name) => {
        const updatedFilters = addedFilters.filter(
            (filters, i) => filters.field !== name
        );
        console.log(addedFilters, name);
        console.log(updatedFilters, "remove");
        dispatch(setAddedFilters(updatedFilters));
    };

    const handleResetAll = () => {
        setIsFilterBarOpen(false);
        dispatch(setAddedFilters([]));
        dispatch(addField(""));
        dispatch(addCondition(""));
        dispatch(addValue(""));
    };

    const mandatoryFields = selectableFields.filter(
        (field) => field.mandatory_field
    );
    console.log(mandatoryFields, "mandatory");

    React.useEffect(() => {
        if (isFilterBarOpen) {
            setIsFilterBarOpen(false); // Close the filter bar immediately
        }
    }, [filters]); // Update the dependency to trigger when addedFilters change

    const handleApplyFilter = () => {
        // Filter out mandatory fields with mandatory_field set to true
        const mandatoryTrueFields = selectableFields.filter(
            (field) => field.mandatory_field === "true"
        );

        // Check if all mandatory fields with mandatory_field set to true are included in the selected filters
        const allMandatoryFieldsSelected = mandatoryTrueFields.every((field) =>
            addedFilters.some((filter) => filter.field === field.field_name)
        );

        if (!allMandatoryFieldsSelected) {
            showErrorMsg("Please select all the mandatory fields.");
            return;
        }

        // Reset the filters before adding new filters
        dispatch(resetReportFilters());
        dispatch(resetFilters());

        if (currentRoute.includes("/Reports")) {
            addedFilters.forEach((filter) => {
                dispatch(addReportFilter(filter));
            });
        } else {
            addedFilters.forEach((filter) => {
                dispatch(addFilter(filter));
            });
        }

        // dispatch(setAddedFilters([]));
        setErrorMsgSelectFields("");
        setCloseFilterBar(!closeFilterBar);
    };

    const list = (anchor) => (
        <Box
            sx={{
                width:
                    anchor === "top" || anchor === "bottom" ? "auto" : "100%",
                position: "relative",
                minHeight: "95vh",
            }}
            role="presentation"
            onClick={toggleDrawer(anchor, false)}
            onKeyDown={toggleDrawer(anchor, false)}
        >
            <Box
                sx={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                    paddingInline: "20px",
                    width: "100%",
                    minHeight: "100%",
                }}
            >
                <Box sx={{ height: "90%" }}>
                    <Box
                        sx={{
                            fontFamily: "Poppins !important",
                            fontWeight: "900",
                            display: "flex",
                            flexDirection: "row",
                            width: "100%",
                        }}
                    >
                        <Box
                            sx={{
                                backgroundColor: "white",
                                width: "100%",
                                display: "flex",
                                flexDirection: "column",
                                gap: "1rem",
                            }}
                        >
                            <Box
                                sx={{
                                    display: "flex",
                                    flexDirection: "column",
                                    gap: "0rem",
                                    paddingTop: "2rem",
                                    justifyContent: "center",
                                }}
                            >
                                <Typography
                                    sx={{
                                        fontFamily: "Poppins",
                                        color: "black",
                                        fontSize: "22px",
                                        fontWeight: "bold",
                                    }}
                                >
                                    {isItReportsPage
                                        ? "Report Filter"
                                        : "Dashboard Filter"}
                                </Typography>
                                <Typography
                                    sx={{
                                        fontFamily: "Poppins",
                                        color: "#8C9496",
                                        fontSize: "12px",
                                        fontWeight: "600",
                                    }}
                                >
                                    Filters will be applied to your {"  "}
                                    {isItReportsPage ? "report" : "dashboard"}
                                </Typography>
                            </Box>
                            {/* Accordian for filter options*/}
                            <FilterBarAccordion />
                        </Box>
                    </Box>
                    <Box>
                        {addedFilters.length > 0 && (
                            <Box
                                sx={{
                                    fontFamily: "Poppins !important",
                                    display: "flex",
                                    flexDirection: "column",
                                    gap: "0rem",
                                }}
                            >
                                <Typography
                                    sx={{
                                        fontFamily: "Poppins",
                                        color: "black",
                                        fontSize: "14px",
                                        fontWeight: "bold",
                                        margin: "1.4rem 0 0rem 0",
                                        paddingBottom: "1rem",
                                        borderBottom:
                                            "1px solid rgba(126, 128, 127,0.5)",
                                    }}
                                >
                                    Selected Filters
                                </Typography>

                                {requiredParamsLoading ? (
                                    <Box
                                        sx={{
                                            display: "flex",
                                            flexDirection: "column",
                                            fontFamily: "Open Sans",
                                            color: "#96A5B8",
                                        }}
                                    >
                                        {Array(3)
                                            .fill(1)
                                            .map((_, index) => (
                                                <Box
                                                    key={index}
                                                    sx={{
                                                        flexBasis: "100%",
                                                        display: "flex",
                                                        justifyContent:
                                                            "center",
                                                        alignItems: "center",
                                                        height: "50px", // Adjust height as per your design
                                                        background: "white",
                                                        width: "100%",
                                                    }}
                                                >
                                                    <Skeleton
                                                        variant="text"
                                                        sx={{
                                                            fontSize: "14px", // Adjust font size as per your design
                                                            width: "100%",
                                                            height: "3.5rem", // Adjust height as per your design
                                                        }}
                                                    />
                                                </Box>
                                            ))}
                                    </Box>
                                ) : (
                                    sortReportFilters(addedFilters).map(
                                        (filter, index) => (
                                            <Box
                                                key={index}
                                                sx={{
                                                    display: "flex",
                                                    flexDirection: "row",
                                                    alignItems: "center",
                                                    padding: "2px 0",
                                                    borderBottom:
                                                        "1px solid rgba(126, 128, 127,0.2)",
                                                    margin: "0",
                                                    justifyContent:
                                                        "space-between",
                                                }}
                                            >
                                                <Box
                                                    sx={{
                                                        display: "flex",
                                                        flexDirection: "row",
                                                        gap: "0.2rem",
                                                        width: "80%",
                                                        minHeight: "50px",
                                                        alignItems: "center",
                                                        paddingLeft: "5px",
                                                    }}
                                                >
                                                    <Box
                                                        sx={{
                                                            display: "flex",
                                                            gap: "5px",
                                                        }}
                                                    >
                                                        <Typography
                                                            sx={{
                                                                fontFamily:
                                                                    "Poppins",
                                                                color: "black",
                                                                fontSize:
                                                                    "13px",
                                                                fontWeight:
                                                                    "400",
                                                            }}
                                                        >
                                                            {formatFieldLabel(
                                                                filter.field
                                                            )}
                                                            {mandatoryFields.some(
                                                                (field) =>
                                                                    filter.field ===
                                                                        field.field_name &&
                                                                    field.mandatory_field ===
                                                                        "true"
                                                            ) && (
                                                                <span
                                                                    style={{
                                                                        color: "red",
                                                                        marginLeft:
                                                                            "0.2rem",
                                                                    }}
                                                                >
                                                                    *
                                                                </span>
                                                            )}
                                                        </Typography>
                                                    </Box>
                                                    <Box
                                                        sx={{
                                                            display: "flex",
                                                            gap: "5px",
                                                        }}
                                                    >
                                                        <Typography
                                                            sx={{
                                                                fontFamily:
                                                                    "Poppins",
                                                                color: "black",
                                                                fontSize:
                                                                    "16px",
                                                                fontWeight:
                                                                    "800",
                                                                paddingInline:
                                                                    "0.3rem",
                                                            }}
                                                        >
                                                            {filter.condition
                                                                ? filter.condition
                                                                : " : "}
                                                        </Typography>
                                                    </Box>
                                                    <Box
                                                        sx={{
                                                            display: "flex",
                                                            gap: "5px",
                                                        }}
                                                    >
                                                        <Typography
                                                            sx={{
                                                                fontFamily:
                                                                    "Poppins",
                                                                color: "black",
                                                                fontSize:
                                                                    "14px",
                                                                fontWeight:
                                                                    "600",
                                                            }}
                                                        >
                                                            {filter.value}
                                                        </Typography>
                                                    </Box>
                                                </Box>

                                                <IconButton
                                                    onClick={() =>
                                                        handleRemoveFilter(
                                                            filter.field
                                                        )
                                                    }
                                                >
                                                    <ClearIcon
                                                        sx={{
                                                            fontFamily:
                                                                "Poppins",
                                                            textTransform:
                                                                "capitalize",
                                                            fontSize: "25px",
                                                            fontWeight: "600",
                                                            color: "rgba(255, 69, 69, 1)",
                                                            ":hover": {
                                                                cursor: "pointer",
                                                                color: "rgba(255, 69, 69, 0.75)",
                                                            },
                                                        }}
                                                    />
                                                </IconButton>
                                            </Box>
                                        )
                                    )
                                )}
                            </Box>
                        )}
                    </Box>
                </Box>
                <Box
                    sx={{
                        display: "flex",
                        flexDirection: "column",
                        gap: "0.2rem",
                        marginTop: "1rem",
                    }}
                >
                    <Typography
                        sx={{
                            fontSize: "16px",
                            fontWeight: "800",
                            color: "red",
                            transition: "all 0.5s ease",
                        }}
                    >
                        {errorMsgSelectFields}
                    </Typography>
                    <Box
                        sx={{
                            height: "10%",
                            display: "flex",
                            gap: "1rem",
                            marginBlock: "1rem",
                        }}
                    >
                        <Button
                            onClick={handleApplyFilter}
                            variant="contained"
                            sx={{
                                fontFamily: "Poppins",

                                height: "40px",
                                width: "fit-content",
                                textTransform: "capitalize",
                                fontSize: "12px",
                                fontWeight: "900",
                                bgcolor: "rgba(18, 155, 220, 1)",
                                color: "rgba(255, 255, 255, 1)",
                                ":hover": {
                                    bgcolor: "rgba(16, 136, 196, 1)",
                                    color: "rgba(255, 255, 255, 1)",
                                },
                            }}
                        >
                            Apply Filter
                        </Button>
                        <Button
                            onClick={handleResetAll}
                            sx={{
                                fontFamily: "Poppins",
                                height: "40px",
                                width: "fit-content",
                                textTransform: "capitalize",
                                fontSize: "12px",
                                fontWeight: "900",

                                bgcolor: "inherit",
                                color: "rgba(141, 146, 149, 1)",
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center",
                            }}
                        >
                            Reset All
                        </Button>
                    </Box>
                </Box>
            </Box>
        </Box>
    );

    return (
        <div>
            {(currentRoute.includes("Reports") ||
                currentRoute.includes("Dashboard")) && <TopNavigator />}
            <HeaderDashboard
                // dashboardName={currentLocation}
                toggle={() => setIsFilterBarOpen(true)}
            />
            {currentRoute.includes("Reports") && (
                <Box
                    sx={{
                        backgroundColor: "#FAFBFC",
                        paddingTop: "1rem",
                    }}
                >
                    <ReportFilterBox toggle={() => setIsFilterBarOpen(true)} />
                    {/* <ReportFilterBox toggle={() => setIsFilterBarOpen(true)} /> */}
                </Box>
            )}
            {/* <Box
                sx={{
                    backgroundColor: "#FAFBFC",
                    paddingTop: "1rem",
                }}
            >
                <ReportFilterBox toggle={() => setIsFilterBarOpen(true)} />
            </Box> */}
            <div>
                <Drawer
                    anchor="right"
                    open={isFilterBarOpen}
                    onClose={toggleDrawer(false)}
                >
                    {list("right")}
                </Drawer>
            </div>
        </div>
    );
}
