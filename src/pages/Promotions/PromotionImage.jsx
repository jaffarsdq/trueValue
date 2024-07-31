import CloseIcon from "@mui/icons-material/Close";
import ZoomInIcon from "@mui/icons-material/ZoomIn";
import ZoomOutIcon from "@mui/icons-material/ZoomOut";
import {
    Box,
    Button,
    Checkbox,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    FormControl,
    FormControlLabel,
    FormHelperText,
    FormLabel,
    IconButton,
    InputLabel,
    OutlinedInput,
    Radio,
    RadioGroup,
    Typography,
} from "@mui/material";
import dayjs from "dayjs";
import localizedFormat from "dayjs/plugin/localizedFormat";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { TransformComponent, TransformWrapper } from "react-zoom-pan-pinch";

import AlertPop from "../../Components/CommonComponents/AlertPop";
import CustomInputField from "../../Components/CommonComponents/CustomInputField";
import SideBar from "../../Layouts/SideBar";
import {
    clearImageUploader,
    createAndUpdatePromotion,
    fetchImageFlyer,
    fetchImageUploader,
    // createPromotion,
    setCreatePromotions,
    setFileName,
    setLoading,
} from "../../Redux/Slices/PromotionSlice";
import getFileNameFromUrl from "../../Utils/GetFileNameFromUrl";
import ZoomInAndZoomOut from "./ZoomInAndZoomOut";
import { LoadingButton } from "@mui/lab";
import { handleApiResponse } from "../../Utils/notificationUtils"
import SelectButton from "../../Components/CommonComponents/SelectButton";
dayjs.extend(localizedFormat);

