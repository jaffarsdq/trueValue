import { LoadingButton } from "@mui/lab";
import {
    Checkbox,
    FormControl,
    FormControlLabel,
    InputLabel,
    LinearProgress,
    Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { v4 } from "uuid";

import {
    resetCardData,
    setCardData,
    setSingleCustomerDetails,
    updateCard,
} from "../../../../Redux/Slices/CustomerSlice";
import pushToSingleCustomerDetailsArray from "../../../../Utils/pushToSingleCustomerDetailsArray";
import ResponsiveDatePickers from "../../../CommonComponents/CustomerDatePicker";
import CustomInputField from "../../../CommonComponents/CustomInputField";

export default function CardForm({ navBack }) {
    const dispatch = useDispatch();

    const {
        singleCustomerDetails,
        singleCustomerDetailsLoading,
        isCreate,
        selectedCustomerId,
        cardData,
        isCreateCard,
    } = useSelector((state) => state.customer);

    const customerCardData = useSelector(
        (state) => state.customer.singleCustomerDetails.LOY_CARDS
    );

    const [errors, setErrors] = useState({});

    useEffect(() => {
        const today = new Date().toISOString().split("T")[0]; // "YYYY-MM-DD"
        const [year, month, day] = today.split("-");
        const formattedDate = `${day}-${month}-${year}`; // Get today's date in YYYY-MM-DD format
        dispatch(setCardData({ card_issue_date: formattedDate }));
        dispatch(setCardData({ custcode: String(selectedCustomerId) }));
    }, [dispatch, selectedCustomerId]);

    const validateFields = () => {
        const newErrors = {};
        if (!cardData.cardname) newErrors.cardname = "Card Name is required";
        if (!cardData.first_name)
            newErrors.first_name = "First Name is required";
        if (!cardData.last_name) newErrors.last_name = "Last Name is required";
        if (!cardData.start_date)
            newErrors.start_date = "Start Date is required";
        if (!cardData.card_exp_date)
            newErrors.card_exp_date = "Card Expiry Date is required";
        setErrors(newErrors);
        setTimeout(() => {
            setErrors({});
        }, 2000);
        return Object.keys(newErrors).length === 0;
    };

    const handleInputChange = (field, value) => {
        const today = new Date().toISOString().split("T")[0]; // "YYYY-MM-DD"
        const [year, month, day] = today.split("-");
        const formattedDate = `${day}-${month}-${year}`; // Get today's date in YYYY-MM-DD format
        dispatch(setCardData({ [field]: value }));
        if (isCreateCard) {
            let newId = v4();
            while (customerCardData.some((card) => card.frontEndId === newId)) {
                newId = v4();
            }
            dispatch(setCardData({ ["frontEndId"]: newId }));
            dispatch(setCardData({ card_issue_date: formattedDate }));
            if (!cardData.custcode)
                dispatch(setCardData({ custcode: String(selectedCustomerId) }));
        }
    };

    const handleCreate = () => {
        if (!validateFields()) return;

        const payload = pushToSingleCustomerDetailsArray(
            singleCustomerDetails,
            "LOY_CARDS",
            cardData
        );
        dispatch(setSingleCustomerDetails(payload));
        navBack(false);
        dispatch(resetCardData());
    };

    const handleUpdate = () => {
        if (!validateFields()) return;

        dispatch(updateCard(cardData));
        navBack(false);
        dispatch(resetCardData());
    };

    if (singleCustomerDetailsLoading && !isCreate)
        return <LinearProgress color="secondary" />;

    return (
        <Box sx={{ minHeight: "calc(100dvh - 110px)", bgcolor: "#FAFBFC" }}>
            <Box
                sx={{
                    width: { xs: "96%", sm: "56%", md: "48%", lg: "40%" },
                    minHeight: "fit-content",
                    padding: "20px 40px",
                    margin: "10px auto",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-evenly",
                    alignItems: "start",
                    boxShadow: "0px 4px 15px 8px rgba(238, 238, 238, 1)",
                    borderRadius: "10px",
                    bgcolor: "white",
                }}
            >
                <Box
                    sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        width: "100%",
                    }}
                >
                    <Typography
                        sx={{
                            color: "#070175",
                            fontSize: "18px",
                            fontFamily: "Poppins !important",
                            fontWeight: "900",
                        }}
                    >
                        Card Details
                    </Typography>
                    <FormControlLabel
                        control={
                            <Checkbox
                                color="secondary"
                                checked={cardData.valid?.toUpperCase() === "Y"}
                                onChange={(e) =>
                                    handleInputChange(
                                        "valid",
                                        e.target.checked ? "Y" : "N"
                                    )
                                }
                            />
                        }
                        label={
                            <Typography
                                sx={{
                                    fontSize: "12px",
                                    marginTop: "2px",
                                    fontWeight: "500",
                                    opacity: "95%",
                                }}
                            >
                                Valid
                            </Typography>
                        }
                        sx={{
                            "& .MuiSvgIcon-root": {
                                fontSize: {
                                    xs: "12px",
                                    sm: "12px",
                                    md: "18px",
                                    lg: "18px",
                                },
                            },
                        }}
                    />
                </Box>
                <CustomInputField
                    wlg="100%"
                    label="Card Name"
                    value={cardData.cardname}
                    onChange={(e) =>
                        handleInputChange("cardname", e.target.value)
                    }
                    type="text"
                    error={!!errors.cardname}
                    helperText={errors.cardname}
                />
                <CustomInputField
                    wlg="100%"
                    label="First Name"
                    value={cardData.first_name}
                    onChange={(e) =>
                        handleInputChange("first_name", e.target.value)
                    }
                    type="text"
                    error={!!errors.first_name}
                    helperText={errors.first_name}
                />
                <CustomInputField
                    wlg="100%"
                    label="Last Name"
                    value={cardData.last_name}
                    onChange={(e) =>
                        handleInputChange("last_name", e.target.value)
                    }
                    type="text"
                    error={!!errors.last_name}
                    helperText={errors.last_name}
                />
                <FormControl
                    variant="standard"
                    sx={{
                        margin: "2px 0",
                        padding: "7px 0",
                        width: {
                            xs: "100%",
                            lg: "100%",
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
                        Start Date
                    </InputLabel>
                    <ResponsiveDatePickers
                        Height="3px"
                        obj="start_date"
                        value={cardData.start_date}
                        handleInputChange={handleInputChange}
                        dateFormat="DD-MM-YYYY"
                        FormatValues={["day", "month", "year"]}
                        Format={"DD-MM-YYYY"}
                        marginTop="1.2rem"
                        error={!!errors.start_date}
                        helperText={errors.start_date}
                    />
                </FormControl>

                <FormControl
                    variant="standard"
                    sx={{
                        margin: "2px 0",
                        padding: "7px 0",
                        width: {
                            xs: "100%",
                            lg: "100%",
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
                        Card Expiry Date
                    </InputLabel>
                    <ResponsiveDatePickers
                        Height="3px"
                        obj="card_exp_date"
                        value={cardData.card_exp_date}
                        handleInputChange={handleInputChange}
                        dateFormat="DD-MM-YYYY"
                        FormatValues={["day", "month", "year"]}
                        Format={"DD-MM-YYYY"}
                        marginTop="1.2rem"
                        error={!!errors.card_exp_date}
                        helperText={errors.card_exp_date}
                    />
                </FormControl>

                <Box
                    sx={{
                        display: "flex",
                        width: "100%",
                        gap: "1rem",
                    }}
                >
                    {isCreateCard ? (
                        <LoadingButton
                            loadingPosition="start"
                            variant="contained"
                            color="secondary"
                            sx={{ width: { xs: "50%" } }}
                            onClick={handleCreate}
                        >
                            {"Create"}
                        </LoadingButton>
                    ) : (
                        <LoadingButton
                            loadingPosition="start"
                            variant="contained"
                            color="secondary"
                            sx={{ width: { xs: "50%" } }}
                            onClick={handleUpdate}
                        >
                            {"Update"}
                        </LoadingButton>
                    )}
                    <LoadingButton
                        loadingPosition="start"
                        variant="outlined"
                        color="secondary"
                        onClick={() => dispatch(resetCardData())}
                        sx={{ width: { xs: "50%" } }}
                    >
                        Reset
                    </LoadingButton>
                </Box>
            </Box>
        </Box>
    );
}
