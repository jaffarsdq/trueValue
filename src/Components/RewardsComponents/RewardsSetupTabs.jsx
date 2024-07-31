import { Button } from "@mui/material";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import Tabs from "@mui/material/Tabs";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import {
    setBenefitsAndCriteriaPoints,
    setLoading,
    setRewardsDetails,
    setToggleLocation,
    setValidationErrors,
    updateRewardsDetails,
} from "../../Redux/Slices/RewardsSetupSlice"
import AlertPop from "../CommonComponents/AlertPop";
import { handleApiResponse } from "../../Utils/notificationUtils";

function RewardsSetupTabs({ setToggleCreate, handleValue, value }) {
    const { validationErrors } = useSelector(
        (state) => state.rewardsManagement
    );
    const handleChange = (event, newValue) => {
        handleValue(newValue);
    };
    const { client_id } = useSelector((state) => state.auth);

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

    const data = useSelector(
        (state) => state.rewardsManagement.rewardsDetails?.REWARD_SETUP
    );
    let rewardsValue = useSelector(
        (state) => state.rewardsManagement.rewardsFetchData?.REWARD_VALUE
    );
    const updatedRewardsValue = useSelector(
        (state) => state.rewardsManagement.rewardsValue
    );

    const points = useSelector(
        (state) => state.rewardsManagement.benefitsAndCriteriaPoints
    );
    const benefitsAndCriteriaData = useSelector(
        (state) => state.rewardsManagement.benefitsAndCriteriaValues
    );

    const { toggleLocation } = useSelector((state) => state.rewardsManagement)

    console.log(updatedRewardsValue?.REWARD_VALUE, "all rewards value");
    // console.log(rewardsValue, 'updated value');

    const { deletedPoints } = useSelector((state) => state.rewardsManagement)
    let clonedRewards = updatedRewardsValue?.REWARD_VALUE?.map(item => ({ ...item }));

    const rewards = useSelector((state) => state.rewardsManagement?.rewardsFetchData?.REWARD_VALUE)
    // UPDATING
    const rewardsLookup = rewards?.reduce((acc, reward) => {
        acc[reward.ID] = reward;
        return acc;
    }, {});
        
    // Update clonedRewards with data from rewards
    clonedRewards = clonedRewards.map(clonedReward => {
        const updatedReward = rewardsLookup[clonedReward.ID];
        return updatedReward ? { ...clonedReward, ...updatedReward } : clonedReward;
    });

    console.log(clonedRewards, "replaced");
    //To SET DELETED WITH VALUE 1
    for (let point of deletedPoints) {
        // let found = clonedRewards.some(item => item.ID === point.ID);
        // if (found) {
        //     let copy = { ...point, deleted: "1" };
        //     clonedRewards.push(copy);
        // }
        for (let point of deletedPoints) {
            clonedRewards = clonedRewards.map(item => 
                item.ID === point.ID ? { ...point, deleted: 1 } : item
            );
        }
        
    }
    console.log(clonedRewards, 'clonedRewards');

    // Example: Create new arrays with mutable elements
    let mutableClonedRewards = clonedRewards?.map(obj => ({ ...obj }));
    let mutableDeletedPoints = deletedPoints?.map(obj => ({ ...obj }));

    for (let item of mutableClonedRewards.concat(mutableDeletedPoints)) {
        if (item.hasOwnProperty('ID') && typeof item.ID !== 'number') {
            delete item.ID;
        }
    }

    console.log(mutableClonedRewards, "mutableClonedRewards");
    console.log(mutableDeletedPoints, "mutableDeletedPoints");

    const dispatch = useDispatch();

    const navigator = useNavigate();

    const handleValidation = () => {
        const errors = {};
        if (!data.Type) errors.Type = "Type is required.";
        if (!data.Description) errors.Description = "Description is required.";
        if (!data.Valid_from)
            errors.Valid_from = "Valid From date is required.";
        if (!data.Valid_to) errors.Valid_to = "Valid To date is required.";
        if (!data.location_type)
            errors.location_type = "Location Type is required.";
        if (!data.Card_type) errors.Card_type = "Card Type is required.";
        console.log(errors);
        dispatch(setValidationErrors(errors));
        setTimeout(() => {
            dispatch(setValidationErrors({}));
        }, 3000); // Clear errors after 5 seconds

        return Object.keys(errors).length === 0;
    };

    const updateApiData = {
        REWARD_SETUP: data,
        REWARD_VALUE: mutableClonedRewards,
    };

    const handleUpdate = () => {
        if (handleValidation()) {
            console.log(updateApiData, "Final update");

            handleApiResponse(dispatch, updateRewardsDetails, updateApiData); // Dispatch your Redux action
            dispatch(setLoading(true)); // Set loading state to true before API call

            setToggleCreate(false)

            // showAlert("Updated Successfully", "success");
            // navigator("/rewards/RewardsSetup");
            // Perform form submission logic here
        } else {
            showAlert("Please fill all required fields.", "error");
        }

        // Assuming updateApiData is defined somewhere

        // Navigation logic only after API call succeeds
        // console.log('API call successful');
        // navigator("/rewards/RewardsSetup");

    };
    useEffect(() => {
        // Check if 'enabled' key exists in REWARD_SETUP
        console.log(data, "outside");
        if (!data["enabled"]) {
            // Create a copy of rewardSetup and add 'enabled' key with value 'Y'
            const updatedRewardSetup = {
                ...data,
                enabled: "Y",
            };
            console.log(updatedRewardSetup, "updatedRewardSetup");
            // Update state with updatedRewardSetup
            dispatch(setRewardsDetails(updatedRewardSetup));
        }
    }, [data]);
    
    const finalSaveApiData = {
        REWARD_VALUE: points.map((obj) => {
            // Destructure to exclude "id" and keep other properties
            const { id, ...rest } = obj;
            // Add new properties
            return {
                ...rest,
                client_id: client_id,
                from_value: parseInt(rest.from_value),
                to_value: parseInt(rest.to_value),
                points_value: parseInt(rest.points_value),
            };
        }),
        REWARD_SETUP: {
            
            ...data,
            client_id: client_id,
        },
    };
    
    const handleSave = () => {
        if (handleValidation()) {
            console.log(finalSaveApiData, "saved");
            handleApiResponse(dispatch, updateRewardsDetails, finalSaveApiData); // Dispatch your Redux action
            setToggleCreate(false)
            dispatch(setBenefitsAndCriteriaPoints([]));
            // alert("Saved Successfully");
            // Perform form submission logic here
        } else {
            handleValue("one")
            // alert("Please fill all required fields.");
            showAlert("Please fill all required fields.", "error");
        }
        console.log(finalSaveApiData, 'saved');
        // dispatch(updateRewardsDetails(finalSaveApiData));
       
    };

    const handleLocationTab = () => {
        dispatch(setToggleLocation(true))
    }
    const button = useSelector((state) => state.rewardsManagement.button);

    return (
        <Box
            sx={{
                display: { xs: "block", sm: "block" },
                backgroundColor: "#FAFBFC",
            }}
        >
            {alertToggle && (
                <AlertPop boolean={alertToggle} msg={message} status={status} />
            )}
            <Box
                sx={{
                    width: "100%",
                    padding: "0 10px",
                    // display: "flex",
                    // justifyContent: "space-between",
                    alignItems: "center",
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
                                backgroundColor: "#A42ED7", // Replace with your desired color
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
                            value="one"
                            label="Basic Information"
                            onClick={handleLocationTab}

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
                            value="two"
                            label="Benefits And Criteria"
                            onClick={handleLocationTab}

                        />
                        <Tab
                            disabled={toggleLocation}
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
                            value="three"
                            label="Location"
                        />
                    </Tabs>
                    <>
                        {button ? (
                            <Button
                                sx={{
                                    height: "25px",
                                    padding: "15px",
                                    alignSelf: "center",
                                    justifySelf: "strech",
                                }}
                                color="secondary"
                                variant="contained"
                                onClick={handleUpdate}
                            >
                                Update
                            </Button>
                        ) : (
                            <Button
                                sx={{
                                    height: "25px",
                                    padding: "15px",
                                    alignSelf: "center",
                                    justifySelf: "strech",
                                }}
                                color="secondary"
                                variant="contained"
                                onClick={handleSave}
                            >
                                Save
                            </Button>
                        )}
                    </>
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
        </Box>
    );
}

export default RewardsSetupTabs;
