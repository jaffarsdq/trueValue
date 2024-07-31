//TransactionHistoryTable

import { Box } from "@mui/material";
import { useEffect, useMemo, useState } from "react";
import KitchenSinkStory from "react-data-table-component";
import styled, { StyleSheetManager } from "styled-components";

import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import useFilteredData from "../../../../hooks/useFilteredData";
import CSV_ExportButton from "../../../CommonComponents/CSV_ExportButton";
import ConditionSelectorDropDown from "../../../CommonComponents/ConditionSelectorDropDown";
import DropDownForTable from "../../../CommonComponents/DropDownForTable";
import SearchInputForTable from "../../../CommonComponents/SearchInputForTable";

const StyledKitchenSinkStory = styled(KitchenSinkStory)`
    /* Internal CSS styles */
    .sc-eDVOW.ftzeFU {
        overflow: hidden;
        white-space: normal;
        word-break: break-word;
    }
`;
const TransactionHistoryTable = () => {
    const reportData = [
        {
            id: 1,
            Mobile: "1234567890",
            "First Name": "John",
            "Last Name": "Doe",
            Gender: "Male",
            Location: "Main branch",
            Quantity: "15",
            "Bill Amount": "150 AED",
        },
        {
            id: 2,
            Mobile: "9876543210",
            "First Name": "Jane",
            "Last Name": "Smith",
            Gender: "Female",
            Location: "Main branch",
            Quantity: "20",
            "Bill Amount": "230 AED",
        },
        // Add more dummy rows here...
    ];
    const [totalRow, setTotalRow] = useState({});

    useEffect(() => {
        if (reportData && reportData.length > 0) {
            const totals = {};
            const excludedColumns = [
                "group_code",
                "sub_group",
                "sub_subgroup",
                "supp_code",
                "supp_name",
                "brand_id",
                "barcode",
                "item_code",
                "item_ref",
                "item_des",
                "pack_id",
                "packing",
                "group_name",
                "margin%",
                "sub_sub_group",
                "supplier_code",
                "unit_pack_id",
                "supplier_name",
                "Mobile",
                "First Name",
                "Last Name",
                "Location",
                "Gender",
                "Location",
                // "Quantity",
                // "Bill Amount",
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
                totals[columnName] = total.toFixed(2); // Keep total as a string with two decimal places
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

    const columns = useMemo(() => {
        const manualColumns = [
            {
                name: "ID",
                columnName: "id",
                selector: (row) => row["id"],
                sortable: true,
            },
            {
                name: "Mobile",
                columnName: "Mobile",
                selector: (row) => row["Mobile"],
                sortable: true,
            },
            {
                name: "First Name",
                columnName: "First Name",
                selector: (row) => row["First Name"],
                sortable: true,
            },
            {
                name: "Last Name",
                columnName: "Last Name",
                selector: (row) => row["Last Name"],
                sortable: true,
            },
            {
                name: "Gender",
                columnName: "Gender",
                selector: (row) => row["Gender"],
                sortable: true,
            },
            {
                name: "Location",
                columnName: "Location",
                selector: (row) => row["Location"],
                sortable: true,
            },
            {
                name: "Quantity",
                columnName: "Quantity",
                selector: (row) => row["Quantity"],
                sortable: true,
            },
            {
                name: "Bill Amount",
                columnName: "Bill Amount",
                selector: (row) => row["Bill Amount"],
                sortable: true,
            },
            {
                name: "Action",
                columnName: "Action",
                selector: (row) => (
                    <Box
                        sx={{
                            marginTop: "auto",
                            display: "flex",
                            alignItems: "center",
                            gap: "20px",
                        }}
                    >
                        <EditIcon
                            sx={{
                                color: "#A42ED7",
                                cursor: "pointer",
                                ":hover": {
                                    color: "#DCAEF0",
                                },
                            }}
                        />
                        <DeleteIcon
                            sx={{
                                color: "#A42ED7",
                                cursor: "pointer",
                                ":hover": {
                                    color: "#DCAEF0",
                                },
                            }}
                        />
                    </Box>
                ),
                sortable: false,
                left: true,
            },
        ];

        return manualColumns.map((column) => ({
            ...column,
            cell: (row) => {
                const value = column.selector(row);

                return (
                    <div
                        style={{
                            display: "flex",
                            backgroundColor: "inherit",
                        }}
                    >
                        {value}
                    </div>
                );
            },
        }));
    }, [conditionalRowStyles]);

    //used custom hook to filter data with state and funcitonality
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
            {reportData.length > 0 && (
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
                            disable={isNaN(Number(options[0]))}
                            value={condition}
                            onChange={handleConditionChange}
                            selectedColumnName={condition}
                        />
                        <SearchInputForTable
                            filterText={filterText}
                            onFilter={(e, value) => {
                                if (e && e.target && e.target.value) {
                                    // Check if e, e.target, and e.target.value are defined
                                    setFilterText(e.target.value || value);
                                } else {
                                    setFilterText(value);
                                }
                            }}
                            options={options}
                            placeholder={`Search by ${selectedColumnName}`}
                        />
                        <CSV_ExportButton
                            data={concatedReportData}
                            fileName={""}
                        />
                    </Box>
                    <StyleSheetManager
                        shouldForwardProp={(prop) => prop !== "sortActive"}
                    >
                        <StyledKitchenSinkStory
                            direction="ltr"
                            highlightOnHover
                            noHeader
                            sortable
                            pagination
                            responsive
                            subHeaderAlign="right"
                            subHeaderWrap
                            columns={columns}
                            data={concatedReportData}
                            customStyles={customStyles}
                            conditionalRowStyles={conditionalRowStyles} // Apply conditional row styles
                        />
                    </StyleSheetManager>
                </>
            )}
        </div>
    );
};

export default TransactionHistoryTable;