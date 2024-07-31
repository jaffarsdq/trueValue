import {
    BorderColorOutlined as BorderColorOutlinedIcon,
    DeleteOutlineOutlined as DeleteColorOutlinedIcon,
    FirstPage as FirstPageIcon,
    KeyboardArrowDown as KeyboardArrowDownIcon,
    KeyboardArrowLeft as KeyboardArrowLeftIcon,
    KeyboardArrowRight as KeyboardArrowRightIcon,
    KeyboardArrowUp as KeyboardArrowUpIcon,
    LastPage as LastPageIcon,
    MoreVert as MoreVertIcon,
} from "@mui/icons-material";
import {
    Box,
    Collapse,
    IconButton,
    Menu,
    MenuItem,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TablePagination,
    TableRow,
    Typography,
    useTheme,
} from "@mui/material";
import { tableCellClasses } from "@mui/material/TableCell";
import { styled } from "@mui/material/styles";
import PropTypes from "prop-types";
import React, { useState } from "react";

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
                {theme.direction === "rtl" ? (
                    <LastPageIcon />
                ) : (
                    <FirstPageIcon />
                )}
            </IconButton>
            <IconButton
                onClick={handleBackButtonClick}
                disabled={page === 0}
                aria-label="previous page"
            >
                {theme.direction === "rtl" ? (
                    <KeyboardArrowRightIcon />
                ) : (
                    <KeyboardArrowLeftIcon />
                )}
            </IconButton>
            <IconButton
                onClick={handleNextButtonClick}
                disabled={page >= Math.ceil(count / rowsPerPage) - 1}
                aria-label="next page"
            >
                {theme.direction === "rtl" ? (
                    <KeyboardArrowLeftIcon />
                ) : (
                    <KeyboardArrowRightIcon />
                )}
            </IconButton>
            <IconButton
                onClick={handleLastPageButtonClick}
                disabled={page >= Math.ceil(count / rowsPerPage) - 1}
                aria-label="last page"
            >
                {theme.direction === "rtl" ? (
                    <FirstPageIcon />
                ) : (
                    <LastPageIcon />
                )}
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

