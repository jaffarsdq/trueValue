import { Box, LinearProgress } from "@mui/material";
import { useEffect, useMemo, useState } from "react";
import KitchenSinkStory from "react-data-table-component";
import { useSelector } from "react-redux";
import styled, { StyleSheetManager } from "styled-components";

import useFilteredData from "../../hooks/useFilteredData";
import displayFormattedDate from "../../Utils/displayFormattedDate";
import ConditionSelectorDropDown from "../CommonComponents/ConditionSelectorDropDown";
import CSV_ExportButton from "../CommonComponents/CSV_ExportButton";
import DropDownForTable from "../CommonComponents/DropDownForTable";
import NoDataMsg from "../CommonComponents/NoDataMsg";
import SearchInputForTable from "../CommonComponents/SearchInputForTable";
// import createSortFunction from "../Utils/";
// import LinearIndeterminate from "../Components/CommonComponents/loader";

const FeedBackSummaryTable = () => {
    const StyledKitchenSinkStory = styled(KitchenSinkStory)`
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

    // const { requiredParams } = useSelector((state) => state.salesReportsSlice);
    // const isReportByIdLoading = false;

    const [totalRow, setTotalRow] = useState({});

    useEffect(() => {
        if (reportData && reportData.length > 0) {
            const totals = {};
            const excludedColumns = [
                // bill_no

                "Name",
                "Cust_code",
                "email",
            ];

            const columnNames = Object.keys(reportData[0] || {});

            columnNames.forEach((columnName, index) => {
                if (index === 0) {
                    // Add "Total values" for the first column
                    totals[columnName] = "Total values";
                    return;
                }
                if (excludedColumns.includes(columnName)) {
                    totals[columnName] = ""; // Set excluded columns to 0 or empty
                    return;
                }

                const total = reportData.reduce((acc, curr) => {
                    const value = parseFloat(curr[columnName]);
                    // Check if value is a number and doesn't start with '0'
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

    // Define customStyles outside of useMemo
    const customStyles = {
        rows: {
            style: {
                minHeight: "40px",
                fontSize: "12px",
                fontColor: "rgba(68, 74, 109, 1)",
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

    // Define conditional row styles to apply bold font weight to the total values row
    const conditionalRowStyles = [
        {
            when: (row) => row[Object.keys(row)[0]] === "Total values", // Apply styles when the first column value is "Total values"
            style: {
                fontWeight: "bold", // Make the font bold for the total values row
            },
        },
    ];

    // Construct columns
    const columns = useMemo(() => {
        // bill_no

        // billref
        // item_code
        // item_desc
        // item_unitpack

        const manualColumns = [
            {
                name: "Date",
                columnName: "Date",
                selector: (row) => row["Date"],
                sortable: true,
                minWidth: "200px",
            },
            {
                name: "Rating ID",
                columnName: "Rating_id",
                selector: (row) => row["Rating_id"],
                sortable: true,
                minWidth: "150px",
            },
            {
                name: "Questions",
                columnName: "Questions",
                selector: (row) => row["Questions"],
                sortable: true,
                minWidth: "200px",
            },
            {
                name: "Feedback",
                columnName: "Feedback",
                selector: (row) => row["Feedback"],
                sortable: true,
                minWidth: "200px",
            },
            {
                name: "Rating Type",
                columnName: "Rating_type",
                selector: (row) => row["Rating_type"],
                sortable: true,
                minWidth: "150px",
            },
            {
                name: "Count Options ID",
                columnName: "Count_options_id",
                selector: (row) => row["Count_options_id"],
                sortable: true,
                minWidth: "150px",
            },
            {
                name: "Score",
                columnName: "Score",
                selector: (row) => row["Score"],
                sortable: true,
                minWidth: "100px",
                right: true,
            },
            {
                name: "Overall Score",
                columnName: "Overall_Score",
                selector: (row) => row["Overall_Score"],
                sortable: true,
                minWidth: "150px",
                right: true,
            },
            {
                name: "% of Score",
                columnName: "% of score",
                selector: (row) => row["% of score"],
                sortable: true,
                minWidth: "150px",
                right: true,
            },
        ];

        return manualColumns.map((column) => ({
            ...column,
            cell: (row) => {
                const value = column.selector(row);

                let renderedValue = value;
                if (
                    column.name.toLowerCase().includes("qty") ||
                    column.name.toLowerCase().includes("quantity") ||
                    column.name.toLowerCase().includes("no") ||
                    column.name.toLowerCase().includes("count")
                ) {
                    // If it's numeric and the column name includes "Qty" or "count", format it to fixed 0
                    renderedValue = value;
                } else if (
                    column.name.toLowerCase().includes("amt") ||
                    column.name.toLowerCase().includes("amount") ||
                    column.name.toLowerCase().includes("gp") ||
                    column.name.toLowerCase().includes("cash") ||
                    column.name.toLowerCase().includes("credit_card") ||
                    column.name.toLowerCase().includes("retail") ||
                    column.name.toLowerCase().includes("sales") ||
                    column.name.toLowerCase().includes("gross") ||
                    column.name.toLowerCase().includes("chq") ||
                    column.name.toLowerCase().includes("cost")
                ) {
                    // If it's numeric and the column name includes "amt" or "cost", format it to fixed 2
                    renderedValue = value;
                } else if (column.name.toLowerCase().includes("date")) {
                    renderedValue = displayFormattedDate(value);
                } else if (
                    column.name.toLowerCase().includes("id") ||
                    column.name.toLowerCase().includes("code")
                ) {
                    // If it starts with '0' and is not a decimal
                    renderedValue = value; // Leave it as is
                }

                return (
                    <div
                        style={{
                            display: "flex",
                            // paddingRight: "0.5rem",
                            // paddingLeft: "0.5rem",
                            fontWeight: conditionalRowStyles.some((style) =>
                                style.when(row)
                            )
                                ? "bold"
                                : "normal",
                        }}
                    >
                        {renderedValue}
                    </div>
                );
            },
        }));
    }, [conditionalRowStyles]);

    // used custom hook to filter data with state and funcitonality
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
        ? [...filteredData, totalRow]
        : reportData && [...reportData, totalRow];

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
                            <StyledKitchenSinkStory
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
                                // onSort={onSort}
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

export default FeedBackSummaryTable;