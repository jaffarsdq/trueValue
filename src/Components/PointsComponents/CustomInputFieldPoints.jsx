import { FormControl, InputLabel, OutlinedInput } from "@mui/material";

export default function CustomInputFieldPoints({
    onlyPlaceholder,
    width,
    label,
    value,
    onChange,
    type,
    color,
    labelFontSize,
    labelFontFamily,
    labelFontWeight,
    height,
    onlyPlaceholderColor,
    marginRight,
}) {
    return (
        <FormControl
            variant="standard"
            sx={{
                margin: "4px 0px",
                padding: "7px 0",
                width: width
                    ? width
                    : {
                          xs: "100%",
                          md: "30%",
                          lg: "100%",
                      },
            }}
            color={color ? color : "secondary"}
        >
            <InputLabel
                sx={{
                    fontFamily:  labelFontFamily?labelFontFamily:"Poppins !important" ,
                    fontWeight:  labelFontWeight?labelFontWeight:"700  !important" ,
                    fontSize:  labelFontSize ?labelFontSize:"1rem",
                    color: { color },
               
                }}
                shrink
                htmlFor="bootstrap-input"
            >
                {label}
            </InputLabel>
            <OutlinedInput
                value={value}
                onChange={onChange}
                type={type}
                required
                sx={{
                    "& input[type=number]": {
                        "-moz-appearance": "textfield",
                    },
                    "& input[type=number]::-webkit-outer-spin-button": {
                        "-webkit-appearance": "none",
                        margin: 0,
                    },
                    "& input[type=number]::-webkit-inner-spin-button": {
                        "-webkit-appearance": "none",
                        margin: 0,
                    },
                    margin: "14px 0 0 0",
                    backgroundColor: "white",
                    "&:focus": {
                        boxShadow: "rgba(25,118,210,0.25) 0 0 0 0.2rem",
                        borderColor: "#1976d2",
                    },

                    height:height?height: "35px",
                    bordeRadius: "4px",
                    "& input::placeholder": {
                        fontSize: "13px",
                        fontWeight: "bolder",
                        color: { onlyPlaceholderColor },
                    },
                    padding: "0px;",
                    marginRight: marginRight ? marginRight : ''
                }}
                placeholder={onlyPlaceholder ? onlyPlaceholder : `Enter ${label}`}
            />
        </FormControl>
    );
}
