import BorderColorOutlinedIcon from "@mui/icons-material/BorderColorOutlined";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import FirstPageIcon from "@mui/icons-material/FirstPage";
import KeyboardArrowLeft from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRight from "@mui/icons-material/KeyboardArrowRight";
import LastPageIcon from "@mui/icons-material/LastPage";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import Paper from "@mui/material/Paper";
import { styled, useTheme } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import PropTypes from "prop-types";
import * as React from "react";
import { useDispatch, useSelector } from "react-redux";

import Emptyrow from "../../Components/CommonComponents/EmptyTableGride";
import { fetchCity } from "../../Redux/Slices/citySlice";
import {
    CreateCountry,
    setSelectedCountry,
    setSelectedCountryCode,
} from "../../Redux/Slices/countrySlice";

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

export default function TableGrid({ setValue, disable, getInput, gridName }) {
    const { countryData, initialStateLoader, createDataLoader } = useSelector(
        (state) => state.CountrySlice
    );

    const dispatch = useDispatch();
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(5);
    const color = "rgba(0, 229, 143, 0.07)"; // green with 50% opacity
    const borderColor = "rgba(0, 229, 143, 1)"; // green with 100% opacity
    const { ClientId, LocCode, authKey } = useSelector((state) => state.auth);
    const [anchorEl, setAnchorEl] = React.useState(null); // State for anchor element of menu
    const theme = useTheme();

    const handleMenuClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
    };

    const handleedit = (value) => {
        console.log("edit", value);
        getInput(value);
        window.scrollTo({
            top: 0,
            behavior: "smooth",
        });
        handleMenuClose();
    };

    const handleDelete = (value) => {
        // Update the Deleted field to "1"
        const updatedValue = {
            ...value,
            Deleted: "1",
        };

        // Handle delete action
        console.log("Delete:", updatedValue);

        // Dispatch the action with the updated value
        dispatch(CreateCountry(updatedValue));

        // Close the menu
        handleMenuClose();
    };

    const handleView = (value) => {
        // Handle view action

        console.log("View:", value);
        dispatch(setSelectedCountry(value?.country_name));
        dispatch(setSelectedCountryCode(value?.country_code));
        dispatch(fetchCity(value.country_code));
        setValue(1);
        handleMenuClose();
    };

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };
    return (
        <Box>
            {/* <Select name="List Of Country" data={countryData.DATA} /> */}
            <TableContainer component={Paper} sx={{ padding: "0px  20px" }}>
                <Table aria-label="customized table">
                    <TableHead>
                        <TableRow>
                            <StyledTableCell align="left">
                                {gridName[0]}
                            </StyledTableCell>
                            <StyledTableCell align="left">
                                {gridName[1]}
                            </StyledTableCell>
                            <StyledTableCell align="center">
                                Action
                            </StyledTableCell>
                        </TableRow>
                    </TableHead>

                    <TableBody>
                        {countryData.DATA ? (
                            countryData.DATA.slice(
                                page * rowsPerPage,
                                page * rowsPerPage + rowsPerPage
                            ).map((row, index) => {
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
                                            {row.country_code}
                                        </StyledTableCell>
                                        <StyledTableCell
                                            sx={{
                                                borderBottom: "0px",

                                                textTransform: "capitalize",
                                            }}
                                            align="left"
                                        >
                                            {row.country_name}
                                        </StyledTableCell>

                                        <StyledTableCell
                                            sx={{
                                                display: "flex",
                                                justifyContent: "center",
                                                borderBottom: "0px",
                                                gap: "10px",
                                                flexDirection: "row-reverse",
                                            }}
                                            align="center"
                                        >
                                            <DeleteOutlineOutlinedIcon
                                                sx={{
                                                    cursor: "pointer",
                                                }}
                                                onClick={(e) => {
                                                    handleDelete(row);
                                                }}
                                                color="error"
                                            />

                                            {
                                                <BorderColorOutlinedIcon
                                                    sx={{
                                                        cursor: "pointer",
                                                    }}
                                                    color="primary"
                                                    onClick={(e) => {
                                                        handleedit(row);

                                                        window.scrollTo({
                                                            top: 0,
                                                            behavior: "smooth", // Optionally, you can set smooth scrolling behavior
                                                        });
                                                    }}
                                                />
                                            }
                                            <VisibilityOutlinedIcon
                                                sx={{
                                                    cursor: "pointer",
                                                    mr: 1,
                                                }}
                                                color="action"
                                                onClick={(e) => {
                                                    handleView(row);
                                                }}
                                            />
                                        </StyledTableCell>
                                    </StyledTableRow>
                                );
                            })
                        ) : (
                            <Emptyrow colSpan={7} />
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
                colSpan={3}
                count={
                    countryData && countryData.DATA
                        ? countryData.DATA.length
                        : 0
                }
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
                ActionsComponent={TablePaginationActions}
            />
        </Box>
    );
}
