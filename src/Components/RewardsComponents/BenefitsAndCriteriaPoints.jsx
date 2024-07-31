import AddIcon from '@mui/icons-material/Add';
import { Box, Button } from "@mui/material";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { setBenefitsAndCriteriaValues, setRewardsDetails, setToggelePointsButton } from "../../Redux/Slices/RewardsSetupSlice";
import Editabletable from "../CommonComponents/EditableTable";
import CustomInputFieldPoints from "../PointsComponents/CustomInputFieldPoints";
import BenefitsAndCriteriaTable from './BenefitsAndCriteriaTable';

function BenefitsAndCriteria() {
    // const data = useSelector((state) => state.rewardsManagement.rewardsDetails[0]);
    const dispatch = useDispatch();

    const [formData, setFormData] = useState({
        // FromValue: '',
        // ToValue: '',
        // PointsValue: '',
    });

    const pointsButton = useSelector((state) => state.rewardsManagement.pointsButton);

    const data = useSelector((state) => state.rewardsManagement.rewardsDetails.REWARDS_VALUE);

    const benefitsAndCriteriaData = useSelector((state) => state.rewardsManagement.benefitsAndCriteriaValues);

    const showTableData = useSelector((state) => state.rewardsManagement.createRewards);

    console.log(benefitsAndCriteriaData, 'BACD');
    // console.log(data, 'rewards_value');

    const handleInputChange = (field, value) => {
        setFormData({
            ...formData,
            [field]: value
        });
        // dispatch(setRewardsDetails({[field] : value})); // Dispatch action to store data in Redux
        // getInput()
    }

    const handleAdd = () => {
        console.log(formData);
        setFormData(formData)
        dispatch(setBenefitsAndCriteriaValues(formData)); // Dispatch action to store data in Redux
        // setFormData({ // Optionally reset the input fields
        //     FromValue: '',
        //     ToValue: '',
        //     PointsValue: ''
        // });
    }

    function handleDataFromChild(data) {
        console.log(data, 'rowdata');
        setFormData(data)
        dispatch(setBenefitsAndCriteriaValues(data)); // Dispatch action to store data in Redux

    }

    const handleUpdate = () => {
        dispatch(setToggelePointsButton(true))
        console.log(formData, 'updated');
        setFormData({ // Optionally reset the input fields
            from_value: '',
            points_value: '',
            to_value: ''
        });
    }

    return (
        <Box sx={{ width: "98%", margin: "0 auto", padding: "0 1rem" }}>
            <Box
                sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    paddingBlock: "1.5rem",
                    flexWrap: "wrap",
                    gap: "1rem"
                }}
            >
                <CustomInputFieldPoints
                    label="From"
                    width={{ xs: "100%", md: "30%" }}
                    height="50px"
                    value={formData.from_value}
                    onChange={(e) => handleInputChange("from_value", e.target.value)}
                    type="text"
                    labelFontSize="1rem"
                    labelFontFamily="Poppins"
                    labelFontWeight="300"
                />
                <CustomInputFieldPoints
                    label="To"
                    width={{ xs: "100%", md: "30%" }}
                    height="50px"
                    value={formData.to_value}
                    onChange={(e) => handleInputChange("to_value", e.target.value)}
                    type="text"
                    labelFontSize="1rem"
                    labelFontFamily="Poppins"
                    labelFontWeight="300"
                />
                <CustomInputFieldPoints
                    label="Points"
                    width={{ xs: "100%", md: "30%" }}
                    height="50px"
                    value={formData.points_value}
                    onChange={(e) => handleInputChange("points_value", e.target.value)}
                    type="text"
                    labelFontSize="1rem"
                    labelFontFamily="Poppins"
                    labelFontWeight="300"
                />
            </Box>
            <Box
                sx={{
                    display: "flex",
                    justifyContent: "end",
                    alignItems: "center",
                    marginTop: "1rem"
                }}
            >
                {pointsButton ? <Button
                    variant="contained"
                    // startIcon={<AddIcon />}
                    onClick={handleAdd}
                    color="secondary"
                    sx={{
                        height: "25px",
                        padding: "15px",
                        color: "#FFFFFF",
                        // backgroundColor: "#3497E3",
                        "&:hover": {
                            // backgroundColor: "#3497E3",
                        },
                    }}
                >
                    Add
                </Button> : <Button
                    variant="contained"
                    // startIcon={<AddIcon />}
                    // onClick={getInput}
                    color="secondary"
                    sx={{
                        height: "25px",
                        padding: "15px",
                        color: "#FFFFFF",
                        // backgroundColor: "#3497E3",
                        "&:hover": {
                            // backgroundColor: "#3497E3",
                        },
                    }}
                    onClick={handleUpdate}
                >
                    Update
                </Button>}
            </Box>
            {showTableData ? <Editabletable sendDataToParent={handleDataFromChild} /> : <BenefitsAndCriteriaTable /> }
        </Box>
    )
}

export default BenefitsAndCriteria;