import {
    Box,
    Button,
    Checkbox,
    FormControlLabel,
    Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { v4 } from "uuid";

import {
    addContactNumber as addContactNumberAction,
    deleteContactNumber,
    setSingleCustomerDetailsForMobileNumber,
} from "../../../../Redux/Slices/CustomerSlice";
import CustomInputField from "../../../CommonComponents/CustomInputField";

function MobileNumber() {
    const dispatch = useDispatch();
    const customerContactData = useSelector(
        (state) => state.customer.singleCustomerDetails.MOBILENUMBER
    );

    const { selectedCustomerId } = useSelector((state) => state.customer);
    const [errors, setErrors] = useState({});

    const handleContactNumberChange = (id, value) => {
        let error = "";
        if (!value) {
            error = "Number is required.";
        }

        setErrors((prevErrors) => ({
            ...prevErrors,
            [id]: error,
        }));

        dispatch(
            setSingleCustomerDetailsForMobileNumber({
                frontEndId: id,
                ID: id,
                mobile_number: value,
            })
        );
    };

    const handleDefaultChange = (id, checked) => {
        dispatch(
            setSingleCustomerDetailsForMobileNumber({
                default_num: checked ? "Y" : "N",
                frontEndId: id,
                ID: id,
            })
        );
    };

    useEffect(() => {
        if (customerContactData.length === 0) {
            dispatch(
                addContactNumberAction({
                    frontEndId: v4(),
                    ID: "",
                    customer_code: String(selectedCustomerId),
                    mobile_number: "",
                    default_num: "N",
                    Deleted: 0,
                })
            );
        }
    }, [customerContactData, dispatch]);

    const addContactNumber = () => {
        // Validate existing fields
        let valid = true;
        customerContactData.forEach((contact) => {
            if (!contact.mobile_number) {
                setErrors((prevErrors) => ({
                    ...prevErrors,
                    [contact.ID || contact.frontEndId]: "Number is required.",
                }));
                valid = false;
            }
        });

        if (!valid) return;

        let newId = v4();
        while (
            customerContactData.some((contact) => contact.frontEndId === newId)
        ) {
            newId = v4();
        }
        dispatch(
            addContactNumberAction({
                frontEndId: newId,
                ID: "",
                customer_code: "",
                mobile_number: "",
                default_num: "N",
                Deleted: 0,
            })
        );
    };

    const deleteContactNumberHandler = (id) => {
        dispatch(deleteContactNumber(id));
    };

    const undeletedContactData = customerContactData.filter(
        (contact) => contact.Deleted !== 1
    );

    return (
        <Box
            sx={{
                paddingTop: "0.5rem",
                minHeight: "100%",
                fontFamily: "Poppins",
                width: "100%",
            }}
        >
            <Box sx={{ display: "flex", flexDirection: "column" }}>
                <Box
                    sx={{
                        backgroundColor: "#FAFAFB",
                        border: "2px solid #E6EBF1",
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        padding: "0.5rem 1rem",
                        borderRadius: "10px",
                        flexDirection: "column",
                        marginBottom: "1rem",
                    }}
                >
                    <Box sx={{ width: "100%" }}>
                        {undeletedContactData.map((contact, index) => (
                            <Box
                                key={contact.ID || contact.frontEndId}
                                sx={{
                                    display: "flex",
                                    alignItems: "center",
                                    marginTop: index > 0 ? "1rem" : 0,
                                    gap: "1rem",
                                }}
                            >
                                <Box sx={{ width: "60%" }}>
                                    <CustomInputField
                                        maxLength={10}
                                        minLength={2}
                                        label={`Contact Number ${index + 1}`}
                                        value={contact.mobile_number}
                                        onChange={(e) =>
                                            handleContactNumberChange(
                                                contact.ID ||
                                                    contact.frontEndId,
                                                e.target.value
                                            )
                                        }
                                        type="number"
                                        error={
                                            !!errors[
                                                contact.ID || contact.frontEndId
                                            ]
                                        }
                                        helperText={
                                            errors[
                                                contact.ID || contact.frontEndId
                                            ]
                                        }
                                    />
                                </Box>
                                <FormControlLabel
                                    control={
                                        <Checkbox
                                            color="secondary"
                                            checked={
                                                contact.default_num === "Y"
                                            }
                                            onChange={(e) =>
                                                handleDefaultChange(
                                                    contact.ID ||
                                                        contact.frontEndId,
                                                    e.target.checked
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
                                            Set as default
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
                                <Button
                                    variant="contained"
                                    color="secondary"
                                    onClick={addContactNumber}
                                    sx={{
                                        backgroundColor: "secondary.main",
                                        height: "30px",
                                    }}
                                >
                                    Add
                                </Button>
                                {undeletedContactData.length > 1 && (
                                    <Button
                                        variant="contained"
                                        color="secondary"
                                        onClick={() =>
                                            deleteContactNumberHandler(
                                                contact.ID || contact.frontEndId
                                            )
                                        }
                                        sx={{
                                            backgroundColor: "secondary.main",
                                            height: "30px",
                                        }}
                                    >
                                        Delete
                                    </Button>
                                )}
                            </Box>
                        ))}
                    </Box>
                </Box>
            </Box>
        </Box>
    );
}

export default MobileNumber;
