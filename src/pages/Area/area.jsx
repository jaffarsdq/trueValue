import { LoadingButton } from "@mui/lab";
import {
    Box,
    Button,
    FormControl,
    InputLabel,
    OutlinedInput,
} from "@mui/material";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import AlertPop from "../../Components/CommonComponents/AlertPop";
import LinearIndeterminate from "../../Components/CommonComponents/LinearIndeterminate";
import SelectButton from "../../Components/CommonComponents/SelectButton";
// import { CreateArea } from "../../Redux/Slices/areaSlice";
import { CreateArea } from "../../Redux/Slices/areaSlice";
import TableGrid from "../Area/areaTableGrid";

export default function Area({ setValue }) {
    const gridName = ["Area Code", "Area Name", "Country Code", "Country Name", "City Name"];
    const dispatch = useDispatch();
    const [disbale, setDisable] = useState(false);
    // const { ClientId, authKey, LocCode } = useSelector((state) => state.auth);
    const [alerts, setAlerts] = useState({
        alertToggle: false,
        message: "",
    });
    const { selectedCountry } = useSelector((state) => state.CountrySlice);
    const [isnumber, setIsNumber] = useState(false);
    const { alertToggle, message } = alerts;
    const { areaData, initialStateLoader, createDataLoader } = useSelector(
        (state) => state.AreaSlice
    );

    const { selectedCity } = useSelector(
        (state) => state.CitySlice
    );

    const [areaFormData, setAreaFormData] = useState({
        area_code: "",
        area_name: "",
        country_name: "",
        city_name: "",
        country_code: "",
        Deleted: 0
        // validity: "",
        // group_id: "",
        // Valid: "Y",
    });

    const {
        area_code,
        area_name,
        country_name,
        city_name,
        // validity,
        // group_id,
    } = areaFormData;
    // const { cityData } = useSelector((state) => state.CitySlice);

    const handleInputChange = (field, value) => {
        console.log(field, areaFormData);
        setAreaFormData((prevData) => ({
            ...prevData,
            [field]: value,
        }));
    };

    // const handleCheckChange = (field, value) => {
    //     setAreaFormData((prevData) => ({
    //         ...prevData,
    //         [field]: value,
    //     }));
    // };
    // useEffect(() => {
    //     dispatch(fetchArea());
    // }, []);
    const handleSave = () => {
        //dispatch(CreateArea(areaFormData));

        if (area_code && area_name && city_name && country_name && !disbale) {
            let checkCodeIdExits = areaData.DATA
                ? areaData.DATA.filter((data) => {
                      return data.area_code === area_code;
                  })
                : [];
            if (!checkCodeIdExits.length) {
                dispatch(CreateArea(areaFormData));
                handleCancel();
            } else {
                setAlerts({
                    alertToggle: true,
                    message: "Area code is already exits",
                });
            }
        } else if (
            area_name &&
            city_name &&
            country_name &&
            area_code &&
            disbale
        ) {
            dispatch(CreateArea(areaFormData));
            handleCancel();
        } else {
            setAlerts({
                alertToggle: true,
                message: "Please fill the required fields",
            });
        }

        setTimeout(() => {
            setIsNumber(false);
            setAlerts({
                alertToggle: false,
                message: "",
            });
        }, 2000);
    };
    const handleCancel = () => {
        setAreaFormData({
            area_code: "",
            area_name: "",
            country_name: "",
            country_code: "",
            city_name: "",
            Deleted: 0
            // validity: "",
            // group_id: "",
            // Valid: "Y",
        });
        setDisable(false);
    };
    const getInput = (value) => {
        setAreaFormData(value);
        setDisable(true);
    };
    return (
        <>
            <Box
                sx={{
                    display: "flex",
                    flexDirection: "column",
                    height: "auto",
                    backgroundColor: "#FAFAFB",
                }}
            >
                <Box
                    sx={{
                        backgroundColor: "White",
                        border: " 2px solid #E6EBF1",
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        padding: "15px 20px 0 20px",
                        borderRadius: "10px",
                        flexDirection: "column",
                        margin: "5px 20px 0px 20px",
                    }}
                >
                    <Box
                        sx={{
                            backgroundColor: "#FAFAFB",
                            padding: "5px",
                            border: " 2px solid #E6EBF1",
                            borderRadius: "10px",
                            display: "flex",
                            justifyContent: {
                                xs: "center",
                                lg: "center",
                            },
                            gap: "15px",
                            flexWrap: "wrap",
                            width: "100%",
                            alignItems: "center",
                        }}
                    >
                        <Box
                            sx={{
                                backgroundColor: "#FAFAFB",
                                padding: "0px",

                                display: "flex",
                                justifyContent: {
                                    xs: "center",
                                    lg: "space-evenly",
                                },
                                gap: " 0px 10px",
                                flexWrap: "wrap",
                                width: "100%",
                                alignItems: "center",
                                flexDirection: "row-reverse",
                            }}
                        >
                            <FormControl
                                variant="standard"
                                sx={{
                                    margin: "7px 0px",
                                    padding: "7px 0",
                                    width: {
                                        xs: "100%",
                                        sm: "23%",
                                        lg: "23%",
                                    },
                                }}
                                                color="secondary"
                            >
                                <InputLabel
                                    sx={{
                                        fontWeight: "700",
                                        fontSize: "15px",
                                    }}
                                    shrink
                                    htmlFor="bootstrap-input"
                                >
                                    Area Name
                                </InputLabel>
                                <OutlinedInput
                                    value={areaFormData.area_name}
                                    onChange={(e) => {
                                        handleInputChange(
                                            "area_name",
                                            e.target.value
                                        );
                                    }}
                                    type="text"
                                    required
                                    sx={{
                                        margin: "14px 0 0 0",
                                        backgroundColor: "white",

                                        "&:focus": {
                                            boxShadow:
                                                "rgba(25,118,210,0.25) 0 0 0 0.2rem",
                                            borderColor: "#1976d2",
                                        },
                                        height: "38px",
                                        borderRadius: "4px",
                                        "& input::placeholder": {
                                            fontSize: "12px",
                                            fontWeight: "bolder",
                                        },
                                        padding: "10px;",
                                    }}
                                    placeholder="Enter Area"
                                />
                            </FormControl>
                            <FormControl
                                variant="standard"
                                sx={{
                                    margin: "7px 0px",
                                    padding: "7px 0",
                                    width: {
                                        xs: "100%",
                                        sm: "23%",
                                        lg: "23%",
                                    },
                                }}
                                                color="secondary"
                            >
                                <InputLabel
                                    sx={{
                                        fontWeight: "700",
                                        fontSize: "15px",
                                    }}
                                    shrink
                                    htmlFor="bootstrap-input"
                                >
                                    Area Code
                                </InputLabel>
                                <OutlinedInput
                                    value={areaFormData.area_code}
                                    onChange={(e) => {
                                        handleInputChange(
                                            "area_code",
                                            e.target.value
                                        );
                                    }}
                                    type="text"
                                    required
                                    sx={{
                                        margin: "14px 0 0 0",
                                        backgroundColor: "white",

                                        "&:focus": {
                                            boxShadow:
                                                "rgba(25,118,210,0.25) 0 0 0 0.2rem",
                                            borderColor: "#1976d2",
                                        },
                                        height: "38px",
                                        borderRadius: "4px",
                                        "& input::placeholder": {
                                            fontSize: "12px",
                                            fontWeight: "bolder",
                                        },
                                        padding: "10px;",
                                    }}
                                    placeholder="Enter Area Code"
                                />
                            </FormControl>
                            <SelectButton
                                height="38px"
                                sx={{
                                    margin: "7px 0px",
                                    padding: "7px 0",
                                    width: {
                                        xs: "100%",
                                        sm: "23%",
                                        lg: "23%",
                                    },
                                }}
                                name="City Name"
                                obj="city_name"
                                placeholder="City Name"
                                value={areaFormData.city_name}
                                option={[{ name: selectedCity }]}
                                handleInputChange={handleInputChange}
                            />
                            <SelectButton
                                height="38px"
                                sx={{
                                    margin: "7px 0px",
                                    padding: "7px 0",
                                    width: {
                                        xs: "100%",
                                        sm: "23%",
                                        lg: "23%",
                                    },
                                }}
                                name="Country Name"
                                obj="country_name"
                                value={areaFormData.country_name}
                                placeholder="Country Name"
                                option={[{ name: selectedCountry }]}
                                handleInputChange={handleInputChange}
                            />
                        </Box>
                    </Box>
                    <Box
                        sx={{
                            display: "flex",
                            justifyContent: { xs: "center", lg: "flex-end" },
                            alignItems: "center",
                            width: "100%",
                        }}
                    >
                        <Button
                            variant="outlined"
                            color="secondary"
                            sx={{
                                width: { xs: "200px", lg: "9%" },
                                margin: "10px 5px",
                            }}
                            onClick={handleCancel}
                        >
                            Cancel
                        </Button>

                        {disbale ? (
                            <LoadingButton
                                onClick={handleSave}
                                loadingPosition="start"
                                variant="contained"
                                sx={{
                                    width: {
                                        xs: "200px",
                                        lg: "9%",
                                        margin: "10px 5px",
                                    },
                                    backgroundColor: "#388e3c !important ",
                                    color: "white !important",
                                }}
                            >
                                Update
                            </LoadingButton>
                        ) : (
                            <LoadingButton
                                onClick={handleSave}
                                loading={createDataLoader}
                                color="secondary"
                                loadingPosition="start"
                                variant="contained"
                                sx={{
                                    width: {
                                        xs: "200px",
                                        lg: "9%",
                                        margin: "10px 5px",
                                    },
                                }}
                            >
                                Save
                            </LoadingButton>
                        )}
                    </Box>
                </Box>

                <Box>
                    {initialStateLoader ? (
                        <LinearIndeterminate />
                    ) : (
                        <TableGrid
                            setValue={setValue}
                            name={"List Of Area"}
                            getInput={getInput}
                            gridName={gridName}
                        />
                    )}
                </Box>
                {alertToggle && (
                    <AlertPop
                        boolean={alertToggle}
                        msg={message}
                        status={"error"}
                    />
                )}

                {isnumber ? (
                    <AlertPop
                        boolean={true}
                        msg={"Area Id is already exits!"}
                        status={"error"}
                    />
                ) : null}
            </Box>
        </>
    );
}
