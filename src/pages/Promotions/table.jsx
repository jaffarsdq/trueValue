import BorderColorOutlinedIcon from "@mui/icons-material/BorderColorOutlined";
import ChairIcon from "@mui/icons-material/Chair";
import CloseIcon from "@mui/icons-material/Close";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import FirstPageIcon from "@mui/icons-material/FirstPage";
import KeyboardArrowLeft from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRight from "@mui/icons-material/KeyboardArrowRight";
import LastPageIcon from "@mui/icons-material/LastPage";
import RemoveRedEyeOutlinedIcon from "@mui/icons-material/RemoveRedEyeOutlined";
import RestoreFromTrashIcon from "@mui/icons-material/RestoreFromTrash";
import SearchIcon from "@mui/icons-material/Search";
import SendIcon from "@mui/icons-material/Send";
import {
    Autocomplete,
    InputAdornment,
    Popper,
    TextField,
    Typography,
} from "@mui/material";
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
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import Emptyrow from "../../../components/CommonComponents/EmptyTableGride";
import Select from "../../../components/CommonComponents/selectdropdownbutton";
import { CreateclerkMaster } from "../../../store/features/ClerkMaster/clerkMasterslice";

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

export default function TableGrid({ disable, getInput, gridName }) {
    const { clerkMasterData, initialStateloading, createDataLoader, error } =
        useSelector((state) => state.ClerkMasterslice);

    const dispatch = useDispatch();
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(5);
    const color = "rgba(0, 229, 143, 0.07)"; // green with 50% opacity
    const borderColor = "rgba(0, 229, 143, 1)"; // green with 100% opacity
    const { ClientId, LocCode, authKey } = useSelector((state) => state.auth);

    const handleedit = (value) => {
        console.log("value", value);
        getInput(value);
    };

    const handleDelete = (index) => {
        const data = {
            clerk_code: clerkMasterData.DATA[index].user_code,
            user_name: clerkMasterData.DATA[index].user_name
                ? clerkMasterData.DATA[index].user_name
                : "none",
            clerk_name: clerkMasterData.DATA[index].clerk_name,
            password: clerkMasterData.DATA[index].user_password,
            clerk_type: clerkMasterData.DATA[index].user_role,
            valid: 0,
            client_id: ClientId,
            loc_code: LocCode,
            auth_key: authKey,
        };
        dispatch(CreateclerkMaster(data));
    };
    const handleRestore = (index) => {
        console.log(index);
        const data = {
            clerk_code: clerkMasterData.DATA[index].user_code,
            user_name: clerkMasterData.DATA[index].user_name
                ? clerkMasterData.DATA[index].user_name
                : "none",
            clerk_name: clerkMasterData.DATA[index].clerk_name,
            password: clerkMasterData.DATA[index].user_password,
            clerk_type: clerkMasterData.DATA[index].user_role,
            valid: 1,
            client_id: ClientId,
            loc_code: LocCode,
            auth_key: authKey,
        };
        console.log(data);
        dispatch(CreateclerkMaster(data));
    };

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
            <Select name="List Of User Master" data={clerkMasterData.DATA} />
            <TableContainer component={Paper} sx={{ padding: "0 20px" }}>
                <Table aria-label="customized table">
                    <TableHead>
                        <TableRow>
                            <StyledTableCell align="left">
                                {gridName[1]}
                            </StyledTableCell>
                            <StyledTableCell align="left">
                                {gridName[0]}
                            </StyledTableCell>
                            <StyledTableCell
                                sx={{ whiteSpace: "nowrap" }}
                                align="center"
                            >
                                {gridName[2]}
                            </StyledTableCell>
                            <StyledTableCell align="center">
                                {gridName[5]}
                            </StyledTableCell>

                            <StyledTableCell align="center">
                                Action
                            </StyledTableCell>
                        </TableRow>
                    </TableHead>

                    <TableBody>
                        {clerkMasterData.DATA ? (
                            clerkMasterData.DATA.slice(
                                page * rowsPerPage,
                                page * rowsPerPage + rowsPerPage
                            ).map((row, index) => {
                                return (
                                    <StyledTableRow key={row.user_code}>
                                        <StyledTableCell
                                            sx={{
                                                borderBottom: "0px",

                                                textTransform: "capitalize",
                                            }}
                                            align="left"
                                        >
                                            {row.user_name}
                                        </StyledTableCell>
                                        <StyledTableCell
                                            sx={{
                                                textTransform: "none",
                                                borderBottom: "0px",
                                            }}
                                            align="left"
                                        >
                                            {row.user_desc}
                                        </StyledTableCell>
                                        <StyledTableCell
                                            sx={{
                                                borderBottom: "0px",

                                                textTransform: "capitalize",
                                            }}
                                            align="center"
                                        >
                                            {row.user_type}
                                        </StyledTableCell>

                                        <StyledTableCell
                                            sx={{
                                                borderBottom: "0px",
                                            }}
                                            align="center"
                                        >
                                            {row.valid ? (
                                                <Button
                                                    sx={{
                                                        border: `solid 1px ${borderColor}`,
                                                        color: borderColor,
                                                        borderRadius: "20px",
                                                        fontSize: "11px",
                                                        height: "27px",
                                                        fontWeight: "bolder",
                                                        backgroundColor: color,
                                                    }}
                                                >
                                                    <Box
                                                        component="span"
                                                        sx={{
                                                            display:
                                                                "inline-block",
                                                            width: "6px",
                                                            height: "6px",
                                                            borderRadius: "50%",
                                                            backgroundColor:
                                                                borderColor,
                                                            marginRight: "5px", // Adjust the margin as needed
                                                        }}
                                                    />
                                                    Active
                                                </Button>
                                            ) : (
                                                <Button
                                                    sx={{
                                                        border: `solid 1px rgba(255, 85, 49, 1)`,
                                                        color: "rgba(255, 85, 49, 1)",
                                                        borderRadius: "20px",
                                                        fontSize: "11px",
                                                        height: "27px",
                                                        fontWeight: "bolder",
                                                        backgroundColor:
                                                            "rgba(255, 85, 49, 0.07)",
                                                    }}
                                                >
                                                    <Box
                                                        component="span"
                                                        sx={{
                                                            display:
                                                                "inline-block",
                                                            width: "6px",
                                                            height: "6px",
                                                            borderRadius: "50%",
                                                            color: "rgba(255, 85, 49, 0.07)",
                                                            backgroundColor:
                                                                "rgba(255, 85, 49, 1)",
                                                            marginRight: "5px", // Adjust the margin as needed
                                                        }}
                                                    />
                                                    Inactive
                                                </Button>
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
                                            {row.valid ? (
                                                <DeleteOutlineOutlinedIcon
                                                    onClick={(e) => {
                                                        handleDelete(
                                                            clerkMasterData &&
                                                                clerkMasterData.DATA.findIndex(
                                                                    (
                                                                        object
                                                                    ) => {
                                                                        return (
                                                                            object.user_id ===
                                                                            row.user_id
                                                                        );
                                                                    }
                                                                )
                                                        );
                                                    }}
                                                    sx={{
                                                        cursor: "pointer",

                                                        margin: "0 5px",
                                                    }}
                                                    color="error"
                                                />
                                            ) : (
                                                <RestoreFromTrashIcon
                                                    onClick={(e) => {
                                                        handleRestore(
                                                            clerkMasterData &&
                                                                clerkMasterData.DATA.findIndex(
                                                                    (
                                                                        object
                                                                    ) => {
                                                                        return (
                                                                            object.user_id ===
                                                                            row.user_id
                                                                        );
                                                                    }
                                                                )
                                                        );
                                                    }}
                                                    sx={{
                                                        cursor: "pointer",

                                                        margin: "0 5px",
                                                    }}
                                                    color="success"
                                                />
                                            )}

                                            {
                                                <>
                                                    <BorderColorOutlinedIcon
                                                        sx={{
                                                            margin: "0 5px",
                                                            cursor: "pointer",
                                                        }}
                                                        color="primary"
                                                        onClick={(e) => {
                                                            handleedit(row);
                                                            window.scrollTo({
                                                                top: 0,
                                                                behavior:
                                                                    "smooth", // Optionally, you can set smooth scrolling behavior
                                                            });
                                                        }}
                                                    />
                                                </>
                                            }
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
                    clerkMasterData && clerkMasterData.DATA
                        ? clerkMasterData.DATA.length
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
