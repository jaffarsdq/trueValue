import { FormControl } from "@mui/material";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import dayjs from "dayjs";

function ResponsiveDatePickers({
    dateFormat,
    obj,
    FormatValues,
    handleInputChange,
    Height,
    Width,
    Format,
    Margin,
    value,
    color
}) {
    const handleDateChange = (date) => {
        if (date && date.isValid()) {
            handleInputChange(obj, date.format(dateFormat));
        } else {
            handleInputChange(obj, null);
        }
    };

    return (
        <FormControl
            sx={{
                padding: Margin ? Margin : "7px 0",
                width: Width ? Width : "100%",
            }}
            color={color ? color : "secondary"}
        >
            <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DemoContainer
                    sx={{
                        width: "100%",
                        overflow: "hidden",
                        ".MuiInputBase-input": {
                            height: Height ? Height : "5px",
                            backgroundColor: "white",
                        },
                    }}
                    components={["DatePicker"]}
                >
                    <DatePicker
                        format={Format ? Format : "MM/DD"}
                        sx={{ width: "100%" }}
                        onChange={handleDateChange}
                        value={value ? dayjs(value, dateFormat) : null}
                        views={FormatValues ? FormatValues : ["day"]}
                    />
                </DemoContainer>
            </LocalizationProvider>
        </FormControl>
    );
}

export default ResponsiveDatePickers;
