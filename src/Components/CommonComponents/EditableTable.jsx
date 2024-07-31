import BorderColorOutlinedIcon from "@mui/icons-material/BorderColorOutlined";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import FirstPageIcon from "@mui/icons-material/FirstPage";
import KeyboardArrowLeft from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRight from "@mui/icons-material/KeyboardArrowRight";
import LastPageIcon from "@mui/icons-material/LastPage";
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
// import Emptyrow from "../../../components/CommonComponents/EmptyTableGride";
// import Select from "../../../components/CommonComponents/selectdropdownbutton";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import TextField from "@mui/material/TextField"; // New import for text field
import {
    setDeletedPoints,
    setRewardsFetchData,
    setToggelePointsButton,
} from "../../Redux/Slices/RewardsSetupSlice";
import Emptyrow from "./EmptyTableGride";

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

// PAGINATION
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

// TABLE GRID
export default function EditableTable({ disable, getInput, sendDataToParent }) {
    const gridName = [
        // "ID",
        "Rewards Code",
        "From",
        "To",
        "Points",
    ];

    const rewardsDetails = useSelector(
        (state) => state.rewardsManagement.rewardsFetchData
    );
    const data = rewardsDetails?.REWARD_VALUE;
    // const data = useSelector((state) => state.rewardsManagement.benefitsAndCriteriaValues);


    const dispatch = useDispatch();
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(5);
    const color = "rgba(0, 229, 143, 0.07)"; // green with 50% opacity
    const borderColor = "rgba(0, 229, 143, 1)"; // green with 100% opacity

    const [isAdding, setIsAdding] = React.useState(false);

    const [storeEditValue, setStoreEditValue] = React.useState("");

    const [editRowIndex, setEditRowIndex] = React.useState(null);

    const [anchorEl, setAnchorEl] = React.useState(null);

    const [deleteRow, setDeleteRow] = React.useState();
    const handleMenuOpen = (event, row, index) => {
        setDeleteRow(row.ID);
        setStoreEditValue(row);
        setAnchorEl(event.currentTarget);
        // if (option === 'delete') {
        // handleDelete();
        //   }
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
    };

    // EDITING
    const handleEdit = () => {
        // const data = {
        //     FromValue: value.FromValue,
        //     PointsValue: value.PointsValue,
        //     ToValue: value.ToValue
        // }
        // console.log(index);
        sendDataToParent(storeEditValue);
        dispatch(setToggelePointsButton(false));
        handleMenuClose();
        window.scrollTo(
            {
                top: 0,
                behavior:
                    "smooth",
            }
        );
        // console.log(data, 'row')
    };

    // DELETING
    const handleDelete = () => {
        // console.log(deleteRow,  'delete');
        // const newData = [...data];
        // newData.splice(deleteRow, 1);
        // console.log(newData, 'delete');
        // dispatch(setRewardsFetchData(newData))
        // const updatedData = [];

        const deletedRow = data.filter((row) => row.ID !== deleteRow);
        const cancelRow = data.filter((row) => row.ID === deleteRow);

        // updatedData.push({"deleted":1, ...deletedRow})

        // data.map((row) => {
        //     if (row.ID === deleteRow) {
        //         updatedData.push({"deleted":1, ...storeEditValue})
        //     }
        //     else {
        //         updatedData.push({"deleted": 0 , ...row})
        //     }
        // })
        // console.log(updatedData, 'updated data');

        dispatch(setRewardsFetchData(deletedRow));
        dispatch(setDeletedPoints(cancelRow[0]))
        handleMenuClose();

        // Update data in Redux state (replace with your actual dispatch action)
        // dispatch(updateRewardsData(newData));

        // Clear the delete row flag
        // setDeleteRow(null)
    };

    const handleRestore = (index) => {
        // Restore logic here
    };

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const handleAddNewRow = () => {
        setIsAdding(true);
    };

    // const handleCancelNewRow = () => {
    //     setIsAdding(false);
    //     setNewRow({
    //         From: "",
    //         To: "",
    //         Points: "",
    //     });
    // };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewRow({
            ...newRow,
            [name]: value,
        });
    };

    // const handleInputChangeEdit = (e, index) => {
    //     const { name, value } = e.target;
    //     const updatedData = [...data];
    //     updatedData[index] = {
    //         ...updatedData[index],
    //         [name]: value,
    //     };
    //     setData(updatedData);
    // };

    // const handleSaveEditRow = () => {
    //     setEditRowIndex(null);
    // };

    const handleSave = (value) => {
        getInput();
    };

    return (
        <>
            <Box>
                <Box
                    sx={{
                        display: "flex",
                        margin: "10px 0 10px",
                        justifyContent: "end",
                    }}
                >
                    {/* <Button variant="outlined" sx={{
                        marginRight: "1rem",
                        // borderRadius: "50px",
                        padding: "10px 1rem",
                    }}
                    onClick={handleSaveNewRow}
                    >Update</Button> */}
                </Box>

                <TableContainer>
                    <Table
                        sx={{ minWidth: 500 }}
                        aria-label="custom pagination table"
                    >
                        <TableHead>
                            <TableRow>
                                {gridName.map((column, index) => (
                                    <StyledTableCell key={index}>
                                        {column}
                                    </StyledTableCell>
                                ))}
                                <StyledTableCell>Action</StyledTableCell>
                            </TableRow>
                        </TableHead>

                        <TableBody>
                            {/* {isAdding && (
                                <StyledTableRow>
                                    {Object.keys(newRow).map((key) => (
                                        <StyledTableCell key={key}>
                                            <TextField
                                                name={key}
                                                value={newRow[key]}
                                                onChange={handleInputChange}
                                                fullWidth
                                                size="small"
                                            />
                                        </StyledTableCell>
                                    ))}

                                    <StyledTableCell>
                                        <IconButton
                                            onClick={handleSaveNewRow}
                                            color="primary"
                                        >

                                        </IconButton>
                                        <IconButton
                                            onClick={handleCancelNewRow}
                                            color="secondary"
                                        >
                                            <CloseIcon />
                                        </IconButton>
                                    </StyledTableCell>

                                </StyledTableRow>
                            )} */}

                            {rowsPerPage > 0 ? (
                                data
                                    ?.slice(
                                        page * rowsPerPage,
                                        page * rowsPerPage + rowsPerPage
                                    )
                                    .map((row, index) => (
                                        <StyledTableRow key={index}>
                                            {/* {Object.keys(row)
                                                // .splice(1)
                                                .map((key) => ( */}
                                            <StyledTableCell
                                                sx={{
                                                    borderBottom: "0px",
                                                }}
                                            // key={key}
                                            >
                                                {editRowIndex === index ? (
                                                    <TextField
                                                        // name={key}
                                                        value={row.rewards_code}
                                                        fullWidth
                                                        size="small"
                                                    />
                                                ) : (
                                                    row.rewards_code
                                                )}
                                            </StyledTableCell>

                                            <StyledTableCell
                                                sx={{
                                                    borderBottom: "0px",
                                                }}
                                            // key={key}
                                            >
                                                {editRowIndex === index ? (
                                                    <TextField
                                                        // name={key}
                                                        value={row.from_value}
                                                        fullWidth
                                                        size="small"
                                                    />
                                                ) : (
                                                    row.from_value
                                                )}
                                            </StyledTableCell>

                                            <StyledTableCell
                                                sx={{
                                                    borderBottom: "0px",
                                                }}
                                            // key={key}
                                            >
                                                {editRowIndex === index ? (
                                                    <TextField
                                                        // name={key}
                                                        value={row.to_value}
                                                        fullWidth
                                                        size="small"
                                                    />
                                                ) : (
                                                    row.to_value
                                                )}
                                            </StyledTableCell>

                                            <StyledTableCell
                                                sx={{
                                                    borderBottom: "0px",
                                                }}
                                            // key={key}
                                            >
                                                {editRowIndex === index ? (
                                                    <TextField
                                                        // name={key}
                                                        value={row.points_value}
                                                        fullWidth
                                                        size="small"
                                                    />
                                                ) : (
                                                    row.points_value
                                                )}
                                            </StyledTableCell>

                                            {/* ))} */}

                                            <StyledTableCell
                                                sx={{ borderBottom: "0px" }}
                                            >
                                                <IconButton
                                                    onClick={(e) =>
                                                        handleMenuOpen(
                                                            e,
                                                            row,
                                                            index
                                                        )
                                                    }
                                                >
                                                    <MoreVertIcon />
                                                </IconButton>

                                                <Menu
                                                    anchorEl={anchorEl}
                                                    open={Boolean(anchorEl)}
                                                    onClose={handleMenuClose}
                                                >
                                                    <MenuItem>
                                                        <IconButton
                                                            onClick={() => {
                                                                handleEdit(row);

                                                            }}
                                                            disabled={disable}
                                                            sx={{
                                                                padding:
                                                                    ".2rem 0",
                                                            }}
                                                        >
                                                            <BorderColorOutlinedIcon
                                                                color="primary"
                                                                sx={{
                                                                    cursor: "pointer",
                                                                    color: "#2c6cc6",
                                                                }}
                                                            />
                                                        </IconButton>
                                                    </MenuItem>

                                                    <MenuItem>
                                                        <IconButton
                                                            onClick={() =>
                                                                handleDelete(
                                                                    index
                                                                )
                                                            }
                                                            disabled={disable}
                                                            sx={{
                                                                padding:
                                                                    ".2rem 0",
                                                            }}
                                                        >
                                                            <DeleteOutlineOutlinedIcon
                                                                color="error"
                                                                sx={{
                                                                    cursor: "pointer",
                                                                    color: "#e62727",
                                                                }}
                                                            />
                                                        </IconButton>
                                                    </MenuItem>
                                                </Menu>
                                            </StyledTableCell>
                                        </StyledTableRow>
                                    ))
                            ) : (
                                <Emptyrow
                                    colSpan={Object.keys(data[0]).length}
                                />
                            )}
                        </TableBody>
                    </Table>
                </TableContainer>

                <Box
                    component={Paper}
                    sx={{
                        width: "100%",
                        display: "flex",
                        justifyContent: "end",
                    }}
                >
                    <TablePagination
                        rowsPerPageOptions={[
                            5,
                            10,
                            25,
                            { label: "All", value: -1 },
                        ]}
                        colSpan={3}
                        count={data?.length}
                        rowsPerPage={rowsPerPage}
                        page={page}
                        sx={{
                            width: "100%",
                        }}
                        SelectProps={{
                            inputProps: {
                                "aria-label": "rows per page",
                            },
                            native: true,
                        }}
                        onPageChange={handleChangePage}
                        onRowsPerPageChange={handleChangeRowsPerPage}
                        ActionsComponent={TablePaginationActions}
                    />
                </Box>
            </Box>
        </>
    );
}
