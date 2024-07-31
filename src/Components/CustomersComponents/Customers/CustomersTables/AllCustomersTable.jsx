import {
    BorderColorOutlined,
    DeleteOutlineOutlined,
    FirstPage,
    KeyboardArrowLeft,
    KeyboardArrowRight,
    LastPage,
    MoreVert,
} from "@mui/icons-material";
import {
    Box,
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    IconButton,
    LinearProgress,
    Menu,
    MenuItem,
    Paper,
    styled,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TablePagination,
    TableRow,
    useTheme,
} from "@mui/material";
import { tableCellClasses } from "@mui/material/TableCell";
import PropTypes from "prop-types";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import {
    fetchDeleteCustomer,
    fetchSingleCustomer,
    resetSingleCustomerDetails,
    resetTranData,
    setIsCreate,
    setIsCustomerSelected,
    setSelectedCustomerId,
    setSelectedCustomerType,
} from "../../../../Redux/Slices/CustomerSlice";
import Emptyrow from "../../../CampaignsComponents/Emptyrow";
import DeleteCustomerDialog from "../../../CommonComponents/DeleteDialog";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
        backgroundColor: "#606060",
        color: theme.palette.common.white,
        fontSize: 12,
        padding: 10,
    },
    [`&.${tableCellClasses.body}`]: {
        fontSize: 12,
        padding: 10,
    },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
    "&:nth-of-type(odd)": {
        backgroundColor: theme.palette.action.hover,
    },
    "&:last-child td, &:last-child th": {
        border: 0,
    },
}));

