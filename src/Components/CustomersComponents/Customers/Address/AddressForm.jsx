import { LoadingButton } from "@mui/lab";
import {
    Checkbox,
    FormControlLabel,
    LinearProgress,
    Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { v4 } from "uuid";

import {
    resetAddressData,
    setAddressData,
    setSingleCustomerDetails,
    updateAddress,
} from "../../../../Redux/Slices/CustomerSlice";
import pushToSingleCustomerDetailsArray from "../../../../Utils/pushToSingleCustomerDetailsArray";
import CustomInputField from "../../../CommonComponents/CustomInputField";
import SelectButton from "../../../CommonComponents/SelectButton";

export default function AddressForm({ navBack }) {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const {
        singleCustomerDetails,
        singleCustomerDetailsLoading,
        isCreate,
        selectedCustomerId,
        addressData,
        isCreateAddress,
    } = useSelector((state) => state.customer);

    const customerAddressData = useSelector(
        (state) => state.customer.singleCustomerDetails.ADDRESS
    );

    const [errors, setErrors] = useState({});

    const validateFields = () => {
        const newErrors = {};
        if (!addressData.Country) newErrors.Country = "Country is required";
        if (!addressData.Phone_number)
            newErrors.Phone_number = "Phone number is required";
        if (!addressData.Address_line)
            newErrors.Address_line = "Address line is required";
        if (!addressData.City) newErrors.City = "City is required";
        if (!addressData.State) newErrors.State = "State is required";
        if (!addressData.Zip_code) newErrors.Zip_code = "Zip code is required";
        setErrors(newErrors);
        setTimeout(() => {
            setErrors({});
        }, 2000);
        return Object.keys(newErrors).length === 0;
    };

    const handleInputChange = (field, value) => {
        dispatch(setAddressData({ [field]: value }));
    };

    const handleCreate = () => {
        if (!validateFields()) return;

        let newData = JSON.parse(JSON.stringify(addressData));
        if (newData) {
            newData["Customer_id"] = "";
        }
        if (isCreateAddress) {
            let newId = v4();
            while (
                customerAddressData.some(
                    (address) => address.frontEndId === newId
                )
            ) {
                newId = v4();
            }
            if (newData) {
                newData["frontEndId"] = newId;
            }
        }
        const payload = pushToSingleCustomerDetailsArray(
            singleCustomerDetails,
            "ADDRESS",
            newData
        );
        dispatch(setSingleCustomerDetails(payload));
        navBack();
    };

    const handleUpdate = () => {
        if (!validateFields()) return;

        dispatch(updateAddress(addressData));
        navBack();
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
                    flexDirection: { xs: "column", md: "row" },
                    gap: "1rem",
                    justifyContent: "space-evenly",
                    alignItems: "start",
                    boxShadow: "0px 4px 15px 8px rgba(238, 238, 238, 1)",
                    borderRadius: "10px",
                    bgcolor: "white",
                }}
            >
                <Box sx={{ width: { xs: "100%" } }}>
                    <Box
                        sx={{
                            display: "flex",
                            justifyContent: "space-between",
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
                            Address details
                        </Typography>
                        <FormControlLabel
                            control={
                                <Checkbox
                                    color="secondary"
                                    checked={
                                        addressData.default_status?.toUpperCase() ===
                                        "Y"
                                    }
                                    onChange={(e) =>
                                        handleInputChange(
                                            "default_status",
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
                                    Default
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
                    <Box>
                        <Box
                            sx={{
                                display: "flex",
                                marginTop: "20px",
                                justifyContent: "start",
                                alignItems: "start",
                                gap: "5px",
                                flexDirection: "column",
                            }}
                        >
                            <SelectButton
                                sx={{
                                    width: {
                                        xs: "100%",
                                        lg: "100%",
                                    },
                                    paddingTop: "5px",
                                }}
                                name="Country Name"
                                obj="Country"
                                value={addressData?.Country}
                                placeholder="country name"
                                option={[{ name: "India" }, { name: "USA" }]}
                                handleInputChange={handleInputChange}
                                height="36px"
                                error={!!errors.Country}
                                helperText={errors.Country}
                            />

                            <CustomInputField
                                label="Phone Number"
                                value={addressData.Phone_number}
                                onChange={(e) =>
                                    handleInputChange(
                                        "Phone_number",
                                        e.target.value
                                    )
                                }
                                type="number"
                                error={!!errors.Phone_number}
                                helperText={errors.Phone_number}
                                maxLength={10}
                                minLength={2}
                            />
                            <CustomInputField
                                label="Address Line"
                                value={addressData.Address_line}
                                onChange={(e) =>
                                    handleInputChange(
                                        "Address_line",
                                        e.target.value
                                    )
                                }
                                type="text"
                                error={!!errors.Address_line}
                                helperText={errors.Address_line}
                                maxLength={150}
                            />

                            <CustomInputField
                                label="City"
                                value={addressData.City}
                                onChange={(e) =>
                                    handleInputChange("City", e.target.value)
                                }
                                type="text"
                                error={!!errors.City}
                                helperText={errors.City}
                                maxLength={50}
                                minLength={2}
                            />
                            <CustomInputField
                                label="State"
                                value={addressData.State}
                                onChange={(e) =>
                                    handleInputChange("State", e.target.value)
                                }
                                type="text"
                                error={!!errors.State}
                                helperText={errors.State}
                                maxLength={50}
                                minLength={2}
                            />
                            <CustomInputField
                                label="Zip Code"
                                value={addressData.Zip_code}
                                onChange={(e) =>
                                    handleInputChange(
                                        "Zip_code",
                                        e.target.value
                                    )
                                }
                                type="text"
                                error={!!errors.Zip_code}
                                helperText={errors.Zip_code}
                                maxLength={10}
                                minLength={2}
                            />
                            <Box
                                sx={{
                                    display: "flex",
                                    width: "100%",
                                    gap: "1rem",
                                }}
                            >
                                {isCreateAddress ? (
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
                                    onClick={() => dispatch(resetAddressData())}
                                    sx={{ width: { xs: "50%" } }}
                                >
                                    Reset
                                </LoadingButton>
                            </Box>
                        </Box>
                    </Box>
                </Box>
            </Box>
        </Box>
    );
}
