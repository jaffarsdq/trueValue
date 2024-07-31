import { LoadingButton } from "@mui/lab";
import { Box, Button, LinearProgress } from "@mui/material";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import AlertPop from "../../Components/CommonComponents/AlertPop";
import CustomInputField from "../../Components/CommonComponents/CustomInputField";
import { CreateCountry, fetchCountry } from "../../Redux/Slices/countrySlice";
import Table from "../Country/countryTableGrid";

// import { fetchArea } from "../../Redux/Slices/areaSlice";
// import { fetchCity } from "../../Redux/Slices/citySlice";
// import { CreateCountry, fetchCountry } from "../../Redux/Slices/countrySlice";
// import TableGrid from "../Division/divisionTableGrid";
export default function Country({ setValue }) {
    const dispatch = useDispatch();
    const [disbale, setDisable] = useState(false);
    // const { ClientId, authKey, LocCode } = useSelector((state) => state.auth);
    const [alerts, setAlerts] = useState({
        alertToggle: false,
        message: "",
    });
    const { client_id } = useSelector((state) => state.auth);

    const [isnumber, setIsNumber] = useState(false);
    const { alertToggle, message } = alerts;
    const { countryData, initialStateLoader, createDataLoader } = useSelector(
        (state) => state.CountrySlice
    );

    const [countryFormData, setCountryFormData] = useState({
        client_id: client_id,
        auth_key: "",
        country_code: "",
        country_name: "",
        valid: "Y",
        Deleted: 0,
    });

    const { country_name, country_code } = countryFormData;
    const [columns, setColumns] = useState(["country_id", "country_name"]);

    const handleInputChange = (field, value) => {
        setCountryFormData((prevData) => ({
            ...prevData,
            [field]: value,
        }));
    };

    const handleCheckChange = (field, value) => {
        setCountryFormData((prevData) => ({
            ...prevData,
            [field]: value,
        }));
    };
    useEffect(() => {
        // dispatch(fetchArea());
        // dispatch(fetchCity());
        // dispatch(fetchCountry());
        // dispatch(fetchDivision());
    }, []);
    const handleSave = () => {
        // setValue(1)
        // console.log(countryFormData,"check");
        // dispatch(CreateCountry(countryFormData))
        // handlecancel()
        if (country_name && country_code && disbale) {
            dispatch(CreateCountry(countryFormData));

            setDisable(false);

            handlecancel();
        } else if (country_name && !disbale) {
            const matchingSections = countryData.DATA
                ? countryData.DATA.filter(
                      (item) => item.country_code === country_code
                  )
                : [];
            if (matchingSections.length > 0) {
                setIsNumber(true);
            } else {
                handlecancel();
                dispatch(CreateCountry(countryFormData));
            }
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
    const handlecancel = (state) => {
        setCountryFormData({
            client_id: client_id,
            auth_key: "",
            country_code: "",
            country_name: "",
            valid: "Y",
            Deleted: 0,
        });

        setDisable(false);
    };
    const getInput = (value) => {
        console.log(value);
        setDisable(true);

        setCountryFormData(value);
    };
    const toDelete = (value) => {
        console.log(value);
    };
    useEffect(() => {
        dispatch(fetchCountry());
    }, []);
    return (
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
                    margin: "5px 20px 0px 20px",
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
                                md: "space-around",
                                lg: "space-around",
                            },

                            flexWrap: "wrap",
                            width: "100%",
                            alignItems: "center",
                        }}
                    >
                        <CustomInputField
                            label="Country Code"
                            value={country_code}
                            onChange={(e) => {
                                handleInputChange(
                                    "country_code",
                                    e.target.value
                                );
                            }}
                            wsm={"100%"}
                            wmd={"42%"}
                            wlg={"45%"}
                            type="text"
                            disabled={false}
                            maxLength={10}
                            minLength={1}
                        />
                        <CustomInputField
                            label="Country Name"
                            value={country_name}
                            onChange={(e) => {
                                handleInputChange(
                                    "country_name",
                                    e.target.value
                                );
                            }}
                            wsm={"100%"}
                            wmd={"42%"}
                            wlg={"45%"}
                            type="text"
                            disabled={false}
                            maxLength={50}
                            minLength={2}
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
                        sx={{
                            padding: "5px",
                            fontSize: "12px",

                            width: { xs: "200px", lg: "9%" },
                            margin: "10px 5px",
                        }}
                        onClick={handlecancel}
                        color="secondary"
                    >
                        Cancel
                    </Button>

                    {disbale ? (
                        <LoadingButton
                            onClick={handleSave}
                            color="secondary"
                            loadingPosition="start"
                            variant="contained"
                            sx={{
                                padding: "5px",
                                fontSize: "12px",

                                width: {
                                    xs: "200px",
                                    lg: "9%",
                                    margin: "10px 5px",
                                },
                                // backgroundColor: "#388e3c !important ",
                                // color: "white !important",
                            }}
                        >
                            Update
                        </LoadingButton>
                    ) : (
                        <LoadingButton
                            onClick={handleSave}
                            color="secondary"
                            loading={createDataLoader}
                            loadingPosition="start"
                            variant="contained"
                            sx={{
                                padding: "5px",
                                fontSize: "12px",

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

            <Box sx={{ pt: "1rem" }}>
                {initialStateLoader ? (
                    <LinearProgress color={"secondary"} />
                ) : (
                    <Table
                        setValue={setValue}
                        name={"List Of Country"}
                        gridName={["Country Code", "Country Name", "Status"]}
                        data={countryData.DATA}
                        columns={columns}
                        getInput={getInput}
                        toDelete={toDelete}
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
                    msg={"Country Code is already exits!"}
                    status={"error"}
                />
            ) : null}
        </Box>
    );
}
