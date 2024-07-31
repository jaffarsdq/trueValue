import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import {
    Accordion,
    AccordionDetails,
    AccordionSummary,
    Box,
    Button,
    FormControl,
    MenuItem,
    OutlinedInput,
    Select,
    Typography,
} from "@mui/material";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import dayjs from "dayjs";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import CustomMonthPicker from "../Components/CommonComponents/CustomMonthPicker";
import CustomYearPicker from "../Components/CommonComponents/customYearPicker";
import LocationPicker from "../Components/CommonComponents/LocationPicker";
import TypePicker from "../Components/CommonComponents/TypePicker";
import {
    addField,
    addValue,
    setAddedFilters,
} from "../Redux/Slices/filter/filterSlice";
import formatFieldLabel from "../Utils/formatFieldLabel";

function FilterBarAccordion() {
    const dispatch = useDispatch();
    const field = useSelector((state) => state.dashboardFilterSlice.field);

    const value = useSelector((state) => state.dashboardFilterSlice.value);
    const addedFilters = useSelector(
        (state) => state.dashboardFilterSlice.addedFilters
    );
    const selectableFields = useSelector(
        (state) => state.dashboardFilterSlice.selectableFields
    );

    const [errorMsg, setErrorMsg] = useState("");
    const [isFocused, setIsFocused] = useState(false);
    const addedFieldNames = addedFilters.map((filter) => filter.field);
    const updatedSelectableFields = selectableFields.filter(
        (field) => !addedFieldNames.includes(field.field_name)
    );
    console.log(updatedSelectableFields, "check the selected fields");
    const handleFieldChange = (event) => {
        dispatch(addField(event.target.value));
    };

    const handleDateValueChange = (data) => {
        dispatch(addValue(data));
    };

    const handleYearChange = (year) => {
        dispatch(addValue(year));
    };

    const handleMonthChange = (month) => {
        dispatch(addValue(month));
    };

    const handleLocIdChange = (loc_id) => {
        dispatch(addValue(loc_id));
    };
    const handleTypeChange = (type) => {
        dispatch(addValue(type));
    };

    const handleValueChange = (e) => {
        dispatch(addValue(e.target.value));
    };

    const showErrorMsg = (message) => {
        setErrorMsg(message);

        // Set a timeout to remove the error message after 2 seconds
        setTimeout(() => {
            setErrorMsg("");
        }, 2000);
    };
    const showAutoFocus = () => {
        setIsFocused(true);

        // Set a timeout to remove the error message after 2 seconds
        setTimeout(() => {
            setIsFocused(false);
        }, 5000);
    };

    const handleAddFilter = () => {
        if (field) {
            let newFilter = {};
            const selectedField = selectableFields.find(
                (item) => item.field_name === field
            );
            const isMandatory =
                selectedField && selectedField.mandatory_field === "true";

            if (field.toLowerCase().includes("date")) {
                if (value) {
                    const formattedDate = dayjs(value).format("DD-MM-YYYY");
                    newFilter = {
                        field: field,
                        value: formattedDate.toString(), // Convert value to string
                        mandatory: isMandatory, // Set the mandatory flag dynamically
                    };
                    dispatch(setAddedFilters([...addedFilters, newFilter]));
                    dispatch(addField(""));
                    dispatch(addValue(""));
                } else {
                    showErrorMsg("Please select the fields.");
                }
            } else {
                if (value !== "") {
                    // Check if value is not empty or field is 'loc_id'
                    newFilter = {
                        field: field,
                        value: value.toString(), // Convert value to string
                        mandatory: isMandatory, // Set the mandatory flag dynamically
                    };
                    dispatch(setAddedFilters([...addedFilters, newFilter]));
                    dispatch(addField(""));
                    dispatch(addValue(""));
                } else {
                    showErrorMsg("Please select the fields.");
                }
            }
            if (updatedSelectableFields.length > 1) showAutoFocus();
        } else {
            if (updatedSelectableFields.length <= 1) {
                showErrorMsg("All the filters have been selected.");
            } else {
                showErrorMsg("Please select the fields.");
            }
        }
    };

    console.log(field, "val");

    const isDateField = field && field.toLowerCase().includes("date");
    const isMonthField = field && field.toLowerCase().includes("month");
    const isYearField = field && field.toLowerCase().includes("year");
    const isLocField = field && field.toLowerCase().includes("loc_id");
    const isTypeField = field && field.toLowerCase().includes("type");

    const CustomDatePickerInput = ({ value, onClick }) => (
        <input
            type="text"
            value={value}
            onClick={onClick}
            style={{ width: "296px", height: "50px" }} // Adjust the dimensions here
        />
    );

    return (
        <Accordion>
            <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1-content"
                id="panel1-header"
            >
                <Typography
                    sx={{
                        fontFamily: "Poppins",
                        color: "black",
                        fontSize: "14px",
                        fontWeight: "400",
                    }}
                >
                    Filter Options
                </Typography>
            </AccordionSummary>
            <AccordionDetails>
                <Box
                    sx={{
                        display: "flex",
                        flexDirection: "column",
                        gap: "0.8rem",
                    }}
                >
                    <Box>
                        <Typography
                            sx={{
                                fontFamily: "Poppins",
                                color: "black",
                                fontSize: "14px",
                                fontWeight: "600",
                            }}
                        >
                            Field
                        </Typography>
                        <FormControl sx={{ marginTop: 1, width: "100%" }}>
                            <Select
                                style={{ height: "40px" }}
                                autoFocus={isFocused ? true : false}
                                value={field}
                                onChange={handleFieldChange}
                                displayEmpty
                                inputProps={{
                                    "aria-label": "Without label",
                                }}
                            >
                                <MenuItem value="">
                                    <em>None</em>
                                </MenuItem>
                                {updatedSelectableFields.map((field) => (
                                    <MenuItem
                                        key={field.field_name}
                                        value={field.field_name}
                                        sx={{
                                            fontSize: "17px",
                                            fontWeight: "600",
                                        }}
                                    >
                                        {/* field_name:"from_loc"
field_value:"1"
mandatory_field:"true" */}
                                        {formatFieldLabel(field.field_name)}
                                        {field.mandatory_field === "true"
                                            ? "*"
                                            : ""}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </Box>

                    {isDateField ? (
                        <Box>
                            <Typography
                                sx={{
                                    fontFamily: "Poppins",
                                    color: "black",
                                    fontSize: "14px",
                                    fontWeight: "600",
                                    marginBottom: "5px",
                                }}
                            >
                                {formatFieldLabel(field) || "Date"}
                            </Typography>
                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                                <DatePicker
                                    sx={{
                                        width: "296px",
                                        ".MuiInputBase-input": {
                                            height: "5px",
                                        },
                                    }}
                                    selected={value}
                                    onChange={(date) =>
                                        handleDateValueChange(date)
                                    }
                                    customInput={<CustomDatePickerInput />}
                                />
                            </LocalizationProvider>
                        </Box>
                    ) : isYearField ? (
                        <Box>
                            <Typography
                                sx={{
                                    fontFamily: "Poppins",
                                    color: "black",
                                    fontSize: "14px",
                                    fontWeight: "600",
                                    marginBottom: "5px",
                                }}
                            >
                                {formatFieldLabel(field) || "Year"}
                            </Typography>
                            <CustomYearPicker
                                selectedYear={value}
                                onChange={(year) => handleYearChange(year)}
                            />
                        </Box>
                    ) : isMonthField ? (
                        <Box>
                            <Typography
                                sx={{
                                    fontFamily: "Poppins",
                                    color: "black",
                                    fontSize: "14px",
                                    fontWeight: "600",
                                    marginBottom: "5px",
                                }}
                            >
                                {formatFieldLabel(field) || "Month"}
                            </Typography>
                            <CustomMonthPicker
                                selectedMonth={value}
                                onChange={(month) => handleMonthChange(month)}
                            />
                        </Box>
                    ) : isLocField ? (
                        <Box>
                            <Typography
                                sx={{
                                    fontFamily: "Poppins",
                                    color: "black",
                                    fontSize: "14px",
                                    fontWeight: "600",
                                    marginBottom: "5px",
                                }}
                            >
                                {formatFieldLabel(field) || "Aging Days"}
                            </Typography>
                            <LocationPicker
                                selectedAgingDays={value}
                                onChange={(loc_id) => handleLocIdChange(loc_id)}
                            />
                        </Box>
                    ) : isTypeField ? (
                        <Box>
                            <Typography
                                sx={{
                                    fontFamily: "Poppins",
                                    color: "black",
                                    fontSize: "14px",
                                    fontWeight: "600",
                                    marginBottom: "5px",
                                }}
                            >
                                {formatFieldLabel(field) || "Type"}
                            </Typography>
                            <TypePicker
                                selectedType={value}
                                onChange={(type) => handleTypeChange(type)}
                            />
                        </Box>
                    ) : (
                        <Box
                            sx={{
                                display: "flex",
                                gap: "1rem",
                            }}
                        >
                            <Box>
                                <Typography
                                    sx={{
                                        fontFamily: "Poppins",
                                        color: "black",
                                        fontSize: "14px",
                                        fontWeight: "600",
                                        marginBottom: "5px",
                                    }}
                                >
                                    {formatFieldLabel(field) || "Value"}
                                </Typography>

                                <FormControl
                                    variant="standard"
                                    sx={{
                                        width: "296px",
                                    }}
                                >
                                    <OutlinedInput
                                        placeholder={
                                            field === "company_code" ||
                                            field === "div_no"
                                                ? "01"
                                                : "001"
                                        }
                                        style={{ height: "40px" }}
                                        type="text"
                                        value={value}
                                        onChange={handleValueChange}
                                        disabled={!field}
                                    />
                                </FormControl>
                            </Box>
                        </Box>
                    )}
                    <Typography
                        sx={{
                            fontSize: "16px",
                            fontWeight: "800",
                            color: "red",
                            transition: "all 0.5s ease",
                        }}
                    >
                        {errorMsg}
                    </Typography>
                    <Box
                        sx={{
                            display: "flex",
                            justifyContent: "end",
                        }}
                    >
                        <Button
                            onClick={handleAddFilter}
                            variant="contained"
                            sx={{
                                fontFamily: "Poppins",
                                height: "30px",
                                width: "fit-content",
                                textTransform: "capitalize",
                                fontSize: "12px",
                                fontWeight: "400",
                                bgcolor: "rgba(18, 155, 220, 1)",
                                color: "rgba(255, 255, 255, 1)",
                                ":hover": {
                                    bgcolor: "rgba(16, 136, 196, 1)",
                                    color: "rgba(255, 255, 255, 1)",
                                },
                            }}
                        >
                            Add Filter
                        </Button>
                    </Box>
                </Box>
            </AccordionDetails>
        </Accordion>
    );
}

export default FilterBarAccordion;
