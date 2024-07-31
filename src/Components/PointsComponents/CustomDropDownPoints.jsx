import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import {
    FormControl,
    InputLabel,
    MenuItem,
    OutlinedInput,
    Select,
} from "@mui/material";
import React from "react";

function CustomDropDownPoints({
    selectboxWidth,
    margin,
    fullPlaceHolder,
    display,
    backgroundColor,
    name,
    placeholder,
    height,
    obj,
    handleInputChange,
    fontWeight,
    fontFamily,
    option,
    value,
    width,
    sx,
    loading,
    disable,
    color
}) {
    const handleChange = (event) => {
        const selectedOption = event.target.value;
        handleInputChange(obj, selectedOption);
        console.log("Selected Option:", selectedOption);
    };

    return (
        <FormControl
            disabled={disable ? disable : false}
            sx={
                sx
                    ? sx
                    : {
                          margin: "7px 0px",
                          padding: "7px 0",

                          width: width
                              ? width
                              : {
                                    xs: "100%",
                                    sm: "200px",
                                    lg: "200px",
                                },
                      }
            }
            color={color ? color : "secondary"}
        >
            <InputLabel
                sx={{
                    display: display && display,
                    backgroundColor: backgroundColor
                        ? backgroundColor
                        : "transparent",
                    fontFamily: fontFamily
                        ? fontFamily
                        : "Public Sans !important",
                    fontWeight: fontWeight ? fontWeight : "700",
                    fontSize: "15px",
                    top: "7px !important",
                    left: "-13px !important",
                }}
                shrink
                htmlFor="bootstrap-input"
            >
                {name}
            </InputLabel>
            <Select
                displayEmpty
                IconComponent={KeyboardArrowDownIcon}
                value={value}
                onChange={handleChange}
                input={
                    <OutlinedInput
                        placeholder={placeholder || "Enter value"}
                        sx={{
                            width: selectboxWidth || "auto",
                            backgroundColor: "white",
                            margin: margin || "14px 0 0 0",
                            "&:focus": {
                                boxShadow: "rgba(25,118,210,0.25) 0 0 0 0.2rem",
                                borderColor: "#1976d2",
                            },
                            height: height ? height : "48px",
                            paddingRight: "15px",
                        }}
                    />
                }
                MenuProps={{
                    PaperProps: {
                        style: {
                            maxHeight: "130px",
                            width: "auto",
                        },
                    },
                }}
            >
                <MenuItem value="">
                    <p
                        style={{
                            color: value ? "black" : "#808080a1",
                            fontSize: "12px",
                            textTransform: "capitalize",
                            fontFamily:
                                '"Roboto","Helvetica","Arial",sans-serif',
                            fontWeight: "520",
                            margin: "2px 0 0 0",
                        }}
                    >
                        {fullPlaceHolder
                            ? fullPlaceHolder
                            : `Select ${placeholder ? placeholder : name}`}
                    </p>
                </MenuItem>

                {option.map((option, index) => (
                    <MenuItem
                        sx={{ fontSize: "14px" }}
                        key={index}
                        value={option.day || option.month}
                    >
                        {loading || option.day || option.month}
                    </MenuItem>
                ))}
            </Select>
        </FormControl>
    );
}

export default CustomDropDownPoints;
