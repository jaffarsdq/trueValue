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

import EmptyTableGrid from "../CommonComponents/EmptyTableGride";

import { deletePromotion, fetchPromotion, setToggleCreateAndUpdatebtn, setUpdatePromotion } from "../../Redux/Slices/PromotionSlice";
import { useNavigate } from "react-router-dom";
import { handleApiResponse } from "../../Utils/notificationUtils";
import AlertPop from "../CommonComponents/AlertPop";

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

export default function PromotionTable({ setToggleCreate, data, gridName }) {
    // const gridName = ["Id", "Description", "Enabled", "Index", "Actions"];
    const navigator = useNavigate();

    const [storeEditValue, setStoreEditValue] = React.useState("")

    const dispatch = useDispatch();
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(5);
    const color = "rgba(0, 229, 143, 0.07)"; // green with 50% opacity
    const borderColor = "rgba(0, 229, 143, 1)"; // green with 100% opacity
    const { ClientId, LocCode, authKey } = useSelector((state) => state.auth);

    // const data = [
    //     {
    //         Id: 1,
    //         Code: '1',
    //         Description: "Hey, there",
    //         validFrom: "26",
    //         validTo: "26",
    //         timeFrom: '2',
    //         timeTo: '1',
    //         promoValue: '1',
    //         description: "hey",
    //         flyerPath: "1",
    //         promoImage: '1'
    //     }]
    //     // {
    //     //     name: "2",
    //     //     subject: "How was the taste of the food",
    //     //     createdby: "N",
    //     //     createdon: "2",
    //     //     Actions: "cell",
    //     // },
    //     // {
    //     //     name: "3",
    //     //     subject: "How was the services",
    //     //     createdby: "Y",
    //     //     createdon: "3",
    //     //     Actions: "cell",
    //     // },
    //     // {
    //     //     name: "4",
    //     //     subject: "How much rating you can for the food",
    //     //     createdby: "N",
    //     //     createdon: "4",
    //     //     Actions: "cell",
    //     // },
    //     // {
    //     //     name: "5",
    //     //     subject: "What is your favourite food in our hotel",
    //     //     createdby: "Y",
    //     //     createdon: "5",
    //     //     Actions: "cell",
    //     // },

    // ];

    React.useEffect(() => {
        dispatch(fetchPromotion())
    }, [])
    const [anchorEl, setAnchorEl] = React.useState(null);

    // var rowData;
    const handleMenuOpen = (event, row) => {
        setStoreEditValue(row)
        // dispatch(setUpdatePromotion(row))
        setAnchorEl(event.currentTarget);
        // rowData = row;
    };
    // console.log(rowData, "outside");

    const handleMenuClose = () => {
        setStoreEditValue("")
        setAnchorEl(null);
    };

    const handleEdit = () => {
        // console.log(rowData, 'edit');
        // getInput(row);
        // setStoreEditValue(row)
        setToggleCreate(true)
        dispatch(setUpdatePromotion(storeEditValue))
        dispatch(setToggleCreateAndUpdatebtn(true));
        window.scrollTo({
            top: 0,
            behavior: "smooth", // Optionally, you can set smooth scrolling behavior
        });
        // navigator("/promotions/CreatePromotions")
        // console.log(storeEditValue, 'success');
        handleMenuClose();
    };

    const { client_id } = useSelector((state) => state.auth)

    // Function to rename a key in an object
    function renameKey(obj, oldKey, newKey) {
        console.log(oldKey, "obj");
        if (!obj.hasOwnProperty(oldKey)) {
            throw new Error(`Key "${oldKey}" does not exist in the object.`);
        }

        const { [oldKey]: value, ...rest } = obj;
        console.log({
            ...rest,
            [newKey]: value
        }, 'newkey', { [oldKey]: value, ...rest })
        return {
            ...rest,
            [newKey]: value
        };
    }

    function formatDateToYYYYMMDD(date) {
        const year = date.getFullYear(); // Get the full year (e.g., 2024)
        const month = String(date.getMonth() + 1).padStart(2, '0'); // Get the month (0-11), so add 1 and pad with leading zero if needed
        const day = String(date.getDate()).padStart(2, '0'); // Get the day of the month and pad with leading zero if needed

        return `${year}/${month}/${day}`; // Format to yyyy/mm/dd
    }

    function parseDate(dateStr) {
        // Convert the date string from yyyy/mm/dd to yyyy-mm-dd
        const formattedDateStr = dateStr.replace(/\//g, '-');
        return formattedDateStr;
    }

    const [alerts, setAlerts] = React.useState({
        alertToggle: false,
        message: "",
        status: "error",
    });

    const { alertToggle, message, status } = alerts;

    const handleDelete = () => {
        const promoWithRenamedKey = renameKey(storeEditValue, 'PROMO_ID', 'promotion_id');

        const deletePromotionData = { ...promoWithRenamedKey, Deleted: "1", client_id: client_id };

        if (deletePromotionData.valid === "N") {
            handleApiResponse(dispatch, deletePromotion, deletePromotionData)
            console.log(deletePromotionData, "delete");
        }
        else {
            const promotionEnddate = deletePromotionData.VALID_TO

            const currentDate = formatDateToYYYYMMDD(new Date());

            const formattingDate = parseDate(currentDate);

            const changingFormat2 = parseDate(formattingDate);

            const changingFormat1 = parseDate(promotionEnddate);

            const date1 = new Date(changingFormat1);
            const date2 = new Date(changingFormat2);


            // TIME
            const toTime = deletePromotionData.TIME_TO;

            const now = new Date();

            // Get hours, minutes, and seconds
            const hours = now.getHours();  // Returns hours in 24-hour format (0-23)
            const minutes = now.getMinutes();  // Returns minutes (0-59)
            const seconds = now.getSeconds();  // Returns seconds (0-59)

            // Format them as strings with leading zeros if necessary
            const formattedHours = hours.toString().padStart(2, '0');
            const formattedMinutes = minutes.toString().padStart(2, '0');
            const formattedSeconds = seconds.toString().padStart(2, '0');

            // Create the time string in 24-hour format
            const timeString = `${formattedHours}:${formattedMinutes}:${formattedSeconds}`;

            console.log(timeString, "timeString");  // Outputs time in 24-hour format, e.g., "14:05:09"


            if (date2 > date1) {
                handleApiResponse(dispatch, deletePromotion, deletePromotionData)
            } else if (date2 < date1) {
                setAlerts({
                    alertToggle: true,
                    message: "valid end date is lesser than current date.",
                    status: "error",
                });
                setTimeout(() => {
                    setAlerts({
                        alertToggle: false,
                        message: "",
                    });
                }, 2000);

            } else {
                if (toTime < timeString) {
                    handleApiResponse(dispatch, deletePromotion, deletePromotionData)
                }
                else {
                    setAlerts({
                        alertToggle: true,
                        message: "Valid to time is lesser than current time.",
                        status: "error",
                    });
                    setTimeout(() => {
                        setAlerts({
                            alertToggle: false,
                            message: "",
                        });
                    }, 2000);
                }

            }
        }
        // Uncomment the line below to dispatch the deletePromotion action
        // handleApiResponse(dispatch, deletePromotion, deletePromotionData)
        // dispatch(deletePromotion(deletedPromotion));
        setToggleCreate(false)

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
            {alertToggle && (
                <AlertPop boolean={alertToggle} msg={message} status={status} />
            )}
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
                            <StyledTableCell align="center">
                                {gridName[5]}
                            </StyledTableCell>
                            <StyledTableCell align="center">
                                {gridName[6]}
                            </StyledTableCell>
                            <StyledTableCell align="center">
                                {gridName[7]}
                            </StyledTableCell>
                            <StyledTableCell align="center">
                                {gridName[8]}
                            </StyledTableCell>
                            <StyledTableCell align="center">
                                {gridName[9]}
                            </StyledTableCell>
                            <StyledTableCell align="center">
                                {gridName[10]}
                            </StyledTableCell>
                            <StyledTableCell align="center">
                                {gridName[11]}
                            </StyledTableCell>
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
                                        <StyledTableRow key={row.section_id}>
                                            <StyledTableCell
                                                sx={{
                                                    textTransform: "none",
                                                    borderBottom: "0px",
                                                    fontSize: { xs: "16px" },
                                                }}
                                                align="left"
                                            >
                                                {row.LOC_ID}
                                            </StyledTableCell>

                                            <StyledTableCell
                                                sx={{
                                                    borderBottom: "0px",
                                                    textTransform: "capitalize",
                                                }}
                                                align="left"
                                            >
                                                {row.PROMO_CODE}

                                            </StyledTableCell>

                                            <StyledTableCell
                                                sx={{
                                                    borderBottom: "0px",
                                                    textTransform: "capitalize",
                                                }}
                                                align="left"
                                            >
                                                {row.PROMO_DESC}
                                            </StyledTableCell>

                                            <StyledTableCell
                                                sx={{
                                                    borderBottom: "0px",
                                                    textTransform: "capitalize",
                                                }}
                                                align="left"
                                            >
                                                {row.VALID_FROM}
                                            </StyledTableCell>

                                            <StyledTableCell
                                                sx={{
                                                    borderBottom: "0px",
                                                    textTransform: "capitalize",
                                                }}
                                                align="left"
                                            >
                                                {row.VALID_TO}
                                            </StyledTableCell>

                                            <StyledTableCell
                                                sx={{
                                                    borderBottom: "0px",
                                                    textTransform: "capitalize",
                                                }}
                                                align="left"
                                            >
                                                {row.TIME_FROM}
                                            </StyledTableCell>

                                            <StyledTableCell
                                                sx={{
                                                    borderBottom: "0px",
                                                    textTransform: "capitalize",
                                                }}
                                                align="left"
                                            >
                                                {row.TIME_TO}
                                            </StyledTableCell>

                                            <StyledTableCell
                                                sx={{
                                                    borderBottom: "0px",
                                                    textTransform: "capitalize",
                                                }}
                                                align="left"
                                            >
                                                {row.PROMO_VALUE}
                                            </StyledTableCell>

                                            <StyledTableCell
                                                sx={{
                                                    borderBottom: "0px",
                                                    textTransform: "capitalize",
                                                }}
                                                align="left"
                                            >
                                                {row.DESC}
                                            </StyledTableCell>



                                            <StyledTableCell
                                                sx={{
                                                    borderBottom: "0px",
                                                    textTransform: "capitalize",
                                                }}
                                                align="left"
                                            >
                                                {row.FlyerPath}
                                            </StyledTableCell>

                                            <StyledTableCell
                                                sx={{
                                                    borderBottom: "0px",
                                                    textTransform: "capitalize",
                                                }}
                                                align="left"
                                            >
                                                {row.valid}
                                            </StyledTableCell>

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
                                                    onClick={(e) => handleMenuOpen(e, row)}
                                                >
                                                    <MoreVertIcon />
                                                </IconButton>
                                                <Menu
                                                    anchorEl={anchorEl}
                                                    open={Boolean(anchorEl)}
                                                    onClose={(e) => handleMenuClose(e, row)}
                                                >


                                                    <MenuItem
                                                        onClick={handleEdit}
                                                    >
                                                        <BorderColorOutlinedIcon
                                                            sx={{
                                                                margin: "0 5px",
                                                                cursor: "pointer",
                                                                color: "#2c6cc6",
                                                            }}


                                                        />
                                                        {/* {console.log(row) } */}
                                                    </MenuItem>
                                                    <MenuItem
                                                        onClick={() =>
                                                            handleDelete(row)
                                                        }
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

                                                    {/* Add more menu items as needed */}
                                                </Menu>
                                            </StyledTableCell>
                                        </StyledTableRow>
                                    );
                                })
                        ) : (
                            <EmptyTableGrid colSpan={15} message="No data available" />
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
                count={data?.length ? data?.length : 0}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
                ActionsComponent={TablePaginationActions}
            />
        </Box>
    );
}
