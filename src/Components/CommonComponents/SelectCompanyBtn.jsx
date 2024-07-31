import DoneIcon from "@mui/icons-material/Done";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { Box, Button, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";

// ... (imports)

const CompanyDropdownOption = ({ companyName, isSelected, onClickHandler }) => {
    const [isHovered, setIsHovered] = useState(false);

    return (
        <Box
            sx={{
                display: "flex",
                gap: "5px",
                alignItems: "center",
                backgroundColor: isSelected
                    ? "rgba(40, 145, 250, 0.16)"
                    : isHovered
                    ? "rgba(40, 145, 250, 0.1)"
                    : "rgba(40, 145, 250, 0.0)",
                "&:hover": {
                    backgroundColor: "rgba(40, 145, 250, 0.1)",
                },
                margin: "0px",
                padding: "2px 3px",
                height: "25px",
                borderRadius: "3px",
                fontFamily: "Poppins",
                cursor: "pointer",
            }}
            onClick={onClickHandler}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            {isSelected || isHovered ? (
                <DoneIcon
                    sx={{
                        fontSize: "10px",
                        color: "rgb(40, 145, 250)",
                    }}
                />
            ) : (
                <Box sx={{ width: "10px" }}></Box>
            )}
            <Typography
                sx={{
                    fontSize: "10px",
                    fontFamily: "Poppins",
                    fontWeight: "600",
                }}
            >
                {companyName}
            </Typography>
        </Box>
    );
};

function SelectCompanyBtn() {
    const dispatch = useDispatch();
    const location = useLocation();
    const currLocation = location.pathname;
    const [isSelectCompanyBtnClicked, setIsSelectCompanyBtnClicked] =
        useState(false);

    // Fetching data from Redux store
    const selectedCompanyInv = useSelector(
        (state) => state.company.selectedCompanyInv
    );
    const selectedCompanyAcc = useSelector(
        (state) => state.company.selectedCompanyAcc
    );
    const inventoryCompanyList = useSelector(
        (state) => state.company.inventoryCompanyList
    );

    // Set current company based on the current location
    const [currCompany, setCurrCompany] = useState(
        currLocation === "/userDashboard/Inventory"
            ? selectedCompanyInv
            : currLocation === "/userDashboard/Accounts"
            ? selectedCompanyAcc
            : ""
    );

    useEffect(() => {
        // Dispatch the async action to fetch the company list
        if (currLocation === "/userDashboard/Inventory") {
            dispatch(fetchCompanyListForInventory());
        }
        if (currLocation === "/userDashboard/Accounts") {
            dispatch(fetchAccountCompanyList());
        }
        setCurrCompany(
            currLocation === "/userDashboard/Inventory"
                ? selectedCompanyInv
                : currLocation === "/userDashboard/Accounts"
                ? selectedCompanyAcc
                : ""
        );
    }, [dispatch, currLocation, selectedCompanyInv, selectedCompanyAcc]);

    const handleCompanySelect = (company) => {
        // Dispatch action based on the current location
        if (currLocation === "/userDashboard/Inventory") {
            dispatch(selectCompanyInv(company));
        }
        if (currLocation === "/userDashboard/Accounts") {
            dispatch(selectCompanyAcc(company));
        }
        setIsSelectCompanyBtnClicked(false);
    };

    return (
        <Button
            sx={{
                position: "relative",
                fontFamily: "Poppins",
                textTransform: "capitalize",
                color: "#151D48",
                display: "flex",
                alignItems: "center",
                width: "150px",
                height: "30px",
                marginLeft: "0rem",
                backgroundColor: "#edf2f6",
                padding: "0px 6px",
                justifyContent: "space-between",
                borderRadius: "5px",
                cursor: "pointer",
                boxShadow: "0 1px 5px rgba(0, 0, 0, 0.2)",
                "&:hover": {
                    boxShadow: "0 1px 5px rgba(0, 0, 0, 0.4)",
                    backgroundColor: "#dce1e6",
                },
                transition: "all ease 0.2s",
            }}
            onClick={() =>
                setIsSelectCompanyBtnClicked(!isSelectCompanyBtnClicked)
            }
        >
            <Typography
                sx={{
                    fontWeight: "600",
                    fontSize: { xs: "12px", md: "12px", lg: "12px" },
                }}
            >
                {currCompany ? currCompany : "Select Company"}
            </Typography>
            <Box
                sx={{
                    marginTop: "4px",
                    transform: isSelectCompanyBtnClicked
                        ? "translate(-50%, -20.5%) rotate(180deg)"
                        : "translate(-50%, 2%) rotate(0deg)",
                    transition: "transform 0.2s ease-in-out",
                }}
            >
                <KeyboardArrowDownIcon
                    className="dropDown"
                    style={{
                        height: "15px",
                        width: "15px",
                        fontWeight: "10px",
                        opacity: "45%",
                        transition: "all ease 0.2s",
                    }}
                />
            </Box>
            {isSelectCompanyBtnClicked && inventoryCompanyList && (
                <Box
                    sx={{
                        position: "absolute",
                        top: "120%",
                        left: "0",
                        width: "100%",
                        boxShadow: "0 1px 10px rgba(0, 0, 0, 0.3)",
                        borderRadius: "3px",
                        backgroundColor: "white",
                        zIndex: "10",
                    }}
                >
                    <Box sx={{ padding: "2px " }}>
                        <Box
                            sx={{
                                display: "flex",
                                gap: "5px",
                                alignItems: "center",
                                margin: "2px",
                                padding: "2px 3px",
                                height: "25px",
                                borderRadius: "3px",
                                justifyContent: "center",
                            }}
                        >
                            <Typography
                                sx={{
                                    fontSize: "11px",
                                    fontWeight: "800",
                                    fontFamily: "Poppins",
                                }}
                            >
                                Select Company
                            </Typography>
                        </Box>
                        {inventoryCompanyList.map((company) => (
                            <CompanyDropdownOption
                                key={company["Company Code"]}
                                companyName={company["Company Name"]}
                                isSelected={
                                    currCompany === company["Company Name"]
                                }
                                onClickHandler={() =>
                                    handleCompanySelect(company["Company Name"])
                                }
                            />
                        ))}
                    </Box>
                </Box>
            )}
        </Button>
    );
}

export default SelectCompanyBtn;
