import { FormControl } from "@mui/material";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";

export default function ResponsiveDatePickers({width, color}) {
    return (
        <FormControl
            sx={{
                margin: "7px 0px",
                padding: "7px 0",
                width: {
                    xs: "100%",

                    lg:width?width: "min(100%,290px)",
                },
            }}
            color={color ? color : "secondary"}
        >
            <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DemoContainer
                    sx={{
                        width: width?width:{
                            xs: "100%",

                            lg: "min(100%,290px)",
                        },
                        margin: "0px",
                        padding: "0",
                        ".MuiInputBase-input": {
                            height: "16px",
                            backgroundColor: "white",
                        },
                    }}
                    components={[
                        "DatePicker",
                        "MobileDatePicker",
                        " ",
                        "StaticDatePicker",
                    ]}
                >
                    <DatePicker />
                </DemoContainer>
            </LocalizationProvider>
        </FormControl>
    );
}
