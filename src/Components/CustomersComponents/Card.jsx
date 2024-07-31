import AddIcon from "@mui/icons-material/Add";
import { Button, Collapse, LinearProgress } from "@mui/material";
import { Box } from "@mui/system";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
    resetCardData,
    setIsCreateCard,
} from "../../Redux/Slices/CustomerSlice";
import CardDetailsCard from "../CommonComponents/CardDetailsCard";
import CardForm from "./Customers/Card/CardForm";
import ViewCustomerCode from "./ViewCustomerCode";

export default function Card() {
    const [toggle, setToggle] = useState(false);
    const dispatch = useDispatch();

    const data = useSelector(
        (state) => state?.customer?.singleCustomerDetails?.LOY_CARDS
    );

    const { singleCustomerDetailsLoading, isCreate, selectedCustomerId } =
        useSelector((state) => state.customer);

    const handlePageChangeAddressForm = (bool) => {
        dispatch(resetCardData());
        if (bool) {
            setToggle(bool);
        } else {
            setToggle(true);
        }
        dispatch(setIsCreateCard(true));
    };

    const handleCancel = () => {
        dispatch(resetCardData());
        setToggle(!toggle);
        dispatch(setIsCreateCard(false));
    };

    const handleToggleContactForm = (bool) => {
        if (bool) {
            setToggle(bool);
        } else {
            setToggle(!toggle);
        }

        dispatch(setIsCreateCard(false));
    };

    if (singleCustomerDetailsLoading && !isCreate)
        return <LinearProgress color="secondary" />;

    return (
        <Box sx={{ bgcolor: "#FAFBFC" }}>
            <Box
                sx={{
                    display: "flex",
                    flexDirection:{xs: "column", sm: "row"},
                    justifyContent: "space-between",
                    padding: "0.5rem 1rem 0 1rem",
                    alignItems: {xs: "end", sm: "center"},
                    gap: {xs: "1rem", sm: "0rem"}
                }}
            >
                <ViewCustomerCode selectedCustomerId={selectedCustomerId} />
                {!toggle ? (
                    <Button
                        variant="contained"
                        color="secondary"
                        onClick={handlePageChangeAddressForm}
                        startIcon={<AddIcon />}
                        sx={{ height: "30px" }}
                    >
                        {"Add new card"}
                    </Button>
                ) : (
                    <Button
                        variant="contained"
                        color="secondary"
                        onClick={handleCancel}
                        sx={{ height: "32px" }}
                    >
                        {"Cancel"}
                    </Button>
                )}
            </Box>

            <Collapse in={toggle}>
                <Box sx={{ height: "auto" }}>
                    <CardForm navBack={handleToggleContactForm} />
                </Box>
            </Collapse>

            <Box
                sx={{
                    padding: "0.5rem 0.5rem",
                    display: "flex",
                    flexDirection: "row",
                    flexWrap: "wrap",
                    gap: "20px",
                    alignItems: "center",
                    justifyContent: "center",
                    marginTop:{xs: "1rem", md: "0"}
                }}
            >
                {data.map((curr, idx) => (
                    <CardDetailsCard
                        data={curr}
                        handleToggle={handleToggleContactForm}
                        key={idx}
                    />
                ))}
            </Box>
        </Box>
    );
}
