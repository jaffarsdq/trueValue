import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import RestoreFromTrashIcon from "@mui/icons-material/RestoreFromTrash";
import { Box, Typography } from "@mui/material";
import { useDispatch } from "react-redux";

import {
    deleteAddress,
    setAddressData,
    setIsCreateAddress,
    updateFieldInAddress,
} from "../../../../Redux/Slices/CustomerSlice";
import CustomizedSwitches from "../../../CommonComponents/CustomizedSwitches";

export default function AddressCard({ data, Defaultvalue, handleToggle }) {
    const dispatch = useDispatch();
    const handleEdit = (data) => {
        handleToggle(true);
        dispatch(setAddressData(data));
        dispatch(setIsCreateAddress(false));
        window.scrollTo({
            top: 0,
            behavior: "smooth", // Optionally, you can set smooth scrolling behavior
        });
        // dispatch(setSingleCustomerDetailsForAddress(data));
    };

    const handleDelete = (data) => {
        dispatch(deleteAddress(data));
        // dispatch(setSingleCustomerDetailsForAddress(data));
    };
    // const { isCreateAddress } = useSelector((state) => state.customer);

    // const customerAddressData = useSelector(
    //     (state) => state.customer.singleCustomerDetails.ADDRESS
    // );

    // const handleDefault = (field, value, data) => {

    //     console.log(field, value, data)
    //     dispatch(
    //         updateFieldInAddress(
    //             data?.Customer_Add_id,
    //             data?.frontEndId,
    //             field,
    //             value
    //         )
    //     );
    //     // updateFieldInAddress: (state, action) => {
    //     //     const { Customer_Add_id, frontEndId, field, value } =
    //     //         action.payload;
    // };
    const handleDefault = (field, value, data) => {
        dispatch(updateFieldInAddress({
            Customer_Add_id: data?.Customer_Add_id,
            frontEndId: data?.frontEndId,
            field,
            value
        }));
    };

//     const handleDefault = (field, value, data) => {
//     dispatch(
//         updateFieldInAddress(
//             data?.Customer_Add_id,
//             data?.frontEndId,
//             field,
//             value
//         )
//     );
// };


    // const handleInputChange = (field, value) => {
    //     dispatch(setAddressData(data));
    //     console.log("Updating field:", field, "with value:", value); // Debugging log
    //     dispatch(setAddressData({ [field]: value }));
    //     if (isCreateAddress) {
    //         let newId = v4();
    //         while (
    //             customerAddressData.some(
    //                 (address) => address.frontEndId === newId
    //             )
    //         ) {
    //             newId = v4();
    //         }
    //         dispatch(setAddressData({ ["frontEndId"]: newId }));
    //     }
    // };

    return (
        <Box
            sx={{
                display: "flex",
                justifyContent: "space-between",
                width: "100%",
                padding: "20px",
                minHeight: "200px",
                flexDirection: { xs: "column", sm: "row" },
                gap: { xs: "20px", sm: "0px" },
                boxShadow: "0px 4px 10px 5px rgba(238, 238, 238, 1)",
                borderRadius: "4px",
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
                    sx={{ display: "flex", gap: "10px", alignItems: "center" }}
                >
                    <Typography
                        sx={{
                            fontWeight: "600",
                            color: "#A42ED7",
                            fontFamily: "Poppins !important",
                            width: "80px",
                            fontSize: "16px",
                        }}
                    >
                        Address:
                    </Typography>
                    <Typography
                        color="black"
                        sx={{
                            fontWeight: "400",
                            fontFamily: "Poppins !important",
                            fontSize: "14px",
                        }}
                    >
                        {`${data.Address_line}, ${data.City}, ${data.State}, ${data.Country}, ${data.Zip_code}`}
                    </Typography>
                </Box>
                <Box
                    sx={{ display: "flex", gap: "10px", alignItems: "center" }}
                >
                    <Typography
                        sx={{
                            color: "#A42ED7",
                            fontWeight: "600",
                            fontFamily: "Poppins !important",
                            width: "80px",
                            fontSize: "16px",
                        }}
                        color="black"
                    >
                        Phone:
                    </Typography>
                    <Typography
                        color="black"
                        sx={{
                            fontWeight: "400",
                            fontFamily: "Poppins !important",
                            fontSize: "14px",
                        }}
                    >
                        {data.Phone_number}
                    </Typography>
                </Box>
            </Box>
            <Box
                sx={{
                    display: "flex",
                    justifyContent: "center",
                    flexDirection: { xs: "row", sm: "column" },
                    alignItems: "start",
                }}
            >
                <Box
                    sx={{
                        width: "100%",
                        display: "flex",
                        justifyContent: { xs: "start", sm: "end" },
                        alignItems: "center",
                        gap: "20px",
                    }}
                >
                    <Typography
                        sx={{
                            fontWeight: "600",
                            fontFamily: "Poppins !important",
                            fontSize: "14px",
                        }}
                        color="#A42ED7"
                    >
                        Default address
                    </Typography>
                    <CustomizedSwitches
                        checked={data.default_status?.toUpperCase() === "Y"}
                        onChange={(e) =>
                            handleDefault(
                                "default_status",
                                e.target.checked ? "Y" : "N",
                                data
                            )
                        }
                    />
                </Box>
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
