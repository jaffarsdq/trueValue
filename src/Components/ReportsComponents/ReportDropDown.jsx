import DoneIcon from "@mui/icons-material/Done";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { Box, Button, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
    fetchReportList,
    setReportDataEmpty,
    setSelectedReport,
} from "../../Redux/Slices/Reports/ReportsSlice";
import {
    fetchReportFilters,
    setReportFilters,
} from "../../Redux/Slices/filter/filterSlice";
import CircularLoader from "../CommonComponents/CircularLoader";

const ReportDropDownOption = ({ report, isSelected, onClickHandler }) => {
    const [isHovered, setIsHovered] = useState(false);

    return (
        <Box
            sx={{
                display: "flex",
                gap: "5px",
                alignItems: "center",
                backgroundColor: isSelected
                    ? "rgba(40, 145, 250,0.16)"
                    : isHovered
                    ? "rgba(40, 145, 250,0.1)"
                    : "rgba(40, 145, 250,0.0)",
                "&:hover": {
                    backgroundColor: "rgba(40, 145, 250,0.1)",
                },
                marginBlock: "1px",
                padding: "2px 3px",
                height: "25px",
                lineHeight: "0",
                borderRadius: "3px",
                fontFamily: "Poppins",
            }}
            onClick={onClickHandler}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            {isSelected || isHovered ? (
                <DoneIcon
                    sx={{
                        fontSize: "10px",
                        color: "rgb(40, 145, 250)",
                    }}
                />
            ) : (
                <Box sx={{ width: "10px" }}></Box>
            )}
            <Typography
                sx={{
                    fontSize: "10px",
                    fontFamily: "Poppins",
                    fontWeight: "600",
                }}
            >
                {report && report.ReportName}
            </Typography>
        </Box>
    );
};

function ReportDropDown({ toggle }) {
    const dispatch = useDispatch();

    const salesReports = useSelector((state) => state.reports);
    const filters = useSelector((state) => state.dashboardFilterSlice.filters);

    let selectedReport = null;
    let isReportByIdLoading = false;
    const { reportList, reportListLoading } = useSelector(
        (state) => state.reports
    );
    selectedReport = salesReports.selectedReport;

    const [isFilterDropDownClicked, setIsFilterDropDownClicked] =
        useState(false);

    const handleReportSelect = (report) => {
        dispatch(setSelectedReport(report));
        dispatch(setReportFilters([]));
        console.log(report);
        toggle();
        dispatch(setReportDataEmpty([]));
        dispatch(fetchReportFilters(report?.ReportName));

        setIsFilterDropDownClicked(false);
    };

    useEffect(() => {
        dispatch(fetchReportList());
    }, []);

    return (
        <Button
            disabled={isReportByIdLoading}
            sx={{
                position: "relative",
                fontFamily: "poppins",
                textTransform: "none",
                color: "#151D48",
                display: "flex",
                alignItems: "center",
                width: { xs: "250px", sm: "268px", md: "300px" },
                height: "40px",
                marginLeft: "0rem",
                backgroundColor: "rgb(232,235,239,1)",
                padding: "2px 6px",
                justifyContent: "space-between",
                borderRadius: "2px",
                cursor: "pointer",
                boxShadow: "0 1px 5px rgba(0, 0, 0, 0.05)",
                "&:hover": {
                    boxShadow: "0 1px 5px rgba(0, 0, 0, 0.1)",
                    backgroundColor: "#dce1e6",
                },
                transition: "all ease 0.2s",
            }}
            // onClick={() => setIsFilterDropDownClicked(!isFilterDropDownClicked)}
            onMouseEnter={() => setIsFilterDropDownClicked(true)}
            onMouseLeave={() => setIsFilterDropDownClicked(false)}
        >
            <Box
                sx={{
                    display: "flex",
                    justifyContent: "start",
                    fontWeight: "600",
                    fontSize: { xs: "12px", md: "12px", lg: "12px" },
                }}
            >
                {reportListLoading ? (
                    <CircularLoader />
                ) : selectedReport && selectedReport.ReportName ? (
                    selectedReport.ReportName
                ) : (
                    "Select Report"
                )}
            </Box>
            <Box
                sx={{
                    marginTop: "6px",
                    transform: isFilterDropDownClicked
                        ? "translate(-50%, -25%) rotate(180deg)"
                        : "translate(-50%, 2%) rotate(0deg)",
                    transition: "transform 0.2s ease-in-out",
                }}
            >
                <KeyboardArrowDownIcon
                    className="dropDown"
                    style={{
                        fontSize: "22px",
                        fontWeight: "10px",
                        opacity: "45%",
                        transition: "all ease 0.2s",
                    }}
                />
            </Box>
            {isFilterDropDownClicked && (
                <Box
                    sx={{
                        position: "absolute",
                        top: "100%",
                        left: "0",
                        maxHeight: "200px",
                        overflowY: "scroll",
                        width: "100%",
                        boxShadow: "0 1px 10px rgba(0, 0, 0, 0.3)",
                        borderRadius: "3px",
                        backgroundColor: "white",
                        zIndex: "10",
                    }}
                >
                    <Box sx={{ padding: "2px " }}>
                        <Box
                            sx={{
                                display: "flex",
                                gap: "5px",
                                alignItems: "center",
                                margin: "2px",
                                padding: "2px 3px",
                                height: "25px",

                                borderRadius: "3px",
                                justifyContent: "center",
                            }}
                        >
                            <Typography
                                sx={{
                                    fontSize: "11px",
                                    fontWeight: "800",
                                    fontFamily: "Poppins",
                                    opacity: "50%",
                                }}
                            >
                                Select Report
                            </Typography>
                        </Box>
                        {reportList &&
                            reportList.map((report) => (
                                <ReportDropDownOption
                                    key={report.ReportId}
                                    report={report}
                                    isSelected={
                                        selectedReport &&
                                        selectedReport.ReportId ===
                                            report.ReportId
                                    }
                                    onClickHandler={() =>
                                        handleReportSelect(report)
                                    }
                                />
                            ))}
                    </Box>
                </Box>
            )}
        </Button>
    );
}

export default ReportDropDown;
