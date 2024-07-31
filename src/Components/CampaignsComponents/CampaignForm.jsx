import {
    Box,
    Button,
    Checkbox,
    FormControl,
    FormControlLabel,
    InputLabel,
    LinearProgress,
    MenuItem,
    Select,
    Typography,
} from "@mui/material";
import { useState } from "react";
import CustomInputField from "../CommonComponents/CustomInputField";
import ResponsiveDatePickers from "../CommonComponents/CustomerDatePicker";

export default function CampaignForm({ navBack }) {
    const [formData, setFormData] = useState({
        name: "",
        startDate: "",
        endDate: "",
        startTime: "",
        endTime: "",
        createdBy: "",
        modifiedBy: "",
        modifiedOn: "",
        emailTemplate: "",
        formAddress: "",
        schedule: false,
    });

    const [errors, setErrors] = useState({});

    const validateFields = () => {
        const newErrors = {};
        // Add validation logic here if needed
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleInputChange = (field, value) => {
        setFormData({ ...formData, [field]: value });
    };

    const handleCreate = () => {
        if (!validateFields()) return;
        // Dispatch create action
        // Example: dispatch(createCampaign(formData));
        navBack(false);
    };

    const handleUpdate = () => {
        if (!validateFields()) return;
        // Dispatch update action
        // Example: dispatch(updateCampaign(formData));
        navBack(false);
    };

    if (false)
        // Replace with actual loading condition
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
                <Typography
                    sx={{
                        color: "#070175",
                        fontSize: "18px",
                        fontFamily: "Poppins !important",
                        fontWeight: "900",
                    }}
                >
                    Campaign Details
                </Typography>
                <CustomInputField
                    wlg="100%"
                    label="Name"
                    value={formData.name}
                    onChange={(e) => handleInputChange("name", e.target.value)}
                    type="text"
                    error={!!errors.name}
                    helperText={errors.name}
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
                        obj="startDate"
                        value={formData.startDate}
                        handleInputChange={handleInputChange}
                        dateFormat="YYYY-MM-DD"
                        FormatValues={["year", "month", "day"]}
                        Format="YYYY-MM-DD"
                        error={!!errors.startDate}
                        helperText={errors.startDate}
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
                        End Date
                    </InputLabel>
                    <ResponsiveDatePickers
                        obj="endDate"
                        value={formData.endDate}
                        handleInputChange={handleInputChange}
                        dateFormat="YYYY-MM-DD"
                        FormatValues={["year", "month", "day"]}
                        Format="YYYY-MM-DD"
                        error={!!errors.startDate}
                        helperText={errors.startDate}
                    />
                </FormControl>
                <CustomInputField
                    wlg="100%"
                    label="Start Time"
                    value={formData.startTime}
                    onChange={(e) =>
                        handleInputChange("startTime", e.target.value)
                    }
                    type="time"
                    error={!!errors.startTime}
                    helperText={errors.startTime}
                />
                <CustomInputField
                    wlg="100%"
                    label="End Time"
                    value={formData.endTime}
                    onChange={(e) =>
                        handleInputChange("endTime", e.target.value)
                    }
                    type="time"
                    error={!!errors.endTime}
                    helperText={errors.endTime}
                />
                <CustomInputField
                    wlg="100%"
                    label="Created By"
                    value={formData.createdBy}
                    onChange={(e) =>
                        handleInputChange("createdBy", e.target.value)
                    }
                    type="text"
                    error={!!errors.createdBy}
                    helperText={errors.createdBy}
                />
                <CustomInputField
                    wlg="100%"
                    label="Modified By"
                    value={formData.modifiedBy}
                    onChange={(e) =>
                        handleInputChange("modifiedBy", e.target.value)
                    }
                    type="text"
                    error={!!errors.modifiedBy}
                    helperText={errors.modifiedBy}
                />
                <CustomInputField
                    wlg="100%"
                    label="Modified On"
                    value={formData.modifiedOn}
                    onChange={(e) =>
                        handleInputChange("modifiedOn", e.target.value)
                    }
                    type="text"
                    error={!!errors.modifiedOn}
                    helperText={errors.modifiedOn}
                />
                <FormControl
                    variant="standard"
                    fullWidth
                    sx={{ marginBottom: "16px" }}
                >
                    <InputLabel>Email Template</InputLabel>
                    <Select
                        value={formData.emailTemplate}
                        onChange={(e) =>
                            handleInputChange("emailTemplate", e.target.value)
                        }
                    >
                        <MenuItem value="Template1">Template 1</MenuItem>
                        <MenuItem value="Template2">Template 2</MenuItem>
                        {/* Add more options as needed */}
                    </Select>
                </FormControl>
                <FormControl
                    variant="standard"
                    fullWidth
                    sx={{ marginBottom: "16px" }}
                >
                    <InputLabel>Form Address</InputLabel>
                    <ResponsiveDatePickers
                        obj="formAddress"
                        value={formData.formAddress}
                        handleInputChange={handleInputChange}
                        dateFormat="YYYY-MM-DD"
                        FormatValues={["year", "month", "day"]}
                        Format="YYYY-MM-DD"
                        error={!!errors.formAddress}
                        helperText={errors.formAddress}
                    />
                </FormControl>
                <FormControlLabel
                    control={
                        <Checkbox
                            color="secondary"
                            checked={formData.schedule}
                            onChange={(e) =>
                                handleInputChange("schedule", e.target.checked)
                            }
                        />
                    }
                    label={
                        <Typography
                            sx={{
                                fontSize: "14px",
                                marginTop: "2px",
                                fontWeight: "500",
                                opacity: "95%",
                            }}
                        >
                            Schedule
                        </Typography>
                    }
                    sx={{
                        "& .MuiSvgIcon-root": {
                            fontSize: "18px",
                        },
                    }}
                />
                <Box
                    sx={{
                        display: "flex",
                        width: "100%",
                        gap: "1rem",
                        marginTop: "20px",
                    }}
                >
                    <Button
                        variant="contained"
                        color="secondary"
                        onClick={handleCreate}
                        sx={{ width: { xs: "50%" } }}
                    >
                        Create
                    </Button>
                    <Button
                        variant="outlined"
                        color="secondary"
                        onClick={handleUpdate}
                        sx={{ width: { xs: "50%" } }}
                    >
                        Update
                    </Button>
                </Box>
            </Box>
        </Box>
    );
}
