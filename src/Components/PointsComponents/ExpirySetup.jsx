import {
    Box,
    Checkbox,
    Container,
    FormControlLabel,
    Typography,
} from "@mui/material";
import React from "react";
import CustomInputFieldPoints from "./CustomInputFieldPoints";

const ExpirySetup = () => {
    return (
        <Container>
            <Box
                sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    gap: {
                        xs: "0",
                        md: "2rem",
                    },
                    paddingTop: "2rem",
                    flexWrap: "wrap",
                }}
            >
                <CustomInputFieldPoints
                    onlyPlaceholder="Enter value in AED"
                    label="Points per spend (Curreny unit, e.g., 1 point per $1)"
                    width={{
                        xs: "100%",
                        md: "30%",
                        lg: "40%",
                    }}
                    value={""}
                    onChange={(e) =>
                        handleInputChange("Po Number", e.target.value)
                    }
                    type="text"
                    labelFontSize="1rem"
                    labelFontFamily="Poppins"
                    labelFontWeight="300"
                />

                <Box
                    sx={{
                        display: "flex",
                        alignItems: "center",
                        gap: "1rem",
                        width: {
                            xs: "100%",
                            sm: "100%",
                            md: "50%",
                        },
                    }}
                >
                    <Typography
                        sx={{
                            fontFamily: "Poppins",
                            fontSize: ".8rem",
                            width: "20%",
                        }}
                    >
                        to
                    </Typography>
                    <CustomInputFieldPoints
                        onlyPlaceholder="Enter POINTS"
                        width="100%"
                        value={""}
                        onChange={(e) =>
                            handleInputChange("Po Number", e.target.value)
                        }
                        type="text"
                    />
                </Box>
            </Box>

            <Box
                sx={{
                    paddingBottom: "2rem",
                }}
            >
                <Typography
                    sx={{
                        fontSize: ".8rem",
                        fontFamily: "Poppins",
                        fontWeight: "300",
                        // color: "rgba(0, 0, 0, 0.6)"
                    }}
                >
                    Expiry Notification
                </Typography>

                <FormControlLabel
                    control={
                        <Checkbox
                            color="secondary"
                            sx={{
                                "& .MuiSvgIcon-root": {
                                    fontSize: {
                                        lg: "18px",
                                    },
                                },
                            }}
                            // checked={
                            //   active.toUpperCase() === "Y"
                            //     ? true
                            //     : false
                            // }
                            // onChange={(e) => {
                            //   handleInputChange(
                            //     "active",
                            //     e.target.checked ? "Y" : "N"
                            //   );
                            // }}
                        />
                    }
                    sx={{
                        color: "secondary",

                        // margin: "0px 0 0 0",
                        backgroundColor: "inherit",
                        height: "15p",
                        borderRadius: "4px",
                        // padding: "0 10px 0 0 ",

                        "& .MuiFormControlLabel-label": {
                            fontSize: {
                                xs: "11px !important",
                                md: "14px !important",
                            },
                            fontFamily: "Poppins !important ",
                            fontWeight: "600",
                        },
                    }}
                    // label="Closed"
                />

                <CustomInputFieldPoints
                    label="Maximum Points Per Transactions"
                    onlyPlaceholder="Enter Maximum Points Per transactions"
                    width="100%"
                    value={""}
                    onChange={(e) =>
                        handleInputChange("Po Number", e.target.value)
                    }
                    type="text"
                />

                <Typography
                    sx={{
                        fontSize: ".8rem",
                        fontFamily: "Poppins",
                        fontWeight: "300",
                    }}
                >
                    Expiry Channel
                </Typography>

                <FormControlLabel
                    control={
                        <Checkbox
                            color="secondary"
                            sx={{
                                "& .MuiSvgIcon-root": {
                                    fontSize: {
                                        lg: "18px",
                                    },
                                },
                            }}
                            // checked={
                            //   active.toUpperCase() === "Y"
                            //     ? true
                            //     : false
                            // }
                            // onChange={(e) => {
                            //   handleInputChange(
                            //     "active",
                            //     e.target.checked ? "Y" : "N"
                            //   );
                            // }}
                        />
                    }
                    sx={{
                        color: "secondary",

                        // margin: "0px 0 0 0",
                        backgroundColor: "inherit",
                        height: "15p",
                        borderRadius: "4px",
                        // padding: "0 10px 0 0 ",

                        "& .MuiFormControlLabel-label": {
                            fontSize: ".8rem",
                            fontFamily: "Poppins",
                            fontWeight: "300",
                        },
                    }}
                    label="Email"
                />

                <FormControlLabel
                    control={
                        <Checkbox
                            color="secondary"
                            sx={{
                                "& .MuiSvgIcon-root": {
                                    fontSize: {
                                        lg: "18px",
                                    },
                                },
                            }}
                            // checked={
                            //   active.toUpperCase() === "Y"
                            //     ? true
                            //     : false
                            // }
                            // onChange={(e) => {
                            //   handleInputChange(
                            //     "active",
                            //     e.target.checked ? "Y" : "N"
                            //   );
                            // }}
                        />
                    }
                    sx={{
                        color: "secondary",

                        // margin: "0px 0 0 0",
                        backgroundColor: "inherit",
                        height: "15p",
                        borderRadius: "4px",
                        // padding: "0 10px 0 0 ",

                        "& .MuiFormControlLabel-label": {
                            fontSize: ".8rem",
                            fontFamily: "Poppins",
                            fontWeight: "300",
                        },
                    }}
                    label="SMS"
                />

                <FormControlLabel
                    control={
                        <Checkbox
                            color="secondary"
                            sx={{
                                "& .MuiSvgIcon-root": {
                                    fontSize: {
                                        lg: "18px",
                                    },
                                    // backgroundColor: "grey"
                                },
                            }}
                            // checked={
                            //   active.toUpperCase() === "Y"
                            //     ? true
                            //     : false
                            // }
                            // onChange={(e) => {
                            //   handleInputChange(
                            //     "active",
                            //     e.target.checked ? "Y" : "N"
                            //   );
                            // }}
                        />
                    }
                    sx={{
                        color: "secondary",

                        // margin: "0px 0 0 0",
                        backgroundColor: "inherit",
                        height: "15p",
                        borderRadius: "4px",
                        // padding: "0 10px 0 0 ",

                        "& .MuiFormControlLabel-label": {
                            fontSize: ".8rem",
                            fontFamily: "Poppins",
                            fontWeight: "300",
                        },
                    }}
                    label="Push Notification"
                />
            </Box>
        </Container>
    );
};

export default ExpirySetup;