export default function CustomerDetailedTransactionTable({
    disable,
    getInput,
    customerDetails,
}) {
    const gridName = [
        "Customer ID",
        "Client ID",
        "User ID",
        "Address ID",
        "Phone Number",
        "Customer Type",
        "Name",
        "Email",
        "Payment Type",
        "Action",
    ];
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [openRows, setOpenRows] = useState({});
    const [anchorEl, setAnchorEl] = useState(null);

    const handleMenuOpen = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
    };

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const toggleRow = (index) => {
        setOpenRows((prevState) => ({
            ...prevState,
            [index]: !prevState[index],
        }));
    };

    return (
        <Box>
            <TableContainer component={Paper} sx={{ padding: "2rem 1rem" }}>
                <Table aria-label="customized table">
                    <TableHead>
                        <TableRow>
                            <StyledTableCell />
                            {gridName.map((data, index) =>
                                data === "Action" ? (
                                    <StyledTableCell key={index} align="center">
                                        {data}
                                    </StyledTableCell>
                                ) : (
                                    <StyledTableCell key={index} align="left">
                                        {data}
                                    </StyledTableCell>
                                )
                            )}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {customerDetails
                            ?.slice(
                                page * rowsPerPage,
                                page * rowsPerPage + rowsPerPage
                            )
                            .map((row, index) => (
                                <React.Fragment key={index}>
                                    <StyledTableRow>
                                        <StyledTableCell>
                                            <IconButton
                                                aria-label="expand row"
                                                size="small"
                                                onClick={() => toggleRow(index)}
                                            >
                                                {openRows[index] ? (
                                                    <KeyboardArrowUpIcon />
                                                ) : (
                                                    <KeyboardArrowDownIcon />
                                                )}
                                            </IconButton>
                                        </StyledTableCell>
                                        <StyledTableCell align="left">
                                            {row.customer_id}
                                        </StyledTableCell>
                                        <StyledTableCell align="left">
                                            {row.client_id}
                                        </StyledTableCell>
                                        <StyledTableCell align="left">
                                            {row.user_id}
                                        </StyledTableCell>
                                        <StyledTableCell align="left">
                                            {row.address_id}
                                        </StyledTableCell>
                                        <StyledTableCell align="left">
                                            {row.phone_number}
                                        </StyledTableCell>
                                        <StyledTableCell align="left">
                                            {row.customer_type}
                                        </StyledTableCell>
                                        <StyledTableCell align="left">
                                            {row.name}
                                        </StyledTableCell>
                                        <StyledTableCell align="left">
                                            {row.email}
                                        </StyledTableCell>
                                        <StyledTableCell align="left">
                                            {row.payment_type}
                                        </StyledTableCell>
                                        <StyledTableCell align="center">
                                            <IconButton
                                                onClick={handleMenuOpen}
                                            >
                                                <MoreVertIcon />
                                            </IconButton>
                                            <Menu
                                                anchorEl={anchorEl}
                                                open={Boolean(anchorEl)}
                                                onClose={handleMenuClose}
                                            >
                                                <MenuItem
                                                    onClick={handleMenuClose}
                                                >
                                                    <DeleteColorOutlinedIcon
                                                        sx={{
                                                            margin: "0 5px",
                                                            cursor: "pointer",
                                                            color: "#e62727",
                                                        }}
                                                    />
                                                </MenuItem>
                                                <MenuItem
                                                    onClick={handleMenuClose}
                                                >
                                                    <BorderColorOutlinedIcon
                                                        sx={{
                                                            margin: "0 5px",
                                                            cursor: "pointer",
                                                            color: "#2c6cc6",
                                                        }}
                                                    />
                                                </MenuItem>
                                            </Menu>
                                        </StyledTableCell>
                                    </StyledTableRow>
                                    <StyledTableRow>
                                        <StyledTableCell
                                            style={{
                                                paddingBottom: 0,
                                                paddingTop: 0,
                                            }}
                                            colSpan={6}
                                        >
                                            <Collapse
                                                in={openRows[index]}
                                                timeout="auto"
                                                unmountOnExit
                                            >
                                                <Box sx={{ margin: 1 }}>
                                                    <Typography
                                                        variant="body2"
                                                        gutterBottom
                                                        component="div"
                                                    >
                                                        <strong>
                                                            Password:
                                                        </strong>{" "}
                                                        {row.password}
                                                        <br />
                                                        <strong>
                                                            Created By:
                                                        </strong>{" "}
                                                        {row.created_by}
                                                        <br />
                                                        <strong>
                                                            Deleted At:
                                                        </strong>{" "}
                                                        {row.deleted_at ||
                                                            "N/A"}
                                                        <br />
                                                        <strong>
                                                            Loyalty Customer ID:
                                                        </strong>{" "}
                                                        {row.loyalty_customer_id ||
                                                            "N/A"}
                                                        <br />
                                                        <strong>
                                                            Employee ID:
                                                        </strong>{" "}
                                                        {row.employee_id}
                                                        <br />
                                                        <strong>
                                                            Credit Customer ID:
                                                        </strong>{" "}
                                                        {row.credit_customer_id ||
                                                            "N/A"}
                                                        <br />
                                                        <strong>
                                                            Group Type:
                                                        </strong>{" "}
                                                        {row.group_type}
                                                        <br />
                                                        <strong>
                                                            Update Flag:
                                                        </strong>{" "}
                                                        {row.upd_flag}
                                                        <br />
                                                        <strong>
                                                            Update TimeStamp:
                                                        </strong>{" "}
                                                        {row.updTimeStamp}
                                                    </Typography>
                                                </Box>
                                            </Collapse>
                                        </StyledTableCell>
                                    </StyledTableRow>
                                </React.Fragment>
                            ))}
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
                colSpan={3}
                count={customerDetails?.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
                ActionsComponent={TablePaginationActions}
            />
        </Box>
    );
}
