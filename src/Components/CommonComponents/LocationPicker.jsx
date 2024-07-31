import { FormControl, MenuItem, Select } from "@mui/material";
import { useEffect, useState } from "react"; // Import useState hook
import { useSelector } from "react-redux";

export default function LocationPicker({ selectedAgingDays, onChange }) {
    const { locationList } = useSelector((state) => state.reqParamsDashboard);

    // State to hold sorted location list
    const [sortedLocationList, setSortedLocationList] = useState([]);

    useEffect(() => {
        // Sort the location list whenever it changes
        const customSort = (a, b) => {
            if (a.br_code === "All") return -1;
            if (b.br_code === "All") return 1;
            return parseInt(a.br_code) - parseInt(b.br_code);
        };

        const sortedList = [...locationList].sort(customSort);
        setSortedLocationList(sortedList);
    }, [locationList]);

    const handleChange = (event) => {
        onChange(event.target.value);
    };

    return (
        <FormControl
            sx={{
                width: "296px",
                ".MuiInputBase-input": {
                    height: "5px",
                },
                ".MuiSelect-select": {
                    height: "10px", // Adjust the height here
                },
            }}
        >
            <Select
                value={selectedAgingDays}
                onChange={handleChange}
                placeholder="Select Aging Days"
                style={{ height: "40px", width: "100%" }}
                MenuProps={{
                    PaperProps: {
                        style: {
                            maxHeight: "150px", // Adjust the maximum height of the popup menu
                        },
                    },
                    anchorOrigin: {
                        vertical: "bottom",
                        horizontal: "left",
                    },
                    transformOrigin: {
                        vertical: "top",
                        horizontal: "left",
                    },
                }}
            >
                {sortedLocationList.map((branch) => (
                    <MenuItem key={branch.br_code} value={branch.br_code}>
                        {branch.br_code}
                    </MenuItem>
                ))}
            </Select>
        </FormControl>
    );
}
