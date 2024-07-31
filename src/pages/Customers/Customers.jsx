import { Box } from "@mui/material";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import CustomerDetailsTabs from "../../Components/CommonComponents/CustomerDetailsTabs";
import Card from "../../Components/CustomersComponents/Card";
import Address from "../../Components/CustomersComponents/Customers/Address/Address";
import CustomerDetails from "../../Components/CustomersComponents/Customers/CustomersDetails/customerDetails";
import AllCustomersTable from "../../Components/CustomersComponents/Customers/CustomersTables/AllCustomersTable";
import TransactionNew from "../../Components/CustomersComponents/Customers/CustomersTables/TransactionNew";
import PointManagement from "../../Components/CustomersComponents/Customers/PointManagement/PointManagemet";
import SideBar from "../../Layouts/SideBar";
import {
    fetchCustomersList,
    setIsCustomerSelected,
    setSelectedCustomerType,
} from "../../Redux/Slices/CustomerSlice";

function Customers() {
    const dispatch = useDispatch();
    const {
        selectedCustomerType,
        singleCustomerDetails,
        selectedCustomerId,
        customersListLoading,
    } = useSelector((state) => state.customer);
    // const [value, setValue] = useState(selectedCustomerType);
    const [customerDetails, setCustomerDetails] = React.useState([]);
    const { client_id } = useSelector((state) => state.auth);
    const handleValue = (value) => {
        // setValue(value);
        if (
            value == "All Customers" &&
            selectedCustomerType != "All Customers"
        ) {
            dispatch(setIsCustomerSelected(false));
        }
        dispatch(setSelectedCustomerType(value));
        console.log(value);
    };
    const getInput = (data) => {
        console.log(data.PointManagement);
        setCustomerDetails([data]);
    };

    useEffect(() => {
        if (selectedCustomerType == "All Customers" && !customersListLoading)
            dispatch(fetchCustomersList(client_id));
    }, []);

    // useEffect(() => {
    //     if (selectedCustomerId) {
    //         dispatch(fetchSingleCustomer(selectedCustomerId));
    //     }
    // }, [selectedCustomerId]);

    return (
        <SideBar>
            <CustomerDetailsTabs
                handleValue={handleValue}
                value={selectedCustomerType}
            />
            <div
                style={{
                    backgroundColor: "#FAFBFC",
                    fontFamily: "poppins",
                    minHeight: "calc(100dvh - 115px)",
                }}
            >
                <Box sx={{ width: "98.6%", margin: "0 auto" }}>
                    {selectedCustomerType === "All Customers" && (
                        <AllCustomersTable
                            CustomerDetails={customerDetails}
                            getInput={getInput}
                        />
                    )}
                    {selectedCustomerType === "Customer Details" && (
                        <CustomerDetails />
                    )}
                    {selectedCustomerType === "Address" && <Address />}
                    {selectedCustomerType === "Cards" && <Card />}
                    {selectedCustomerType === "Transactions" && (
                        <TransactionNew />
                    )}
                    {selectedCustomerType === "Points Management" && (
                        <PointManagement />
                    )}
                </Box>
            </div>
        </SideBar>
    );
}

export default Customers;
