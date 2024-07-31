import { Box, Container, Typography } from "@mui/material";
import React from "react";
import CustomDropDownPoints from "./CustomDropDownPoints";
import CustomInputFieldPoints from "./CustomInputFieldPoints";

const RedemptionSetup = () => {
    const handleInputChange = () => {};

    return (
        <>
            <Container>
                <Box
                    sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        paddingTop: "2rem",
                        flexWrap: "wrap",
                    }}
                >
                    <CustomInputFieldPoints
                        onlyPlaceholder="Enter value in AED"
                        label="Points value (Curreny unit, e.g., 1 point per $1)"
                        width={{
                            xs: "100%",
                            md: "30%",
                            lg: "42%",
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

                            width: {
                                xs: "100%",
                                sm: "100%",
                                md: "55%",
                            },
                        }}
                    >
                        <Typography
                            sx={{
                                paddingTop: "10px",
                                paddingRight: "10px",
                                fontFamily: "Poppins",
                                fontSize: ".8rem",
                                whiteSpace: "nowrap",
                            }}
                        >
                            Points Per
                        </Typography>
                        <CustomInputFieldPoints
                            onlyPlaceholder="Enter POINTS"
                            width={{
                                xs: "100%",
                            }}
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
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        gap: {
                            xs: "0",
                            md: "2rem",
                        },
                        flexWrap: "wrap",
                    }}
                >
                    <CustomInputFieldPoints
                        onlyPlaceholderColor="green"
                        label="Minimum points for Redemption"
                        width={{
                            xs: "100%",
                            md: "30%",
                            lg: "42%",
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
                                md: "55%",
                            },
                        }}
                    >
                        <Typography
                            sx={{
                                paddingTop: "10px",
                                paddingRight: "10px",
                                fontFamily: "Poppins",
                                fontSize: ".8rem",
                                whiteSpace: "nowrap",
                            }}
                        >
                            Points on
                        </Typography>
                        {/* <CustomInputFieldPoints
                            width="100%"

              value={""}
              onChange={(e) => handleInputChange("Po Number", e.target.value)}
              type="text"
            /> */}
                        {/* <CustomDropdown
              height="35px"
              sx={{
                margin: "4px 0px",
                padding: "7px 0",
                width: {
                  xs: '100%',
                  sm: "100%",
                  md: "1000%"
                },
              }}
              // name="Location"
              obj="loc_code"
              value={''}
              placeholder="Day "
              option={[]}
              disabled={false}
              handleInputChange={handleInputChange}
            /> */}

                        <CustomInputFieldPoints
                            onlyPlaceholder="Enter Maximum points for Redemption"
                            // label="Minimum points for Redemption"
                            width={{
                                xs: "100%",
                                md: "100%",
                                lg: "100",
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
                    </Box>
                </Box>

                <Box
                    sx={{
                        paddingBottom: "2rem",
                    }}
                >
                    <CustomDropDownPoints
                        height="35px"
                        sx={{
                            margin: "4px 0px",
                            padding: "7px 0",
                            width: {
                                xs: "100%",
                                sm: "100%",
                                md: "100%",
                            },
                        }}
                        // name="Location"
                        obj="loc_code"
                        value={""}
                        placeholder="Day "
                        option={[]}
                        disabled={false}
                        handleInputChange={handleInputChange}
                    />
                </Box>
            </Container>
        </>
    );
};

export default RedemptionSetup;
