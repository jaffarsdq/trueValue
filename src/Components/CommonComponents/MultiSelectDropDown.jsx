import React, { useEffect, useState } from 'react';
import { FormControl, InputLabel, Autocomplete, Checkbox, TextField, Typography } from '@mui/material';
import CustomInputFieldPoints from '../PointsComponents/CustomInputFieldPoints';
import { useDispatch, useSelector } from 'react-redux';
import { setSelectedLocation } from '../../Redux/Slices/RewardsSetupSlice';

const CustomAutocompleteFormControl = ({ permissionData, label, labelFontFamily, labelFontWeight, getInput, labelFontSize, margin, width, labelPaddingTop, paddingTop, paddingBottom }) => {
    const [selectedValues, setSelectedValues] = useState([]);
    const [selectAll, setSelectAll] = useState(false);
    // const optionValue = ["All", "Location 001", "Location 002", "Location 003", "Location 004", "Location 005", "Location 006", "Location 007", "Location 008", "Location 009", "Location 010", "Location 011", "Location 012"]


    const listOfLocation = useSelector((state) => state.rewardsManagement?.locationList?.DATA);
    const optionValue = [];
    const dispatch = useDispatch()
    // Generate "Location XXX" for each entry in listOfLocation
    for (let i = 0; i < listOfLocation?.length; i++) {
        const location = listOfLocation[i];
        const formattedName = `Location ${location.loc_code} - ${location.loc_name}`;
        optionValue.push(formattedName);
    }

    const handleCheckboxClick = (event, option) => {
        if (option === "All") {
            if (event.target.checked) {
                setSelectedValues(
                    optionValue
                );
                setSelectAll(true);
            } else {
                setSelectedValues([]);
                setSelectAll(false);
            }
        } else {
            const isSelected = selectedValues.includes(option);
            if (event.target.checked) {
                if (!isSelected) {
                    setSelectedValues((prevSelected) => [
                        ...prevSelected,
                        option,
                    ]);
                }
            } else {
                setSelectedValues((prevSelected) =>
                    prevSelected.filter((item) => item !== option)
                );
                setSelectAll(false);
            }
        }
    };

    // const handleAllOptionClick = (option, selected) => {
    //     if (option === "All") {
    //         if (!selected) {
    //             setSelectedValues(

    //             );
    //             setSelectAll(true);
    //         } else {
    //             setSelectedValues([]);
    //             setSelectAll(false);
    //         }
    //     }
    // };
    useEffect(() => {
        getInput(selectedValues)

    }, [selectedValues])
    const handleAllOptionClick = (option, selected) => {
        if (option === "All") {
            if (!selected || selectedValues.length !== optionValue.length) {
                setSelectedValues(optionValue);
                setSelectAll(true);
            } else {
                setSelectedValues([]);
                setSelectAll(false);
            }
        } else {
            const isSelected = selectedValues.includes(option);
            if (!isSelected) {
                setSelectedValues((prevSelected) => [
                    ...prevSelected,
                    option,
                ]);
            } else {
                setSelectedValues((prevSelected) =>
                    prevSelected.filter((item) => item !== option)
                );
            }
            if (selectedValues.length === optionValue.length - 1 && selectedValues.includes("All")) {
                setSelectAll(true);
            } else {
                setSelectAll(false);
            }
        }
    };

    console.log(selectedValues, "selectedValues");
    dispatch(setSelectedLocation(selectedValues))

    // const selectedCountText = `Selected ss${selectedValues.length} / ${optionValue.length}`;

    return (
        <>
            <FormControl
                variant="standard"
                sx={{
                    margin: margin ? margin : "39px 0px 7px 0px",
                    padding: "7px 0",
                    width: width ? width : {
                        xs: "100%",
                        md: "48%",
                    },
                }}
            >
                <InputLabel
                    sx={{
                        top: "-14px",
                        fontFamily: labelFontFamily ? labelFontFamily : "Poppins !important",
                        fontWeight: labelFontWeight ? labelFontWeight : "700  !important",
                        fontSize: labelFontSize ? labelFontSize : "1rem",
                        paddingTop: labelPaddingTop ? labelPaddingTop : '',
                        // color: { color },
                    }}
                    shrink
                    htmlFor="bootstrap-input"

                >
                    {label}
                </InputLabel>
                <Autocomplete
                    sx={{
                        width: {
                            xs: "100%",
                            sm: "100%",
                            lg: "100%"
                        },
                        paddingTop: paddingTop ? paddingTop : '',
                        paddingBottom: paddingBottom ? paddingBottom : '',
                        ".MuiInputBase-input": {
                            height: "6px !important",
                            borderRadius: "20% !important",
                        },
                    }}
                    multiple
                    limitTags={2}
                    id="multiple-limit-tags"
                    options={[
                        // "All",
                        ...(permissionData &&
                            permissionData.DATA
                            ? permissionData.DATA.map(
                                (item) => item.permission
                            )
                            : optionValue),
                    ]}
                    disableCloseOnSelect
                    getOptionLabel={(option) => option}
                    renderOption={(
                        props,
                        option,
                        { selected }
                    ) => (
                        <li
                            style={{
                                fontSize: "15px",
                            }}
                            {...props}
                            onClick={() =>
                                handleAllOptionClick(
                                    option,
                                    selected
                                )
                            }
                        >
                            <Checkbox
                                checked={
                                    selected ||
                                    (selectAll &&
                                        option === "All")
                                }
                                onChange={(event) =>
                                    handleCheckboxClick(
                                        event,
                                        option
                                    )
                                }
                            />
                            {option}
                        </li>
                    )}
                    renderInput={(params) => {
                        const {
                            InputLabelProps,
                            InputProps,
                            ...otherParams
                        } = params;
                        return (
                            <TextField
                                {...otherParams}
                                placeholder={
                                    params.inputValue ||
                                    "Select Location"
                                }
                                InputLabelProps={{
                                    ...InputLabelProps,
                                    shrink: true,
                                }}
                                InputProps={{
                                    ...InputProps,
                                    startAdornment: null,
                                }}
                                sx={{
                                    "& input::placeholder": {
                                        fontSize: "12px",
                                        fontWeight: "bolder",
                                    },
                                }}
                            />
                        );
                    }}
                    freeSolo
                    autoComplete
                    onChange={(event, newValue) => {
                        if (newValue.includes("All")) {
                            setSelectedValues(["All"]);
                            setSelectAll(true);
                        } else if (
                            selectedValues.includes("All")
                        ) {
                            // If 'All' was previously selected and now being deselected, remove it and set other selected values
                            setSelectedValues(
                                newValue.filter(
                                    (option) => option !== "All"
                                )
                            );
                            setSelectAll(false);
                        } else {
                            setSelectedValues(newValue);
                            setSelectAll(false);
                        }
                    }}
                    filterOptions={(
                        options,
                        { inputValue }
                    ) => {
                        if (
                            !inputValue ||
                            inputValue.trim() === ""
                        ) {
                            return options;
                        }
                        const filteredOptions = options.filter(
                            (option) => {
                                return (
                                    option &&
                                    option
                                        .toLowerCase()
                                        .includes(
                                            inputValue.toLowerCase()
                                        )
                                );
                            }
                        );

                        return filteredOptions;
                    }}
                    value={selectedValues}
                />
                {/* <Typography color="primary" variant="body2">
                {selectedValues.length ? selectedValues.length : 0} selected
            </Typography> */}


            </FormControl>


        </>



    );
};

export default CustomAutocompleteFormControl;
