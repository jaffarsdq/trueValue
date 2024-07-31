import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import ViewListIcon from "@mui/icons-material/ViewList";
import WindowIcon from "@mui/icons-material/Window";
import {
    Box,
    Button,
    ButtonGroup,
    Card,
    CardActions,
    CardMedia,
    Collapse,
    Grid,
    IconButton,
    Pagination,
    Skeleton,
    Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import CampaignsTable from "../../Components/CampaignsComponents/CampaignsTable";
import SideBar from "../../Layouts/SideBar";
import {
    clearImageUploader,
    deletePromotion,
    fetchLocationList,
    fetchPromotion,
    setFileName,
    setInitialStageCreatePromotions,
    setToggleCreateAndUpdatebtn,
    setTogglerFlyer,
    setUpdatePromotion,
} from "../../Redux/Slices/PromotionSlice";
import PromotionsCreate from "./PromotionImage";
import DeleteIcon from '@mui/icons-material/Delete';
import { handleApiResponse } from "../../Utils/notificationUtils";
import AlertPop from "../../Components/CommonComponents/AlertPop";

function CardTemplate({ setToggleCreate, handleCardEdit, promo }) {


    const dispatch = useDispatch();
    const { imageURL } = useSelector((state) => state.auth)
    const handleOnClick = () => {
        console.log(promo, "edited");
        dispatch(setTogglerFlyer(false));
        handleCardEdit(promo);
    };

    const { client_id } = useSelector((state) => state.auth)
    // const handleDelete = () => {
    //     const deletedPromotion = { ...promo, Deleted: "1", client_id: client_id }
    //     // dispatch(deletePromotion(deletedPromotion));
    //     console.log(deletedPromotion, "delete")
    // }

    // Function to rename a key in an object
    function renameKey(obj, oldKey, newKey) {
        console.log(oldKey, "obj");
        if (!obj.hasOwnProperty(oldKey)) {
            throw new Error(`Key "${oldKey}" does not exist in the object.`);
        }

        const { [oldKey]: value, ...rest } = obj;
        console.log({
            ...rest,
            [newKey]: value
        }, 'newkey', { [oldKey]: value, ...rest })
        return {
            ...rest,
            [newKey]: value
        };
    }

    function formatDateToYYYYMMDD(date) {
        const year = date.getFullYear(); // Get the full year (e.g., 2024)
        const month = String(date.getMonth() + 1).padStart(2, '0'); // Get the month (0-11), so add 1 and pad with leading zero if needed
        const day = String(date.getDate()).padStart(2, '0'); // Get the day of the month and pad with leading zero if needed

        return `${year}/${month}/${day}`; // Format to yyyy/mm/dd
    }

    function parseDate(dateStr) {
        // Convert the date string from yyyy/mm/dd to yyyy-mm-dd
        const formattedDateStr = dateStr.replace(/\//g, '-');
        return formattedDateStr;
    }

    const [alerts, setAlerts] = useState({
        alertToggle: false,
        message: "",
        status: "error",
    });

    const { alertToggle, message, status } = alerts;

    const handleDelete = () => {
        // Rename 'PROMO_ID' to 'promotion_id' in the promo object
        const promoWithRenamedKey = renameKey(promo, 'PROMO_ID', 'promotion_id');

        // Add 'Deleted' and 'client_id' to the updated promo object
        const deletePromotionData = { ...promoWithRenamedKey, Deleted: "1", client_id: client_id };

        if (deletePromotionData.valid === "N") {
            handleApiResponse(dispatch, deletePromotion, deletePromotionData)
            console.log(deletePromotionData, "delete");
        }
        else {
            const promotionEnddate = deletePromotionData.VALID_TO

            const currentDate = formatDateToYYYYMMDD(new Date());

            const formattingDate = parseDate(currentDate);

            const changingFormat2 = parseDate(formattingDate);

            const changingFormat1 = parseDate(promotionEnddate);

            const date1 = new Date(changingFormat1);
            const date2 = new Date(changingFormat2);


            // TIME
            const toTime = deletePromotionData.TIME_TO;

            const now = new Date();

            // Get hours, minutes, and seconds
            const hours = now.getHours();  // Returns hours in 24-hour format (0-23)
            const minutes = now.getMinutes();  // Returns minutes (0-59)
            const seconds = now.getSeconds();  // Returns seconds (0-59)

            // Format them as strings with leading zeros if necessary
            const formattedHours = hours.toString().padStart(2, '0');
            const formattedMinutes = minutes.toString().padStart(2, '0');
            const formattedSeconds = seconds.toString().padStart(2, '0');

            // Create the time string in 24-hour format
            const timeString = `${formattedHours}:${formattedMinutes}:${formattedSeconds}`;

            console.log(timeString, "timeString");  // Outputs time in 24-hour format, e.g., "14:05:09"


            if (date2 > date1) {
                handleApiResponse(dispatch, deletePromotion, deletePromotionData)
            } else if (date2 < date1) {
                setAlerts({
                    alertToggle: true,
                    message: "valid end date is lesser than current date.",
                    status: "error",
                });
                setTimeout(() => {
                    setAlerts({
                        alertToggle: false,
                        message: "",
                    });
                }, 2000);

            } else {
                if (toTime < timeString) {
                    handleApiResponse(dispatch, deletePromotion, deletePromotionData)
                }
                else {
                    setAlerts({
                        alertToggle: true,
                        message: "Valid to time is lesser than current time.",
                        status: "error",
                    });
                    setTimeout(() => {
                        setAlerts({
                            alertToggle: false,
                            message: "",
                        });
                    }, 2000);
                }

            }
        }
        // Uncomment the line below to dispatch the deletePromotion action
        // handleApiResponse(dispatch, deletePromotion, deletePromotionData)
        // dispatch(deletePromotion(deletedPromotion));
        setToggleCreate(false)
    }


    return (
        <>
            {alertToggle && (
                <AlertPop boolean={alertToggle} msg={message} status={status} />
            )}
            <Card
                sx={{
                    width: "280px",
                    height: "320px",
                    borderRadius: ".5rem",
                    // boxShadow: " 0px 4px 10px 5px rgba(238, 238, 238, 0.5)",
                    boxShadow:
                        "0px 2px 1px -1px rgba(0, 0, 0, 0.20), 0px 1px 1px 0px rgba(0, 0, 0, 0.14), 0px 1px 3px 0px rgba(0, 0, 0, 0.12)",
                    margin: "0.5rem",
                    transition: "box-shadow 0.3s linear ", // Add transition for smooth hover effect
                    "&:hover": {
                        transform: "scale(1.00)",
                        boxShadow: "0px 6px 10px rgba(0, 0, 0, 0.3)", // Adjust the shadow on hover
                        // transform:
                    },
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center"
                }}
            >
                {/* <img src={"http://devp.mycomsys.com:8806/files/loyalty/promotion/B&B.jpg"}/> */}
                {/* {console.log(promo.PROMO_IMAGE, 'imageeee')} */}
                <CardMedia
                    component="img"
                    alt="green iguana"
                    width="350"
                    height="250"
                    image={`${imageURL}${promo?.PROMO_IMAGE}`}
                    sx={{
                        padding: ".3rem",
                        objectFit: "contain",
                        borderRadius: ".6rem",
                    }}
                // onLoad={() => setLoading(false)}
                />
                <CardActions
                    sx={{
                        // backgroundColor: "rgba(226, 223, 223, .6)",
                        // borderBottom: ".5px solid rgba(228, 227, 227, 1)",
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center"
                    }}
                >
                    <Typography
                        sx={{
                            // color: "#3f60c3",
                            fontFamily: "Poppins !important",
                            fontWeight: "500",
                            // marginRight: "10%",
                        }}
                    >
                        {promo?.PROMO_DESC}
                    </Typography>
                    <Box sx={{display:"flex",
                    }}>
                        <IconButton
                            sx={{
                                // border: "1px solid rgba(187, 176, 176, .6)",
                                height: "20px",
                                width: "20px",
                                borderRadius: ".5rem",
                                padding: ".8rem",
                                marginRight: ".5rem",
                                backgroundColor: "#7b1fa2",
                                ":hover": {
                                    bgcolor: "rgba(123, 31, 162, 0.23)",
                                    // border: "1px solid #7b1fa2",
                                },
                            }}
                            onClick={handleOnClick}
                        >
                            <EditOutlinedIcon
                                sx={{
                                    fontSize: "1.2rem",
                                    color: "#FFF",
                                    ":hover": {
                                        color: "black",
                                    },
                                }}
                            />
                        </IconButton>

                        <IconButton
                            sx={{
                                // border: "1px solid rgba(187, 176, 176, .6)",
                                height: "20px",
                                width: "20px",
                                borderRadius: ".5rem",
                                padding: ".8rem",
                                backgroundColor: "#7b1fa2",
                                ":hover": {
                                    bgcolor: "rgba(123, 31, 162, 0.23)",
                                    // border: "1px solid #7b1fa2",
                                },
                            }}
                            onClick={handleDelete}
                        >
                            <DeleteIcon
                                sx={{
                                    fontSize: "1.2rem",
                                    color: "#FFF",
                                    ":hover": {
                                        color: "black",
                                    },
                                }}
                            />
                        </IconButton>
                    </Box>




                </CardActions>

                <Box sx={{
                    display: "flex",
                    justifyContent: "space-between"
                }}>

                    {/* <Button
                        variant="outlined"
                        color="secondary"
                        sx={{
                            margin: ".5rem 1rem 1rem",
                            // margin: {
                            //     xs: "0.8rem 0rem 0",
                            //     sm: "0.8rem 1rem 0"
                            // },
                            // marginBottom: "1rem",
                            width: "50%",
                            // alignSelf: {
                            //     xs: "flex-end",
                            // },
                        }}
                    // onClick={() => handleCreatePromotion(true)}
                    >
                        Delete
                    </Button>

                    <Button
                        variant="contained"
                        color="secondary"
                        sx={{
                            backgroundColor: "secondary.main",
                            color: "white",
                            margin: ".5rem 1rem 1rem",


                            // margin: {
                            //     xs: "0.8rem 0rem 0",
                            //     sm: "0.8rem 1rem 0"
                            // },
                            // marginBottom: "1rem",
                            width: "50%",
                            // alignSelf: {
                            //     xs: "flex-end",
                            // },
                        }}
                    // onClick={() => handleCreatePromotion(true)}
                    >
                        Edit
                    </Button> */}
                </Box>

                {/* <CardActions>
                    
                </CardActions> */}
            </Card>
        </>
    );
}

const CreateTemplate = () => {
    const promotions = useSelector(
        (state) => state.promotionSlice?.promotion?.PROMOTIONS
    );
    const { loading } = useSelector((state) => state.promotionSlice);
    // console.log(promotions, 'all');
    const [togglecreate, setToggleCreate] = useState(false);

    const navigator = useNavigate();
    const dispatch = useDispatch();

    React.useEffect(() => {
        // console.log('API call');
        dispatch(clearImageUploader(""))
        dispatch(fetchPromotion());
        dispatch(fetchLocationList())
    }, []);

    const gridName = [
        "Loc Id",
        "Code",
        "Description",
        "Valid From",
        "Valid To",
        "Time From",
        "Time To",
        "Promo Value",
        "Description",
        "FlyerPath",
        "Active",
        "Actions",
    ];

    const [toggle, setToggle] = useState(false);

    const [togglePage, setTogglePage] = useState(false);

    function handleToggle() {
        setToggle(!toggle);
    }

    function handleCardEdit(data) {
        setToggleCreate(true)
        dispatch(setUpdatePromotion(data));
        dispatch(setToggleCreateAndUpdatebtn(true));
        window.scrollTo({
            top: 0,
            behavior: "smooth", // Optionally, you can set smooth scrolling behavior
        });
    }

    function handleTogglePage() {
        setTogglePage(!togglePage);
    }

    // PAGINATION
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 8; // Adjust as needed

    // Logic to determine which items to display on the current page
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems =
        promotions && promotions?.slice(indexOfFirstItem, indexOfLastItem);

    // Handle page change
    const handlePageChange = (event, page) => {
        setCurrentPage(page);
    };

    const handleCreatePromotion = (bool) => {
        if (bool === false || bool === true) {
            setToggleCreate(bool);
        } else {
            setToggleCreate(!toggle);
        }
        // setSelectedImage("")
        console.log('clicked');
        // setToggle(true)
        // setToggleCreate(!togglecreate)
        // navigator("/promotions/CreatePromotions");
        dispatch(setFileName(""))
        dispatch(setInitialStageCreatePromotions());
        dispatch(setToggleCreateAndUpdatebtn(false));
    };




    return (
        <SideBar>
            {/*<Box
                sx={{
                    backgroundColor: "#FAFBFC",
                }}
            >
                {togglePage ? (
                    <PromotionsCreate promotions={promotions} />
                ) : ( */}
            <>
                <Box
                    sx={{
                        display: "flex",
                        justifyContent: "flex-end",
                        flexDirection: {
                            xs: "column",
                            sm: "row",
                        },
                        padding: "0rem 20px 10px",
                    }}
                >
                    {togglecreate ?
                        <Button
                            variant="outlined"
                            color="secondary"
                            sx={{
                                margin: {
                                    xs: "0.8rem 0rem 0",
                                    sm: "0.8rem 1rem 0"
                                },
                                alignSelf: {
                                    xs: "flex-end",
                                }
                            }}
                            onClick={() => handleCreatePromotion(false)}
                        >
                            Back
                        </Button> :
                        <Button
                            variant="contained"
                            color="secondary"
                            sx={{
                                backgroundColor: "secondary.main",
                                color: "white",
                                margin: {
                                    xs: "0.8rem 0rem 0",
                                    sm: "0.8rem 1rem 0"
                                },
                                // marginBottom: "1rem",
                                width: "max-content",
                                alignSelf: {
                                    xs: "flex-end",
                                },
                            }}
                            onClick={() => handleCreatePromotion(true)}
                        >
                            Create Promotion
                        </Button>

                    }




                    <ButtonGroup
                        variant="outlined"
                        aria-label="Basic button group"
                        sx={{
                            marginTop: ".8rem",
                            alignSelf: {
                                xs: "flex-end",
                            },
                        }}
                    >
                        <Button
                            sx={{ overflow: "hidden" }}
                            variant={toggle ? "contained" : "outlined"}
                            onClick={() => handleToggle(true)}
                            color="secondary"
                        >
                            <ViewListIcon color="#FFF" />
                        </Button>
                        <Button
                            sx={{ overflow: "hidden" }}
                            variant={!toggle ? "contained" : "outlined"}
                            onClick={() => handleToggle(false)}
                            color="secondary"
                        >
                            <WindowIcon color="#FFF" />
                        </Button>
                    </ButtonGroup>


                </Box>
                <Collapse in={togglecreate}>
                    <Box sx={{ height: "auto" }}>
                        <PromotionsCreate
                            navBack={handleCreatePromotion}
                        />
                    </Box>
                </Collapse>
                {!toggle ? (
                    loading ? (
                        <Grid
                            container
                            spacing={3}
                            justifyContent="center"
                            alignItems="center"
                            style={{
                                margin: 0,
                                width: "100%",
                                padding: "0 16px",
                            }}
                            sx={{
                                "& > .MuiGrid-item": {
                                    paddingLeft: 0,
                                },
                            }}
                        >
                            {Array(8)
                                .fill(0)
                                .map((_, idx) => (
                                    <Card
                                        key={idx}
                                        sx={{
                                            width: "280px",
                                            height: "300px",
                                            borderRadius: ".3rem",
                                            margin: "0.5rem",
                                        }}
                                    >
                                        <Skeleton
                                            variant="rectangular"
                                            width="100%"
                                            height="250px"
                                            animation="wave"
                                        />
                                        <CardActions
                                            sx={{
                                                backgroundColor:
                                                    "rgba(226, 223, 223, .6)",
                                                borderBottom:
                                                    ".5px solid rgba(228, 227, 227, 1)",
                                            }}
                                        >
                                            <Skeleton
                                                variant="text"
                                                width="100%"
                                                height="20px"
                                                animation="wave"
                                            />
                                            <Skeleton
                                                variant="circle"
                                                width="20%"
                                                height="40px"
                                                animation="wave"
                                                sx={{
                                                    borderRadius:
                                                        "12px",
                                                }}
                                            />
                                        </CardActions>
                                    </Card>
                                ))}
                        </Grid>
                    ) : (
                        <>
                            <Grid
                                container
                                spacing={3}
                                justifyContent="center"
                                alignItems="center"
                                style={{
                                    margin: 0,
                                    width: "100%",
                                    padding: "0 16px",
                                }}
                                sx={{
                                    "& > .MuiGrid-item": {
                                        paddingLeft: 0,
                                    },
                                }}
                            >
                                {currentItems &&
                                    currentItems.map((promo) => (
                                        <Grid
                                            container
                                            spacing={0}
                                            item
                                            xs={12}
                                            sm={6}
                                            md={3}
                                            xl={2}
                                            key={promo?.PROMO_ID}
                                            sx={{
                                                padding:
                                                    "4px !important",
                                                display: "flex",
                                                justifyContent:
                                                    "center",
                                            }}
                                        >
                                            <CardTemplate
                                                handleCardEdit={
                                                    handleCardEdit
                                                }
                                                promo={promo}
                                                setToggleCreate={setToggleCreate}
                                            />
                                        </Grid>
                                    ))}
                            </Grid>
                            <Pagination
                                count={Math.ceil(
                                    (promotions?.length || 0) /
                                    itemsPerPage
                                )}
                                page={currentPage}
                                onChange={handlePageChange}
                                variant="outlined"
                                shape="rounded"
                                style={{
                                    margin: "1rem 3rem",
                                    paddingBottom: "2rem",
                                    textAlign: "center",
                                    display: "flex",
                                    justifyContent: "flex-end",
                                }}
                            />
                        </>
                    )
                ) : (
                    <CampaignsTable
                        gridName={gridName}
                        data={promotions}
                        setToggleCreate={setToggleCreate}
                    />
                )}
            </>
            {/* //     )}
            // </Box> */}
        </SideBar>
    );
};

export default CreateTemplate;
