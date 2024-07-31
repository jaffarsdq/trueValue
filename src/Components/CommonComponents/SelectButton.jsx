import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import {
    FormControl,
    FormHelperText,
    InputLabel,
    MenuItem,
    OutlinedInput,
    Select,
    Typography,
} from "@mui/material";

function SelectButton({
    backgroundColor,
    name,
    placeholder,
    obj,
    handleInputChange,
    fontWeight,
    fontFamily,
    option,
    display,
    value,
    width,
    sx,
    height,
    error,
    helperText,
    margin,
    color
}) {
    const handleChange = (event) => {
        console.log(event, "event", obj,event.target.value)
        const selectedOption = event.target.value;
        handleInputChange(obj, selectedOption);
    };

    console.log(option, "options.....")

    return (
        <FormControl
            sx={
                sx
                    ? sx
                    : {
                          margin: "7px 0px",
                          padding: "4px 0",
                          width: width
                              ? width
                              : {
                                    xs: "100%",
                                },
                          height: "30px",
                      }
            }
            color={color ? color : "secondary"}
            error={error} // Set error state
        >
            <InputLabel
                sx={{
                    display: display && display,
                    backgroundColor: backgroundColor
                        ? backgroundColor
                        : "#FAFAFB",
                    fontFamily: fontFamily ? fontFamily : "Poppins !important",
                    fontWeight: fontWeight ? fontWeight : "700",
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
                        placeholder={placeholder || "Enter type"}
                        sx={{
                            backgroundColor: "white",
                            margin: margin ? margin : "14px 0 0 0",
                            "&:focus": {
                                boxShadow: "rgba(25,118,210,0.25) 0 0 0 0.2rem",
                                borderColor: "#1976d2",
                            },
                            height: height ? height : "38px",
                            paddingRight: "15px",
                        }}
                    />
                }
                MenuProps={{
                    PaperProps: {
                        style: {
                            maxHeight: "130px",
                            width: "200px",
                        },
                    },
                }}
            >
                {value === "" ? (
                    <MenuItem value={""}>
                        <Typography
                            variant="body2"
                            sx={{
                                color: value ? "black" : "#808080a1",
                                fontSize: "12px",
                                fontFamily:
                                    '"Roboto","Helvetica","Arial",sans-serif',
                                fontWeight: "520",
                                margin: "2px 0 0 0",
                            }}
                        >
                            {value
                                ? value
                                : `Select ${placeholder ? placeholder : name}`}
                        </Typography>
                    </MenuItem>
                ) : null}
                {option &&
                    option.map((option, index) => (
                        <MenuItem
                            key={index}
                            value={
                                option.Area_Name ||
                                option.City_Name ||
                                option.CountryName ||
                                option.group_code ||
                            
                                option.value
                                    ? option.value
                                    : option.name ||
                                option.loc_code
                            }
                        >
                            {option.Area_Name ||
                                option.City_Name ||
                                option.CountryName ||
                                option.group_code ||
                                option.loc_code||
                                option.name}
                        </MenuItem>
                    ))}
            </Select>
            {error && (
                <FormHelperText>{helperText}</FormHelperText>
            )}
        </FormControl>
    );
}

export default SelectButton;
