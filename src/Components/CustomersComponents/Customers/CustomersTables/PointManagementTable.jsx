import BorderColorOutlinedIcon from "@mui/icons-material/BorderColorOutlined";
import DeleteColorOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import FirstPageIcon from "@mui/icons-material/FirstPage";
import KeyboardArrowLeft from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRight from "@mui/icons-material/KeyboardArrowRight";
import LastPageIcon from "@mui/icons-material/LastPage";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { LinearProgress, Menu, MenuItem } from "@mui/material";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import { styled, useTheme } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import PropTypes from "prop-types";
import React from "react";

import displayFormattedDate from "../../../../Utils/displayFormattedDate";
import Emptyrow from "../../../CampaignsComponents/Emptyrow";

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

export default function PointManagementTable({
    disable,
    getInput,
    customerDetails,
    pointsStatementData,
    pointsStatementDataLoading,
}) {
    const columnHeaders = [
        "Customer Code",
        "Card Number",
        "Bill Date",
        "Total Points",
        "Transaction Type",
        "Voucher Amount",
        "Points Expire Date",
        "Action",
    ];

    // const dispatch = useDispatch();
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(5);
    const [anchorEl, setAnchorEl] = React.useState(null);
    const [selectedRow, setSelectedRow] = React.useState(null);

    const handleMenuOpen = (event, row) => {
        setSelectedRow(row);
        setAnchorEl(event.currentTarget);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
    };

    const handleEdit = () => {
        getInput(selectedRow);
        handleMenuClose();
    };

    const handleDelete = (index) => {
        handleMenuClose();
    };

    const handleRestore = (index) => {
        handleMenuClose();
    };

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };
    if (pointsStatementDataLoading) return <LinearProgress color="secondary" />;

    return (
        <TableContainer sx={{ padding: "1rem 0rem" }}>
            <Table aria-label="customized table">
                <TableHead>
                    <TableRow>
                        {columnHeaders.map((data, index) =>
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
                    {pointsStatementData ? (
                        pointsStatementData
                            .slice(
                                page * rowsPerPage,
                                page * rowsPerPage + rowsPerPage
                            )
                            .map((row, index) => {
                                return (
                                    <StyledTableRow key={index}>
                                        <StyledTableCell
                                            sx={{
                                                textTransform: "none",
                                                borderBottom: "0px",
                                                fontSize: { xs: "16px" },
                                            }}
                                            align="left"
                                        >
                                            {row.cust_code.trim()}
                                        </StyledTableCell>
                                        <StyledTableCell
                                            sx={{
                                                borderBottom: "0px",
                                                textTransform: "none",
                                                fontSize: { xs: "16px" },
                                            }}
                                            align="left"
                                        >
                                            {row.card_no.trim()}
                                        </StyledTableCell>
                                        <StyledTableCell
                                            sx={{
                                                borderBottom: "0px",
                                                textTransform: "none",
                                                fontSize: { xs: "16px" },
                                            }}
                                            align="left"
                                        >
                                            {row.bill_date}
                                        </StyledTableCell>
                                        <StyledTableCell
                                            sx={{
                                                borderBottom: "0px",
                                                textTransform: "none",
                                                fontSize: { xs: "16px" },
                                            }}
                                            align="left"
                                        >
                                            {row.total_points}
                                        </StyledTableCell>
                                        <StyledTableCell
                                            sx={{
                                                borderBottom: "0px",
                                                textTransform: "none",
                                                fontSize: { xs: "16px" },
                                            }}
                                            align="left"
                                        >
                                            {row.tran_type}
                                        </StyledTableCell>
                                        <StyledTableCell
                                            sx={{
                                                borderBottom: "0px",
                                                textTransform: "none",
                                                fontSize: { xs: "16px" },
                                            }}
                                            align="left"
                                        >
                                            {row.voucher_amt}
                                        </StyledTableCell>
                                        <StyledTableCell
                                            sx={{
                                                borderBottom: "0px",
                                                textTransform: "none",
                                                fontSize: { xs: "16px" },
                                            }}
                                            align="left"
                                        >
                                            {displayFormattedDate(
                                                row.PointsExpire_date
                                            )}
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
                                                    handleMenuOpen(event, row)
                                                }
                                            >
                                                <MoreVertIcon />
                                            </IconButton>
                                            <Menu
                                                anchorEl={anchorEl}
                                                open={Boolean(anchorEl)}
                                                onClose={handleMenuClose}
                                            >
                                                <MenuItem onClick={handleEdit}>
                                                    <BorderColorOutlinedIcon
                                                        sx={{
                                                            margin: "0 5px",
                                                            cursor: "pointer",
                                                            color: "#2c6cc6",
                                                        }}
                                                    />
                                                </MenuItem>
                                                <MenuItem
                                                    onClick={handleDelete}
                                                >
                                                    <DeleteColorOutlinedIcon
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
                                );
                            })
                    ) : (
                        <Emptyrow
                            colSpan={columnHeaders.length}
                            title={"No Data Available"}
                        />
                    )}
                </TableBody>
            </Table>
            <TablePagination
                rowsPerPageOptions={[5, 10, 25]}
                component="div"
                count={pointsStatementData.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
                ActionsComponent={TablePaginationActions}
            />
        </TableContainer>
    );
}
