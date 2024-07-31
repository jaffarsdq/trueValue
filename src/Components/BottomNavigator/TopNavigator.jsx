import {
    AccountBalance as AccountBalanceIcon,
    AssessmentOutlined,
    HandshakeOutlined as HandshakeOutlinedIcon,
    InsightsSharp,
    LocalMallOutlined as LocalMallOutlinedIcon,
    PriceCheckOutlined as PriceCheckOutlinedIcon,
    ReceiptLongOutlined as ReceiptLongOutlinedIcon,
    StorefrontOutlined as StorefrontOutlinedIcon,
} from "@mui/icons-material";
import { Box } from "@mui/material";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";

import { resetFiltersOnPageChange } from "../../Redux/Slices/filter/filterSlice";
import { SetModuleType } from "../../Redux/Slices/navigationSlice";
import { setSelectedReport } from "../../Redux/Slices/Reports/ReportsSlice";
import hexToRgbOpac from "../../Utils/hexToRgbOpac";

function TopNavigator() {
    const location = useLocation();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { moduleType, bgColors, module } = useSelector(
        (state) => state.navigation
    );

    const [selectedTab, setSelectedTab] = useState(moduleType);
    useEffect(() => {
        if (location.pathname.includes("Reports")) {
            setSelectedTab("Reports");
            dispatch(SetModuleType("Reports"));
        } else {
            setSelectedTab("Insights");
            dispatch(SetModuleType("Insights"));
        }
    }, [location.pathname]);

    const handleTabClick = (index, label) => {
        if (label == "Reports" && module === "Summary") return;
        setSelectedTab(label);
        dispatch(SetModuleType(label));
        // if (
        //     (module === "Dashboard" || module === "Reports") &&
        //     moduleType === "Reports"
        // ) {
        //     navigate("/Reports");
        // } else if (
        //     (module === "Dashboard" || module === "Reports") &&
        //     moduleType === "Insights"
        // ) {
        //     navigate("/Dashboard");
        // }
        dispatch(resetFiltersOnPageChange());
        if (label === "Insights") {
            navigate("/Dashboard");
        } else {
            dispatch(setSelectedReport({}));
            navigate(`/${label}`);
        }
    };

    const tabs = [
        { label: "Insights" },
        { label: "Reports" },
        // Add more tabs as needed
    ];
    const icons = [
        //inventory
        {
            Inventory: (
                <StorefrontOutlinedIcon
                    sx={{
                        fontSize: { xs: "22px", md: "30px", lg: "32px" },
                        color: "#2196f3",
                    }}
                />
            ),
            name: "Inventory",
            color: "#2196f3",
        },
        //purchases
        {
            Purchases: (
                <LocalMallOutlinedIcon
                    sx={{
                        fontSize: { xs: "22px", md: "30px", lg: "32px" },
                        color: "#f44336",
                    }}
                />
            ),
            name: "Purchases",
            color: "#f44336",
        },
        //accounts
        {
            Accounts: (
                <AccountBalanceIcon
                    sx={{
                        fontSize: { xs: "22px", md: "30px", lg: "32px" },
                        color: "#ff9800",
                    }}
                />
            ),
            name: "Accounts",
            color: "#ff9800",
        },
        //sales
        {
            Sales: (
                <ReceiptLongOutlinedIcon
                    sx={{
                        fontSize: { xs: "22px", md: "30px", lg: "32px" },
                        color: "#4caf50",
                    }}
                />
            ),
            name: "Sales",

            color: "#4caf50",
        },
        //crm
        {
            CRM: (
                <HandshakeOutlinedIcon
                    sx={{
                        fontSize: { xs: "22px", md: "30px", lg: "32px" },
                        color: "#ca61dc",
                    }}
                />
            ),
            name: "CRM",
            color: "#ca61dc",
        },
        //payroll
        {
            Payroll: (
                <PriceCheckOutlinedIcon
                    sx={{
                        fontSize: { xs: "22px", md: "30px", lg: "32px" },
                        color: "#ff8e3a",
                    }}
                />
            ),
            name: "Payroll",
            color: "#ff8e3a",
        },
    ];

    const getIcon = (menuName) => {
        switch (menuName) {
            case "Insights":
                return <InsightsSharp />;
            case "Reports":
                return <AssessmentOutlined />;
            case "Inventory":
                return icons.find((icon) => icon.name === "Inventory")
                    .Inventory;
            case "Purchases":
                return icons.find((icon) => icon.name === "Purchases")
                    .Purchases;
            case "Accounts":
                return icons.find((icon) => icon.name === "Accounts").Accounts;
            case "Sales":
                return icons.find((icon) => icon.name === "Sales").Sales;
            case "CRM":
                return icons.find((icon) => icon.name === "CRM").CRM;
            case "Payroll":
                return icons.find((icon) => icon.name === "Payroll").Payroll;
            default:
                return null;
        }
    };

    // const [scrollLeft, setScrollLeft] = useState(10);
    // const isSmallDevice = useMediaQuery("(min-width:600px)"); // Check if it's a small device
    // const [showScrollButtons, setShowScrollButtons] = useState(false);
    const containerRef = useRef(null);

    useEffect(() => {
        const handleResize = () => {
            if (containerRef.current) {
                // const container = containerRef.current;
                // setShowScrollButtons(
                //     container.scrollWidth > container.clientWidth
                // );
            }
        };

        const container = containerRef.current;
        if (container) {
            const resizeObserver = new ResizeObserver(handleResize);
            resizeObserver.observe(container);
            // setShowScrollButtons(container.scrollWidth > container.clientWidth);

            // Return cleanup function to disconnect the ResizeObserver
            return () => {
                resizeObserver.unobserve(container);
            };
        }
    }, [containerRef.current]); // Use containerRef.current as the only dependency

    // const handleScroll = (scrollOffset) => {
    //     const container = containerRef.current;
    //     if (container) {
    //         const newScrollLeft = container.scrollLeft + scrollOffset;
    //         container.scrollTo({
    //             left: newScrollLeft,
    //             behavior: "smooth",
    //         });
    //         // setScrollLeft(newScrollLeft);
    //     }
    // };

    return (
        <Box sx={{ display: "flex", flexDirection: "row" }}>
            <Box
                sx={{
                    display: "flex",
                    bgcolor: "white",
                    alignItems: "center",
                    justifyContent: "center",
                    // height: "54px",
                    padding: "0 0 5px 0",
                }}
            >
                {tabs.map((tab, index) => (
                    <Box
                        key={index}
                        sx={{
                            display: "flex",
                            alignItems: "center",
                            height: "50px",
                            gap: "5px",
                            textTransform: "capitalize",
                            fontSize: { xs: "12px", md: "14px", lg: "16px" },
                            fontWeight: "600",
                            borderStartStartRadius: index % 2 == 0 && "38px",
                            borderBottomLeftRadius: index % 2 == 0 && "38px",
                            borderTopRightRadius: index % 2 != 0 && "38px",
                            borderBottomRightRadius: index % 2 != 0 && "38px",
                            color:
                                selectedTab === tab.label
                                    ? `${bgColors[module]}`
                                    : `${bgColors[module]}`,
                            bgcolor:
                                selectedTab === tab.label
                                    ? `${hexToRgbOpac(bgColors[module], 0.12)}`
                                    : "transparent",
                            cursor:
                                module === "Summary" && index % 2 != 0
                                    ? "not-allowed"
                                    : "pointer",
                            // height: "100%",
                            padding: {
                                xs: "0.2rem 0.5rem",
                                md: "0.3rem 0.8rem",
                                lg: "0.5rem 1rem",
                            },
                            ":hover": {
                                bgcolor: `${hexToRgbOpac(
                                    bgColors[module],
                                    0.18
                                )}`,
                            },
                            alignContent: "center",
                            transition: "color 0.3s ease",
                        }}
                        onClick={() => handleTabClick(index, tab.label)}
                    >
                        {index % 2 == 0 || moduleType === "Insights"
                            ? getIcon(tab.label)
                            : getIcon("Reports")}
                        {moduleType === tab.label && tab.label}
                    </Box>
                ))}
            </Box>
        </Box>
    );
}

export default TopNavigator;
