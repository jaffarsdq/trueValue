import { Box, Typography } from "@mui/material";
import { useSelector } from "react-redux";

function ViewCustomerCode({ selectedCustomerId }) {
    const { isCreate } = useSelector((state) => state.customer);

    return (
        <Box
            sx={{
                border: "1px solid purple",
                width: "fit-content",
                padding: "0.5rem",
                // margin: "0.5rem",
                borderRadius: "8px",
                display: isCreate ? "none" : "flex",
                alignItems: "center",
            }}
        >
            <Typography sx={{ color: "black" }}>Customer Code :</Typography>
            <Typography sx={{ color: "purple" }}>
                {selectedCustomerId}
            </Typography>
        </Box>
    );
}

export default ViewCustomerCode;
