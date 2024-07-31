import { LoadingButton } from "@mui/lab";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import Tabs from "@mui/material/Tabs";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
    fetchCreateUpdateCustomer,
    resetCustomerId,
    resetSingleCustomerDetails,
    setIsCustomerSelected,
    setSelectedCustomerType,
} from "../../Redux/Slices/CustomerSlice";
import getFileNameFromUrl from "../../Utils/getFileNameFromUrl";
import AlertPop from "./AlertPop";

function CustomerDetailsTabs({ handleValue, value }) {
    const dispatch = useDispatch();
    const {
        singleCustomerDetails,
        profileImg,
        isCustomerSelected,
        isCreate,
        createUpdateCustomerMsg,
        createUpdateCustomerLoading,
        deleteCustomerMsg,
    } = useSelector((state) => state.customer);
    const { client_id } = useSelector((state) => state.auth);
    const handleChange = (event, newValue) => {
        handleValue(newValue);
    };

    const [alerts, setAlerts] = useState({
        alertToggle: false,
        message: "",
        status: "error",
    });

    const { alertToggle, message, status } = alerts;

    const handleSave = async () => {
        let data = JSON.parse(JSON.stringify(singleCustomerDetails));

        // Validate BASICINFO
        const basicInfo =
            data.BASICINFO &&
            Array.isArray(data.BASICINFO) &&
            data.BASICINFO[0];
        if (!basicInfo) {
            setAlerts({
                alertToggle: true,
                message: "Basic Information is required.",
                status: "error",
            });
            setTimeout(() => {
                setAlerts({
                    alertToggle: false,
                    message: "",
                });
            }, 2000);
            return;
        }

        const requiredFields = [
            "customer_type",
            "Created_Source",
            "name",
            "Last_Name",
            "email",
            "Birth_day",
            "Birth_month",
            "Nationality",
            "Gender",
            "payment_type",
            "description",
        ];

        for (const field of requiredFields) {
            if (!basicInfo[field]) {
                setAlerts({
                    alertToggle: true,
                    message: `Field ${field} is required.`,
                    status: "error",
                });
                setTimeout(() => {
                    setAlerts({
                        alertToggle: false,
                        message: "",
                    });
                }, 2000);
                return;
            }
        }

        // Validate MOBILENUMBER
        const mobileNumbers =
            data.MOBILENUMBER && Array.isArray(data.MOBILENUMBER)
                ? data.MOBILENUMBER
                : [];
        if (
            mobileNumbers.length === 0 ||
            !mobileNumbers.some((number) => number.mobile_number)
        ) {
            setAlerts({
                alertToggle: true,
                message: "At least one valid mobile number is required.",
                status: "error",
            });
            setTimeout(() => {
                setAlerts({
                    alertToggle: false,
                    message: "",
                });
            }, 2000);
            return;
        }

        if (profileImg) {
            if (basicInfo.profile_img) {
                basicInfo.profile_img = profileImg;
            }
            basicInfo.client_id = Number(client_id);
        } else {
            if (basicInfo?.profile_img) {
                let existingImg = basicInfo.profile_img;
                let image = getFileNameFromUrl(existingImg);
                basicInfo.profile_img = image;
            }
            basicInfo.client_id = Number(client_id);
        }

        dispatch(
            fetchCreateUpdateCustomer({
                DATA: data,
            })
        );
    };

    const handleCancel = () => {
        dispatch(resetSingleCustomerDetails());
        if (isCreate) dispatch(resetCustomerId());
    };

    // useEffect(() => {
    //     console.log("alert and navigate");
    //     if (!createUpdateCustomerLoading && createUpdateCustomerMsg == true) {
    //         setAlerts({
    //             alertToggle: true,
    //             message: isCreate
    //                 ? "Created a customer successfully"
    //                 : "Updated a customer successfully",
    //             success: "success",
    //         });
    //         setTimeout(() => {
    //             setAlerts({
    //                 alertToggle: false,
    //                 message: "",
    //                 success: "error",
    //             });
    //         }, 2000);
    //         dispatch(setSelectedCustomerType("All Customers"));
    //         dispatch(setIsCustomerSelected(false));
    //     } else if (
    //         !createUpdateCustomerLoading &&
    //         createUpdateCustomerMsg !== true
    //     ) {
    //         setAlerts({
    //             alertToggle: true,
    //             message: "something went wrong",
    //             success: "error",
    //         });
    //         setTimeout(() => {
    //             setAlerts({
    //                 alertToggle: false,
    //                 message: "",
    //                 success: "error",
    //             });
    //         }, 2000);
    //     }
    // }, [createUpdateCustomerMsg]);

    // useEffect(() => {
    //     if (!createUpdateCustomerLoading && deleteCustomerMsg == true) {
    //         setAlerts({
    //             alertToggle: true,
    //             message: "Deleted a customer successfully",
    //             success: "success",
    //         });
    //         setTimeout(() => {
    //             setAlerts({
    //                 alertToggle: false,
    //                 message: "",
    //                 success: "error",
    //             });
    //         }, 2000);
    //     } else if (!createUpdateCustomerLoading && deleteCustomerMsg !== true) {
    //         setAlerts({
    //             alertToggle: true,
    //             message: "something went wrong",
    //             success: "error",
    //         });
    //         setTimeout(() => {
    //             setAlerts({
    //                 alertToggle: false,
    //                 message: "",
    //                 success: "error",
    //             });
    //         }, 2000);
    //     }
    // }, [deleteCustomerMsg]);

    const [isInitialLoadComplete, setIsInitialLoadComplete] = useState(false);

    useEffect(() => {
        if (isInitialLoadComplete) {
            if (
                !createUpdateCustomerLoading &&
                createUpdateCustomerMsg === true
            ) {
                setAlerts({
                    alertToggle: true,
                    message: isCreate
                        ? "Created a customer successfully"
                        : "Updated a customer successfully",
                    success: "success",
                });
                setTimeout(() => {
                    setAlerts({
                        alertToggle: false,
                        message: "",
                        success: "error",
                    });
                }, 2000);
                dispatch(setSelectedCustomerType("All Customers"));
                dispatch(setIsCustomerSelected(false));
            } else if (
                !createUpdateCustomerLoading &&
                createUpdateCustomerMsg !== true
            ) {
                setAlerts({
                    alertToggle: true,
                    message: "something went wrong",
                    success: "error",
                });
                setTimeout(() => {
                    setAlerts({
                        alertToggle: false,
                        message: "",
                        success: "error",
                    });
                }, 2000);
            }
        } else {
            setIsInitialLoadComplete(true);
        }
    }, [createUpdateCustomerMsg]);

    useEffect(() => {
        if (isInitialLoadComplete) {
            if (!createUpdateCustomerLoading && deleteCustomerMsg === true) {
                setAlerts({
                    alertToggle: true,
                    message: "Deleted a customer successfully",
                    success: "success",
                });
                setTimeout(() => {
                    setAlerts({
                        alertToggle: false,
                        message: "",
                        success: "error",
                    });
                }, 2000);
            } else if (
                !createUpdateCustomerLoading &&
                deleteCustomerMsg !== true
            ) {
                setAlerts({
                    alertToggle: true,
                    message: "something went wrong",
                    success: "error",
                });
                setTimeout(() => {
                    setAlerts({
                        alertToggle: false,
                        message: "",
                        success: "error",
                    });
                }, 2000);
            }
        } else {
            setIsInitialLoadComplete(true);
        }
    }, [deleteCustomerMsg]);

    return (
        <Box
            sx={{
                display: { xs: "block", sm: "block" },
                backgroundColor: "#FAFBFC",
            }}
        >
            <Box
                sx={{
                    width: "100%",
                    padding: "0 10px",
                }}
            >
                <Box
                    sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                    }}
                >
                    <Tabs
                        variant="scrollable"
                        scrollButtons="auto"
                        value={value}
                        onChange={handleChange}
                        indicatorColor="primary"
                        aria-label="secondary tabs example"
                        TabIndicatorProps={{
                            sx: {
                                backgroundColor: "#A42ED7",
                                display: "flex",
                                justifyContent: "space-between",
                                width: "100%",
                            },
                        }}
                    >
                        <Tab
                            sx={{
                                opacity: "50%",
                                fontSize: "13px",
                                "&.Mui-selected": {
                                    color: "#000",
                                    opacity: "100%",
                                    fontWeight: "800",
                                },
                                "&.Mui-focusVisible": {
                                    backgroundColor: "rgba(100, 95, 228, 0.32)",
                                },
                            }}
                            disabled={false}
                            value="All Customers"
                            label="All Customers"
                        />
                        <Tab
                            sx={{
                                opacity: "50%",
                                fontSize: "13px",
                                "&.Mui-selected": {
                                    color: "#000",
                                    opacity: "100%",
                                    fontWeight: "800",
                                },
                                "&.Mui-focusVisible": {
                                    backgroundColor: "rgba(100, 95, 228, 0.32)",
                                },
                            }}
                            disabled={!isCustomerSelected}
                            value="Customer Details"
                            label="Customer Details"
                        />
                        <Tab
                            sx={{
                                opacity: "50%",
                                fontSize: "13px",
                                "&.Mui-selected": {
                                    color: "#000",
                                    opacity: "100%",
                                    fontWeight: "800",
                                },
                                "&.Mui-focusVisible": {
                                    backgroundColor: "rgba(100, 95, 228, 0.32)",
                                },
                            }}
                            disabled={!isCustomerSelected}
                            value="Address"
                            label="Address"
                        />
                        <Tab
                            sx={{
                                opacity: "50%",
                                fontSize: "13px",
                                "&.Mui-selected": {
                                    color: "#000",
                                    opacity: "100%",
                                    fontWeight: "800",
                                },
                                "&.Mui-focusVisible": {
                                    backgroundColor: "rgba(100, 95, 228, 0.32)",
                                },
                            }}
                            disabled={!isCustomerSelected}
                            value="Cards"
                            label="Card Details"
                        />
                        <Tab
                            sx={{
                                opacity: "50%",
                                fontSize: "13px",
                                "&.Mui-selected": {
                                    color: "#000",
                                    opacity: "100%",
                                    fontWeight: "800",
                                },
                                "&.Mui-focusVisible": {
                                    backgroundColor: "rgba(100, 95, 228, 0.32)",
                                },
                            }}
                            disabled={!isCustomerSelected}
                            value="Transactions"
                            label="Transactions"
                        />
                        <Tab
                            sx={{
                                opacity: "50%",
                                fontSize: "13px",
                                "&.Mui-selected": {
                                    color: "#000",
                                    opacity: "100%",
                                    fontWeight: "800",
                                },
                                "&.Mui-focusVisible": {
                                    backgroundColor: "rgba(100, 95, 228, 0.32)",
                                },
                            }}
                            disabled={!isCustomerSelected}
                            value="Points Management"
                            label="Points Management"
                        />
                    </Tabs>

                    {isCustomerSelected && (
                        <Box
                            sx={{
                                display: "flex",
                                alignItems: "center",
                                gap: "15px",
                            }}
                        >
                            {!isCreate ? (
                                <LoadingButton
                                    onClick={handleSave}
                                    loading={createUpdateCustomerLoading}
                                    loadingPosition="start"
                                    variant="contained"
                                    color="secondary"
                                    sx={{
                                        width: "120px",
                                        margin: "0.5rem 0",
                                        height: "32px",
                                    }}
                                >
                                    Update
                                </LoadingButton>
                            ) : (
                                <LoadingButton
                                    onClick={handleSave}
                                    loading={createUpdateCustomerLoading}
                                    loadingPosition="start"
                                    variant="contained"
                                    color="secondary"
                                    sx={{
                                        width: "120px",
                                        margin: "0.5rem 0",
                                        height: "32px",
                                    }}
                                >
                                    Save
                                </LoadingButton>
                            )}
                        </Box>
                    )}
                </Box>
            </Box>
            <div
                style={{
                    marginTop: "5px 0",
                    height: "1px",
                    backgroundColor: "black",
                    opacity: "15%",
                }}
            ></div>
            {alertToggle && (
                <AlertPop boolean={alertToggle} msg={message} status={status} />
            )}
        </Box>
    );
}

export default CustomerDetailsTabs;
