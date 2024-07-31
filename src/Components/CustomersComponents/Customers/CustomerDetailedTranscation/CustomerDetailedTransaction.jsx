import { Box, Typography } from "@mui/material";
import { useSelector } from "react-redux";

import CustomerDetailedTransactionTable from "../CustomersTables/CustomerDetailedTransactionTable";

export default function CustomerDetailedTransactions({ customerDetails }) {
    const { selectedCustomerId } = useSelector((state) => state.customer);
    return (
        <>
            <Box
                sx={{
                    border: "1px solid purple",
                    width: "fit-content",
                    padding: "0.5rem",
                    margin: "0.5rem",
                    borderRadius: "8px",
                    display: "flex",
                    alignItems: "center",
                }}
            >
                Customer Code :{" "}
                <Typography sx={{ color: "purple" }}>
                    {selectedCustomerId}
                </Typography>
            </Box>
            <CustomerDetailedTransactionTable
                customerDetails={customerDetails?.customer_basic_info}
            />
        </>
    );
}
