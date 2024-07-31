import BorderColorOutlinedIcon from "@mui/icons-material/BorderColorOutlined";
import DeleteColorOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import FirstPageIcon from "@mui/icons-material/FirstPage";
import KeyboardArrowLeft from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRight from "@mui/icons-material/KeyboardArrowRight";
import LastPageIcon from "@mui/icons-material/LastPage";
import { Popper, Menu, MenuItem } from "@mui/material";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import Paper from "@mui/material/Paper";
import { styled } from "@mui/material/styles";
import { useTheme } from "@mui/material/styles";
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
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Emptyrow from "../../CampaignsComponents/Emptyrow";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
        backgroundColor: "#606060",
        color: theme.palette.common.white,
        fontSize: 12,
        padding: 10
    },
    [`&.${tableCellClasses.body}`]: {
        fontSize: 12,
        padding: 10
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

export default function AllUserTable({ disable, getInput }) {

    const gridName = [
        "User Name",
        "User Type",
        "User Description",
        "User Role",
        "Actions"
    ];

    const dispatch = useDispatch();
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(5);
    const color = "rgba(0, 229, 143, 0.07)"; // green with 50% opacity
    const borderColor = "rgba(0, 229, 143, 1)"; // green with 100% opacity
    const { ClientId, LocCode, authKey } = useSelector((state) => state.auth);
    const data = [{
        name: "User1",
        subject: "type1",
        createdby: "Points Per",
        createdon: "Bonus Points",
        
    }, {
        name: "User3",
        subject: "Admin",
        createdby: "Minimum Points",
        createdon: "Maximum Points",
       
    }, {
        name: "User2",
        subject: "System operater",
        createdby: "Notification Channel",
        createdon: "     Points",
        
    }, {
        name: "User4",
        subject: "Checker",
        createdby: "Points",
        createdon: "Maximum Points",
     
    }];
    const [anchorEl, setAnchorEl] = React.useState(null);

    const handleMenuOpen = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
    };

    const handleEdit = (value) => {
        getInput(value);
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

    const [toggle, setToggle] = React.useState(false);
    const navigator=useNavigate()
    function handleToggle() {
        setToggle(!toggle)
    }

    const [showComponent, setShowComponent] = useState(false);

    const handleClick = () => {
    };

    return (
        <>
            <>


                {/* <Button
                    sx={{ height: "30px" }}
                    color="secondary"
                    variant="outlined"
                >
                    Back
                </Button> */}

                {/* <Button
                        sx={{
                            height: "30px",
                            display: "flex",
                            alignItems: "center",
                            gap: "5px",
                        }}
                        color="secondary"
                        variant="outlined"
                    >
                        <VisibilityIcon sx={{ fontSize: "15px" }} />
                        Preview
                    </Button> */}
                {/* <Button
                    sx={{ height: "30px", width: "200px" }}
                    color="secondary"
                    variant="contained"
                    onClick={handleToggle}
                >
                    Create Reward
                </Button> */}

                {/* Table */}
                <Box>
                    <Box
                        sx={{
                            display: "flex",
                            gap: "15px",
                            justifyContent: "end",
                            width: "100%",
                            padding: "1rem",
                        }}
                    >

                        <Button
                            sx={{ height: "35px", width: "130px" }}
                            color="secondary"
                            variant="contained"
                            onClick={handleClick}
                        >
                            Create User
                        </Button>
                     
                    </Box>


                    <TableContainer component={Paper} sx={{ padding: "2rem 1rem" }}>
                        <Table aria-label="customized table">
                            <TableHead>
                                <TableRow>
                                    <StyledTableCell align="left">
                                        {gridName[0]}
                                    </StyledTableCell>
                                    <StyledTableCell align="left">
                                        {gridName[1]}
                                    </StyledTableCell>
                                    <StyledTableCell align="left">
                                        {gridName[2]}
                                    </StyledTableCell>
                                    <StyledTableCell align="left">
                                        {gridName[3]}
                                    </StyledTableCell>
                                    <StyledTableCell align="center">
                                        {gridName[4]}
                                    </StyledTableCell>
                                </TableRow>
                            </TableHead>

                            <TableBody>
                                {data ? (
                                    data.slice(
                                        page * rowsPerPage,
                                        page * rowsPerPage + rowsPerPage
                                    ).map((row, index) => {
                                        return (
                                            <StyledTableRow key={row.section_id}>
                                                <StyledTableCell
                                                    sx={{
                                                        textTransform: "none",
                                                        borderBottom: "0px",
                                                        fontSize: { xs: "16px" },
                                                    }}
                                                    align="left"
                                                >
                                                    {row.name}
                                                </StyledTableCell>

                                                <StyledTableCell
                                                    sx={{
                                                        borderBottom: "0px",
                                                        textTransform: "capitalize",
                                                    }}
                                                    align="left"
                                                >
                                                    {row.subject}
                                                </StyledTableCell>

                                                <StyledTableCell
                                                    sx={{
                                                        borderBottom: "0px",
                                                        textTransform: "capitalize",
                                                    }}
                                                    align="left"
                                                >
                                                    {row.createdby}
                                                </StyledTableCell>

                                                <StyledTableCell
                                                    sx={{
                                                        borderBottom: "0px",
                                                        textTransform: "capitalize",
                                                    }}
                                                    align="left"
                                                >
                                                    {row.createdon}
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
                                                    <IconButton onClick={handleMenuOpen}>
                                                        <MoreVertIcon />
                                                    </IconButton>
                                                    <Menu
                                                        anchorEl={anchorEl}
                                                        open={Boolean(anchorEl)}
                                                        onClose={handleMenuClose}
                                                    >
                                                        <MenuItem onClick={() => handleEdit(row)}><DeleteColorOutlinedIcon sx={{
                                                            margin: "0 5px",
                                                            cursor: "pointer",
                                                            color: "#e62727"
                                                        }}
                                                            onClick={(e) => {
                                                                handleedit(
                                                                    row
                                                                );
                                                                window.scrollTo({
                                                                    top: 0,
                                                                    behavior:
                                                                        "smooth", // Optionally, you can set smooth scrolling behavior
                                                                });
                                                            }} /></MenuItem>
                                                        <MenuItem onClick={handleDelete}><BorderColorOutlinedIcon
                                                            sx={{
                                                                margin: "0 5px",
                                                                cursor: "pointer",
                                                                color: "#2c6cc6"
                                                            }}
                                                            onClick={(e) => {
                                                                handleedit(
                                                                    row
                                                                );
                                                                window.scrollTo({
                                                                    top: 0,
                                                                    behavior:
                                                                        "smooth", // Optionally, you can set smooth scrolling behavior
                                                                });
                                                            }}
                                                        /></MenuItem>
                                                        {/* Add more menu items as needed */}
                                                    </Menu>
                                                </StyledTableCell>
                                            </StyledTableRow>
                                        );
                                    })
                                ) : (
                                    <Emptyrow colSpan={10} />
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
                        count={0}
                        rowsPerPage={rowsPerPage}
                        page={page}
                        onPageChange={handleChangePage}
                        onRowsPerPageChange={handleChangeRowsPerPage}
                        ActionsComponent={TablePaginationActions}
                    />
                </Box>
            </>

        </>

    );
}
