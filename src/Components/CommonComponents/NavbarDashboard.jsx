import NotificationsNoneOutlinedIcon from "@mui/icons-material/NotificationsNoneOutlined";
import { Box, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";
import {
    logout,
    resetAuthState,
    setClientId,
    setImageFileUrl,
} from "../../Redux/Slices/AuthSlice";
import sideBarOpenBtn from "../../assets/sideBarOpenBtn.svg";
import { setAppBaseURL } from "../../config/axiosInstance";
import AlertPop from "./AlertPop";
import SelectPageDropDown from "./SelectCustomerType";
function NavbarDashboard({ toggle }) {
    const location = useLocation();
    const path = location.pathname;
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const reportsPath = "/userDashboard/Inventory/Reports";
    const [currPage, setCurrPage] = useState("");

    const { NAME, USER_TYPE, PROFILE_IMAGE } = useSelector(
        (state) => state.auth
    );

    const pathToPageMapping = {
        "/Dashboard": "Dashboard",
        "/Customers": "Customer Management",
        "/loyalty%20ads": "Loyalty Ads",
        "/Loyalty%20Ads": "Loyalty Ads",
        "/promotions/CreatePromotions": "Loyalty Ads",
        "/CreateCustomer": "Customer Management",
        "/Customers/CustomerTransactions": "Customer Management",
        "/Customers/CustomerDetails": "Customer Management",
        "/Campaigns/E-mailTemplate": "Campaign Management",
        "/Campaigns/E-mailCampaign": "Campaign Management",
        "/Campaigns/CreateTemplate": "Campaign Management",
        "/Campaigns/CreateCampaign": "Campaign Management",
        "/Rewards": "Rewards Management",
        "/rewards/CreateRewardsSetup": "Rewards Management",
        "/rewards/RewardsSetup": "Rewards Management",
        "/Rewards/PointsSetup": "Rewards Management",
        "/Rewards/CreateRewardsSetup": "Rewards Management",
        "/Rewards/CreatePointsSetup": "Rewards Management",
        "/Feedback%20Settings": "Feedback Settings",
        "/Settings": "Settings",
        "/Reports": "Reports",
        "/Promotions/CreatePromotions": "Loyalty Ads",
    };

    useEffect(() => {
        // Set current page based on path
        setCurrPage(pathToPageMapping[path] || "");
    }, [location]);

    const [alertMsg, setAlertMsg] = useState({
        alert: false,
        message: "",
        status: "",
    });
    const { alert, message, status } = alertMsg;

    useEffect(() => {
        const imageURL = sessionStorage.getItem("FileURL");
        const AppBaseURL = sessionStorage.getItem("AppBaseURL");
        const client_id = sessionStorage.getItem("client_id");

        if (
            imageURL &&
            AppBaseURL &&
            imageURL !== "undefined" &&
            AppBaseURL !== "undefined"
        ) {
            dispatch(setClientId(client_id));
            dispatch(setImageFileUrl(imageURL));
        }

        if (!imageURL || !AppBaseURL) {
            navigate("/");
            dispatch(resetAuthState());
            dispatch(logout());
            sessionStorage.clear();
            sessionStorage.clear();
            setAppBaseURL(client_id);
            setAlertMsg({
                alert: true,
                message:
                    "Failed to connect, Please check your app configuration",
                status: "error",
            });

            setTimeout(() => {
                setAlertMsg({
                    alert: false,
                    message: "",
                    status: "",
                });
            }, 2000);
        }
    }, []);

    return (
        <nav
            style={{
                backgroundColor: "white",
                boxShadow:
                    "0 1px 2px rgba(0, 0, 0, 0.05), 0 2px 4px rgba(0, 0, 0, 0.1)",
                marginBottom: "0.3rem",
                zIndex: "10",
                height: "55px",
            }}
        >
            {alert && (
                <AlertPop boolean={alert} msg={message} status={status} />
            )}
            <Box
                sx={{
                    display: "flex",
                    width: "100%",
                    padding: "10px",
                    justifyContent: "space-between",
                }}
            >
                <Box
                    sx={{
                        backgroundColor: "inherit",
                        display: "flex",
                        alignItems: "center",
                        gap: "5px",
                    }}
                >
                    <Box
                        sx={{
                            display: "flex",
                            alignItems: "center",
                            width: "fit-content",
                        }}
                    >
                        <img
                            src={sideBarOpenBtn}
                            alt="close side bar button"
                            width={28}
                            style={{ Padding: "5px", cursor: "pointer" }}
                            onClick={toggle}
                        />
                        <Typography
                            variant="p"
                            sx={{
                                marginLeft: "15px",
                                marginRight: {
                                    xs: "0rem",
                                    sm: "0.5rem",
                                    md: "1rem",
                                },
                                color: "#05004E",
                                fontFamily: "Ubuntu",
                                fontSize: "15px",
                                fontStyle: "normal",
                                fontWeight: "700",
                                flexWrap: "wrap",
                                textTransform: "uppercase",
                                letterSpacing: "0.5px",
                            }}
                        >
                            {currPage}
                        </Typography>
                    </Box>
                    {location.pathname == reportsPath && (
                        <Box
                            sx={{
                                width: "fit-content",
                                display: { xs: "none", sm: "flex" },
                            }}
                        >
                            <SelectPageDropDown />
                        </Box>
                    )}
                </Box>
                <Box
                    sx={{
                        display: "flex",
                        alignItems: "center",
                        gap: "1rem",
                    }}
                >
                    <Box
                        sx={{
                            position: "relative",
                            display: "flex",
                            alignItems: "center",
                        }}
                    >
                        <NotificationsNoneOutlinedIcon
                            sx={{
                                fontSize: "22px",
                                fontWeight: "300",
                                color: "#FFA412",
                            }}
                        />
                        <div
                            style={{
                                height: "4px",
                                width: "4px",
                                borderRadius: "50%",
                                backgroundColor: "red",
                                position: "absolute",
                                top: "1%",
                                right: "-12%",
                            }}
                        ></div>
                    </Box>
                    <Box
                        sx={{
                            display: "flex",
                            alignItems: "center",
                        }}
                    >
                        <img
                            src={PROFILE_IMAGE}
                            alt=""
                            width={35}
                            height={35}
                        />
                    </Box>
                    <Box
                        sx={{
                            fontFamily: "poppins",
                            color: "#151D48",
                            display: { xs: "none", sm: "none", md: "block" },
                        }}
                    >
                        <Box
                            sx={{
                                display: "flex",
                                gap: "1rem",
                                fontWeight: "900",
                                fontSize: { md: "12px", lg: "13px" },
                                textTransform: "capitalize",
                            }}
                        >
                            {NAME && NAME}
                        </Box>
                    </Box>
                </Box>
            </Box>
        </nav>
    );
}

export default NavbarDashboard;
