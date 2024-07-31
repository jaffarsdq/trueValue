import BorderColorOutlinedIcon from "@mui/icons-material/BorderColorOutlined";
import DeleteColorOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import FirstPageIcon from "@mui/icons-material/FirstPage";
import KeyboardArrowLeft from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRight from "@mui/icons-material/KeyboardArrowRight";
import LastPageIcon from "@mui/icons-material/LastPage";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { Menu, MenuItem } from "@mui/material";
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

import { useNavigate } from "react-router-dom";
import {
    fetchPromotion,
    setUpdatePromotion,
} from "../../Redux/Slices/PromotionSlice";
import EmptyTableGrid from "../CommonComponents/EmptyTableGride";

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

export default function FeedbackTable() {
    // const gridName = ["Id", "Description", "Enabled", "Index", "Actions"];
    // console.log(data, "data");
    const navigator = useNavigate();

    const [storeEditValue, setStoreEditValue] = React.useState("");

    // console.log(data, 'done');
    const dispatch = useDispatch();
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(5);
    const color = "rgba(0, 229, 143, 0.07)"; // green with 50% opacity
    const borderColor = "rgba(0, 229, 143, 1)"; // green with 100% opacity
    const { ClientId, LocCode, authKey } = useSelector((state) => state.auth);

    const reportData = useSelector((state) => state.feedback.ratingsAndOptions);

    const data = reportData?.RATINGS;
    const gridName = [
        "Index",
        "Description",
        "Second Language",
        "Count",
        "Rating type",
        "Enabled",
        "Action",
    ];

    React.useEffect(() => {
        dispatch(fetchPromotion());
    }, []);
    const [anchorEl, setAnchorEl] = React.useState(null);

    // var rowData;
    const handleMenuOpen = (event, row) => {
        setStoreEditValue(row);
        // dispatch(setUpdatePromotion(row))
        setAnchorEl(event.currentTarget);
        // rowData = row;
        // console.log(rowData, 'inside');
    };
    // console.log(rowData, "outside");

    const handleMenuClose = () => {
        setStoreEditValue("");
        setAnchorEl(null);
    };

    const handleEdit = () => {
        // console.log(rowData, 'edit');
        // getInput(row);
        // setStoreEditValue(row)
        dispatch(setUpdatePromotion(storeEditValue));
        // navigator("/promotions/CreatePromotions");
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

    return (
        <Box>
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
                            <StyledTableCell align="left">
                                {gridName[4]}
                            </StyledTableCell>
                            <StyledTableCell align="center">
                                {gridName[5]}
                            </StyledTableCell>
                            <StyledTableCell align="center">
                                {gridName[6]}
                            </StyledTableCell>
                            {/* <StyledTableCell align="center">
                                {gridName[10]}
                            </StyledTableCell> */}
                        </TableRow>
                    </TableHead>

                    <TableBody>
                        {data && data.length > 0 ? (
                            data
                                .slice(
                                    page * rowsPerPage,
                                    page * rowsPerPage + rowsPerPage
                                )
                                .map((row, index) => {
                                    return (
                                        <StyledTableRow key={row.Client_id}>
                                            <StyledTableCell
                                                sx={{
                                                    textTransform: "none",
                                                    borderBottom: "0px",
                                                    fontSize: { xs: "16px" },
                                                }}
                                                align="left"
                                            >
                                                {row.rating_id}
                                            </StyledTableCell>

                                            <StyledTableCell
                                                sx={{
                                                    borderBottom: "0px",
                                                    textTransform: "capitalize",
                                                }}
                                                align="left"
                                            >
                                                {row.Client_id}
                                            </StyledTableCell>

                                            <StyledTableCell
                                                sx={{
                                                    borderBottom: "0px",
                                                    textTransform: "capitalize",
                                                }}
                                                align="left"
                                            >
                                                {row.description}
                                            </StyledTableCell>

                                            <StyledTableCell
                                                sx={{
                                                    borderBottom: "0px",
                                                    textTransform: "capitalize",
                                                }}
                                                align="left"
                                            >
                                                {row.secondLanguage}
                                            </StyledTableCell>
                                            <StyledTableCell
                                                sx={{
                                                    borderBottom: "0px",
                                                    textTransform: "capitalize",
                                                }}
                                                align="left"
                                            >
                                                {row.rating_type}
                                            </StyledTableCell>
                                            <StyledTableCell
                                                sx={{
                                                    borderBottom: "0px",
                                                    textTransform: "capitalize",
                                                }}
                                                align="left"
                                            >
                                                {row.active}
                                            </StyledTableCell>

                                            {/* <StyledTableCell
                                                sx={{
                                                    borderBottom: "0px",
                                                    textTransform: "capitalize",
                                                }}
                                                align="left"
                                            >
                                                {row.PROMO_IMAGE}
                                            </StyledTableCell> */}

                                            <StyledTableCell
                                                sx={{
                                                    display: "flex",
                                                    justifyContent: "center",
                                                    alignItems: "center",
                                                    gap: "0 20px",
                                                    borderBottom: "0px",
                                                    flexDirection:
                                                        "row-reverse",
                                                }}
                                                align="center"
                                            >
                                                <IconButton
                                                    onClick={(e) =>
                                                        handleMenuOpen(e, row)
                                                    }
                                                >
                                                    <MoreVertIcon />
                                                </IconButton>
                                                <Menu
                                                    anchorEl={anchorEl}
                                                    open={Boolean(anchorEl)}
                                                    onClose={(e) =>
                                                        handleMenuClose(e, row)
                                                    }
                                                >
                                                    <MenuItem
                                                    // onClick={() =>
                                                    //     // handleEdit(row)
                                                    // }
                                                    >
                                                        <DeleteColorOutlinedIcon
                                                            sx={{
                                                                margin: "0 5px",
                                                                cursor: "pointer",
                                                                color: "#e62727",
                                                            }}
                                                            // onClick={(row) => {
                                                            //     handleEdit(row);
                                                            //     window.scrollTo(
                                                            //         {
                                                            //             top: 0,
                                                            //             behavior:
                                                            //                 "smooth", // Optionally, you can set smooth scrolling behavior
                                                            //         }
                                                            //     );
                                                            // }}
                                                        />
                                                    </MenuItem>

                                                    <MenuItem>
                                                        <BorderColorOutlinedIcon
                                                            sx={{
                                                                margin: "0 5px",
                                                                cursor: "pointer",
                                                                color: "#2c6cc6",
                                                            }}
                                                            onClick={handleEdit}
                                                        />
                                                    </MenuItem>
                                                    {/* Add more menu items as needed */}
                                                </Menu>
                                            </StyledTableCell>
                                        </StyledTableRow>
                                    );
                                })
                        ) : (
                            <StyledTableRow>
                                <StyledTableCell colSpan={10}>
                                    <Box
                                        sx={{
                                            display: "flex",
                                            justifyContent: "center",
                                        }}
                                    >
                                        <EmptyTableGrid message="No data available" />
                                    </Box>
                                </StyledTableCell>
                            </StyledTableRow>
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
                count={data?.length ? data.length : 0}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
                ActionsComponent={TablePaginationActions}
            />
        </Box>
    );
}