function PromotionsCreate({ navBack, handleTogglePage, promotions }) {
    const { client_id } = useSelector((state) => state.auth);
    const [toggle, setToggle] = useState(false);
    const dispatch = useDispatch();
    const { imageURL } = useSelector((state) => state.auth);

    // const [saveFileName, setSaveFileName] = useState()
    const imagePath = useSelector((state) => state.promotionSlice.saveFileName);
    // const flyer = useSelector((state) => state.promotionSlice.saveFileName);

    const [alerts, setAlerts] = useState({
        alertToggle: false,
        message: "",
        status: "error",
    });

    const { alertToggle, message, status } = alerts;

    const showAlert = (message, status) => {
        setAlerts({
            alertToggle: true,
            message: message,
            status: status,
        });
        setTimeout(() => {
            setAlerts({
                alertToggle: false,
                message: "",
            });
        }, 2000);
    };

    const [errors, setErrors] = useState({
        // PROMO_IMAGE: "",
        cust_gender: "",
        LOC_ID: "",
        TIME_FROM: "",
        TIME_TO: "",
        VALID_FROM: "",
        VALID_TO: "",
        PROMO_DESC: "",
    });

    const validate = () => {
        const newErrors = {
            // PROMO_IMAGE: "",
            cust_gender: "",
            LOC_ID: "",
            TIME_FROM: "",
            TIME_TO: "",
            VALID_FROM: "",
            VALID_TO: "",
            PROMO_DESC: "",
        };

        let isValid = true;

        // if (!data?.PROMO_IMAGE) {
        //     newErrors.PROMO_IMAGE = "Promo Image is required";
        //     isValid = false;
        // }

        if (!data?.cust_gender) {
            newErrors.cust_gender = "Gender is required";
            isValid = false;
        }
        if (!data?.LOC_ID) {
            newErrors.LOC_ID = "Location type is required";
            isValid = false;
        }
        if (!data?.TIME_FROM) {
            newErrors.TIME_FROM = "Time From is required";
            isValid = false;
        }
        if (!data?.TIME_TO) {
            newErrors.TIME_TO = "Time To is required";
            isValid = false;
        }
        if (!data?.VALID_FROM) {
            newErrors.VALID_FROM = "Start Date is required";
            isValid = false;
        }
        if (!data?.VALID_TO) {
            newErrors.VALID_TO = "End Date is required";
            isValid = false;
        }
        if (!data?.PROMO_DESC) {
            newErrors.PROMO_DESC = "Description is required";
            isValid = false;
        }

        setErrors(newErrors);
        setTimeout(() => {
            setErrors({
                // PROMO_IMAGE: "",
                cust_gender: "",
                LOC_ID: "",
                TIME_FROM: "",
                TIME_TO: "",
                VALID_FROM: "",
                VALID_TO: "",
                PROMO_DESC: "",
                DESC: "",
                promo_flyer: "",
                valid: ""
            });
        }, 2000);
        return isValid;
    };

    const navigator = useNavigate();

    function handleToggle() {
        handleTogglePage();
    }

    const data = useSelector((state) => state.promotionSlice?.createPromotions);
    const filePath = useSelector(
        (state) => state.promotionSlice?.imageUploader
    );
    const [flyer, setFlyer] = useState();
    const promo = useSelector(
        (state) => state.promotionSlice?.promotion?.PROMOTIONS
    );
    const listOfLocation = useSelector((state) => state.promotionSlice?.locationList?.DATA);


    // const [imagePath, setImagePath] = useState();

    console.log(listOfLocation, "listOfLocation");
    // console.log(data);

    const flyerToggle = useSelector(
        (state) => state.promotionSlice.flyerStatus
    );

    const { loading } = useSelector((state) => state.promotionSlice);

    const [isInitialLoadComplete, setIsInitialLoadComplete] = useState(false);

    const handleSave = async () => {
        if (validate()) {
            const createPromotionData = {
                client_id: client_id,
                loc_id: data.LOC_ID,
                promo_image:
                    getFileNameFromUrl(imagePath) ||
                    getFileNameFromUrl(data.PROMO_IMAGE),
                promo_desc: data.PROMO_DESC || "",
                promo_big_desc: data.DESC || "",
                Valid_from: data.VALID_FROM.split("T")[0] || "",
                valid_to: data.VALID_TO.split("T")[0] || "",
                time_from: `${data.TIME_FROM}:00` || "",
                time_to: `${data.TIME_TO}:00` || "",
                cust_gender: data.cust_gender || "",
                promo_flyer:
                    getFileNameFromUrl(flyer) ||
                    getFileNameFromUrl(data.promo_flyer),
                valid: data.valid || "N",
                Deleted: data.Deleted || "0"
            };

            console.log(createPromotionData, "createPromotionData");
            await handleApiResponse(dispatch, createAndUpdatePromotion, createPromotionData);
            navBack(false)
            window.scrollTo({
                top: 0,
                behavior: "smooth", // Optionally, you can set smooth scrolling behavior
            });
            // try {
            //     console.log(createPromotionData, "Final save");
            //     dispatch(setLoading(true)); // Set loading state to true before API call

            //     // Dispatch your Redux action asynchronously
            //     await dispatch(createAndUpdatePromotion(createPromotionData));

            //     // If API call succeeds, show success alert
            //     setAlerts({
            //         alertToggle: true,
            //         message: "Promotion created successfully",
            //         status: "success",
            //     });

            //     // Delay navigation after success alert is shown
            //     setTimeout(() => {
            //         navigator("/loyalty%20ads"); // Navigate after successful save
            //     }, 2000); // Adjust the delay time (in milliseconds) as needed
            // } catch (error) {
            //     console.error("Error saving promotion:", error);
            //     // Show error alert if API call fails
            //     setAlerts({
            //         alertToggle: true,
            //         message:
            //             "Failed to save promotion. Please try again later.",
            //         status: "error",
            //     });
            // } finally {
            //     setTimeout(() => {
            //         setAlerts({
            //             alertToggle: false,
            //             message: "",
            //             status: "error",
            //         });
            //     }, 2000);
            //     dispatch(setLoading(false)); // Reset loading state regardless of success or failure
            // }
        } else {
            // Show alert for validation failure
            setAlerts({
                alertToggle: true,
                message: "Please fill all the required details",
                status: "error",
            });
            setTimeout(() => {
                setAlerts({
                    alertToggle: false,
                    message: "",
                    status: "error",
                });
            }, 2000);
        }
    };

    // else {
    //     // Optionally, show a general alert if needed
    //     // alert("Please correct the errors before saving.");
    //     showAlert("Please correct the errors before saving.", "error");
    // }

    // useEffect(() => {
    //     if (isInitialLoadComplete) {
    //         if (!loading && message === true) {
    //             // Success alert
    //             setAlerts({
    //                 alertToggle: true,
    //                 message: button ? "Created a customer successfully" : "Updated a customer successfully",
    //                 status: "success", // Corrected from `success` to `status`
    //             });
    //             setTimeout(() => {
    //                 setAlerts({
    //                     alertToggle: false,
    //                     message: "",
    //                     status: "error", // Ensure to reset status correctly
    //                 });
    //             }, 2000);
    //         } else if (!loading && message !== true) {
    //             // Error alert
    //             setAlerts({
    //                 alertToggle: true,
    //                 message: "Something went wrong",
    //                 status: "error",
    //             });
    //             setTimeout(() => {
    //                 setAlerts({
    //                     alertToggle: false,
    //                     message: "",
    //                     status: "error",
    //                 });
    //             }, 2000);
    //         }
    //     } else {
    //         setIsInitialLoadComplete(true);
    //     }
    // }, [message]);

    const handleUpdate = async () => {
        if (validate()) {
            const updatePromotionData = {
                client_id: client_id,
                loc_id: data.LOC_ID,
                promotion_id: data.PROMO_ID || "",
                promo_image:
                    getFileNameFromUrl(imagePath) ||
                    getFileNameFromUrl(data.PROMO_IMAGE),
                promo_desc: data.PROMO_DESC || "",
                promo_big_desc: data.DESC || "",
                Valid_from: data.VALID_FROM?.split("T")[0] || "",
                valid_to: data.VALID_TO?.split("T")[0] || "",
                time_from: `${data.TIME_FROM}:00` || "",
                time_to: `${data.TIME_TO}:00` || "",
                cust_gender: data.cust_gender || "",
                promo_flyer:
                    getFileNameFromUrl(flyer) ||
                    getFileNameFromUrl(data.promo_flyer),
                valid: data.valid || "N",
                Deleted: data.Deleted || "0"
            }

            console.log(updatePromotionData,"updatePromotionData");

            await handleApiResponse(dispatch, createAndUpdatePromotion, updatePromotionData);

            window.scrollTo({
                top: 0,
                behavior: "smooth", // Optionally, you can set smooth scrolling behavior
            });
            navBack(false)

            // try {
            //     console.log(updatePromotionData, "Final update");
            //     dispatch(setLoading(true)); // Set loading state to true before API call

            //     // Dispatch your Redux action asynchronously
            //     await dispatch(createAndUpdatePromotion(updatePromotionData));

            //     // If API call succeeds, show success alert
            //     setAlerts({
            //         alertToggle: true,
            //         message: "Promotion updated successfully",
            //         status: "success",
            //     });

            //     // Delay navigation after success alert is shown
            //     setTimeout(() => {
            //         navigator("/loyalty%20ads"); // Navigate after successful update
            //     }, 1000); // Adjust the delay time (in milliseconds) as needed
            // } catch (error) {
            //     console.error("Error updating promotion:", error);
            //     // Show error alert if API call fails
            //     setAlerts({
            //         alertToggle: true,
            //         message:
            //             "Failed to update promotion. Please try again later.",
            //         status: "error",
            //     });
            // } finally {
            //     setTimeout(() => {
            //         setAlerts({
            //             alertToggle: false,
            //             message: "",
            //             status: "error",
            //         });
            //     }, 2000);
            //     dispatch(setLoading(false)); // Reset loading state regardless of success or failure
            // }
        } else {
            // Show alert for validation failure
            setAlerts({
                alertToggle: true,
                message: "Please fill all the required details",
                status: "error",
            });
            setTimeout(() => {
                setAlerts({
                    alertToggle: false,
                    message: "",
                    status: "error",
                });
            }, 2000);
        }
    };

    const handleOnChange = (index, value) => {
        console.log({[index]: value})
        dispatch(setCreatePromotions({ [index]: value }));
    };

    const formatDateForInput = (dateString) => {
        if (!dateString) return "";
        // Ensure dateString is in 'yyyy-MM-dd' format
        return dateString.split("T")[0]; // Extracts yyyy-MM-dd from yyyy-MM-ddTHH:mm:ss
    };

    const [selectedImage, setSelectedImage] = useState(null);
    const [isDialogOpen, setDialogOpen] = useState(false);
    const [previewUrl, setPreviewUrl] = useState(null);
    const [zoomLevel, setZoomLevel] = useState(1);

    const handleZoomIn = () => {
        setZoomLevel(zoomLevel + 0.3);
    };

    const handleZoomOut = () => {
        if (zoomLevel > 0.1) {
            setZoomLevel(zoomLevel - 0.3);
        }
    };

    const handleUpload = () => {
        if (selectedImage) {
            // Perform the upload action here
        } else {
            alert("No file selected.");
        }
        setDialogOpen(false);
    };

    const handleCancel = () => {
        setDialogOpen(false);
        setSelectedImage(null);
        setPreviewUrl(null);
        setZoomLevel(1);
    };

    const handleImageChange = (event) => {
        const file = event.target.files[0];
        if (file && file.type.startsWith("image/")) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setPreviewUrl(reader.result);
                setSelectedImage(reader.result);
                const formData = new FormData();
                formData.append("myFile", file);
                handleFlyer(formData, file.name);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleFileSelect = (event) => {
        // setSelectedFile(event.target.files[0]);
        handleImageChange(event); // Pass event to parent handler
    };

    const handleFlyer = (formData, fileName) => {
        setFlyer(fileName);
        dispatch(fetchImageFlyer(formData));
    };
    const handleImage = (formData, fileName) => {
        dispatch(setFileName(fileName));
        // dispatch(setFileName(fileName));
        dispatch(fetchImageUploader(formData));
        setTimeout(() => {
            setErrors({
                PROMO_IMAGE: "",
                cust_gender: "",
                TIME_FROM: "",
                TIME_TO: "",
                VALID_FROM: "",
                VALID_TO: "",
                PROMO_DESC: "",
                DESC: "",
                promo_flyer: "",
                valid: ""
            });
        }, 2000);
    };

    const button = useSelector((state) => state.promotionSlice.button);

    return (
        <>
            {alertToggle && (
                <AlertPop boolean={alertToggle} msg={message} status={status} />
            )}
            <Box
                sx={{
                    backgroundColor: "#FAFBFC",
                }}
            >
                <>
                    {/* <Box
                        sx={{
                            display: "flex",
                            justifyContent: "flex-end",
                        }}
                    >
                        <Button
                            variant="outlined"
                            color="secondary"
                            sx={{
                                margin: "0.8rem 1rem 0",
                                position: {
                                    md: "absolute",
                                },
                                top: {
                                    md: "3.6rem",
                                },
                            }}
                            onClick={() => navigator("/loyalty%20ads")}
                        >
                            Back
                        </Button>
                    </Box> */}

                    <div
                        style={{
                            // backgroundColor: "#FAFBFC",
                            fontFamily: "poppins",
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            minHeight: "calc(100dvh - 115px)",
                        }}
                    >
                        <Box
                            sx={{
                                width: { xs: "90%", md: "60%", lg: "30%" },
                                margin: {
                                    xs: "1.2rem",
                                    md: "2.5rem",
                                },
                                boxShadow:
                                    " 0px 4px 15px 8px rgba(238, 238, 238, 1)",
                                display: "flex",
                                flexDirection: "column",
                                padding: {
                                    xs: ".4rem 1rem",
                                    sm: ".5rem 1rem",
                                    md: "1rem 0",
                                },
                                backgroundColor: "white",
                                gap: {
                                    xs: "rem",
                                    sm: ".5rem",
                                    // md: ""
                                },
                            }}
                        >
                            <Box
                                sx={{
                                    display: "flex",
                                    justifyContent: "space-around",
                                    alignItems: "center",
                                }}
                            >
                                <Box sx={{ display: "flex", gap: "15px" }}>
                                    <Typography
                                        sx={{
                                            fontWeight: "600",
                                            textTransform: "uppercase",
                                            fontSize: {
                                                xs: "12px",
                                                sm: "15px",
                                                md: "16px",
                                                lg: "16px",
                                            },
                                        }}
                                    >
                                        Code
                                    </Typography>
                                    <Typography
                                        sx={{
                                            opacity: "0.7",
                                            fontSize: {
                                                xs: "12px",
                                                sm: "15px",
                                                md: "16px",
                                                lg: "16px",
                                            },
                                        }}
                                    >
                                        {data?.PROMO_CODE
                                            ? data?.PROMO_CODE
                                            : ""}
                                    </Typography>
                                </Box>
                                <FormControlLabel
                                    control={
                                        <Checkbox
                                            sx={{
                                                color: "#635CFF",
                                                "&.Mui-checked": {
                                                    color: "#635CFF",
                                                },
                                            }}
                                            checked={data.valid == "Y"}
                                            onChange={(e) => {
                                                handleOnChange(
                                                    "valid",
                                                    e.target.checked ? "Y" : "N"
                                                );
                                            }}
                                            value={data?.valid || ""}
                                        />
                                    }
                                    label={
                                        <Typography
                                            sx={{
                                                fontSize: "14px",
                                                // marginTop: "2px",
                                                fontWeight: "500",
                                                opacity: "100%",
                                            }}
                                        >
                                            Active
                                        </Typography>
                                    }
                                    sx={{
                                        "& .MuiSvgIcon-root": {
                                            fontSize: {
                                                xs: "12px",
                                                sm: "12px",
                                                md: "16px",
                                                lg: "16px",
                                            },
                                        },
                                    }}
                                />
                            </Box>
                            <Box
                                sx={{
                                    margin: "0 auto",
                                    width: "80%",
                                }}
                            >
                                <ZoomInAndZoomOut
                                    value={data?.PROMO_IMAGE}
                                    width="100%"
                                    styles={{
                                        width: "180px",
                                        // height: {
                                        //     xs:"10px",

                                        // },
                                        objectFit: "cover",
                                        paddingBlock: ".5rem",
                                    }}
                                    handleImage={handleImage}
                                    // error={!!errors.PROMO_IMAGE}
                                    // helperText={errors.PROMO_IMAGE}
                                />
                            </Box>
                            {/* <Box
                                sx={{
                                    margin: {
                                        xs: "15px auto 5px",
                                        sm: "0 auto",
                                    },
                                    width: "80%",
                                }}
                            >
                                <CustomInputField
                                    label="Promo Code"
                                    value={data?.PROMO_CODE || ""}
                                    onChange={(e) => {
                                        handleOnChange(
                                            "PROMO_CODE",
                                            e.target.value
                                        );
                                    }}
                                    type={"text"}
                                    disabled={true}
                                    maxLength={50}
                                    minLength={2}
                                />
                            </Box> */}
                            <Box
                                sx={{
                                    margin: "0 auto",
                                    width: "80%",
                                }}
                            >
                                <CustomInputField
                                    label="Description"
                                    value={data?.PROMO_DESC || ""}
                                    onChange={(e) => {
                                        handleOnChange(
                                            "PROMO_DESC",
                                            e.target.value
                                        );
                                    }}
                                    type={"text"}
                                    disabled={false}
                                    error={!!errors.PROMO_DESC}
                                    helperText={errors.PROMO_DESC}
                                    maxLength={150}
                                    minLength={2}
                                />
                            </Box>
                            <Box
                                sx={{
                                    margin: "0 auto",
                                    width: "80%",
                                }}
                            >
                                <FormControl
                                    variant="standard"
                                    sx={{
                                        padding: "7px 0px",
                                        margin: {
                                            xs: "2px 0",
                                            md: "0px 0px 0px",
                                        },
                                        width: {
                                            xs: "100%",
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
                                    >
                                        Big Description
                                    </InputLabel>
                                    <OutlinedInput
                                        multiline
                                        rows={2}
                                        value={data?.DESC || ""}
                                        onChange={(e) => {
                                            handleOnChange(
                                                "DESC",
                                                e.target.value
                                            );
                                        }}
                                        required
                                        sx={{
                                            "& input[type=number]": {
                                                "-moz-appearance": "textfield",
                                            },

                                            "& input[type=number]::-webkit-outer-spin-button":
                                            {
                                                "-webkit-appearance":
                                                    "none",

                                                margin: 0,
                                            },

                                            "& input[type=number]::-webkit-inner-spin-button":
                                            {
                                                "-webkit-appearance":
                                                    "none",

                                                margin: 0,
                                            },

                                            margin: "14px 0 0 0",

                                            backgroundColor: "white",

                                            "&:focus": {
                                                boxShadow:
                                                    "rgba(25,118,210,0.25) 0 0 0 0.2rem",

                                                borderColor: "#1976d2",
                                            },

                                            bordeRadius: "4px",

                                            "& input::placeholder": {
                                                fontSize: "13px",

                                                fontWeight: "bolder",
                                            },

                                            padding: "10px;",
                                        }}
                                        placeholder={`Enter More Details`}
                                        inputProps={{
                                            maxLength: 150,
                                            minLength: 2,
                                        }}
                                    />
                                </FormControl>
                            </Box>

                            <Box
                                sx={{
                                    display: "flex",
                                    justifyContent: "start",
                                    margin: "0 auto",
                                    width: "80%",
                                }}
                            >
                                <FormControl>
                                    <FormLabel
                                        sx={{
                                            fontFamily: "Poppins !important",
                                            fontWeight: "700",
                                            fontSize: ".8rem",
                                        }}
                                    >
                                        Gender
                                    </FormLabel>
                                    <RadioGroup
                                        row
                                        value={data?.cust_gender || ""}
                                        // aria-labelledby="demo-row-radio-buttons-group-label"
                                        // name="row-radio-buttons-group"
                                        onChange={(e) =>
                                            handleOnChange(
                                                "cust_gender",
                                                e.target.value
                                            )
                                        }
                                        color="secondary"
                                    >
                                        <FormControlLabel
                                            value="male"
                                            control={
                                                <Radio
                                                    color="secondary"
                                                    sx={{
                                                        "& .MuiSvgIcon-root": {
                                                            fontSize: 18,
                                                        },
                                                    }}
                                                />
                                            }
                                            label="Male"
                                            sx={{
                                                "& .MuiFormControlLabel-label":
                                                {
                                                    fontFamily:
                                                        "Poppins !important",
                                                    fontSize: "15px",
                                                    color: "rgba(0, 0, 0, .6)",
                                                },
                                            }}
                                        />
                                        <FormControlLabel
                                            value="female"
                                            control={
                                                <Radio
                                                    color="secondary"
                                                    sx={{
                                                        "& .MuiSvgIcon-root": {
                                                            fontSize: 18,
                                                        },
                                                    }}
                                                />
                                            }
                                            label="Female"
                                            sx={{
                                                "& .MuiFormControlLabel-label":
                                                {
                                                    fontFamily:
                                                        "Poppins !important",
                                                    fontSize: "15px",
                                                    color: "rgba(0, 0, 0, .6)",
                                                },
                                            }}
                                        />
                                        <FormControlLabel
                                            value="all"
                                            control={
                                                <Radio
                                                    color="secondary"
                                                    sx={{
                                                        "& .MuiSvgIcon-root": {
                                                            fontSize: 18,
                                                        },
                                                    }}
                                                />
                                            }
                                            label="All"
                                            sx={{
                                                "& .MuiFormControlLabel-label":
                                                {
                                                    fontFamily:
                                                        "Poppins !important",
                                                    fontSize: "15px",
                                                    color: "rgba(0, 0, 0, .6)",
                                                },
                                            }}
                                        />
                                    </RadioGroup>
                                </FormControl>
                            </Box>
                            <SelectButton
                                height="32px"
                                sx={{
                                    margin: {
                                        xs : ".5rem auto 0",
                                        sm: "0rem auto 0"
                                    },
                                    width: "80%",
                                }}
                                name="Location Type"
                                obj="LOC_ID"
                                value={data?.LOC_ID || ""}
                                placeholder="Type"
                                option={listOfLocation}
                                handleInputChange={handleOnChange}
                                error={!!errors.LOC_ID}
                                helperText={errors.LOC_ID}
                                backgroundColor={"transparent"}
                                margin={"20px 0 0 0"}
                            />
                                           {/* <SelectButton
                                        name="Customer Type"
                                        obj="customer_type"
                                        value={data?.customer_type || ""}
                                        placeholder="customer type"
                                        option={customerTypeData}
                                        handleInputChange={handleInputChange}
                                        height="36px"
                                    /> */}
                            <Box
                                sx={{
                                    display: "flex",
                                    justifyContent: "space-between",
                                    // gap: ".8rem",
                                    margin: {
                                        xs: "8px auto",
                                        md: "0 auto",
                                    },
                                    width: "80%",
                                }}
                            >
                                <CustomInputField
                                    label="Time From"
                                    wxs={"48%"}
                                    wmd={"48%"}
                                    wlg={"48%"}
                                    height="32px"
                                    value={data?.TIME_FROM || ""}
                                    onChange={(e) =>
                                        handleOnChange(
                                            "TIME_FROM",
                                            e.target.value
                                        )
                                    }
                                    type="time"
                                    labelFontSize="1rem"
                                    labelFontFamily="Poppins"
                                    labelFontWeight="600"
                                    error={!!errors.TIME_FROM}
                                    helperText={errors.TIME_FROM}
                                />
                                <CustomInputField
                                    label="Time To"
                                    wxs={"48%"}
                                    wmd={"48%"}
                                    wlg={"48%"}
                                    height="32px"
                                    value={data?.TIME_TO || ""}
                                    onChange={(e) =>
                                        handleOnChange(
                                            "TIME_TO",
                                            e.target.value
                                        )
                                    }
                                    type="time"
                                    labelFontSize="1rem"
                                    labelFontFamily="Poppins"
                                    labelFontWeight="600"
                                    error={!!errors.TIME_TO}
                                    helperText={errors.TIME_TO}
                                />
                            </Box>

                            <Box
                                sx={{
                                    display: "flex",
                                    // justifyContent: "space-around",
                                    margin: "0 auto",
                                    width: "80%",
                                    justifyContent: "space-between",
                                }}
                            >
                                <FormControl
                                    variant="standard"
                                    sx={{
                                        padding: "7px 0px",
                                        width: {
                                            xs: "48%",
                                        },
                                    }}
                                    error={!!errors.VALID_FROM} // Add error prop
                                >
                                    <InputLabel
                                        sx={{
                                            fontFamily: "Poppins !important",
                                            fontWeight: "700",
                                        }}
                                        shrink
                                        htmlFor="bootstrap-input"
                                    >
                                        Start Date
                                    </InputLabel>
                                    <OutlinedInput
                                        value={formatDateForInput(
                                            data?.VALID_FROM
                                        )}
                                        type="date"
                                        onChange={(e) =>
                                            handleOnChange(
                                                "VALID_FROM",
                                                e.target.value
                                            )
                                        }
                                        sx={{
                                            margin: "14px 0 0 0",
                                            backgroundColor: "white",
                                            "&:focus": {
                                                boxShadow:
                                                    "rgba(25,118,210,0.25) 0 0 0 0.2rem",
                                                borderColor: "#1976d2",
                                            },
                                            height: "35px",
                                            borderRadius: "4px",
                                        }}
                                        placeholder="Select Date"
                                    />
                                    <FormHelperText>
                                        {errors.VALID_FROM}
                                    </FormHelperText>
                                </FormControl>
                                <FormControl
                                    variant="standard"
                                    sx={{
                                        padding: "7px 0px",
                                        width: {
                                            xs: "48%",
                                        },
                                    }}
                                    error={!!errors.VALID_TO} // Add error prop
                                >
                                    <InputLabel
                                        sx={{
                                            fontFamily: "Poppins !important",
                                            fontWeight: "700",
                                        }}
                                        shrink
                                        htmlFor="bootstrap-input"
                                    >
                                        End Date
                                    </InputLabel>
                                    <OutlinedInput
                                        value={formatDateForInput(
                                            data?.VALID_TO
                                        )}
                                        type="date"
                                        onChange={(e) => {
                                            handleOnChange(
                                                "VALID_TO",
                                                e.target.value
                                            );
                                        }}
                                        sx={{
                                            margin: "14px 0 0 0",
                                            backgroundColor: "white",
                                            "&:focus": {
                                                boxShadow:
                                                    "rgba(25,118,210,0.25) 0 0 0 0.2rem",
                                                borderColor: "#1976d2",
                                            },
                                            height: "35px",
                                            borderRadius: "4px",
                                        }}
                                        placeholder="Select Date"
                                    />
                                    <FormHelperText>
                                        {errors.VALID_TO}
                                    </FormHelperText>
                                </FormControl>
                            </Box>
                            <Box
                                sx={{
                                    display: "flex",
                                    justifyContent: "space-between",
                                    width: "80%",
                                    margin: "0 auto",
                                }}
                            >
                                <Button
                                    sx={{
                                        width: "48%",
                                        height: "auto",
                                        marginBlock: {
                                            xs: ".5rem",
                                            md: ".2rem",
                                        },
                                    }}
                                    variant="outlined"
                                    color="secondary"
                                // onClick={handleSave}
                                >
                                    <input
                                        type="file"
                                        accept="image/*"
                                        style={{
                                            position: "absolute",
                                            top: 0,
                                            left: 0,
                                            width: "100%",
                                            height: "100%",
                                            opacity: 0,
                                            cursor: "pointer",
                                        }}
                                        // value={data?.promo_flyer || ''}
                                        onChange={handleFileSelect}
                                        onClick={handleFlyer}
                                    />
                                    Attach Flyer
                                </Button>

                                <Button
                                    sx={{
                                        width: "48%",
                                        height: "auto",
                                        marginBlock: {
                                            xs: ".5rem",
                                            md: ".2rem",
                                        },
                                    }}
                                    variant="outlined"
                                    color="secondary"
                                    onClick={() => setDialogOpen(true)}
                                >
                                    Preview Flyer
                                </Button>
                                <Dialog
                                    open={isDialogOpen}
                                    onClose={handleCancel}
                                >
                                    <DialogTitle> Preview of Flyer</DialogTitle>

                                    <IconButton
                                        aria-label="close"
                                        onClick={handleCancel}
                                        sx={{
                                            position: "absolute",
                                            right: 8,
                                            top: 8,
                                            color: (theme) =>
                                                theme.palette.grey[500],
                                        }}
                                    >
                                        <CloseIcon />
                                    </IconButton>

                                    <DialogContent
                                        sx={{
                                            padding: "0 24px",
                                        }}
                                    >
                                        <div
                                            style={{
                                                width: "30rem",
                                                height: "20rem",
                                                display: "flex",
                                                justifyContent: "center",
                                                alignItems: "center",
                                                // backgroundColor: "red",
                                                // padding: "1rem 0",
                                                overflow: "auto",
                                                transition:
                                                    "transform 0.1s ease", // Add smooth transition
                                            }}
                                        >
                                            <TransformWrapper>
                                                {/* <Controls /> */}
                                                <TransformComponent>
                                                    <img
                                                        src={
                                                            previewUrl
                                                                ? previewUrl
                                                                : `${imageURL}${data.promo_flyer}`
                                                        }
                                                        alt="Preview"
                                                        style={{
                                                            width: "318px",
                                                            height: "300px",
                                                            transform: `scale(${zoomLevel})`, // Apply zoom level to the image
                                                            transition:
                                                                "transform 0.1s ease", // Add smooth transition
                                                        }}
                                                    />
                                                </TransformComponent>
                                            </TransformWrapper>
                                        </div>
                                    </DialogContent>

                                    <DialogActions>
                                        <IconButton
                                            sx={{
                                                color: "#373434",
                                            }}
                                            onClick={handleZoomIn}
                                        >
                                            <ZoomInIcon
                                                sx={{
                                                    fontSize: "1.8rem",
                                                }}
                                            />
                                        </IconButton>
                                        <IconButton
                                            sx={{
                                                color: "#373434",
                                            }}
                                            onClick={handleZoomOut}
                                        >
                                            <ZoomOutIcon
                                                sx={{
                                                    fontSize: "1.8rem",
                                                }}
                                            />
                                        </IconButton>
                                        <Button
                                            variant="contained"
                                            sx={{ width: "80px" }}
                                            onClick={handleUpload}
                                            color="primary"
                                        >
                                            Save
                                        </Button>
                                        <Button
                                            variant="contained"
                                            sx={{ width: "80px" }}
                                            onClick={handleCancel}
                                            color="error"
                                        >
                                            Cancel
                                        </Button>
                                    </DialogActions>
                                </Dialog>
                            </Box>

                            {button ? (
                                <LoadingButton
                                    loading={loading}
                                    sx={{
                                        width: "80%",
                                        margin: ".5rem auto 1rem",
                                    }}
                                    variant="contained"
                                    color="secondary"
                                    onClick={handleUpdate}
                                >
                                    UPDATE
                                </LoadingButton>
                            ) : (
                                <LoadingButton
                                    loading={loading}
                                    sx={{
                                        width: "80%",
                                        margin: ".5rem auto 1rem",
                                    }}
                                    variant="contained"
                                    color="secondary"
                                    onClick={handleSave}
                                >
                                    SAVE
                                </LoadingButton>
                            )}
                        </Box>
                    </div>
                </>
            </Box>
        </>
    );
}

export default PromotionsCreate;
