import {
    Box,
    Checkbox,
    FormControl,
    FormControlLabel,
    InputLabel,
    Typography,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";

import { setRewardsDetails, setToggleLocation } from "../../Redux/Slices/RewardsSetupSlice";
import ResponsiveDatePickers from "../CommonComponents/CustomerDatePicker";
import CustomInputField from "../CommonComponents/CustomInputField";
import SelectButton from "../CommonComponents/SelectButton";

function BasicInformation({ handleValue}) {
    const data = useSelector(
        (state) => state.rewardsManagement.rewardsDetails.REWARD_SETUP
    );
    const { validationErrors } = useSelector(
        (state) => state.rewardsManagement
    );
    const dispatch = useDispatch();

    // const [validationErrors, setValidationErrors] = useState({});

    const type = [{ name: "Type B" }, { name: "Bill" }, { name: "Type A" }];
    const locationType = [
        { name: "Unais_test" },
        { name: "ALL" },
        { name: "Location Type 1" },
        {name: "Select A Specific Location"}
    ];
    const cardType = [
        { name: "Card Type B" },
        { name: "ALL" },
        { name: "Silver" },
        { name: "Card Type 1" },
        { name: "Card Type 2" },
    ];

    const handleInputChange = (field, value) => {
        if (value === "Select A Specific Location") {
            // Set state or perform actions specific to selecting this option
           dispatch(setToggleLocation(false))
           handleValue("three")
           window.scrollTo({
            top: 0,
            behavior: "smooth", // Optionally, you can set smooth scrolling behavior
        }); 
        } 
        else {
           dispatch(setToggleLocation(true))

        }
        dispatch(setRewardsDetails({ [field]: value }))
    };

    // const handleValidation = () => {
    //     const errors = {};
    //     if (!data?.Type) errors.Type = "Type is required.";
    //     if (!data?.Description) errors.Description = "Description is required.";
    //     if (!data?.Valid_from) errors.Valid_from = "Valid From date is required.";
    //     if (!data?.Valid_to) errors.Valid_to = "Valid To date is required.";
    //     if (!data?.location_type) errors.location_type = "Location Type is required.";
    //     if (!data?.Card_type) errors.Card_type = "Card Type is required.";

    //     setValidationErrors(errors);

    //     return Object.keys(errors).length === 0;
    // };

    // const handleSubmit = () => {
    //     if (handleValidation()) {
    //         alert("Form is valid. Proceed with submission.");
    //         // Perform form submission logic here
    //     } else {
    //         alert("Please fill all required fields.");
    //     }
    // };

    return (
        <>
            <Box sx={{ width: "98%", margin: "0 auto", padding: "0 1rem" }}>
                {/* First Row */}
                <Box
                    sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        paddingTop: "1.5rem",
                        flexWrap: "wrap",
                        gap: ".2rem",
                    }}
                >
                    <SelectButton
                        height="38px"
                        sx={{
                            margin: "4px 0px",
                            padding: "7px 0",
                            width: {
                                xs: "100%",
                                md: "48%",
                            },
                        }}
                        name="Type"
                        obj="Type"
                        value={data?.Type || ""}
                        placeholder="Type"
                        option={type}
                        handleInputChange={handleInputChange}
                        error={!!validationErrors.Type}
                        helperText={validationErrors.Type}
                    />

                    <CustomInputField
                        onlyPlaceholder="Enter Description"
                        label="Description"
                        width={{
                            xs: "100%",
                            md: "48%",
                        }}
                        wxs={"100%"}
                        wmd={"48%"}
                        wlg={"48%"}
                        height="38px"
                        value={data?.Description || ""}
                        onChange={(e) =>
                            handleInputChange("Description", e.target.value)
                        }
                        type="text"
                        labelFontSize="1rem"
                        labelFontFamily="Poppins"
                        labelFontWeight="600"
                        maxLength={150}
                        error={!!validationErrors.Description}
                        helperText={validationErrors.Description}
                    />
                </Box>

                {/* Second Row */}
                <Box
                    sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        paddingTop: ".2rem",
                        flexWrap: "wrap",
                        gap: ".2rem",
                    }}
                >
                    <FormControl
                        variant="standard"
                        sx={{
                            padding: "7px 0",
                            width: {
                                xs: "100%",
                                md: "48%",
                            },
                        }}
                    >
                        <InputLabel
                            sx={{
                                fontFamily: "Poppins !important",
                                fontWeight: "700",
                            }}
                            shrink
                            htmlFor="bootstrap-input"
                            marginTop="1.2rem"
                        >
                            Valid From
                        </InputLabel>
                        <ResponsiveDatePickers
                            obj="Valid_from"
                            value={data?.Valid_from}
                            handleInputChange={handleInputChange}
                            dateFormat="YYYY/MM/DD"
                            FormatValues={["year", "month", "day"]}
                            Format={"YYYY/MM/DD"}
                            marginTop="1.2rem"
                            error={!!validationErrors.Valid_from}
                            helperText={validationErrors.Valid_from}
                        />
                    </FormControl>

                    <FormControl
                        variant="standard"
                        sx={{
                            padding: "7px 0 0",
                            width: {
                                xs: "100%",
                                md: "48%",
                            },
                        }}
                    >
                        <InputLabel
                            sx={{
                                fontFamily: "Poppins !important",
                                fontWeight: "700",
                            }}
                            shrink
                            htmlFor="bootstrap-input"
                            marginTop="1.2rem"
                        >
                            Valid To
                        </InputLabel>
                        <ResponsiveDatePickers
                            obj="Valid_to"
                            value={data?.Valid_to}
                            handleInputChange={handleInputChange}
                            dateFormat="YYYY/MM/DD"
                            FormatValues={["year", "month", "day"]}
                            Format={"YYYY/MM/DD"}
                            marginTop="1.2rem"
                            error={!!validationErrors.Valid_to}
                            helperText={validationErrors.Valid_to}
                        />
                    </FormControl>
                </Box>

                {/* Third Row */}
                <Box
                    sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        flexWrap: "wrap",
                    }}
                >
                    <SelectButton
                        height="38px"
                        sx={{
                            margin: "4px 0px",
                            padding: "7px 0",
                            width: {
                                xs: "100%",
                                md: "48%",
                            },
                        }}
                        name="Location Type"
                        obj="location_type"
                        value={data?.location_type || ""}
                        placeholder="Location Type"
                        option={locationType}
                        handleInputChange={handleInputChange}
                        error={!!validationErrors.location_type}
                        helperText={validationErrors.location_type}
                    />

                    <SelectButton
                        height="38px"
                        sx={{
                            margin: "4px 0px",
                            padding: "7px 0",
                            width: {
                                xs: "100%",
                                md: "48%",
                            },
                        }}
                        name="CardType"
                        obj="Card_type"
                        value={data?.Card_type || ""}
                        placeholder="CardType"
                        option={cardType}
                        handleInputChange={handleInputChange}
                        error={!!validationErrors.Card_type}
                        helperText={validationErrors.Card_type}
                    />
                </Box>

                {/* Fourth Row */}
                <Box
                    sx={{
                        display: "flex",
                        alignItems: "center",
                        paddingBlock: ".2rem .5rem",
                    }}
                >
                    <FormControlLabel
                        control={
                            <Checkbox
                                color="secondary"
                                sx={{
                                    "& .MuiSvgIcon-root": {
                                        fontSize: "1.2rem",
                                    },
                                }}
                                checked={
                                    data?.enabled?.toUpperCase() === "N"
                                        ? false
                                        : true
                                }
                                onChange={(e) => {
                                    handleInputChange(
                                        "enabled",
                                        e.target.checked ? "Y" : "N"
                                    );
                                }}
                            />
                        }
                        sx={{
                            color: "secondary",
                            marginRight: "0 !important",
                            backgroundColor: "inherit",
                            height: "15p",
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
                    />
                    <Typography
                        sx={{
                            fontFamily: "Poppins !important ",
                            fontSize: "1rem",
                        }}
                    >
                        Enabled
                    </Typography>
                </Box>
            </Box>
        </>
    );
}

export default BasicInformation;
