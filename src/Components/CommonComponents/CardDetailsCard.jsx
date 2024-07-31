import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import RestoreFromTrashIcon from "@mui/icons-material/RestoreFromTrash";
import { Box, Typography } from "@mui/material";
import { useDispatch } from "react-redux";

import {
    deleteCard,
    setCardData,
    setIsCreateCard,
} from "../../Redux/Slices/CustomerSlice";

function CardDetailsCard({ data, handleToggle }) {
    const dispatch = useDispatch();
    const handleEdit = (data) => {
        handleToggle(true);
        dispatch(setCardData(data));
        dispatch(setIsCreateCard(false));
        window.scrollTo({
            top: 0,
            behavior: "smooth", // Optionally, you can set smooth scrolling behavior
        });
        // dispatch(setSingleCustomerDetailsForAddress(data));
    };

    const handleDelete = (data) => {
        dispatch(deleteCard(data));
        // dispatch(setSingleCustomerDetailsForAddress(data));
    };
    return (
        <Box
            sx={{
                display: "flex",
                justifyContent: "space-between",
                width: { xs: "90%", md: "48%", lg: "32%" },
                padding: "10px 20px",
                minHeight: "170px",
                flexDirection: { xs: "column", sm: "row" },
                gap: { xs: "20px", sm: "0px" },
                boxShadow: " 0px 4px 10px 5px rgba(238, 238, 238, 1)",
                borderRadius: "10px",
                background: "white",
            }}
        >
            <Box
                sx={{
                    display: "flex",
                    justifyContent: "space-evenly",
                    flexDirection: "column",
                    alignItems: "start",
                    gap: "20px",
                    width: { xs: "100%", sm: "60%" },
                }}
            >
                <Box
                    sx={{
                        display: "flex",
                        gap: "10px",
                        color: "#A42ED7",
                        fontFamily: "Poppins !important",
                    }}
                >
                    <Typography
                        sx={{
                            color: "#A42ED7",
                            fontFamily: "Poppins !important",
                            width: "120px",
                            fontWeight: "600",
                            fontSize: { xs: "12px", md: "14px" },
                        }}
                    >
                        Card Number:
                    </Typography>
                    <Typography
                        color={"black"}
                        sx={{
                            fontWeight: "400",
                            fontFamily: "Poppins !important",
                            fontSize: { xs: "12px", md: "14px" },
                        }}
                    >
                        {data?.card_no}
                    </Typography>
                </Box>
                <Box sx={{ display: "flex", gap: "10px" }}>
                    <Typography
                        sx={{
                            fontWeight: "600",
                            color: "#A42ED7",
                            fontFamily: "Poppins !important",
                            width: "120px",
                            fontSize: { xs: "12px", md: "14px" },
                        }}
                    >
                        Card Name:
                    </Typography>
                    <Typography
                        sx={{
                            fontWeight: "400",
                            color: "black",
                            fontFamily: "Poppins !important",
                            fontSize: { xs: "12px", md: "14px" },
                        }}
                    >
                        {data?.cardname}
                    </Typography>
                </Box>

                <Box sx={{ display: "flex", gap: "10px", width: "100%" }}>
                    <Typography
                        sx={{
                            color: "#A42ED7",
                            fontWeight: "600",
                            fontFamily: "Poppins !important",
                            width: "120px",
                            fontSize: { xs: "12px", md: "14px" },
                        }}
                        color={"#6387d6"}
                    >
                        Expiry:
                    </Typography>
                    <Typography
                        color={"black"}
                        sx={{
                            fontWeight: "400",
                            fontFamily: "Poppins !important",
                            fontSize: "12px",
                            width: "fit-content",
                        }}
                    >
                        {data?.card_exp_date}
                    </Typography>
                </Box>
            </Box>
            <Box
                sx={{
                    display: "flex",
                    justifyContent: "center",
                    flexDirection: { xs: "row", sm: "column" },
                    alignItems: "start",
                    padding: { xs: "0", sm: "0 20px" },
                }}
            >
                <Box
                    sx={{
                        marginTop: "auto",
                        width: "100%",
                        display: "flex",
                        justifyContent: "end",
                        alignItems: "center",
                        gap: "20px",
                    }}
                >
                    <EditIcon
                        sx={{
                            color: "green",
                            cursor: "pointer",
                            ":hover": {
                                opacity: "0.5",
                            },
                        }}
                        onClick={() => handleEdit(data)}
                    />
                    {data?.Deleted == 0 ? (
                        <DeleteIcon
                            sx={{
                                color: "#e3051b",
                                cursor: "pointer",
                                ":hover": {
                                    opacity: "0.5",
                                },
                            }}
                            onClick={() => handleDelete(data)}
                        />
                    ) : (
                        <RestoreFromTrashIcon
                            sx={{
                                color: "green",
                                cursor: "pointer",
                                ":hover": {
                                    opacity: "0.5",
                                },
                            }}
                            onClick={() => handleDelete(data)}
                        />
                    )}
                </Box>
            </Box>
        </Box>
    );
}

export default CardDetailsCard;
