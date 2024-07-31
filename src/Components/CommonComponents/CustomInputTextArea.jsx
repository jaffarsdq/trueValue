import { FormControl, InputLabel, OutlinedInput } from "@mui/material";

export default function CustomInputTextArea({
    row,
    label,
    value,
    onChange,
    type,
    color
}) {
    return (
        <FormControl
            variant="standard"
            sx={{
                margin: "4px 0px",
                padding: "7px 0",
                width: {
                    xs: "100%",
                    md: "100%",
                    lg: "100%",
                },
            }}
            color={color ? color : "secondary"}
        >
            <InputLabel
                sx={{
                    fontFamily: "Poppins !important",
                    fontWeight: "700",
                    fontSize: "15px",
                }}
                shrink
                htmlFor="bootstrap-input"
            >
                {label}
            </InputLabel>
            <OutlinedInput
                multiline
                rows={row ? row : 5}
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

                    bordeRadius: "4px",
                    "& input::placeholder": {
                        fontSize: "13px",
                        fontWeight: "bolder",
                    },
                    padding: "10px;",
                }}
                placeholder={`Enter ${label}`}
            />
        </FormControl>
    );
}
