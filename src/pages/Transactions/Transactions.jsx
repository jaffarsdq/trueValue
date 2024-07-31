import { Box } from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

import CustomerTransactionsTabs from "../../Components/CommonComponents/CustomerTransactionsTabs";
import Transactions from "../../Components/CustomersComponents/Customers/CustomersTables/Transactions";
import SideBar from "../../Layouts/SideBar";

function CustomersTransactions() {
    const [value, setValue] = useState("one");
    const navigate = useNavigate();
    const handleValue = (value) => {
        setValue(value);
    };
    return (
        <SideBar>
            <CustomerTransactionsTabs handleValue={handleValue} value={value} />
            <div style={{ backgroundColor: "#FAFBFC", fontFamily: "poppins" }}>
                {/* <Box
                    sx={{
                        display: "flex",
                        justifyContent: "end",
                        padding: "0.5rem 0.5rem",
                        gap: "1rem",
                    }}
                >
                    <SelectPageDropDown />
                    <Button
                        color="secondary"
                        variant="contained"
                        sx={{ height: "40px" }}
                        onClick={() => navigate("/createCustomer")}
                    >
                        Create CustomersTransactions
                    </Button>
                </Box> */}
                <Box sx={{ width: "98.6%", margin: "0 auto" }}>
                    {value === "one" && <Transactions />}
                </Box>
            </div>
        </SideBar>
    );
}

export default CustomersTransactions;
