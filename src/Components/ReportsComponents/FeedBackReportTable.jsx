import StarIcon from "@mui/icons-material/Star";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import { Box, LinearProgress } from "@mui/material";
import { useEffect, useMemo, useState } from "react";
import DataTable from "react-data-table-component";
import { useSelector } from "react-redux";
import styled, { StyleSheetManager } from "styled-components";

import useFilteredData from "../../hooks/useFilteredData";
import displayFormattedDate from "../../Utils/displayFormattedDate";
import ConditionSelectorDropDown from "../CommonComponents/ConditionSelectorDropDown";
import CSV_ExportButton from "../CommonComponents/CSV_ExportButton";
import DropDownForTable from "../CommonComponents/DropDownForTable";
import NoDataMsg from "../CommonComponents/NoDataMsg";
import SearchInputForTable from "../CommonComponents/SearchInputForTable";

const FeedBackReportTable = () => {
    const StyledDataTable = styled(DataTable)`
        /* Internal CSS styles */
        .sc-ksBlXE.hhWvhI {
            overflow: hidden;
            white-space: normal;
            word-break: break-word;
        }
    `;

    const { selectedReport, reportData, reportByIdLoading } = useSelector(
        (state) => state.reports
    );

    const [totalRow, setTotalRow] = useState({});

    useEffect(() => {
        if (reportData && reportData.length > 0) {
            const totals = {};
            const excludedColumns = [
                "billref",
                "item_code",
                "item_desc",
                "item_unitpack",
                "bill_no",
                "Gp%",
                "Rating_Name",
                "Date",
                "Option_Name",
                "Question",
                "Rating",
                "Rating_id",
                "Rating_type",
                "Overall_Score",
            ];

            const columnNames = Object.keys(reportData[0] || {});

            columnNames.forEach((columnName, index) => {
                if (index === 0) {
                    // Add "Total values" for the first column
                    totals[columnName] = "Total values";
                    return;
                }
                if (excludedColumns.includes(columnName)) {
                    totals[columnName] = ""; // Set excluded columns to empty
                    return;
                }

                const total = reportData.reduce((acc, curr) => {
                    const value = parseFloat(curr[columnName]);
                    if (!isNaN(value)) {
                        return acc + value;
                    }
                    return acc;
                }, 0);
                totals[columnName] =
                    columnName.includes("Qty") || columnName.includes("count")
                        ? parseFloat(total.toFixed(0))
                        : parseFloat(total.toFixed(2));
            });
            setTotalRow(totals);
        }
    }, [reportData]);

    const customStyles = {
        rows: {
            style: {
                minHeight: "40px",
                fontSize: "12px",
                color: "rgba(68, 74, 109, 1)",
                paddingRight: "0px",
                paddingBlock: "5px",
            },
        },
        headRow: {
            style: {
                backgroundColor: "rgba(33, 33, 33, 0.7)",
            },
        },
        headCells: {
            style: {
                color: "white",
                fontWeight: "400",
            },
        },
        cells: {
            padding: "0",
            margin: "0",
        },
    };

    const conditionalRowStyles = [
        {
            when: (row) => row[Object.keys(row)[0]] === "Total values",
            style: {
                fontWeight: "bold",
            },
        },
    ];

    // Function to render stars based on the score
    const renderOverallScore = (score) => {
        if (isNaN(score) || score < 0) {
            score = 0;
        } else if (score > 5) {
            score = 5;
        }

        const fullStars = Math.floor(score);
        const emptyStars = 5 - fullStars;

        return (
            <>
                {Array(fullStars)
                    .fill()
                    .map((_, index) => (
                        <StarIcon
                            key={`full-${index}`}
                            sx={{ color: "gold" }}
                        />
                    ))}
                {Array(emptyStars)
                    .fill()
                    .map((_, index) => (
                        <StarBorderIcon
                            key={`empty-${index}`}
                            sx={{ color: "gold" }}
                        />
                    ))}
            </>
        );
    };

    const columns = useMemo(() => {
        const manualColumns = [
            // {
            //     name: "Count options id",
            //     columnName: "Count_options_id",
            //     selector: (row) => row["Count_options_id"],
            //     sortable: true,
            //     minWidth: "200px",
            //     cell: (row) => row["Count_options_id"],
            // },
            {
                name: "Date",
                columnName: "Date",
                selector: (row) => row["Date"],
                sortable: true,
                minWidth: "200px",
                cell: (row) => displayFormattedDate(row["Date"]),
            },
            {
                name: "Question",
                columnName: "Question",
                selector: (row) => row["Question"],
                sortable: true,
                minWidth: "200px",
            },
            // {
            //     name: "Rating ID",
            //     columnName: "Rating_id",
            //     selector: (row) => row["Rating_id"],
            //     sortable: true,
            //     minWidth: "150px",
            // },
            {
                name: "Rating",
                columnName: "Rating",
                selector: (row) => row["Rating"],
                sortable: true,
                minWidth: "150px",
            },
            {
                name: "Rating Type",
                columnName: "Rating_type",
                selector: (row) => row["Rating_type"],
                sortable: true,
                minWidth: "150px",
                cell: (row) => (
                    <div style={{ display: "flex", alignItems: "center" }}>
                        {row["Rating_type"] === "Star" ? (
                            <StarIcon sx={{ color: "gold" }} />
                        ) : (
                            "😊"
                        )}
                    </div>
                ),
            },
            // {
            //     name: "Score",
            //     columnName: "Score",
            //     selector: (row) => row["Score"],
            //     sortable: true,
            //     minWidth: "100px",
            //     right: true,
            // },
            {
                name: "Grand Total",
                columnName: "Grand_Total",
                selector: (row) => row["Grand_Total"],
                sortable: true,
                minWidth: "150px",
                right: true,
            },
            {
                name: "Overall Score",
                columnName: "Overall_Score",
                selector: (row) => row["Overall_Score"],
                sortable: true,
                minWidth: "150px",
                right: true,
                cell: (row) => (
                    <div style={{ display: "flex", alignItems: "center" }}>
                        {renderOverallScore(row["Overall_Score"])}
                    </div>
                ),
            },
        ];

        return manualColumns.map((column) => ({
            ...column,
            cell: column.cell || ((row) => column.selector(row)), // Default cell render if not custom
        }));
    }, [conditionalRowStyles]);

    const {
        condition,
        filteredData,
        selectedColumn,
        selectedColumnName,
        filterText,
        setFilterText,
        columnOptions,
        options,
        handleColumnChange,
        handleConditionChange,
    } = useFilteredData(reportData, columns);

    const concatedReportData = filteredData
        ? [...filteredData]
        : reportData && [...reportData];

    return (
        <div style={{ width: "98%", margin: "0 auto", marginBottom: "3rem" }}>
            {!reportByIdLoading ? (
                reportData.length > 0 ? (
                    <>
                        <Box
                            sx={{
                                display: "flex",
                                flexDirection: { xs: "column", sm: "row" },
                                justifyContent: { xs: "center", sm: "end" },
                                padding: "0.5rem",
                                gap: "0.5rem",
                            }}
                        >
                            <DropDownForTable
                                value={selectedColumn || ""}
                                onChange={handleColumnChange}
                                columnOptions={columnOptions}
                                selectedColumnName={selectedColumnName}
                            />
                            <ConditionSelectorDropDown
                                disable={typeof options[0] != "number"}
                                value={condition}
                                onChange={handleConditionChange}
                                selectedColumnName={condition}
                            />
                            <SearchInputForTable
                                filterText={filterText}
                                onFilter={(e, value) =>
                                    setFilterText(e.target.value || value)
                                }
                                options={options}
                                placeholder={`Search by ${selectedColumnName}`}
                            />
                            <CSV_ExportButton
                                data={concatedReportData}
                                fileName={selectedReport.ReportName}
                            />
                        </Box>
                        <StyleSheetManager
                            shouldForwardProp={(prop) => prop !== "sortActive"}
                        >
                            <StyledDataTable
                                direction="ltr"
                                highlightOnHover
                                noHeader
                                pagination
                                responsive
                                subHeaderAlign="right"
                                subHeaderWrap
                                columns={columns}
                                data={concatedReportData}
                                customStyles={customStyles}
                                conditionalRowStyles={conditionalRowStyles}
                            />
                        </StyleSheetManager>
                    </>
                ) : (
                    <NoDataMsg />
                )
            ) : (
                <LinearProgress color="secondary" />
            )}
        </div>
    );
};

export default FeedBackReportTable;
