import { FormControl, InputLabel, OutlinedInput } from "@mui/material";

export default function RewardsCustomInputField({
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
}) {
    return (
        <FormControl
            variant="standard"
            sx={{
                margin: "4px 0px",
                padding: "7px 0",
                // width:width?width :{
                //     // xs: "100%",
                //     // md: "30%",
                //     // lg: "100%",
                // },
                width: width,
            }}
            color={color ? color : "secondary"}
        >
            <InputLabel
                sx={{
                    fontFamily: { labelFontFamily },
                    fontWeight: { labelFontWeight },
                    fontSize: { labelFontSize },
                    // color: {color}
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
                    // padding: "1rem",
                    backgroundColor: "white",
                    "&:focus": {
                        boxShadow: "rgba(25,118,210,0.25) 0 0 0 0.2rem",
                        borderColor: "#1976d2",
                    },

                    height: "35px",
                    bordeRadius: "4px",
                    "& input::placeholder": {
                        fontSize: "13px",
                        // fontWeight: "600",
                        fontFamily: { labelFontFamily },
                        color: { color },
                    },
                    padding: "1.5rem .5rem;",
                }}
                placeholder={`${onlyPlaceholder ? onlyPlaceholder : ""}`}
            />
        </FormControl>
    );
}
