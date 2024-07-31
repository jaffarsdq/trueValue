import {
    Campaign,
    Feedback,
    InsightsSharp,
    MilitaryTech,
    People,
    Settings,
    Style,
} from "@mui/icons-material";

import { Box, Typography } from "@mui/material";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { resetFiltersOnPageChange } from "../../Redux/Slices/filter/filterSlice";
import { SetModule } from "../../Redux/Slices/navigationSlice";

// import {
//     resetFilters,
//     resetReportFilters,
// } from "../../../Redux/Slices/filterSlice";

// import extractPermissions from "../../../Utils/extractPermissions";

function BottomNavigator() {
    const dispatch = useDispatch();
    const { module, moduleType } = useSelector((state) => state.navigation);
    const navigate = useNavigate();
    const location = useLocation();
    const currentRoute = location.pathname;

    // const { permissions } = useSelector((state) => state.auth);

    // const permissionStatuses = extractPermissions(permissions);

    // useEffect(() => {
    //     if (
    //         moduleType &&
    //         module &&
    //         moduleType == "Reports" &&
    //         module != "Summary"
    //     ) {
    //         navigate(`/Insights/${module}/Reports`);
    //     } else if (module && moduleType != "Reports") {
    //         navigate(`/${module}`);
    //     }
    // }, [module, moduleType]);

    useEffect(() => {
        if (currentRoute === "/Dashboard") {
            dispatch(SetModule("Dashboard"));
        } else if (currentRoute === "/Customers") {
            dispatch(SetModule("Customers"));
        } else if (currentRoute === "/Loyalty%20Ads") {
            dispatch(SetModule("Loyalty Ads"));
        } else if (currentRoute === "/Rewards") {
            dispatch(SetModule("Rewards"));
        } else if (currentRoute.includes("/Campaigns")) {
            dispatch(SetModule("Campaigns"));
        } else if (currentRoute === "/Feedback%20Settings") {
            dispatch(SetModule("Feedback Settings"));
        } else if (currentRoute === "/Settings") {
            dispatch(SetModule("Settings"));
        }

        //     if (currentRoute === "/Insights/Summary") {
        //         dispatch(SetModule("Summary"));
        //     } else if (currentRoute === "/Insights/Inventory") {
        //         dispatch(SetModule("Inventory"));
        //     } else if (currentRoute === "/Insights/Purchases") {
        //         dispatch(SetModule("Purchases"));
        //     } else if (currentRoute === "/Insights/Accounts") {
        //         dispatch(SetModule("Accounts"));
        //     } else if (currentRoute === "/Insights/Payroll") {
        //         dispatch(SetModule("Payroll"));
        //     } else if (currentRoute === "/Insights/CRM") {
        //         dispatch(SetModule("CRM"));
        //     } else if (currentRoute === "/Insights/Sales") {
        //         dispatch(SetModule("Sales"));
        //     }
    }, [location]);

    const handleSelection = (idx, label) => {
        // if (label === "Summary") dispatch(SetModuleType("Insights"));
        // // Check if the selected module is included in permissionStatuses
        // const isAllowed =
        //     permissionStatuses[0] === "All" ||
        //     permissionStatuses.includes(label) ||
        //     label === "Summary";

        // if (isAllowed) {
        console.log(label, "label");
        dispatch(resetFiltersOnPageChange());
        if (module !== label) dispatch(SetModule(label));
        if (module && label === "Campaigns") {
            navigate(`/Campaigns/E-mailTemplate`);
        } else if (module) {
            navigate(`/${label}`);
        }

        // }
    };

    const createIcon = (Component, color) => (
        <Component
            sx={{
                fontSize: { xs: "22px", md: "30px", lg: "32px" },
                color: color,
            }}
        />
    );

    const icons = [
        {
            icon: createIcon(InsightsSharp, "#3f51b5"),
            name: "Dashboard",
            color: "#3f51b5",
        },
        {
            icon: createIcon(People, "#2196f3"),
            name: "Customers",
            color: "#2196f3",
        },
        {
            icon: createIcon(Style, "#f55246"),
            name: "Loyalty Ads",
            color: "#f55246",
        },
        {
            icon: createIcon(MilitaryTech, "#ff9800"),
            name: "Rewards",
            color: "#ff9800",
        },
        {
            icon: createIcon(Campaign, "#4caf50"),
            name: "Campaigns",
            color: "#4caf50",
        },
        {
            icon: createIcon(Feedback, "#9c27b0"),
            name: "Feedback Settings",
            color: "#9c27b0",
        },
        {
            icon: createIcon(Settings, "#607d8b"),
            name: "Settings",
            color: "#607d8b",
        },
    ];

    return (
        <Box
            sx={{
                position: "fixed",
                bottom: "0%",
                left: "50%",
                transform: "translateX(-50%)",
                zIndex: "100",
                width: "100%",
            }}
        >
            <Box
                sx={{
                    display: "flex",
                    // width: "80rem",
                    padding: "0.6rem 0rem",
                    bgcolor: "white",
                    boxShadow: "0 2px 20px rgba(0, 0, 0, 0.25)",
                    // borderRadius: "45px",
                    alignItems: "center",
                    justifyContent: "space-around",
                    transition: "all ease 0.3s",
                    position: "relative",
                }}
            >
                {icons.map((item, index) => (
                    <Box
                        key={index}
                        sx={{
                            display: "flex",
                            flexDirection: "column",
                            justifyContent: "center",
                            alignItems: "center",
                        }}
                    >
                        <Box
                            onClick={() => handleSelection(index, item.name)}
                            sx={{
                                position: "relative",
                                width: { xs: "32px", md: "45px", lg: "42px" },
                                height: { xs: "32px", md: "45px", lg: "42px" },
                                borderRadius: "50%",
                                display: "flex",
                                flexDirection: "column",
                                alignItems: "center",
                                justifyContent: "center",
                                cursor:
                                    false || item.name === "Summary"
                                        ? "pointer"
                                        : "pointer",
                                transition: "all ease 0.3s",
                                backgroundColor: `rgba(${hexToRgb(
                                    item.color
                                )}, ${module === item.name ? "0.2" : "0"})`,

                                "&:hover": {
                                    backgroundColor:
                                        false &&
                                        `rgba(${hexToRgb(item.color)}, 0.18)`,
                                    // backgroundColor: item.color,
                                    "&::after": {
                                        display:
                                            module !== item.name
                                                ? "block"
                                                : "none",
                                        content: '""',
                                        position: "absolute",
                                        top: "155%",
                                        left: "50%",
                                        transform: "translateX(-50%)",
                                        width: "fit-content",
                                        padding: "0.2rem 0.5rem",
                                        borderRadius: "0.5rem",
                                        backgroundColor: item.color,
                                        boxShadow:
                                            "0 2px 10px rgba(0, 0, 0, 0.4)",
                                        fontSize: "12px",
                                        fontWeight: "600",
                                        color: item.color,
                                        zIndex: "99",
                                    },
                                },

                                "&.selected": {
                                    backgroundColor: item.color,
                                },
                            }}
                            // className={module === item.name ? "selected" : ""}
                        >
                            {item.icon}
                        </Box>
                        <Typography
                            sx={{
                                fontSize: {
                                    xs: "10px",
                                    md: "12px",
                                    lg: "14px",
                                },
                                fontWeight: "600",
                                color:
                                    true || false || item.name === "Summary"
                                        ? module === item.name
                                            ? item.color
                                            : item.color
                                        : "InactiveCaptionText",
                                transition: "color ease 3s",
                                display: { xs: "none", sm: "block" },
                            }}
                        >
                            {item.name}
                        </Typography>
                        <Box
                            sx={{
                                display:
                                    module === item.name ? "block" : "none",
                                width: "100%",
                                height: "6px",
                                bgcolor: item.color,
                                borderRadius: "8px",
                                animation: "widthAnimation 400ms forwards ease",
                                marginTop: { xs: "3px", sm: "0" },
                            }}
                        ></Box>
                    </Box>
                ))}
            </Box>
        </Box>
    );
}

export default BottomNavigator;

function hexToRgb(hex) {
    // Expand shorthand form (e.g. "03F") to full form (e.g. "0033FF")
    const shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(
        hex.replace(shorthandRegex, (m, r, g, b) => r + r + g + g + b + b)
    );
    return result
        ? `${parseInt(result[1], 16)}, ${parseInt(result[2], 16)}, ${parseInt(
              result[3],
              16
          )}`
        : null;
}

// color:
// selectedTab === tab.label
//     ? `${bgColors[module]}`
//     : "black",
// bgcolor:
// selectedTab === tab.label
//     ? `${hexToRgbOpac(bgColors[module], 0.05)}`
//     : "transparent",
