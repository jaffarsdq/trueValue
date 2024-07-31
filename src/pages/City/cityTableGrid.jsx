import BorderColorOutlinedIcon from "@mui/icons-material/BorderColorOutlined";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import FirstPageIcon from "@mui/icons-material/FirstPage";
import KeyboardArrowLeft from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRight from "@mui/icons-material/KeyboardArrowRight";
import LastPageIcon from "@mui/icons-material/LastPage";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import { Popper } from "@mui/material";
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

// import { CreateDivision, fetchDivision } from "../../../../store/features/Division/divisionSlice";
import Emptyrow from "../../Components/CommonComponents/EmptyTableGride";
import { fetchArea } from "../../Redux/Slices/areaSlice";
import {
    CreateCity,
    setSelectedCity,
    setSelectedCityCode,
} from "../../Redux/Slices/citySlice";

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
    const { cityData, initialStateLoader, createDataLoader } = useSelector(
        (state) => state.CitySlice
    );

    const dispatch = useDispatch();
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(5);
    const color = "rgba(0, 229, 143, 0.07)"; // green with 50% opacity
    const borderColor = "rgba(0, 229, 143, 1)"; // green with 100% opacity
    const { ClientId, LocCode, authKey } = useSelector((state) => state.auth);

    const handleedit = (value) => {
        console.log(value, "selected ");
        getInput(value);
    };

    const handleView = (value) => {
        // Handle view action
        console.log("View:", value);
        dispatch(setSelectedCity(value?.city_name));
        dispatch(setSelectedCityCode(value?.city_code));
        dispatch(fetchArea());
        setValue(2);
        // handleMenuClose();
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
        dispatch(CreateCity(updatedValue));
    };

    const handleRestore = (index) => {};

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };
    const CustomPopper = ({ children, ...popperProps }) => (
        <Popper {...popperProps} placement="bottom-start">
            {children}
        </Popper>
    );
    return (
        <Box>
            {/* <Select  name="List Of City" data={cityData.DATA}/> */}
            <TableContainer
                component={Paper}
                sx={{ padding: "0px 20px", margin: "1rem 0 0 0" }}
            >
                <Table aria-label="customized table">
                    <TableHead>
                        <TableRow>
                            <StyledTableCell align="left">
                                {gridName[1]}
                            </StyledTableCell>
                            <StyledTableCell align="left">
                                {gridName[0]}
                            </StyledTableCell>
                            <StyledTableCell align="left">
                                {gridName[2]}
                            </StyledTableCell>
                            <StyledTableCell align="center">
                                {gridName[3]}
                            </StyledTableCell>
                        </TableRow>
                    </TableHead>

                    <TableBody>
                        {cityData.DATA ? (
                            cityData.DATA.slice(
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
                                            {row.country_name}
                                        </StyledTableCell>
                                        <StyledTableCell
                                            sx={{
                                                textTransform: "none",
                                                borderBottom: "0px",

                                                fontSize: { xs: "16px" },
                                            }}
                                            align="left"
                                        >
                                            {row.city_code}
                                        </StyledTableCell>
                                        <StyledTableCell
                                            sx={{
                                                borderBottom: "0px",

                                                textTransform: "capitalize",
                                            }}
                                            align="left"
                                        >
                                            {row.city_name}
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
                count={cityData && cityData.DATA ? cityData.DATA.length : 0}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
                ActionsComponent={TablePaginationActions}
            />
        </Box>
    );
}
