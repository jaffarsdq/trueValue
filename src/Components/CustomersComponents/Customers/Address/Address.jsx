import AddIcon from "@mui/icons-material/Add";
import { Button, Collapse, LinearProgress, Typography } from "@mui/material";
import { Box, Stack } from "@mui/system";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
    resetAddressData,
    setIsCreateAddress,
} from "../../../../Redux/Slices/CustomerSlice";
import ViewCustomerCode from "../../ViewCustomerCode";
import AddressCard from "./AddressCard";
import AddressForm from "./AddressForm";

export default function Address() {
    const [toggle, setToggle] = useState(false);
    const dispatch = useDispatch();

    const {
        singleCustomerDetails,
        singleCustomerDetailsLoading,
        isCreate,
        selectedCustomerId,
        isCreateAddress,
    } = useSelector((state) => state.customer);

    const addresses = useSelector(
        (state) => state?.customer?.singleCustomerDetails?.ADDRESS || []
    );

    const defaultAddresses = addresses.filter(
        (detail) => detail.default_status === "Y"
    );
    const otherAddresses = addresses.filter(
        (detail) => detail.default_status !== "Y"
    );

    const handlePageChangeAddressForm = () => {
        dispatch(resetAddressData());
        setToggle(!toggle);
        dispatch(setIsCreateAddress(true));
    };

    const handleCancel = () => {
        dispatch(resetAddressData());
        setToggle(!toggle);
        dispatch(setIsCreateAddress(false));
    };

    const handleToggle = (bool) => {
        if (bool === false || bool === true) {
            setToggle(bool);
        } else {
            setToggle(!toggle);
        }

        dispatch(setIsCreateAddress(false));
    };

    if (singleCustomerDetailsLoading && !isCreate)
        return <LinearProgress color="secondary" />;

    return (
        <>
            {
                <Box
                    sx={{
                        background: "#FAFBFC",
                        display: "block",
                    }}
                >
                    <Box
                        sx={{
                            display: "flex",
                            flexDirection:{xs: "column", sm: "row"},
                            justifyContent: "space-between",
                            padding: "0.5rem 1rem 0 1rem",
                            alignItems: {xs: "end", sm: "center"},
                            mb: {xs: "1rem", sm: "0.5rem"},
                            gap: {xs: "1rem", sm: "0rem"}
                        }}
                    >
                        <ViewCustomerCode
                            selectedCustomerId={selectedCustomerId}
                        />
                        {toggle ? (
                            <Button
                                onClick={handleCancel}
                                color="secondary"
                                variant="contained"
                                sx={{ height: "30px" }}
                            >
                                {"cancel"}
                            </Button>
                        ) : (
                            <Button
                                onClick={handlePageChangeAddressForm}
                                color="secondary"
                                variant="contained"
                                startIcon={<AddIcon />}
                                sx={{ height: "30px" }}
                            >
                                {"ADD NEW ADDRESS"}
                            </Button>
                        )}
                    </Box>
                    <Collapse in={toggle}>
                        <Box sx={{ height: "auto" }}>
                            <AddressForm
                                navBack={handlePageChangeAddressForm}
                            />
                        </Box>
                    </Collapse>
                    <Stack
                        spacing={2}
                        direction="column"
                        justifyContent="start"
                        padding="0px 20px 20px 20px"
                    >
                        <Typography
                            sx={{
                                color: "#070175",
                                fontSize: "18px",
                                fontFamily: "Poppins !important",
                                fontWeight: "400",
                            }}
                        >
                            Default Address
                        </Typography>
                        <Box
                            sx={{
                                display: "flex",
                                flexDirection: "column",
                                gap: "20px",
                            }}
                        >
                            {defaultAddresses.length > 0 ? (
                                defaultAddresses.map((data, index) => (
                                    <AddressCard
                                        key={index}
                                        data={data}
                                        Defaultvalue={true}
                                        handleToggle={handleToggle}
                                    />
                                ))
                            ) : (
                                <Typography>
                                    No default address found.
                                </Typography>
                            )}
                        </Box>
                        <Typography
                            sx={{
                                color: "#070175",
                                fontSize: "18px",
                                fontFamily: "Poppins !important",
                                fontWeight: "400",
                            }}
                        >
                            Other Address
                        </Typography>
                        <Box
                            sx={{
                                display: "flex",
                                flexDirection: "column",
                                gap: "20px",
                            }}
                        >
                            {otherAddresses.length > 0 ? (
                                otherAddresses.map((data, index) => (
                                    <AddressCard
                                        key={index}
                                        data={data}
                                        Defaultvalue={false}
                                        handleToggle={handleToggle}
                                    />
                                ))
                            ) : (
                                <Typography>No other address found.</Typography>
                            )}
                        </Box>
                    </Stack>
                </Box>
            }
        </>
    );
}
