import { FormControl, MenuItem, Select } from "@mui/material";
import { useSelector } from "react-redux";

import CircularLoader from "../CommonComponents/CircularLoader";

export default function TypePicker({ selectedType, onChange, color }) {
    const { reportTypeList, reportTypeListLoading } = useSelector(
        (state) => state.accountsReports
    );

    const handleChange = (event) => {
        const val = event.target.value.trim();
        onChange(val);
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
            color={color ? color : "secondary"}
        >
            <Select
                value={selectedType}
                onChange={handleChange}
                placeholder="Select Type"
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
                <MenuItem value={""} sx={{ color: "rgba(0,0,0,0.4)" }}>
                    select a type
                </MenuItem>
                {reportTypeList.map((branch) => (
                    <MenuItem key={branch.Id} value={branch.Name}>
                        {reportTypeListLoading ? (
                            <CircularLoader />
                        ) : (
                            branch.Name
                        )}
                    </MenuItem>
                ))}
            </Select>
        </FormControl>
    );
}
