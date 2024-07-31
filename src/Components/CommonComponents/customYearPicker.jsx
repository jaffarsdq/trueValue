import { FormControl, MenuItem, Select } from "@mui/material";

// Function to generate an array of years for the select component
const generateYearOptions = (startYear, endYear) => {
    const years = [];
    for (let year = endYear; year >= startYear; year--) {
        years.push(year);
    }
    return years;
};

const CustomYearPicker = ({ selectedYear, onChange, color }) => {
    // Define the range of years you want to display
    const startYear = 1900;
    const endYear = new Date().getFullYear(); // Current year

    // Generate the array of years
    const yearOptions = generateYearOptions(startYear, endYear);

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
            color={color ? color : "secondary"}
        >
            <Select
                labelId="year-select-label"
                id="year-select"
                value={selectedYear}
                onChange={(e) => onChange(e.target.value)}
                MenuProps={{
                    PaperProps: {
                        style: {
                            maxHeight: "100px", // Adjust the maximum height of the popup menu
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
                {yearOptions.map((year) => (
                    <MenuItem key={year} value={year}>
                        {year}
                    </MenuItem>
                ))}
            </Select>
        </FormControl>
    );
};

export default CustomYearPicker;
