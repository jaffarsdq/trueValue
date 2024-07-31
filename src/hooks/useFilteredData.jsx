import { useEffect, useMemo, useState } from "react";

function useFilteredData(reportData, columns) {
    const [selectedColumn, setSelectedColumn] = useState(null);
    const [selectedColumnName, setSelectedColumnName] = useState("");
    const [filterText, setFilterText] = useState("");
    const [filteredData, setFilteredData] = useState(null);
    const [condition, setCondition] = useState("");

    useEffect(() => {
        if (!filterText) {
            setFilteredData(null);
            return;
        }

        const lowerCaseFilter = filterText.toLowerCase();

        const filtered = reportData.filter((item) => {
            if (selectedColumn) {
                const columnValue = item[selectedColumn];

                if (columnValue !== undefined && columnValue !== null) {
                    // Check if columnValue is defined and not null
                    if (!isNaN(Number(columnValue)) && condition) {
                        const filterNumber = parseFloat(filterText);

                        switch (condition) {
                            case "=":
                                return columnValue == filterNumber;
                            case "<":
                                return columnValue < filterNumber;
                            case ">":
                                return columnValue > filterNumber;
                            case "<=":
                                return columnValue <= filterNumber;
                            case ">=":
                                return columnValue >= filterNumber;
                            default:
                                return true;
                        }
                    } else {
                        return columnValue
                            .toString()
                            .toLowerCase()
                            .includes(lowerCaseFilter);
                    }
                } else {
                    return false; // Return false if columnValue is null or undefined
                }
            } else {
                return Object.values(item).some(
                    (value) =>
                        value &&
                        value.toString().toLowerCase().includes(lowerCaseFilter)
                );
            }
        });

        setFilteredData(filtered);
    }, [filterText, reportData, selectedColumn, condition]);

    const columnOptions = useMemo(() => {
        return columns.map((column) => ({
            name: column.name,
            option: column.columnName,
        }));
    }, [columns]);

    const options = useMemo(() => {
        return (
            (typeof reportData != "string" &&
                reportData &&
                selectedColumn &&
                reportData
                    .map((item) => item[selectedColumn])
                    .reduce((unique, value) => {
                        if (value !== undefined && !unique.includes(value)) {
                            unique.push(value);
                        }
                        return unique;
                    }, [])
                    .sort((a, b) => {
                        if (!isNaN(Number(a)) && !isNaN(Number(b))) {
                            return a - b;
                        } else if (typeof a === "number") {
                            return -1;
                        } else if (typeof b === "number") {
                            return 1;
                        } else {
                            return a.localeCompare(b);
                        }
                    })) ||
            []
        );
    }, [reportData, selectedColumn]);

    const handleColumnChange = (value) => {
        const selectedValue = value;

        const selectedOption = columnOptions.find(
            (option) => option.option === selectedValue
        );
        if (selectedOption) {
            setSelectedColumn(selectedValue);
            setSelectedColumnName(selectedOption.name);
        }
    };

    const handleConditionChange = (condition) => {
        setCondition(condition);
    };

    return {
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
    };
}

export default useFilteredData;
