import {
    Box,
    Checkbox,
    FormControl,
    ListItemText,
    MenuItem,
    Select,
    Typography,
} from "@mui/material";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { setAdvancedSetting } from "../../Redux/Slices/RewardsSlice";
import RewardsCustomInputField from "../CommonComponents/RewardsCustomInputField";
const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
    PaperProps: {
        style: {
            maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
            width: 250,
        },
    },
};

const names = ["Rice", "Onion", "Tomato", "Potato", "Brinjal", "Ladies Finger"];

const AdvancedSettings = () => {
    const data = useSelector((state) => state.rewards.advancedSetting);
    console.log(data);
    const dispatch = useDispatch();

    const handleAdvancedsetting = (field, e) => {
        console.log(field, e, "handle");
        dispatch(setAdvancedSetting({ [field]: e }));
    };

    // Start
    const [personName, setPersonName] = React.useState([]);

    const handleChange = (event) => {
        const {
            target: { value },
        } = event;
        setPersonName(
            // On autofill we get a stringified value.
            typeof value === "string" ? value.split(",") : value
        );
    };
    // End
    return (
        // <Container>

        //   <Box sx={{
        //   display: "flex",
        //     justifyContent: "space-between",
        //     alignItems: "center",
        //     // gap: "rem",
        //     flexWrap: "wrap",
        //     margin: "1rem"
        // }} >

        //     <CustomDropdown
        //       height="35px"
        //       sx={{
        //         margin: "4px 0px",
        //         padding: "7px 0",
        //         width: {
        //           xs: '100%',
        //           sm: "100%",
        //           md: "48%"
        //         },
        //       }}
        //       name="Excludes Points On"
        //       fontFamily={'Poppins'}
        //       fontWeight={400}
        //       obj="loc_code"
        //       value={''}
        //       placeholder="Day "
        //       option={[]}
        //       disabled={false}
        //     // handleInputChange={handleInputChange}
        //     />

        //     <CustomInputField
        //       onlyPlaceholder="Enter value in AED"
        //       label="Points per spend (Curreny unit, e.g., 1 point per $1)"
        //       width={
        //         {
        //           xs: "100%",
        //           md: "30%",
        //           lg: "48%",
        //         }

        //       }
        //       value={""}
        //       onChange={(e) => handleInputChange("Po Number", e.target.value)}
        //       type="text"

        //       labelFontSize='1rem'
        //       labelFontFamily="Poppins"
        //       labelFontWeight="300"
        //     />
        //   {/* </Box> */}
        //   </Box>

        // </Container>
        <>
            <Box
                sx={{
                    padding: {
                        xs: "1rem 2rem",
                        md: "1rem 2rem",
                    },
                }}
            >
                {/* Fisrt row */}
                <Box
                    sx={{
                        display: "flex",
                        flexWrap: "wrap",
                        justifyContent: "space-between",
                        gap: "2rem",
                        padding: {
                            xs: "0",
                            // md: "1rem 2rem"
                        },
                    }}
                >
                    {/* Start */}
                    <FormControl
                        sx={{
                            // margin: "4px 0px",
                            // padding: "7px 0",
                            width: {
                                xs: "100%",
                                md: "50%",
                            },
                        }}
                    >
                        {/* <InputLabel id="demo-multiple-checkbox-label">Tag</InputLabel> */}
                        <Typography
                            sx={{
                                whiteSpace: "nowrap",
                                paddingBottom: "5px",
                                fontSize: ".7rem",
                                fontFamily: "Poppins",
                                color: "#191970",
                            }}
                        >
                            Excludes On
                        </Typography>
                        <Select
                            labelId="demo-multiple-checkbox-label"
                            id="demo-multiple-checkbox"
                            multiple
                            value={personName}
                            onChange={handleChange}
                            // input={<OutlinedInput label="Tag" />}
                            renderValue={(selected) => selected.join(", ")}
                            MenuProps={MenuProps}
                            sx={{
                                height: "3.2rem",
                            }}
                        >
                            {names.map((name) => (
                                <MenuItem key={name} value={name}>
                                    <Checkbox
                                        checked={personName.indexOf(name) > -1}
                                    />
                                    <ListItemText primary={name} />
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                    {/* End */}
                    {/* <CustomDropdown
            // height="35px"
            sx={{
              margin: "4px 0px",
              padding: "7px 0",
              width: {
                xs: '100%',
                md: "50%",
              },
            }}
            name="Excludes Points On"
            fontFamily={'Poppins'}
            fontWeight={400}
            obj="excludesPointsOn"
            value={data.excludesPointsOn}
            placeholder="Day "
            option={[{ name: "points" }]}
            disabled={false}
            handleInputChange={handleAdvancedsetting}
          /> */}
                    <RewardsCustomInputField
                        onlyPlaceholder=""
                        label="Maximum Points Balance"
                        width={{
                            xs: "100%",
                            md: "45%",
                        }}
                        value={data.maximumPointsBalance}
                        onChange={(e) =>
                            handleAdvancedsetting(
                                "maximumPointsBalance",
                                e.target.value
                            )
                        }
                        type="text"
                        color="#191970"
                        labelFontSize="1rem"
                        labelFontFamily="Poppins"
                        labelFontWeight="300"
                        sx={{ marginTop: "2rem" }}
                    />
                </Box>
            </Box>
        </>
    );
};

export default AdvancedSettings;
