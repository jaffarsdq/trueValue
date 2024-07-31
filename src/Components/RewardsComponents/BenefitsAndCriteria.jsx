import { Box, Button } from "@mui/material";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { v4 as uuidv4 } from "uuid";

import {
    setBenefitsAndCriteriaPoints,
    setBenefitsAndCriteriaValues,
    setRewardsFetchData,
    setRewardsValue,
    setToggelePointsButton,
    setToggleCreateRewards,
} from "../../Redux/Slices/RewardsSetupSlice";
import CustomInputField from "../CommonComponents/CustomInputField";
import Editabletable from "../CommonComponents/EditableTable";
import BenefitsAndCriteriaTable from "./BenefitsAndCriteriaTable";

function BenefitsAndCriteria() {
    const dispatch = useDispatch();

    const [formData, setFormData] = useState();
    const [errors, setErrors] = useState({});
    const [inputValues, setInputValues] = useState({
        from_value: "",
        to_value: "",
        points_value: "",
    });

    const { client_id } = useSelector((state) => state.auth);
    const pointsButton = useSelector(
        (state) => state.rewardsManagement.pointsButton
    );
    const data = useSelector(
        (state) => state.rewardsManagement.benefitsAndCriteriaPoints
    );
    const benefitsAndCriteriaData = useSelector(
        (state) => state.rewardsManagement.benefitsAndCriteriaValues
    );
    const showTableData = useSelector(
        (state) => state.rewardsManagement.createRewards
    );
    let updatedValues = useSelector(
        (state) => state.rewardsManagement.rewardsFetchData?.REWARD_VALUE
    );

    const handleInputChange = (field, value) => {
        setFormData({
            ...formData,
            [field]: value,
        });
        dispatch(setBenefitsAndCriteriaValues(formData));
    };

    const validateFormData = (data) => {
        const errors = {};
        if (!data.from_value) errors.from_value = "From value is required.";
        if (!data.to_value) errors.to_value = "To value is required.";
        if (!data.points_value)
            errors.points_value = "Points value is required.";
        return errors;
    };

    const handleAdd = () => {
        const validationErrors = validateFormData(formData);
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            setTimeout(() => setErrors({}), 3000); // Clear errors after 3 seconds
            return;
        }

        const updatedList = updatedValues.concat({
            client_id: client_id,
            ID: uuidv4(),
            from_value: parseInt(formData.from_value),
            to_value: parseInt(formData.to_value),
            points_value: parseInt(formData.points_value),
            deleted: 0,
        });

        updatedValues = updatedList;
        dispatch(setRewardsFetchData(updatedValues));
        dispatch(setRewardsValue(updatedValues));

        setFormData({
            from_value: "",
            to_value: "",
            points_value: "",
        });
    };

    const handleInputAdd = () => {
        const validationErrors = validateFormData(inputValues);
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            setTimeout(() => setErrors({}), 3000); // Clear errors after 3 seconds
            return;
        }

        const newInputValue = {
            id: uuidv4(),
            from_value: inputValues.from_value || "",
            to_value: inputValues.to_value || "",
            points_value: inputValues.points_value || "",
            deleted: 0,
        };

        setInputValues(newInputValue);
        dispatch(setBenefitsAndCriteriaPoints(newInputValue));

        setInputValues({
            from_value: "",
            points_value: "",
            to_value: "",
        });
    };

    function handleDataFromChild(data) {
        setFormData(data);
        dispatch(setBenefitsAndCriteriaValues(data));
    }

    function updateDataById(newData) {
        const updatedList = updatedValues.map((item) => {
            if (item.ID === newData.ID) {
                return {
                    ...item,
                    rewards_code: newData.rewards_code,
                    from_value: newData.from_value,
                    to_value: newData.to_value,
                    points_value: newData.points_value,
                };
            } else {
                return item;
            }
        });

        updatedValues = updatedList;
        dispatch(setRewardsFetchData(updatedValues));
        dispatch(setToggelePointsButton(true));
    }

    const handleUpdate = () => {
        const validationErrors = validateFormData(formData);
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            setTimeout(() => setErrors({}), 3000); // Clear errors after 3 seconds
            return;
        }

        updateDataById(formData);

        setFormData({
            from_value: "",
            points_value: "",
            to_value: "",
        });
    };

    useEffect(() => {
        console.log(updatedValues, "api values");
    }, [updatedValues]);



    const handleInputValues = (field, value) => {
        setInputValues({
            ...inputValues,
            [field]: value,
        });
    };

    const handleDataFromBenefitsTable = (data) => {
        setInputValues(data);
    };

    const handleInputUpdate = () => {
        const validationErrors = validateFormData(inputValues);
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            setTimeout(() => setErrors({}), 3000); // Clear errors after 3 seconds
            return;
        }
        const { from_value, to_value, points_value } = inputValues;

        const indexToUpdate = data.findIndex(
            (item) => item.id === inputValues.id
        );

        if (indexToUpdate !== -1) {
            const updatedObject = {
                ...data[indexToUpdate],
                from_value,
                to_value,
                points_value,
            };

            dispatch(setBenefitsAndCriteriaPoints(updatedObject));

            setInputValues({
                from_value: "",
                to_value: "",
                points_value: "",
            });
        } else {
            console.error("Object not found in data array.");
        }
        dispatch(setToggelePointsButton(true));
    };

    const handleCancel = () => {
        setFormData({
            from_value: "",
            points_value: "",
            to_value: "",
        });

        setInputValues({
            from_value: "",
            points_value: "",
            to_value: "",
        });
        // dispatch(setToggleCreateRewards(false))
        dispatch(setToggelePointsButton(true));
    };

    return (
        <Box>
            {showTableData ? (
                <>
                    <Box
                        sx={{
                            width: "98%",
                            margin: "0 auto",
                            padding: "0 1rem",
                        }}
                    >
                        <Box
                            sx={{
                                display: "flex",
                                justifyContent: "space-between",
                                alignItems: "center",
                                paddingBlock: "1.5rem",
                                flexWrap: "wrap",
                                gap: "1rem",
                            }}
                        >
                            <CustomInputField
                                label="From"
                                wmd={"30%"}
                                wlg={"30%"}
                                height="38px"
                                value={formData?.from_value}
                                onChange={(e) =>
                                    handleInputChange(
                                        "from_value",
                                        e.target.value
                                    )
                                }
                                type="number"
                                labelFontSize="1rem"
                                labelFontFamily="Poppins"
                                labelFontWeight="300"
                                error={!!errors.from_value}
                                helperText={errors.from_value}
                            />

                            <CustomInputField
                                label="To"
                                height="38px"
                                wmd={"30%"}
                                wlg={"30%"}
                                value={formData?.to_value}
                                onChange={(e) =>
                                    handleInputChange(
                                        "to_value",
                                        e.target.value
                                    )
                                }
                                type="number"
                                labelFontSize="1rem"
                                labelFontFamily="Poppins"
                                labelFontWeight="300"
                                error={!!errors.to_value}
                                helperText={errors.to_value}
                            />

                            <CustomInputField
                                label="Points"
                                height="38px"
                                wmd={"30%"}
                                wlg={"30%"}
                                value={formData?.points_value}
                                onChange={(e) =>
                                    handleInputChange(
                                        "points_value",
                                        e.target.value
                                    )
                                }
                                type="number"
                                labelFontSize="1rem"
                                labelFontFamily="Poppins"
                                labelFontWeight="300"
                                error={!!errors.points_value}
                                helperText={errors.points_value}
                            />
                        </Box>
                        <Box
                            sx={{
                                display: "flex",
                                justifyContent: "end",
                                alignItems: "center",
                            }}
                        >
                            {pointsButton ? (
                                <>
                                    <Button
                                        variant="outlined"
                                        onClick={handleCancel}
                                        color="secondary"
                                        sx={{
                                            height: "25px",
                                            padding: "15px",
                                            marginRight: "10px",
                                        }}
                                    >
                                        Cancel
                                    </Button>
                                    <Button
                                        variant="contained"
                                        onClick={handleAdd}
                                        color="secondary"
                                        sx={{
                                            height: "25px",
                                            padding: "15px",
                                            color: "#FFFFFF",
                                            "&:hover": {},
                                        }}
                                    >
                                        Add
                                    </Button>
                                </>
                            ) : (
                                <>
                                    <Button
                                        variant="outlined"
                                        onClick={handleCancel}
                                        color="secondary"
                                        sx={{
                                            height: "25px",
                                            padding: "15px",
                                            marginRight: "10px",
                                        }}
                                    >
                                        Cancel
                                    </Button>
                                    <Button
                                        variant="contained"
                                        color="secondary"
                                        sx={{
                                            height: "25px",
                                            padding: "15px",
                                            color: "#FFFFFF",
                                            "&:hover": {},
                                        }}
                                        onClick={handleUpdate}
                                    >
                                        Update
                                    </Button>
                                </>
                            )}
                        </Box>
                    </Box>
                    <Editabletable sendDataToParent={handleDataFromChild} />
                </>
            ) : (
                <>
                    <Box
                        sx={{
                            width: "98%",
                            margin: "0 auto",
                            padding: "0 1rem",
                        }}
                    >
                        <Box
                            sx={{
                                display: "flex",
                                justifyContent: "space-between",
                                alignItems: "center",
                                paddingBlock: "1.5rem",
                                flexWrap: "wrap",
                                gap: "1rem",
                            }}
                        >
                            <CustomInputField
                                label="From"
                                wmd={"30%"}
                                wlg={"30%"}
                                height="38px"
                                value={inputValues?.from_value}
                                onChange={(e) =>
                                    handleInputValues(
                                        "from_value",
                                        e.target.value
                                    )
                                }
                                type="number"
                                labelFontSize="1rem"
                                labelFontFamily="Poppins"
                                labelFontWeight="300"
                                error={!!errors.from_value}
                                helperText={errors.from_value}
                            />

                            <CustomInputField
                                label="To"
                                height="38px"
                                wmd={"30%"}
                                wlg={"30%"}
                                value={inputValues?.to_value}
                                onChange={(e) =>
                                    handleInputValues(
                                        "to_value",
                                        e.target.value
                                    )
                                }
                                type="number"
                                labelFontSize="1rem"
                                labelFontFamily="Poppins"
                                labelFontWeight="300"
                                error={!!errors.to_value}
                                helperText={errors.to_value}
                            />

                            <CustomInputField
                                label="Points"
                                height="38px"
                                wmd={"30%"}
                                wlg={"30%"}
                                value={inputValues?.points_value}
                                onChange={(e) =>
                                    handleInputValues(
                                        "points_value",
                                        e.target.value
                                    )
                                }
                                type="number"
                                labelFontSize="1rem"
                                labelFontFamily="Poppins"
                                labelFontWeight="300"
                                error={!!errors.points_value}
                                helperText={errors.points_value}
                            />
                        </Box>
                        <Box
                            sx={{
                                display: "flex",
                                justifyContent: "end",
                                alignItems: "center",
                            }}
                        >
                            {pointsButton ? (
                                <Box>
                                    <Button
                                        variant="outlined"
                                        onClick={handleCancel}
                                        color="secondary"
                                        sx={{
                                            height: "25px",
                                            padding: "15px",
                                            marginRight: "10px",
                                        }}
                                    >
                                        Cancel
                                    </Button>
                                    <Button
                                        variant="contained"
                                        onClick={handleInputAdd}
                                        color="secondary"
                                        sx={{
                                            height: "25px",
                                            padding: "15px",
                                            color: "#FFFFFF",
                                            "&:hover": {},
                                        }}
                                    >
                                        Add
                                    </Button>
                                </Box>
                            ) : (
                                <>
                                    <Button
                                        variant="outlined"
                                        onClick={handleCancel}
                                        color="secondary"
                                        sx={{
                                            height: "25px",
                                            padding: "15px",
                                            marginRight: "10px",
                                        }}
                                    >
                                        Cancel
                                    </Button>
                                    <Button
                                        variant="contained"
                                        color="secondary"
                                        sx={{
                                            height: "25px",
                                            padding: "15px",
                                            color: "#FFFFFF",
                                            "&:hover": {},
                                        }}
                                        onClick={handleInputUpdate}
                                    >
                                        Update
                                    </Button>
                                </>
                            )}
                        </Box>
                    </Box>
                    <BenefitsAndCriteriaTable
                        sendDataToParent={handleDataFromBenefitsTable}
                    />
                </>
            )}
        </Box>
    );
}

export default BenefitsAndCriteria;
