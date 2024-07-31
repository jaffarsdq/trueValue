import DoneIcon from "@mui/icons-material/Done";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { Box, Button, Typography } from "@mui/material";
import { useState } from "react";

const ConditionSelectorDropDownOption = ({
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
                padding: "2px 5px",
                height: "25px",
                borderRadius: "3px",
                fontFamily: "Poppins",
                borderBottom: "rgba(40, 145, 250,0.1) 1px solid",
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
                    fontSize: "12px",
                    fontFamily: "Poppins",
                    fontWeight: "600",
                }}
            >
                {filterName}
            </Typography>
        </Box>
    );
};

function ConditionSelectorDropDown({
    value,
    onChange,
    selectedColumnName,
    disable,
}) {
    const columnOptions = ["=", ">", "<", ">=", "<="];
    const [selectedFilter, setSelectedFilter] = useState(value);
    const [
        isConditionSelectorDropDownClicked,
        setIsConditionSelectorDropDownClicked,
    ] = useState(false);

    const handleConditionSelect = (condition) => {
        setSelectedFilter(condition);
        onChange(condition);
    };

    return (
        <Box sx={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <Button
                disabled={disable}
                sx={{
                    position: "relative",
                    fontFamily: "poppins",
                    textTransform: "none",
                    color: "#151D48",
                    display: "flex",
                    alignItems: "center",
                    width: { xs: "80px", sm: "100px" },
                    height: "32px",
                    marginLeft: "0rem",
                    backgroundColor: "rgb(232,235,239,1)",
                    padding: "2px 6px",
                    justifyContent: "space-between",
                    borderRadius: "2px",
                    cursor: "pointer",
                    boxShadow: "0 1px 5px rgba(0, 0, 0, 0.05)",
                    "&:hover": {
                        boxShadow: "0 1px 5px rgba(0, 0, 0, 0.1)",
                        backgroundColor: "#dce1e6",
                    },
                    transition: "all ease 0.2s",
                }}
                onMouseEnter={() => setIsConditionSelectorDropDownClicked(true)}
                onMouseLeave={() =>
                    setIsConditionSelectorDropDownClicked(false)
                }
            >
                <Box
                    sx={{
                        fontWeight: "800",
                        fontSize: {
                            xs: "10px",
                            md: "12px",
                            lg: !selectedColumnName ? "10px" : "14px",
                        },
                    }}
                >
                    {selectedColumnName || "Select Condition"}
                </Box>
                <Box
                    sx={{
                        marginTop: "6px",
                        transform: isConditionSelectorDropDownClicked
                            ? "translate(-50%, -25%) rotate(180deg)"
                            : "translate(-50%, 2%) rotate(0deg)",
                        transition: "transform 0.2s ease-in-out",
                    }}
                >
                    <KeyboardArrowDownIcon
                        className="dropDown"
                        style={{
                            fontSize: "20px",
                            fontWeight: "10px",
                            opacity: "45%",
                            transition: "all ease 0.2s",
                        }}
                    />
                </Box>
                {isConditionSelectorDropDownClicked && (
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
                            maxHeight: "240px",
                            overflowY: "auto",
                        }}
                    >
                        <Box sx={{ padding: "2px " }}>
                            {columnOptions.map((option, index) => (
                                <ConditionSelectorDropDownOption
                                    filterName={option}
                                    key={index}
                                    condition={option}
                                    isSelected={selectedFilter === option}
                                    onClickHandler={() =>
                                        handleConditionSelect(option)
                                    }
                                />
                            ))}
                        </Box>
                    </Box>
                )}
            </Button>
        </Box>
    );
}

export default ConditionSelectorDropDown;
