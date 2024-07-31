import { Autocomplete, Box, Checkbox, FormControl, FormControlLabel, ListItemText, MenuItem, Select, TextField, Typography } from "@mui/material";
import CustomInputField from "../CommonComponents/CustomInputField";
import CustomDropDownPoints from "../PointsComponents/CustomDropDownPoints";
import RewardsCustomInputField from "../CommonComponents/RewardsCustomInputField";
import CustomInputFieldPoints from "../PointsComponents/CustomInputFieldPoints";
import React, { useEffect, useState } from "react";
import MultiSelectDropDown from '../CommonComponents/MultiSelectDropDown';
import SearchInputForTable from "../CommonComponents/SearchInputForTable";
import UserTableGrid from "./TableGrid";
import { useDispatch, useSelector } from "react-redux";
import { InputAdornment } from "@mui/material";
import SearchIcon from '@mui/icons-material/Search'; // Import search icon from Material-UI
import { fetchLocationList, updateRewardsDetails } from "../../Redux/Slices/RewardsSetupSlice";
// MultiDropdown
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

// const names = ["Location 001", "Location 002", "Location 003", "Location 004", "Location 005", "Location 006", "Location 007", "Location 008", "Location 009", "Location 010", "Location 011", "Location 012"];

// const searchInput = ["Dashboard", "Customer", "Promotions", "Rewards", "Reports", "Settings", "Logout", "SignIn"]
function Location() {
    const listOfLocation = useSelector((state) => state.rewardsManagement?.locationList)
    console.log(listOfLocation.DATA, "locationList");

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

    // TableGrid Start
    const [userRoleActiveData, setUserRoleActiveData] = useState([]);
    const dispatch = useDispatch();

    const handleActive = (data, value) => {
        const updatedState = userRoleActiveData.map((item) => {
            if (
                item.client_id === data.client_id &&
                item.permissions === data.permissions
            ) {
                return { ...item, valid: value };
            }
            console.log(
                item.valid,
                item.valid ? "Y" : "N",
                "Checkt he active values "
            );
            return item;
        });
        setUserRoleActiveData(updatedState);
    };

    const handleSave = (data) => {



    };[]

    useEffect(() => {
        dispatch(fetchLocationList())
    }, [])

    const getInput = (value) => {
        // console.log(value)
        setUserRoleActiveData(value)
    };
    const getSelectedItem = (value) => {
        console.log(value)
    }
    // End Table Grid


    // const MultiSelectDropDown = ({ getSelectedItem, getInput, label, labelFontSize, labelFontFamily, labelFontWeight, margin, width, labelPaddingTop, paddingTop, paddingBottom }) => {

    //     return (
    //         <Box sx={{ width: width, margin: margin, paddingTop: paddingTop, paddingBottom: paddingBottom }}>
    //             <TextField
    //                 label={label}
    //                 InputProps={{
    //                     startAdornment: (
    //                         <InputAdornment position="start">
    //                             <SearchIcon />
    //                         </InputAdornment>
    //                     ),
    //                     inputProps: {
    //                         style: {
    //                             fontSize: labelFontSize,
    //                             fontFamily: labelFontFamily,
    //                             fontWeight: labelFontWeight,
    //                             paddingTop: labelPaddingTop,
    //                         }
    //                     }
    //                 }}
    //                 onChange={(e) => getInput(e.target.value)}
    //                 value={getSelectedItem()}
    //                 select
    //                 SelectProps={{
    //                     multiple: true,
    //                     value: getSelectedItem(),
    //                     renderValue: (selected) => selected.join(', '),
    //                 }}
    //             />
    //         </Box>
    //     );
    // }
    return (
        <Box sx={{ width: "98%", margin: "0 auto", padding: "1rem" }}>

            {/* First Row */}
            {/* <Box
            // sx={{
            //     display: "flex",
            //     justifyContent: "space-between",
            //     alignItems: "center",
            //     paddingTop: "1.5rem",
            //     flexWrap: "wrap",
            //     gap: "1rem"
            // }}
            >

                {/* <SearchInputForTable options={searchInput}
                    // width={{
                    //     xs: "100%",
                    //     md: "48%",
                    //     // lg: "42%",
                    // }}
                    // width="100%"
                    sx={{
                        height: "70px"
                    }}
                /> *

            </Box> */}

            {/* <Autocomplete
                    id="free-solo-demo"
                    freeSolo
                    options={top100Films.map((option) => option.title)}
                    renderInput={(params) => <TextField {...params} label="freeSolo" />}
                />
                <Autocomplete
                    freeSolo
                    id="free-solo-2-demo"
                    disableClearable
                    options={top100Films.map((option) => option.title)}
                    renderInput={(params) => (
                        <TextField
                            {...params}
                            label="Search input"
                            InputProps={{
                                ...params.InputProps,
                                type: 'search',
                            }}
                        />
                    )}
                /> */}

            <Box>
                <MultiSelectDropDown getSelectedItem={getSelectedItem} getInput={getInput} label="Location" labelFontSize="1rem"
                    labelFontFamily="Poppins"
                    labelFontWeight="300" margin="5px 0px 7px 0px" width="100%" labelPaddingTop="2rem" paddingTop="1.5rem" paddingBottom="1rem" />

                <UserTableGrid
                    handleActive={handleActive}
                    permissionValues={userRoleActiveData}
                    handleSaveinput={handleSave}
                    getInput={getInput}
                />
            </Box>

            <Box>
                <Typography
                    width="100%"
                    height="50px"
                    // onChange={(e) =>
                    //     handleInputChange("Po Number", e.target.value)
                    // }
                    type="text"
                    fontSize=".9rem"
                    fontFamily="Poppins"
                    fontWeight="bold"
                    marginBottom="2rem"
                    padding="1rem"
                    color="#6868ca"
                    sx={{
                        display: "flex",
                        justifyContent: "center",
                        boxShadow: "0 0 23px 5px rgba(238, 238, 238, 1)"
                    }}
                >Selected {userRoleActiveData.length} / {listOfLocation?.DATA?.length}</Typography>
            </Box>


            {/* Second Row */}
            {/* <Box
                sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    paddingTop: "1.5rem",
                    flexWrap: "wrap",
                    gap: "1rem"
                }}
            >
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
                    <InputLabel id="demo-multiple-checkbox-label">Tag</InputLabel>
                    <Typography
                        sx={{
                            whiteSpace: "nowrap",
                            paddingBottom: "5px",
                            fontSize: ".7rem",
                            fontFamily: "Poppins",
                            color: "#191970",
                        }}
                    >
                        Location
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
            </Box> */}



        </Box>
    )
}

export default Location;