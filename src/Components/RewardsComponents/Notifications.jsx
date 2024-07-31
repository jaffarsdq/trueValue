import {
    Checkbox,
    FormControl,
    FormControlLabel,
    FormGroup,
    InputLabel,
    OutlinedInput,
    Typography,
} from "@mui/material";

function CustomInputField({ label, value, onChange, type }) {
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
                rows={5}
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

import { Box } from "@mui/material";

function Notifications() {
    return (
        <Box sx={{ width: "98%", margin: "0 auto", padding: "1rem 0" }}>
            <Box sx={{ width: { xs: "98%", sm: "100%" }, margin: "0 auto" }}>
                <CustomInputField
                    label="Notification Message"
                    value={""}
                    // onChange={(e) =>
                    //     handleInputChange("Po Number", e.target.value)
                    // }
                    type="text"
                />
            </Box>
            <Typography
                sx={{
                    fontSize: "11.5px",
                    fontWeight: "600",
                    opacity: "70%",
                    fontFamily: "Poppins",
                    padding: "0.5rem 0.2rem",
                }}
            >
                Notification Channel
            </Typography>
            <Box>
                <FormGroup
                    sx={{
                        marginLeft: "10px",
                        display: "flex",
                        gap: "5px",
                        flexDirection: "row",
                        fontSize: "5px",
                        "&:hover": {
                            cursor: "pointer",
                        },
                    }}
                >
                    <FormControlLabel
                        control={
                            <Checkbox
                                sx={{
                                    color: "#635CFF",
                                    "&.Mui-checked": {
                                        color: "#635CFF",
                                    },
                                }}
                                // checked={
                                //     formDetails.user_type === "user"
                                // }
                                // onChange={handleInputChange}
                                value="user"
                                name="user_type"
                            />
                        }
                        label={
                            <Typography
                                sx={{
                                    fontSize: "12px",
                                    marginTop: "2px",
                                    fontWeight: "500",
                                    opacity: "95%",
                                }}
                            >
                                Email
                            </Typography>
                        }
                        sx={{
                            "& .MuiSvgIcon-root": {
                                fontSize: {
                                    xs: "12px",
                                    sm: "12px",
                                    md: "16px",
                                    lg: "16px",
                                },
                            },
                        }}
                    />
                    <FormControlLabel
                        control={
                            <Checkbox
                                sx={{
                                    color: "#635CFF",
                                    "&.Mui-checked": {
                                        color: "#635CFF",
                                    },
                                }}
                                // checked={
                                //     formDetails.user_type ===
                                //     "admin"
                                // }
                                // onChange={handleInputChange}
                                value="admin"
                                name="user_type"
                            />
                        }
                        label={
                            <Typography
                                sx={{
                                    fontSize: "12px",
                                    marginTop: "2px",
                                    fontWeight: "500",
                                    opacity: "95%",
                                }}
                            >
                                SMS
                            </Typography>
                        }
                        sx={{
                            "& .MuiSvgIcon-root": {
                                fontSize: {
                                    xs: "12px",
                                    sm: "12px",
                                    md: "16px",
                                    lg: "16px",
                                },
                            },
                        }}
                    />
                    <FormControlLabel
                        control={
                            <Checkbox
                                sx={{
                                    color: "#635CFF",
                                    "&.Mui-checked": {
                                        color: "#635CFF",
                                    },
                                }}
                                // checked={
                                //     formDetails.user_type ===
                                //     "superuser"
                                // }
                                // onChange={handleInputChange}
                                value="superuser"
                                name="user_type"
                            />
                        }
                        label={
                            <Typography
                                sx={{
                                    fontSize: "12px",
                                    marginTop: "2px",
                                    fontWeight: "500",
                                    opacity: "95%",
                                }}
                            >
                                Push Notification
                            </Typography>
                        }
                        sx={{
                            "& .MuiSvgIcon-root": {
                                fontSize: {
                                    xs: "12px",
                                    sm: "12px",
                                    md: "16px",
                                    lg: "16px",
                                },
                            },
                        }}
                    />
                </FormGroup>
            </Box>
        </Box>
    );
}

export default Notifications;
