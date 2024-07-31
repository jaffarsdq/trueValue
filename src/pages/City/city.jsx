import { LoadingButton } from "@mui/lab";
import {
    Box,
    Button,
    FormControl,
    InputLabel,
    LinearProgress,
    OutlinedInput,
} from "@mui/material";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

// import {
//     CreateCity,
//     fetchCity,
// } from "../../../../store/features/City/citySlice";
import AlertPop from "../../Components/CommonComponents/AlertPop";
import SelectButton from "../../Components/CommonComponents/SelectButton";
import { CreateCity } from "../../Redux/Slices/citySlice";
import TableGrid from "../City/cityTableGrid";

export default function City({ setValue }) {
    const gridName = ["City Code", "Country Name", "City Name", "Action"];
    const dispatch = useDispatch();
    const [disbale, setDisable] = useState(false);
    const { client_id, authKey, LocCode } = useSelector((state) => state.auth);
    const [alerts, setAlerts] = useState({
        alertToggle: false,
        message: "",
    });
    const { selectedCountry, selectedCountryCode } = useSelector(
        (state) => state.CountrySlice
    );
    const { cityData, initialStateLoader, createDataLoader } = useSelector(
        (state) => state.CitySlice
    );

    const [isnumber, setIsNumber] = useState(false);
    const { alertToggle, message } = alerts;
    const [cityFormData, setCityFormData] = useState({
        client_id: client_id,
        auth_key: authKey,
        city_code: "",
        city_name: "",
        country_name: "",
        Deleted: 0,
    });

    const { country_name, city_code, city_name } = cityFormData;
    const handleInputChange = (field, value) => {
        setCityFormData((prevData) => ({
            ...prevData,
            [field]: value,
        }));
    };

    const handleCheckChange = (field, value) => {
        // setModifierFormData((prevData) => ({
        //     ...prevData,
        //     [field]: value,
        // }));
    };
    // useEffect(() => {
    //     dispatch(fetchCity());
    // }, []);
    const handleSave = () => {
        if (city_name && country_name && city_code && !disbale) {
            let checkCodeIdExits = cityData.DATA
                ? cityData.DATA.filter((data) => {
                      return data.city_code === city_code;
                  })
                : [];
            if (!checkCodeIdExits.length) {
                console.log(cityFormData);
                dispatch(CreateCity(cityFormData));
                handleCancel();
            } else {
                setAlerts({
                    alertToggle: true,
                    message: "City code is already exits",
                });
            }
        } else if (city_name && country_name && city_code && disbale) {
            console.log(cityFormData);
            dispatch(CreateCity(cityFormData));
            handleCancel();
        } else {
            setAlerts({
                alertToggle: true,
                message: "Please fill the required fields",
            });
            console.log("alerts");
        }

        setTimeout(() => {
            setIsNumber(false);
            setAlerts({
                alertToggle: false,
                message: "",
            });
        }, 2000);
    };
    const getInput = (value) => {
        console.log(value);
        setCityFormData(value);
        setDisable(true);
    };
    const handleCancel = () => {
        setCityFormData({
            client_id: client_id,
            auth_key: authKey,
            city_code: "",
            city_name: "",
            country_name: "",
            Deleted: 0,
        });
        setDisable(false);
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
                        padding: "10px 10px 0px 10px",
                        borderRadius: "10px",
                        flexDirection: "column",
                        margin: "5px 20px 0 20px",
                    }}
                >
                    <Box
                        sx={{
                            backgroundColor: "#FAFAFB",
                            padding: "5px 10px",
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
                                borderRadius: "10px",
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
                                flexDirection: "row",
                            }}
                        >
                            <SelectButton
                                disable={disbale}
                                sx={{
                                    margin: "7px 0px",
                                    padding: "7px 0",
                                    width: {
                                        xs: "100%",
                                        sm: "30%",
                                    },
                                }}
                                height="38px"
                                name="Country Name"
                                obj="country_name"
                                value={country_name}
                                placeholder="Country Name"
                                option={[{ name: selectedCountry }]}
                                handleInputChange={handleInputChange}
                            />

                            <FormControl
                                disabled={disbale}
                                variant="standard"
                                sx={{
                                    margin: "7px 0px",
                                    padding: "7px 0",
                                    width: {
                                        xs: "100%",
                                        sm: "30%",
                                    },
                                }}
                                color="secondary"
                            >
                                <InputLabel
                                    sx={{
                                        fontWeight: "700",
                                    }}
                                    shrink
                                    htmlFor="bootstrap-input"
                                >
                                    City Code
                                </InputLabel>
                                <OutlinedInput
                                    value={city_code}
                                    onChange={(e) => {
                                        handleInputChange(
                                            "city_code",
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
                                    placeholder="Enter City Code"
                                />
                            </FormControl>

                            <FormControl
                                variant="standard"
                                sx={{
                                    margin: "7px 0px",
                                    padding: "7px 0",
                                    width: {
                                        xs: "100%",
                                        sm: "30%",
                                    },
                                }}
                                color="secondary"
                            >
                                <InputLabel
                                    sx={{
                                        fontWeight: "700",
                                    }}
                                    shrink
                                    htmlFor="bootstrap-input"
                                >
                                    City Name
                                </InputLabel>
                                <OutlinedInput
                                    value={city_name}
                                    onChange={(e) => {
                                        handleInputChange(
                                            "city_name",
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
                                    placeholder="Enter City Name"
                                />
                            </FormControl>
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
                                loadingPosition="start"
                                variant="contained"
                                color="secondary"
                                sx={{
                                    width: {
                                        xs: "200px",
                                        lg: "9%",
                                        margin: "10px 5px",
                                    },
                                    // backgroundColor: "#1976d2 !important",
                                    // color: "white !important",
                                }}
                            >
                                Save
                            </LoadingButton>
                        )}
                    </Box>
                </Box>

                <Box>
                    {initialStateLoader ? (
                        <LinearProgress color={"secondary"} />
                    ) : (
                        <TableGrid
                            setValue={setValue}
                            name={"List Of City"}
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
                        msg={"city Id is already exits!"}
                        status={"error"}
                    />
                ) : null}
            </Box>
        </>
    );
}
