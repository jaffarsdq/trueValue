import {
    ArrowBackIosRounded,
    ArrowForwardIosRounded,
} from "@mui/icons-material";
import { Box, Button, Skeleton, Typography } from "@mui/material";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
    fetchReportFilters,
    setReportFilters,
} from "../../Redux/Slices/filter/filterSlice";
import {
    fetchReportList,
    setReportDataEmpty,
    setSelectedReport,
} from "../../Redux/Slices/Reports/ReportsSlice";

const ReportFilterBox = ({ toggle }) => {
    const { selectedReport, reportData, reportByIdLoading } = useSelector(
        (state) => state.reports
    );

    const { reportList, reportListLoading } = useSelector(
        (state) => state.reports
    );
    const { module, bgColors } = useSelector((state) => state.navigation);

    const [showScrollButtons, setShowScrollButtons] = useState(false);
    const containerRef = useRef(null);
    useEffect(() => {
        dispatch(fetchReportList());
    }, []);

    useEffect(() => {
        const handleResize = () => {
            if (containerRef.current) {
                const container = containerRef.current;
                setShowScrollButtons(
                    container.scrollWidth > container.clientWidth
                );
            }
        };

        const container = containerRef.current;
        if (container) {
            const resizeObserver = new ResizeObserver(handleResize);
            resizeObserver.observe(container);
            setShowScrollButtons(container.scrollWidth > container.clientWidth);

            // Return cleanup function to disconnect the ResizeObserver
            return () => {
                resizeObserver.unobserve(container);
            };
        }
    }, [containerRef.current]); // Use containerRef.current as the only dependency

    const handleScroll = (scrollOffset) => {
        const container = containerRef.current;
        if (container) {
            const newScrollLeft = container.scrollLeft + scrollOffset;
            container.scrollTo({
                left: newScrollLeft,
                behavior: "smooth",
            });
        }
    };

    useEffect(() => {
        const handleWheel = (event) => {
            const container = containerRef.current;
            if (container && event.deltaY !== 0) {
                event.preventDefault();
                container.scrollTo({
                    left: container.scrollLeft + event.deltaY,
                    behavior: "smooth",
                });
            }
        };

        const container = containerRef.current;
        if (container) {
            container.addEventListener("wheel", handleWheel);

            // Clean up the event listener on unmount
            return () => {
                container.removeEventListener("wheel", handleWheel);
            };
        }
    }, []);

    const dispatch = useDispatch();

    const handleReportSelect = (report) => {
        // if (selectedReport.ReportId === report.ReportId || reportByIdLoading) {
        //     return;
        // }
        dispatch(setSelectedReport(report));
        dispatch(setReportFilters([]));
        console.log(report);
        toggle();
        dispatch(setReportDataEmpty([]));
        dispatch(fetchReportFilters(report?.ReportName));
    };

    return (
        <Box
            sx={{
                display: "flex",
                flexDirection: { xs: "column", sm: "row" },
                paddingBlock: { xs: "0.5rem", sm: "0rem", md: "0.0rem" },
                margin: { xs: "0 1rem", lg: "0.8rem" },
                marginBlock: { lg: "0" },
                backgroundColor: "#f0f5fa",
                borderRadius: "8px",
                minHeight: "50px",
                alignItems: "center",
                paddingInline: "1rem",
                gap: "1rem",
                justifyContent: "space-between"
            }}
        >
            <Box
                sx={{
                    fontWeight: "600",
                    fontSize: "15px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: "0.2rem",
                    color: `${bgColors[module]}`,
                    width: { xs: "100%", sm: "150px", lg: "100px" },
                }}
            >
                {"Reports"}
            </Box>

            <Box
                sx={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "1rem",
                    overflow: "hidden",
                    scrollSnapAlign: "center",
                    width: { xs: "100%", sm: "80%", lg: "80%" },
                }}
            >
                <Box
                    sx={{
                        display: "flex",
                        alignItems: "center",
                        gap: "1rem",
                        bgcolor: "rgba(173, 173, 173, 0.1)",
                    }}
                >
                    {showScrollButtons && (
                        <ArrowBackIosRounded
                            sx={{
                                cursor: "pointer",
                                ":hover": {
                                    color: `${bgColors[module]}`,
                                },
                            }}
                            onClick={() => handleScroll(-200)}
                        />
                    )}
                    <Box
                        id="reports-container"
                        ref={containerRef}
                        sx={{
                            display: "flex",
                            gap: "0rem",
                            overflowX: "auto",
                            overflowY: "hidden",
                            height: "100%",
                            "&::-webkit-scrollbar": {
                                display: "none",
                            },
                            alignItems: "center",
                        }}
                    >
                        {reportListLoading
                            ? Array(7)
                                  .fill()
                                  .map((_, idx) => (
                                      <Skeleton
                                          key={idx}
                                          variant="rectangular"
                                          sx={{
                                              borderRadius: "5px",
                                              margin: "5px 5px",
                                              minWidth: "120px",
                                              height: "50px",
                                          }}
                                      />
                                  ))
                            : reportList.map((report) => (
                                  <Box
                                      disabled={reportByIdLoading}
                                      onClick={() => handleReportSelect(report)}
                                      key={report.ReportId}
                                      sx={{
                                          display: "flex",
                                          backgroundColor:
                                              selectedReport.ReportId === report.ReportId
                                                         ? `${bgColors[module]}`
                                                  : "white",
                                          borderRadius: "5px",

                                          boxShadow:
                                              selectedReport.ReportId === report.ReportId
                                                  ? " 0px 4px 10px 10px rgba(0,0,0, 0.1)"
                                                  : " 0px 4px 10px 5px rgba(0,0,0, 0.025)",
                                          color:
                                              selectedReport.ReportId === report.ReportId
                                                  ? "white"
                                                  : "black",
                                          margin: "5px 5px",
                                          minWidth: "120px",
                                          height: "50px",
                                          justifyContent: "center",
                                          alignItems: "center",
                                          ":hover": {
                                              boxShadow:
                                                  selectedReport.ReportId !==
                                                      report.ReportId &&
                                                  " 0px 4px 10px 10px rgba(0,0,0, 0.05)",
                                              cursor:
                                                  selectedReport.ReportId !==
                                                      report.ReportId && "pointer",
                                              color:
                                                  selectedReport.ReportId !==
                                                      report.ReportId &&   `${bgColors[module]}`,
                                          },
                                      }}
                                  >
                                      <Typography
                                          sx={{
                                              fontWeight: "600",
                                              fontSize: {
                                                  xs: "10px",
                                                  md: "10.5px",
                                                  lg: "12px",
                                              },
                                              textAlign: "center",
                                              textWrap: "wrap",
                                              flexWrap: "wrap",
                                              padding: "10px",
                                          }}
                                      >
                                          {report.ReportName}
                                      </Typography>
                                  </Box>
                              ))}
                    </Box>
                    {showScrollButtons && (
                        <ArrowForwardIosRounded
                            sx={{
                                cursor: "pointer",
                                ":hover": {
                                    color: `${bgColors[module]}`,
                                },
                            }}
                            onClick={() => handleScroll(200)}
                        />
                    )}
                </Box>
            </Box>
            {/* <Box>
                    <ReportDropDown toggle={toggle} />
                </Box> */}
            <Box>
                <Button
                    onClick={toggle}
                    disabled={false}
                    variant="contained"
                    color="secondary"
                    sx={{
                        height: "26px",
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
    );
};

export default ReportFilterBox;
