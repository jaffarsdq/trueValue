import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import SearchIcon from "@mui/icons-material/Search";
import { Box, Checkbox, Typography } from "@mui/material";
import { useMemo, useState } from "react";

const BranchDropdownOption = ({ branchName, isSelected, onClickHandler }) => {
    return (
        <Box
            sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                "&:hover": {
                    cursor: "pointer",
                    backgroundColor: "rgba(99,92,255,0.1)",
                },
                margin: "2px",
                padding: "2px 3px",
                height: "25px",
                borderRadius: "3px",
                fontFamily: "Poppins",
            }}
            onClick={onClickHandler}
        >
            <Typography
                sx={{
                    fontSize: "10px",
                    fontFamily: "Poppins",
                    fontWeight: "600",
                    paddingLeft: "8px",
                }}
            >
                {branchName}
            </Typography>
            <Checkbox
                checked={isSelected}
                onChange={onClickHandler}
                sx={{
                    color: "#635CFF",
                    "&.Mui-checked": {
                        color: "#635CFF",
                    },
                    "& .MuiSvgIcon-root": {
                        fontSize: "1rem",
                    },
                }}
            />
        </Box>
    );
};

function BranchDropDown() {
    const [isBranchDropDownClicked, setIsBranchDropDownClicked] =
        useState(false);
    const [selectedBranch, setSelectedBranch] = useState("");
    const [searchTerm, setSearchTerm] = useState("");
    const branchNames = useMemo(
        () => [
            "All Branch",
            "Main Branch",
            "Abu Dhabi Branch",
            "Jumeira Branch",
            "Branch 4",
            "Branch 5",
            "Branch 6",
            "Branch 7",
        ],
        []
    );

    const filteredBranchNames = useMemo(() => {
        return branchNames.filter((branchName) =>
            branchName.toLowerCase().includes(searchTerm.toLowerCase())
        );
    }, [branchNames, searchTerm]);

    const handleCompanySelect = (branch) => {
        setSelectedBranch(branch);
        setIsBranchDropDownClicked(false);
    };

    return (
        <Box
            sx={{
                position: "relative",
                display: "flex",
                alignItems: "center",
            }}
            // onMouseEnter={() => setIsBranchDropDownClicked(true)}
            // onMouseLeave={() => setIsBranchDropDownClicked(false)}
        >
            <Box
                onClick={() =>
                    setIsBranchDropDownClicked(!isBranchDropDownClicked)
                }
                sx={{
                    display: "flex",
                    gap: "1rem",
                    alignItems: "center",
                    cursor: "pointer",
                }}
            >
                <Typography
                    sx={{
                        fontSize: "12px",
                        fontFamily: "Poppins",
                    }}
                >
                    {selectedBranch || "Branch"}
                </Typography>

                <Box
                    sx={{
                        marginTop: "6px",
                        transform: isBranchDropDownClicked
                            ? "translate(-50%, -22%) rotate(-180deg)"
                            : "translate(-50%, 0%) rotate(0deg)",
                        transition: "transform 0.2s ease-in-out",
                    }}
                >
                    <KeyboardArrowDownIcon
                        className="dropDown"
                        sx={{
                            fontSize: "25px",
                            fontWeight: "10px",
                            transition: "all ease 0.2s",
                        }}
                    />
                </Box>
            </Box>
            {isBranchDropDownClicked && (
                <Box
                    sx={{
                        position: "absolute",
                        top: "100%",
                        right: "0",
                        width: "180px",
                        boxShadow: "0 1px 10px rgba(0, 0, 0, 0.15)",
                        borderRadius: "3px",
                        backgroundColor: "white",
                        zIndex: "10",
                        color: "black",
                    }}
                >
                    <Box
                        className={"custom-scrollbar"}
                        sx={{
                            padding: "2px ",
                            overflowY: "scroll",
                            maxHeight: "150px",
                        }}
                    >
                        <Box
                            sx={{
                                display: "flex",
                                height: "25px",
                                borderRadius: "5px",
                                cursor: "default",
                                alignItems: "center",
                                border: "1px solid rgba(189, 195, 199, 1)",
                                margin: "8px 4px",
                                position: "relative",
                            }}
                        >
                            <SearchIcon
                                sx={{
                                    fontSize: "20px",
                                    width: "20%",
                                    position: "absolute",
                                    left: "0",
                                    borderRadius: "5px",
                                }}
                            />
                            <Box sx={{ width: "100%" }}>
                                <input
                                    type="text"
                                    placeholder="Search"
                                    style={{
                                        width: "100%",
                                        border: "none",
                                        outline: "none",
                                        paddingLeft: "20%",
                                        borderRadius: "5px",
                                    }}
                                    value={searchTerm}
                                    onChange={(e) =>
                                        setSearchTerm(e.target.value)
                                    }
                                />
                            </Box>
                        </Box>
                        {filteredBranchNames.map((branchName) => (
                            <BranchDropdownOption
                                key={branchName}
                                branchName={branchName}
                                isSelected={selectedBranch === branchName}
                                onClickHandler={() =>
                                    handleCompanySelect(branchName)
                                }
                            />
                        ))}
                    </Box>
                </Box>
            )}
        </Box>
    );
}

export default BranchDropDown;
