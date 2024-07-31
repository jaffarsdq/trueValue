import { Box, Button, Checkbox, FormControlLabel } from "@mui/material";
import CustomDropdown from "../CommonComponents/CustomDropDown";
import CustomInputField from "../CommonComponents/CustomInputField";

function FeedBackForm({ navBack }) {
    return (
        <Box
            sx={{
                width: { xs: "95%", sm: "60%", md: "48%", lg: "40%" },
                margin: "1rem auto",
                display: "flex",
                flexDirection: "column",
                boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.15)",
                bgcolor: "white",
            }}
        >
            <Box
                sx={{
                    display: "flex",
                    flexWrap: "wrap",
                    height: "auto",
                    flexDirection: { xs: "column" },
                    width: "95%",
                    margin: "0 auto",
                    justifyContent: "space-between",
                    padding: "0.5rem",
                }}
            >
                <Box
                    sx={{
                        display: "flex",
                        width: "100%",
                        alignItems: "center",
                        marginTop: "5px",
                        justifyContent: "end",
                    }}
                >
                    <FormControlLabel
                        control={
                            <Checkbox
                                // checked={feedbackDetails.enabled === "Y"}
                                color="secondary"
                                sx={{
                                    "& .MuiSvgIcon-root": {
                                        fontSize: "1.2rem",
                                    },
                                }}
                                // onChange={() => {
                                //     handleInputChange(
                                //         "enabled",
                                //         feedbackDetails.enabled === "Y"
                                //             ? "N"
                                //             : "Y"
                                //     );
                                // }}
                            />
                        }
                        sx={{
                            color: "secondary",
                            marginRight: "0 !important",
                            backgroundColor: "inherit",
                            height: "15px",
                            borderRadius: "4px",
                            "& .MuiFormControlLabel-label": {
                                fontSize: {
                                    xs: "11px !important",
                                    md: "14px !important",
                                },
                                fontFamily: "Poppins !important ",
                                fontWeight: "600",
                            },
                        }}
                        label="Enabled"
                    />
                </Box>
                <Box
                    sx={{
                        display: "flex",
                        width: { xs: "100%", md: "100%" },
                        justifyContent: "space-between",
                    }}
                >
                    <Box
                        sx={{
                            display: "flex",
                            width: "100%",
                            justifyContent: "space-between",
                        }}
                    >
                        <CustomInputField
                            label="Index"
                            // value={feedbackDetails.index}
                            // onChange={(e) =>
                            //     handleInputChange("index", e.target.value)
                            // }
                            type="text"
                        />
                    </Box>
                    {/* <Box
                sx={{
                    display: "flex",
                    width: "48%",
                    justifyContent: "space-between",
                }}
            >
                {" "}
                <CustomInputField
                    label="Group"
                    value={feedbackDetails.group}
                    onChange={(e) =>
                        handleInputChange("group", e.target.value)
                    }
                    type="text"
                />
            </Box> */}
                </Box>
                <Box
                    sx={{
                        display: "flex",
                        width: { xs: "100%", md: "100%" },
                    }}
                >
                    <CustomInputField
                        label="Description"
                        // value={feedbackDetails.description}
                        // onChange={(e) =>
                        //     handleInputChange("description", e.target.value)
                        // }
                        type="text"
                    />
                </Box>
                <Box
                    sx={{
                        display: "flex",
                        width: { xs: "100%", md: "100%" },
                    }}
                >
                    <CustomInputField
                        label="Second Language"
                        // value={feedbackDetails.secondLanguage}
                        // onChange={(e) =>
                        //     handleInputChange("secondLanguage", e.target.value)
                        // }
                        type="text"
                    />
                </Box>
            </Box>

            <Box
                sx={{
                    display: "flex",
                    flexDirection: { xs: "column", sm: "row" },
                    width: "92%",
                    margin: "0 auto",
                    justifyContent: "space-between",
                    alignItems: "center",
                }}
            >
                <CustomDropdown
                    height="30px"
                    sx={{
                        margin: "4px 0px",
                        padding: "7px 0",
                        width: {
                            xs: "100%",
                            md: "49%",
                        },
                    }}
                    name="Count"
                    fontFamily={"Poppins"}
                    fontWeight={600}
                    obj="typeOfRating"
                    value={""}
                    placeholder="Count"
                    option={[{ name: "1" }, { name: "2" }]}
                    disabled={false}
                    // handleInputChange={(obj, val) =>
                    //     handleInputChange("typeOfRating", val)
                    // }
                />
                <CustomDropdown
                    height="30px"
                    sx={{
                        margin: "4px 0px",
                        padding: "7px 0",
                        width: {
                            xs: "100%",
                            md: "49%",
                        },
                    }}
                    name="Type of Rating"
                    fontFamily={"Poppins"}
                    fontWeight={600}
                    obj="typeOfRating"
                    value={""}
                    placeholder="Type of Rating"
                    option={[{ name: "stars" }, { name: "smiley" }]}
                    disabled={false}
                    // handleInputChange={(obj, val) =>
                    //     handleInputChange("typeOfRating", val)
                    // }
                />
            </Box>

            <Button
                variant="contained"
                color="secondary"
                sx={{
                    padding: "10px 1rem",
                    height: "30px",
                    width: "98%",
                    margin: "10px auto",
                }}
                // onClick={handleClickOpen}
            >
                Save
            </Button>
        </Box>
    );
}

export default FeedBackForm;