function TablePaginationActions(props) {
    const theme = useTheme();
    const { count, page, rowsPerPage, onPageChange } = props;

    const handleFirstPageButtonClick = (event) => {
        onPageChange(event, 0);
    };

    const handleBackButtonClick = (event) => {
        onPageChange(event, page - 1);
    };

    const handleNextButtonClick = (event) => {
        onPageChange(event, page + 1);
    };

    const handleLastPageButtonClick = (event) => {
        onPageChange(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
    };

    return (
        <Box sx={{ flexShrink: 0, ml: 2.5 }}>
            <IconButton
                onClick={handleFirstPageButtonClick}
                disabled={page === 0}
                aria-label="first page"
            >
                {theme.direction === "rtl" ? <LastPage /> : <FirstPage />}
            </IconButton>
            <IconButton
                onClick={handleBackButtonClick}
                disabled={page === 0}
                aria-label="previous page"
            >
                {theme.direction === "rtl" ? (
                    <KeyboardArrowRight />
                ) : (
                    <KeyboardArrowLeft />
                )}
            </IconButton>
            <IconButton
                onClick={handleNextButtonClick}
                disabled={page >= Math.ceil(count / rowsPerPage) - 1}
                aria-label="next page"
            >
                {theme.direction === "rtl" ? (
                    <KeyboardArrowLeft />
                ) : (
                    <KeyboardArrowRight />
                )}
            </IconButton>
            <IconButton
                onClick={handleLastPageButtonClick}
                disabled={page >= Math.ceil(count / rowsPerPage) - 1}
                aria-label="last page"
            >
                {theme.direction === "rtl" ? <FirstPage /> : <LastPage />}
            </IconButton>
        </Box>
    );
}

TablePaginationActions.propTypes = {
    count: PropTypes.number.isRequired,
    onPageChange: PropTypes.func.isRequired,
    page: PropTypes.number.isRequired,
    rowsPerPage: PropTypes.number.isRequired,
};

export default function AllCustomersTable({ getInput }) {
    const { customersList, customersListLoading } = useSelector(
        (state) => state.customer
    );
    const { singleCustomerDetails, customerDetailsToDelete } = useSelector(
        (state) => state.customer
    );
    const { client_id } = useSelector((state) => state.auth);
    const dispatch = useDispatch();
    dispatch(setSelectedCustomerId(""));

    const gridName = [
        "Customer ID",
        "Phone Number",
        "Name",
        "Email",
        "Payment Type",
        "Options",
    ];

    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [anchorEls, setAnchorEls] = useState({});
    const [openDialog, setOpenDialog] = useState(false);
    const [selectedCustomer, setSelectedCustomer] = useState(null);

    const handleMenuOpen = (event, customer_id) => {
        setAnchorEls((prev) => ({
            ...prev,
            [customer_id]: event.currentTarget,
        }));
    };

    const handleMenuClose = (customer_id) => {
        setAnchorEls((prev) => ({ ...prev, [customer_id]: null }));
    };

    const handleEdit = (value) => {
        let customer_id = value?.customer_id;
        getInput(value);
        dispatch(resetTranData());
        dispatch(setIsCreate(false));
        dispatch(setIsCustomerSelected(true));
        dispatch(setSelectedCustomerId(customer_id));
        dispatch(fetchSingleCustomer({ customer_id, client_id }));
        dispatch(setSelectedCustomerType("Customer Details"));
        handleMenuClose(value.customer_id);
    };

    const handleDelete = (value) => {
        setSelectedCustomer(value);
        setOpenDialog(true);
    };

    const confirmDelete = () => {
        let customer_id = selectedCustomer.customer_id;
        let payload = JSON.parse(JSON.stringify(customerDetailsToDelete));

        if (customer_id) {
            if (
                payload.BASICINFO &&
                Array.isArray(payload.BASICINFO) &&
                payload.BASICINFO[0]
            ) {
                let basicInfo = payload.BASICINFO[0];
                basicInfo.deleted = 1;
                basicInfo.customer_id = customer_id;
                basicInfo.client_id = Number(client_id);
            }
        }

        handleMenuClose(selectedCustomer.customer_id);
        dispatch(fetchDeleteCustomer({ payload, client_id, customer_id }));
        setOpenDialog(false);
    };

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const navigate = useNavigate();

    if (customersListLoading)
        return <LinearProgress color="secondary" sx={{ width: "100%" }} />;

    const handleCreateButton = () => {
        dispatch(resetSingleCustomerDetails());
        dispatch(setSelectedCustomerId(""));
        dispatch(resetTranData());
        dispatch(setIsCreate(true));
        dispatch(setIsCustomerSelected(true));
        dispatch(setSelectedCustomerType("Customer Details"));
        handleMenuClose();
    };

    return (
        <Box>
            <Box
                sx={{
                    display: "flex",
                    justifyContent: "end",
                    padding: "0.5rem 0.5rem",
                    gap: "1rem",
                }}
            >
                <Button
                    color="secondary"
                    variant="contained"
                    sx={{ height: "40px" }}
                    onClick={handleCreateButton}
                >
                    Create Customer
                </Button>
            </Box>
            <TableContainer component={Paper} sx={{ padding: "2rem 1rem" }}>
                <Table aria-label="customized table">
                    <TableHead>
                        <TableRow>
                            {gridName.map((name) => (
                                <StyledTableCell align="left" key={name}>
                                    {name}
                                </StyledTableCell>
                            ))}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {customersList ? (
                            customersList
                                .slice(
                                    page * rowsPerPage,
                                    page * rowsPerPage + rowsPerPage
                                )
                                .map((row) => (
                                    <StyledTableRow key={row.customer_id}>
                                        <StyledTableCell
                                            sx={{
                                                textTransform: "none",
                                                borderBottom: "0px",
                                                fontSize: { xs: "16px" },
                                            }}
                                            align="left"
                                        >
                                            {row.customer_id}
                                        </StyledTableCell>
                                        <StyledTableCell
                                            sx={{
                                                borderBottom: "0px",
                                                textTransform: "capitalize",
                                            }}
                                            align="left"
                                        >
                                            {row.phone_number}
                                        </StyledTableCell>
                                        <StyledTableCell
                                            sx={{
                                                borderBottom: "0px",
                                                textTransform: "capitalize",
                                            }}
                                            align="left"
                                        >
                                            {row.name}
                                        </StyledTableCell>
                                        <StyledTableCell
                                            sx={{
                                                borderBottom: "0px",
                                            }}
                                            align="left"
                                        >
                                            {row.email}
                                        </StyledTableCell>
                                        <StyledTableCell
                                            sx={{
                                                borderBottom: "0px",
                                                textTransform: "capitalize",
                                            }}
                                            align="left"
                                        >
                                            {row.payment_type}
                                        </StyledTableCell>
                                        <StyledTableCell
                                            sx={{
                                                display: "flex",
                                                justifyContent: "center",
                                                alignItems: "center",
                                                gap: "0 20px",
                                                borderBottom: "0px",
                                                flexDirection: "row-reverse",
                                            }}
                                            align="center"
                                        >
                                            <IconButton
                                                onClick={(event) =>
                                                    handleMenuOpen(
                                                        event,
                                                        row.customer_id
                                                    )
                                                }
                                            >
                                                <MoreVert />
                                            </IconButton>
                                            <Menu
                                                anchorEl={
                                                    anchorEls[row.customer_id]
                                                }
                                                open={Boolean(
                                                    anchorEls[row.customer_id]
                                                )}
                                                onClose={() =>
                                                    handleMenuClose(
                                                        row.customer_id
                                                    )
                                                }
                                            >
                                                <MenuItem
                                                    onClick={() =>
                                                        handleEdit(row)
                                                    }
                                                >
                                                    <BorderColorOutlined
                                                        sx={{
                                                            margin: "0 5px",
                                                            cursor: "pointer",
                                                            color: "#2c6cc6",
                                                        }}
                                                    />
                                                </MenuItem>
                                                <MenuItem
                                                    onClick={() =>
                                                        handleDelete(row)
                                                    }
                                                >
                                                    <DeleteOutlineOutlined
                                                        sx={{
                                                            margin: "0 5px",
                                                            cursor: "pointer",
                                                            color: "#e62727",
                                                        }}
                                                    />
                                                </MenuItem>
                                            </Menu>
                                        </StyledTableCell>
                                    </StyledTableRow>
                                ))
                        ) : (
                            <Emptyrow colSpan={6} />
                        )}
                    </TableBody>
                </Table>
            </TableContainer>
            <TablePagination
                sx={{
                    backgroundColor: "white",
                    display: "flex",
                    justifyContent: "flex-end",
                }}
                rowsPerPageOptions={[5, 10, 25, { label: "All", value: -1 }]}
                colSpan={6}
                count={customersList?.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
                ActionsComponent={TablePaginationActions}
            />
            <DeleteCustomerDialog
                open={openDialog}
                onClose={() => setOpenDialog(false)}
                selectedCustomer={selectedCustomer}
                onConfirm={confirmDelete}
            />
        </Box>
    );
}
