import { LoadingButton } from "@mui/lab";
import {
    Box,
    Button,
    Collapse,
    LinearProgress,
    Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
    fetchCurrentPoints,
    fetchManagePoints,
    fetchPointStatement,
} from "../../../../Redux/Slices/CustomerSlice";
import AlertPop from "../../../CommonComponents/AlertPop";
import CustomInputTextArea from "../../../CommonComponents/CustomInputTextArea";
import SelectButton from "../../../CommonComponents/SelectButton";
import CustomInputFieldPoints from "../../../PointsComponents/CustomInputFieldPoints";
import ViewCustomerCode from "../../ViewCustomerCode";
import PointManagementTable from "../CustomersTables/PointManagementTable";

export default function PointManagement({ customerDetails }) {
    const dispatch = useDispatch();
    const {
        selectedCustomerId,
        pointsStatementData,
        pointsStatementDataLoading,
        currentPoints,
        managePointsLoading,
        isCreate,
    } = useSelector((state) => state.customer);

    const [alerts, setAlerts] = useState({
        alertToggle: false,
        message: "",
        status: "error",
    });
    const { alertToggle, message, status } = alerts;

    const [toggle, setToggle] = useState(false);
    const handlePageChangeAddressForm = () => {
        setToggle(!toggle);
    };

    // State to manage local input changes
    const [formValues, setFormValues] = useState({
        TYPE: "",
        pointsType: "+",
        POINTS: "",
        REASON: "",
    });

    const payloadForPoints = {
        DATA: {
            AUTH_KEY: "TXlDb206TG95QVBJMTIz",
            TYPE_NAME: "CURRENT_POINTS",
            CUST_CODE: selectedCustomerId,
        },
    };
    const payloadForPointsStatement = {
        DATA: {
            AUTH_KEY: "TXlDb206TG95QVBJMTIz",
            TYPE_NAME: "POINTS_STATEMENT",
            CUST_CODE: selectedCustomerId,
        },
    };
    useEffect(() => {
        if (!isCreate) {
            dispatch(fetchPointStatement(payloadForPointsStatement));
            dispatch(fetchCurrentPoints(payloadForPoints));
        }
    }, [dispatch, selectedCustomerId]);

    const handleInputChange = (field, value) => {
        setFormValues((prevState) => ({
            ...prevState,
            [field]: value,
        }));
    };
    // const handleSave = () => {
    //     if (
    //         !formValues.TYPE ||
    //         !formValues.POINTS ||
    //         !formValues.REASON ||
    //         !formValues.pointsType
    //     ) {
    //         alert("Please fill in all fields.");
    //         return;
    //     }

    //     // Concatenate pointsType with POINTS
    //     const pointsWithSign =
    //         formValues.pointsType === "+"
    //             ? `+${formValues.POINTS}`
    //             : `-${formValues.POINTS}`;

    //     const payload = {
    //         ...formValues,
    //         POINTS: pointsWithSign, // Concatenated value
    //         CUSTCCODE: selectedCustomerId,
    //     };

    //     dispatch(fetchManagePoints({ payload, payloadForPoints }));
    // };
    const handleSave = () => {
        if (
            !formValues.TYPE ||
            !formValues.POINTS ||
            !formValues.REASON ||
            !formValues.pointsType
        ) {
            setAlerts({
                alertToggle: true,
                message: "Please fill in all fields.",
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

        // Concatenate pointsType with POINTS
        const pointsWithSign =
            formValues.pointsType === "+"
                ? `+${formValues.POINTS}`
                : `-${formValues.POINTS}`;

        const payload = {
            ...formValues,
            POINTS: pointsWithSign,
            CUSTCCODE: selectedCustomerId,
        };

        dispatch(fetchManagePoints({ payload, payloadForPoints })).then(() => {
            setAlerts({
                alertToggle: true,
                message: "Fetch successful",
                status: "success",
            });
            setTimeout(() => {
                setAlerts({
                    alertToggle: false,
                    message: "",
                });
            }, 2000);
            setToggle(false);
        });
        dispatch(fetchPointStatement(payloadForPointsStatement));
        setFormValues({
            TYPE: "",
            pointsType: "+",
            POINTS: "",
            REASON: "",
        });
    };

    const handleCancel = () => {
        setFormValues({
            TYPE: "",
            pointsType: "+",
            POINTS: "",
            REASON: "",
        });
    };

    return (
        <Box
            sx={{
                padding: "0 1rem",
                bgcolor: "#FAFBFC",
            }}
        >
            {alertToggle && (
                <AlertPop boolean={alertToggle} msg={message} status={status} />
            )}
            <Box
                sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    padding: "1rem 0 0 0",
                    alignItems: "center",
                }}
            >
                <ViewCustomerCode selectedCustomerId={selectedCustomerId} />
                <Button
                    variant="contained"
                    color="secondary"
                    onClick={handlePageChangeAddressForm}
                    sx={{ height: "30px" }}
                >
                    {!toggle ? "New Adjustment" : "Cancel"}
                </Button>
            </Box>

            <Box sx={{ width: "100%", padding: "1rem 0 1rem 0" }}>
                {managePointsLoading && <LinearProgress color="secondary" />}
                <Box
                    sx={{
                        width: "100%",
                        margin: "0 auto",
                        display: "flex",
                        justifyContent: "space-around",
                        borderRadius: "8px",
                        boxShadow: "0px 4px 15px 8px rgba(238, 238, 238, 1)",
                        padding: "0.5rem",
                        bgcolor: "rgba(164, 46, 215, 0.1)",
                    }}
                >
                    <Box
                        sx={{
                            display: "flex",
                            alignItems: "center",
                            gap: "2px",
                        }}
                    >
                        <Typography sx={{ color: "purple" }}>
                            Current Points :
                        </Typography>
                        <Typography sx={{ color: "purple" }}>
                            {currentPoints.CURRENTPOINTS}
                        </Typography>
                    </Box>
                    <Box
                        sx={{
                            display: "flex",
                            alignItems: "center",
                            gap: "2px",
                        }}
                    >
                        <Typography sx={{ color: "purple" }}>
                            Points Value :
                        </Typography>
                        <Typography sx={{ color: "purple" }}>
                            {currentPoints.POINTS_VALUE}
                        </Typography>
                    </Box>
                    <Box
                        sx={{
                            display: "flex",
                            alignItems: "center",
                            gap: "2px",
                        }}
                    >
                        <Typography sx={{ color: "purple" }}>
                            Expired Points :
                        </Typography>
                        <Typography sx={{ color: "purple" }}>
                            {currentPoints.POINTS_EXPIRED}
                        </Typography>
                    </Box>
                </Box>
            </Box>

            <Collapse in={toggle}>
                <Box
                    sx={{
                        display: "flex",
                        gap: "20px",
                        alignItems: "center",
                        flexWrap: "wrap",
                        justifyContent: "space-between",
                        padding: "10px 0px",
                    }}
                >
                    <SelectButton
                        height="35px"
                        sx={{
                            margin: "4px 0px",
                            padding: "7px 0",
                            width: {
                                xs: "100%",
                                sm: "48%",
                            },
                            fontFamily: "Poppins !important",
                            fontWeight: "700  !important",
                        }}
                        name="Reason"
                        obj="TYPE"
                        value={formValues?.TYPE || ""}
                        placeholder="Day "
                        option={[{ name: "Adjustment", value: "AJ" }]}
                        disabled={false}
                        handleInputChange={handleInputChange}
                    />
                    <Box
                        sx={{
                            width: "50%",
                            display: "flex",
                            justifyContent: "space-between",
                        }}
                    >
                        <SelectButton
                            height="35px"
                            sx={{
                                margin: "4px 0px",
                                padding: "7px 0",
                                width: {
                                    xs: "15%",
                                },
                                fontFamily: "Poppins !important",
                                fontWeight: "700  !important",
                            }}
                            name="type"
                            obj="pointsType"
                            value={formValues?.pointsType || ""}
                            placeholder="Type "
                            option={[{ name: "+" }, { name: "-" }]}
                            disabled={false}
                            handleInputChange={handleInputChange}
                        />
                        <CustomInputFieldPoints
                            height={"36px"}
                            width={{
                                sm: "83%",
                            }}
                            value={formValues.POINTS}
                            label={"Points"}
                            onChange={(e) =>
                                handleInputChange("POINTS", e.target.value)
                            }
                            type="text"
                        />
                    </Box>
                </Box>
                <CustomInputTextArea
                    height={"39px"}
                    row={3}
                    label={"Notes"}
                    width={{
                        xs: "100%",
                    }}
                    value={formValues.REASON}
                    onChange={(e) =>
                        handleInputChange("REASON", e.target.value)
                    }
                    type="text"
                />
                <Box
                    sx={{
                        display: "flex",
                        justifyContent: { xs: "center", lg: "flex-end" },
                        alignItems: "center",

                        width: "100%",
                    }}
                >
                    <Button
                        variant="outlined"
                        color="secondary"
                        sx={{
                            padding: "5px",
                            fontSize: "12px",
                            width: { xs: "200px", lg: "9%" },
                            margin: "15px 5px",
                        }}
                        onClick={() => {
                            handleCancel();
                        }}
                    >
                        Reset
                    </Button>
                    {false ? (
                        <LoadingButton
                            // loading={createDataLoader}
                            color="secondary"
                            // onClick={handleSave}
                            loadingPosition="start"
                            variant="contained"
                            sx={{
                                padding: "5px",
                                fontSize: "12px",
                                width: {
                                    xs: "200px",
                                    lg: "9%",
                                    margin: "15px 5px",
                                    backgroundColor: "#388e3c !important ",
                                },

                                color: "white !important",
                            }}
                        >
                            Update
                        </LoadingButton>
                    ) : (
                        <LoadingButton
                            // loading={createDataLoader}
                            onClick={handleSave}
                            color="secondary"
                            loadingPosition="start"
                            variant="contained"
                            sx={{
                                padding: "5px",
                                fontSize: "12px",
                                width: {
                                    xs: "200px",
                                    lg: "9%",
                                    margin: "10px 5px",
                                },
                            }}
                        >
                            Save
                        </LoadingButton>
                    )}
                </Box>
            </Collapse>
            <PointManagementTable pointsStatementData={pointsStatementData} pointsStatementDataLoading={pointsStatementDataLoading}/>
        </Box>
    );
}
