import DoneIcon from "@mui/icons-material/Done";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { Box, Button, Typography } from "@mui/material";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { setSelectedCustomerType } from "../../Redux/Slices/CustomerSlice";

const SelectCustomerTypeOption = ({
    filterName,
    isSelected,
    onClickHandler,
}) => {
    const [isHovered, setIsHovered] = useState(false);

    return (
        <Box
            sx={{
                display: "flex",
                gap: "5px",
                alignItems: "center",
                backgroundColor: isSelected
                    ? "rgba(40, 145, 250,0.16)"
                    : isHovered
                    ? "rgba(40, 145, 250,0.1)"
                    : "rgba(40, 145, 250,0.0)",
                "&:hover": {
                    backgroundColor: "rgba(40, 145, 250,0.1)",
                },
                margin: "2px",
                padding: "2px 3px",
                height: "25px",
                borderRadius: "3px",
                fontFamily: "Poppins",
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
                {filterName}
            </Typography>
        </Box>
    );
};

function SelectCustomerType({ filteredName }) {
    const dispatch = useDispatch();

    const filterNames = [
        "All Customers",
        "Normal Customers",
        "Loyalty Customers",
    ];
    const [isSelectCustomerTypeClicked, setIsSelectCustomerTypeClicked] =
        useState(false);

    const [selectedFilter, setSelectedFilter] = useState(filterNames[0]);

    const handleCompanySelect = (filterName) => {
        setSelectedFilter(filterName);
        // filteredName(filterName);
        setIsSelectCustomerTypeClicked(false);
        dispatch(setSelectedCustomerType(filterName));
    };

    return (
        <Button
            sx={{
                position: "relative",
                fontFamily: "poppins",
                textTransform: "capitalize",
                color: "#151D48",
                display: "flex",
                alignItems: "center",
                width: { xs: "160px", md: "200px", lg: "200px" },
                minHeight: "36px",
                marginLeft: "0rem",
                backgroundColor: "rgb(232,235,239,1)",
                padding: { xs: "0px 2px", sm: "0px 6px" },
                justifyContent: "space-between",
                borderRadius: "2px",
                cursor: "pointer",
                boxShadow: "0 1px 5px rgba(0, 0, 0, 0)",
                "&:hover": {
                    boxShadow: "0 1px 5px rgba(0, 0, 0, 0.1)",
                    backgroundColor: "#dce1e6",
                },
                transition: "all ease 0.2s",
                gap: { xs: "10px", md: "20px" },
            }}
            // onClick={() =>
            //     setIsSelectCustomerTypeClicked(!isSelectCustomerTypeClicked)
            // }
            onMouseEnter={() => setIsSelectCustomerTypeClicked(true)}
            onMouseLeave={() => setIsSelectCustomerTypeClicked(false)}
        >
            <Box
                sx={{
                    fontWeight: "600",
                    fontSize: { xs: "10px", md: "12px", lg: "12px" },
                }}
            >
                {selectedFilter}
            </Box>
            <Box
                sx={{
                    marginTop: "6px",
                    transform: isSelectCustomerTypeClicked
                        ? "translate(-50%, -25%) rotate(180deg)"
                        : "translate(-50%, 2%) rotate(0deg)",
                    transition: "transform 0.2s ease-in-out",
                }}
            >
                <KeyboardArrowDownIcon
                    className="dropDown"
                    style={{
                        fontSize: "22px",
                        fontWeight: "10px",
                        opacity: "45%",
                        transition: "all ease 0.2s",
                    }}
                />
            </Box>
            {isSelectCustomerTypeClicked && (
                <Box
                    sx={{
                        position: "absolute",
                        top: "100%",
                        left: "0",
                        width: "100%",
                        boxShadow: "0 1px 10px rgba(0, 0, 0, 0.3)",
                        borderRadius: "3px",
                        backgroundColor: "white",
                        zIndex: "10",
                    }}
                >
                    <Box sx={{ padding: "2px " }}>
                        {filterNames.map((filterName) => (
                            <SelectCustomerTypeOption
                                key={filterName}
                                filterName={filterName}
                                isSelected={selectedFilter === filterName}
                                onClickHandler={() =>
                                    handleCompanySelect(filterName)
                                }
                            />
                        ))}
                    </Box>
                </Box>
            )}
        </Button>
    );
}

export default SelectCustomerType;
