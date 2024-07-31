import {
    Box,
    Collapse,
    FormControl,
    InputLabel,
    LinearProgress,
} from "@mui/material";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
    fetchCustomerImageFileName,
    setProfileImg,
    setSingleCustomerDetailsForBasicInfo,
} from "../../../../Redux/Slices/CustomerSlice";
import ResponsiveDatePickers from "../../../CommonComponents/CustomerDatePicker";
import CustomInputField from "../../../CommonComponents/CustomInputField";
import ImageUploader from "../../../CommonComponents/ImageUploader";
import SelectButton from "../../../CommonComponents/SelectButton";
import ViewCustomerCode from "../../ViewCustomerCode";
import MobileNumber from "../MobileNumber/MobileNumber";
import MoreCustomerDetails from "../MoreCustomerDetails/MoreCustomerDetails";

export default function CustomerDetails() {
    const dispatch = useDispatch();

    const [errors, setErrors] = useState({
        name: "",
        email: "",
        Last_Name: "",
        description: "",
    });

    const handleImage = (formData, fileName) => {
        dispatch(setProfileImg(fileName));
        dispatch(fetchCustomerImageFileName(formData));
    };

    const customerTypeData = [
        { name: "normal customer", value: "1" },
        { name: "credit customer", value: "2" },
        { name: "loyalty customer", value: "3" },
    ];
    const createdSource = [
        { name: "Location" },
        { name: "Admin" },
        { name: "POS" },
        { name: "App" },
    ];

    const paymentTypeData = [
        { name: "Cash" },
        { name: "Credit Card" },
        { name: "Cash Prepaid or Credit" },
        { name: "Payroll" },
    ];

    const gender = [{ name: "Male" }, { name: "Female" }];

    const nationalityOptions = [
        { name: "India" },
        { name: "UAE" },
        { name: "USA" },
    ];

    const handleInputChange = (field, value) => {
        // Perform validation
        let error = "";
        if (field === "name" && !value) {
            error = "Name is required.";
        }
        if (field === "Last_Name" && !value) {
            error = "Last_Name is required.";
        }
        if (field === "description" && !value) {
            error = "description is required.";
        } else if (field === "email" && !value) {
            error = "Email is required.";
        } else if (field === "email" && !/\S+@\S+\.\S+/.test(value)) {
            error = "Email is invalid.";
        }

        setErrors((prevErrors) => ({
            ...prevErrors,
            [field]: error,
        }));

        dispatch(setSingleCustomerDetailsForBasicInfo({ [field]: value }));
    };

    const {
        singleCustomerDetailsLoading,
        isCreate,
        selectedCustomerId,
        createUpdateCustomerMsg,
    } = useSelector((state) => state.customer);

    const data = useSelector(
        (state) => state?.customer?.singleCustomerDetails?.BASICINFO[0]
    );

    const hasMoreCustomerData = data?.customer_type == 2;

    if (singleCustomerDetailsLoading && !isCreate)
        return <LinearProgress color="secondary" />;

    return (
        <Box
            sx={{
                paddingTop: "0.5rem",
                backgroundColor: "#FAFAFB",
                minHeight: "100%",
                fontFamily: "Poppins",
            }}
        >
            <Box sx={{ padding: "0 1rem 0.5rem 1rem" }}>
                <ViewCustomerCode selectedCustomerId={selectedCustomerId} />
            </Box>
            <Box
                sx={{
                    display: "flex",
                    flexDirection: "column",
                }}
            >
                <Box
                    sx={{
                        backgroundColor: "White",
                        border: " 2px solid #E6EBF1",
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        padding: "0.5rem 0.5rem 0 0.5rem",
                        borderRadius: "10px",
                        flexDirection: "column",
                        margin: "0px 10px",
                    }}
                >
                    <Box
                        sx={{
                            backgroundColor: "#FAFAFB",
                            padding: "15px ",
                            border: " 2px solid #E6EBF1",
                            borderRadius: "10px",
                            display: "flex",
                            width: "100%",
                            justifyContent: "space-between",
                            flexDirection: { xs: "column-reverse", md: "row" },
                            gap: { xs: "20px", md: 0 },
                        }}
                    >
                        <Box
                            sx={{
                                width: {
                                    xs: "100%",
                                    md: "75%",
                                    display: "flex",
                                    gap: { xs: "20px", md: "0" },
                                    flexDirection: "column",
                                },
                            }}
                        >
                            {/* first row of fields */}
                            <Box
                                sx={{
                                    display: "flex",
                                    gap: { xs: "0rem", sm: "1rem" },
                                    width: "100%",
                                    flexDirection: {
                                        xs: "column",
                                        sm: "row",
                                        md: "row",
                                    },
                                }}
                            >
                                <Box
                                    sx={{
                                        width: { xs: "98%", md: "33%" },
                                        margin: "0 auto",
                                    }}
                                >
                                    <CustomInputField
                                        label="Customer Code"
                                        value={data?.customer_id}
                                        onChange={(e) => {
                                            handleInputChange(
                                                "customer_id",
                                                e.target.value
                                            );
                                        }}
                                        type={"number"}
                                        disabled={true}
                                        error={!!errors.customer_id}
                                        helperText={errors.customer_id}
                                        maxLength={50}
                                        minLength={2}
                                    />
                                </Box>

                                <Box
                                    sx={{
                                        width: { xs: "98%", md: "33%" },
                                        margin: "0 auto",
                                    }}
                                >
                                    <SelectButton
                                        name="Customer Type"
                                        obj="customer_type"
                                        value={data?.customer_type || ""}
                                        placeholder="customer type"
                                        option={customerTypeData}
                                        handleInputChange={handleInputChange}
                                        height="36px"
                                    />
                                </Box>

                                <Box
                                    sx={{
                                        width: { xs: "98%", md: "33%" },
                                        margin: {
                                            xs: "1.5rem auto",
                                            sm: "0 auto",
                                        },
                                    }}
                                >
                                    <SelectButton
                                        name="Created Source"
                                        obj="Created_Source"
                                        value={data?.Created_Source || ""}
                                        placeholder="Created Source"
                                        option={createdSource}
                                        handleInputChange={handleInputChange}
                                        height="36px"
                                    />
                                </Box>
                            </Box>

                            {/* second row of fields */}
                            <Box
                                sx={{
                                    display: "flex",
                                    gap: { xs: "0rem", sm: "1rem" },
                                    width: "100%",
                                    flexDirection: {
                                        xs: "column",
                                        sm: "row",
                                        md: "row",
                                    },
                                }}
                            >
                                <Box
                                    sx={{
                                        width: { xs: "98%", md: "33%" },
                                        margin: "0 auto",
                                    }}
                                >
                                    <CustomInputField
                                        label="First Name"
                                        value={data?.name}
                                        onChange={(e) => {
                                            handleInputChange(
                                                "name",
                                                e.target.value
                                            );
                                        }}
                                        type="text"
                                        error={!!errors.name}
                                        helperText={errors.name}
                                        maxLength={50}
                                        minLength={2}
                                    />
                                </Box>

                                <Box
                                    sx={{
                                        width: { xs: "98%", md: "33%" },
                                        margin: "0 auto",
                                    }}
                                >
                                    <CustomInputField
                                        label="Last Name"
                                        value={data?.Last_Name}
                                        onChange={(e) => {
                                            handleInputChange(
                                                "Last_Name",
                                                e.target.value
                                            );
                                        }}
                                        type="text"
                                        error={!!errors.Last_Name}
                                        helperText={errors.Last_Name}
                                        maxLength={50}
                                        minLength={2}
                                    />
                                </Box>

                                <Box
                                    sx={{
                                        width: { xs: "98%", md: "33%" },
                                        margin: "0 auto",
                                    }}
                                >
                                    <CustomInputField
                                        label="Email"
                                        value={data?.email}
                                        onChange={(e) => {
                                            handleInputChange(
                                                "email",
                                                e.target.value
                                            );
                                        }}
                                        type="email"
                                        error={!!errors.email}
                                        helperText={errors.email}
                                        maxLength={50}
                                        minLength={2}
                                    />
                                </Box>
                            </Box>

                            {/* Third row of fields */}
                            <Box
                                sx={{
                                    display: "flex",
                                    gap: { xs: "0rem", sm: "1rem" },
                                    width: "100%",
                                    flexDirection: {
                                        xs: "column",
                                        sm: "row",
                                        md: "row",
                                    },
                                }}
                            >
                                <Box
                                    sx={{
                                        width: { xs: "98%", md: "33%" },
                                        margin: "0 auto",
                                    }}
                                >
                                    <FormControl
                                        variant="standard"
                                        sx={{
                                            margin: "2px 0",
                                            padding: "7px 0",
                                            width: "100%",
                                        }}
                                    >
                                        <InputLabel
                                            sx={{
                                                fontFamily:
                                                    "Poppins !important",
                                                fontWeight: "700",
                                            }}
                                            shrink
                                            htmlFor="bootstrap-input"
                                        >
                                            Birth Day
                                        </InputLabel>
                                        <ResponsiveDatePickers
                                            obj="Birth_day"
                                            value={data?.Birth_day}
                                            handleInputChange={
                                                handleInputChange
                                            }
                                            dateFormat="DD"
                                            FormatValues={["day"]}
                                            Format="DD"
                                            Height="3px"
                                            Width="100%"
                                            Margin="7px 0"
                                        />
                                    </FormControl>
                                </Box>

                                <Box
                                    sx={{
                                        width: { xs: "98%", md: "33%" },
                                        margin: "0 auto",
                                    }}
                                >
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
                                                fontFamily:
                                                    "Poppins !important",
                                                fontWeight: "700",
                                            }}
                                            shrink
                                            htmlFor="bootstrap-input"
                                            marginTop="1.2rem"
                                        >
                                            Birth Month
                                        </InputLabel>
                                        <ResponsiveDatePickers
                                            Height="3px"
                                            obj="Birth_month"
                                            value={data?.Birth_month}
                                            handleInputChange={
                                                handleInputChange
                                            }
                                            dateFormat="MM"
                                            FormatValues={["month"]}
                                            Format={"MM"}
                                            marginTop="1.2rem"
                                        />
                                    </FormControl>
                                </Box>

                                <Box
                                    sx={{
                                        width: { xs: "98%", md: "33%" },
                                        margin: "0 auto",
                                    }}
                                >
                                    <SelectButton
                                        name="Nationality"
                                        obj="Nationality"
                                        value={data?.Nationality || ""}
                                        placeholder="Nationality"
                                        option={nationalityOptions}
                                        handleInputChange={handleInputChange}
                                        height="36px"
                                    />
                                </Box>
                            </Box>

                            {/* fourth row of fields */}
                            <Box
                                sx={{
                                    display: "flex",
                                    gap: { xs: "1rem", sm: "1rem" },
                                    width: "100%",
                                    flexDirection: {
                                        xs: "column",
                                        sm: "row",
                                        md: "row",
                                    },
                                }}
                            >
                                <Box
                                    sx={{
                                        width: { xs: "98%", md: "32%" },
                                        margin: "0 auto",
                                    }}
                                >
                                    <SelectButton
                                        name="Gender"
                                        obj="Gender"
                                        value={data?.Gender || ""}
                                        placeholder="Gender"
                                        option={gender}
                                        handleInputChange={handleInputChange}
                                        height="36px"
                                    />
                                </Box>
                                <Box
                                    sx={{
                                        width: { xs: "98%", md: "32%" },
                                        margin: "0 auto",
                                    }}
                                >
                                    <SelectButton
                                        name="Payment Type"
                                        obj="payment_type"
                                        value={data?.payment_type || ""}
                                        placeholder="Payment Type"
                                        option={paymentTypeData}
                                        handleInputChange={handleInputChange}
                                        height="36px"
                                    />
                                </Box>

                                <Box
                                    sx={{
                                        width: { xs: "98%", md: "32%" },
                                        margin: "0 auto",
                                    }}
                                >
                                    <CustomInputField
                                        label="Description"
                                        value={data?.description}
                                        onChange={(e) => {
                                            handleInputChange(
                                                "description",
                                                e.target.value
                                            );
                                        }}
                                        type="text"
                                        error={!!errors.description}
                                        helperText={errors.description}
                                        maxLength={150}
                                        minLength={2}
                                    />
                                </Box>
                            </Box>
                        </Box>
                        <Box sx={{ width: { xs: "100%", md: "22%" } }}>
                            <Box
                                sx={{
                                    display: "flex",
                                    flexDirection: "column",
                                }}
                            >
                                <Box
                                    sx={{
                                        display: "flex",
                                        flexDirection: "column",
                                        width: "100%",
                                        height: "100%",
                                    }}
                                >
                                    <ImageUploader
                                        value={data?.profile_img}
                                        hxs={"150px"}
                                        hsm={"300px"}
                                        width={"100%"}
                                        objectname={"profile_img"}
                                        handleImage={handleImage}
                                        handleInputChange={handleInputChange}
                                    />
                                </Box>
                            </Box>
                        </Box>
                    </Box>

                    <Collapse in={hasMoreCustomerData} sx={{ width: "100%" }}>
                        <Box
                            sx={{
                                width: "100%",
                                marginTop: "10px",
                                fontWeight: "600",
                                fontSize: "14px",
                                paddingLeft: "0.5rem",
                                opacity: "0.9",
                            }}
                        >
                            More Customer Details
                        </Box>

                        <MoreCustomerDetails />
                    </Collapse>
                    <Box
                        sx={{
                            width: "100%",
                            marginTop: "10px",
                            fontWeight: "600",
                            fontSize: "14px",
                            paddingLeft: "0.5rem",
                            opacity: "0.9",
                        }}
                    >
                        Contact Number
                    </Box>

                    <MobileNumber />
                </Box>
            </Box>
        </Box>
    );
}
