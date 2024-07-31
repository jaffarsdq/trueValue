import {
    FirstPage as FirstPageIcon,
    KeyboardArrowDown as KeyboardArrowDownIcon,
    KeyboardArrowUp as KeyboardArrowUpIcon,
    LastPage as LastPageIcon,
    NavigateBefore as NavigateBeforeIcon,
    NavigateNext as NavigateNextIcon,
} from "@mui/icons-material";
import { LoadingButton } from "@mui/lab";
import {
    Box,
    Collapse,
    FormControl,
    IconButton,
    InputLabel,
    LinearProgress,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TablePagination,
    TableRow,
} from "@mui/material";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
    fetchTran,
    setTranPayload,
} from "../../../../Redux/Slices/CustomerSlice";
import displayFormattedDate from "../../../../Utils/displayFormattedDate";
import AlertPop from "../../../CommonComponents/AlertPop";
import ResponsiveDatePickers from "../../../CommonComponents/CustomerDatePicker";
import ViewCustomerCode from "../../ViewCustomerCode";

const TransactionNew = ({ onEdit, onDelete }) => {
    const dispatch = useDispatch();
    const { tranPayload, tranDataLoading, tranData } = useSelector(
        (state) => state.customer
    );
    const { client_id } = useSelector((state) => state.auth);
    const { selectedCustomerId } = useSelector((state) => state.customer);

    const [alerts, setAlerts] = useState({
        alertToggle: false,
        message: "",
        status: "error",
    });

    const { alertToggle, message, status } = alerts;

    const handleInputChange = (field, value) => {
        dispatch(setTranPayload({ [field]: value }));
    };

    const handleClickFetch = () => {
        if (!tranPayload[0].FROM_DATE || !tranPayload[0].TO_DATE) {
            setAlerts({
                alertToggle: true,
                message:
                    "Please fill out both 'From Date' and 'To Date' fields.",
                status: "error",
            });
            setTimeout(() => {
                setAlerts({
                    alertToggle: false,
                    message: "",
                });
            }, 2000);
            return;
        }
        if (selectedCustomerId) {
            dispatch(
                fetchTran({
                    ...tranPayload[0],
                    AUTH_KEY: "TXlDb206TG95QVBJMTIz",
                    cust_code: selectedCustomerId,
                    client_id: client_id,
                })
            );
        } else {
            setAlerts({
                alertToggle: true,
                message: "No customer selected. Please select a customer.",
                status: "error",
            });
            setTimeout(() => {
                setAlerts({
                    alertToggle: false,
                    message: "",
                });
            }, 2000);
        }
    };

    const data = {
        STATUS: 1,
        MESSAGE: "SUCCESS",
        DATA: tranData,
    };

    const columnsHDR = [
        { key: "CARD_NO", label: "Card No" },
        { key: "TRAN_DATE", label: "Date" },
        { key: "BILLREF", label: "Bill Number" },
        { key: "BILL_AMOUNT", label: "Bill Total" },
        { key: "POINTS_EARNED", label: "Points Earned" },
        { key: "POINTS_REDEEMED", label: "Points Redeemed" },
        { key: "POINTS_EXPIRY", label: "Points Expiry" },
    ];

    const columnsTRAN = [
        { key: "barcode", label: "Barcode" },
        { key: "des", label: "Description" },
        { key: "retail", label: "Unit Price" },
        { key: "qty", label: "Qty" },
        { key: "price", label: "Tax Price" },
    ];

    const [open, setOpen] = useState({});

    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);

    const [childPage, setChildPage] = useState(0);
    const [childRowsPerPage, setChildRowsPerPage] = useState(5);
    const handleClick = (billRef) => {
        setOpen((prevOpen) => {
            // Determine if the clicked dropdown is already open
            const isAlreadyOpen = prevOpen[billRef];

            // Create a new state object
            const newOpenState = {};

            // Toggle the state
            if (!isAlreadyOpen) {
                newOpenState[billRef] = true;
                setChildPage(0);
            }

            return newOpenState;
        });
    };

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const handleChangeChildPage = (event, newPage) => {
        setChildPage(newPage);
    };

    const handleChangeChildRowsPerPage = (event) => {
        setChildRowsPerPage(parseInt(event.target.value, 10));
        setChildPage(0);
    };

    return (
        <>
            <Box sx={{ padding: "0.5rem 0 0 1rem" }}>
                <ViewCustomerCode selectedCustomerId={selectedCustomerId} />
            </Box>

            {alertToggle && (
                <AlertPop boolean={alertToggle} msg={message} status={status} />
            )}

            <Box
                sx={{
                    display: "flex",
                    width: "100%",
                    padding: "0.5rem 0",
                    flexDirection: { xs: "column", sm: "column", md: "row" },
                    justifyContent: "center",
                }}
            >
                <Box
                    sx={{
                        width: { xs: "98%", md: "40%" },
                        margin: "0 auto",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "end",
                    }}
                >
                    <FormControl
                        variant="standard"
                        sx={{
                            margin: "2px 0",
                            padding: "7px 0",
                            width: { xs: "100%", lg: "100%" },
                        }}
                    >
                        <InputLabel
                            sx={{
                                fontFamily: "Poppins !important",
                                fontWeight: "700",
                            }}
                            shrink
                            htmlFor="bootstrap-input"
                            marginTop="1.2rem"
                        >
                            From Date
                        </InputLabel>
                        <ResponsiveDatePickers
                            Height="3px"
                            obj="FROM_DATE"
                            value={tranPayload[0].FROM_DATE}
                            handleInputChange={handleInputChange}
                            dateFormat="YYYY-MM-DD"
                            FormatValues={["year", "month", "day"]}
                            Format={"YYYY-MM-DD"}
                            marginTop="1.2rem"
                        />
                    </FormControl>
                </Box>

                <Box
                    sx={{
                        width: { xs: "98%", md: "40%" },
                        margin: "0 auto",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "end",
                    }}
                >
                    <FormControl
                        variant="standard"
                        sx={{
                            margin: "2px 0",
                            padding: "7px 0",
                            width: { xs: "100%", lg: "100%" },
                        }}
                    >
                        <InputLabel
                            sx={{
                                fontFamily: "Poppins !important",
                                fontWeight: "700",
                            }}
                            shrink
                            htmlFor="bootstrap-input"
                            marginTop="1.2rem"
                        >
                            To Date
                        </InputLabel>
                        <ResponsiveDatePickers
                            Height="3px"
                            obj="TO_DATE"
                            value={tranPayload[0].TO_DATE}
                            handleInputChange={handleInputChange}
                            dateFormat="YYYY-MM-DD"
                            FormatValues={["year", "month", "day"]}
                            Format={"YYYY-MM-DD"}
                            marginTop="1.2rem"
                        />
                    </FormControl>
                </Box>

                <Box
                    sx={{
                        width: { xs: "98%", md: "10%" },
                        margin: "0 auto",
                        display: "flex",
                        alignItems: "center",
                        mt: { xs: "0px", md: "6.5px" },
                        justifyContent: { xs: "end", md: "center" },
                    }}
                >
                    <LoadingButton
                        loading={tranDataLoading}
                        loadingPosition="start"
                        variant="contained"
                        color="secondary"
                        sx={{
                            height: "30px",
                            fontSize: "12px",
                            textTransform: "capitalize",
                            width: "fit-content",
                        }}
                        onClick={handleClickFetch}
                    >
                        Retrieve
                    </LoadingButton>
                </Box>
            </Box>

            {tranDataLoading ? (
                <LinearProgress color="secondary" />
            ) : (
                <TableContainer component={Paper}>
                    <Table>
                        <TableHead>
                            <TableRow
                                sx={{
                                    backgroundColor: "#606060",
                                    color: "white",
                                }}
                            >
                                <TableCell />
                                {columnsHDR.map((column) => (
                                    <TableCell
                                        sx={{
                                            color: "white",
                                            textWrap: "nowrap",
                                        }}
                                        key={column.key}
                                    >
                                        {column.label}
                                    </TableCell>
                                ))}
                            </TableRow>
                        </TableHead>

                        <TableBody>
                            {(data?.DATA[0]?.BILL_DETAILS || [])
                                .slice(
                                    page * rowsPerPage,
                                    page * rowsPerPage + rowsPerPage
                                )
                                .map((bill) => {
                                    const pointsEarned =
                                        data.DATA[0].POINTS_EARNED.filter(
                                            (pe) => pe.BILLREF === bill.BILLREF
                                        ).reduce(
                                            (total, pe) =>
                                                total + pe.POINTS_EARNED,
                                            0
                                        );
                                    const pointsRedeemed =
                                        data.DATA[0].VOUCHER_ISSUED.filter(
                                            (vi) => vi.BILLREF === bill.BILLREF
                                        ).length;

                                    const pointsExpiry =
                                        data.DATA[0].ITEM_DETAILS.filter(
                                            (id) => id.billref === bill.BILLREF
                                        )
                                            .map((id) => id.pointsExpire_date)
                                            .join(", ");

                                    return (
                                        <React.Fragment key={bill.BILLREF}>
                                            <TableRow>
                                                <TableCell>
                                                    <IconButton
                                                        aria-label="expand row"
                                                        size="small"
                                                        onClick={() =>
                                                            handleClick(
                                                                bill.BILLREF
                                                            )
                                                        }
                                                    >
                                                        {open[bill.BILLREF] ? (
                                                            <KeyboardArrowUpIcon />
                                                        ) : (
                                                            <KeyboardArrowDownIcon />
                                                        )}
                                                    </IconButton>
                                                </TableCell>
                                                <TableCell>
                                                    {bill.CARD_NO}
                                                </TableCell>
                                                <TableCell>
                                                    {bill.TRAN_DATE}
                                                </TableCell>
                                                <TableCell>
                                                    {bill.BILLREF}
                                                </TableCell>
                                                <TableCell align="right">
                                                    {bill.BILL_AMOUNT}
                                                </TableCell>
                                                <TableCell align="right">
                                                    {pointsEarned}
                                                </TableCell>
                                                <TableCell align="right">
                                                    {pointsRedeemed}
                                                </TableCell>
                                                <TableCell>
                                                    {displayFormattedDate(
                                                        pointsExpiry
                                                    )}
                                                </TableCell>
                                            </TableRow>
                                            <TableRow>
                                                <TableCell
                                                    style={{
                                                        paddingBottom: 0,
                                                        paddingTop: 0,
                                                    }}
                                                    colSpan={
                                                        columnsHDR.length + 1
                                                    }
                                                >
                                                    <Collapse
                                                        in={open[bill.BILLREF]}
                                                        timeout="auto"
                                                        unmountOnExit
                                                    >
                                                        <Box margin={1}>
                                                            <Table
                                                                size="small"
                                                                aria-label="transactions"
                                                            >
                                                                <TableHead>
                                                                    <TableRow
                                                                        sx={{
                                                                            backgroundColor:
                                                                                "#606060",
                                                                            color: "white",
                                                                        }}
                                                                    >
                                                                        {columnsTRAN.map(
                                                                            (
                                                                                column
                                                                            ) => (
                                                                                <TableCell
                                                                                    sx={{
                                                                                        color: "white",
                                                                                    }}
                                                                                    key={
                                                                                        column.key
                                                                                    }
                                                                                    align={
                                                                                        column.label ===
                                                                                            "Qty" ||
                                                                                        column.label ===
                                                                                            "Tax Price" ||
                                                                                        column.label ===
                                                                                            "Unit Price"
                                                                                            ? "right"
                                                                                            : "left"
                                                                                    }
                                                                                >
                                                                                    {
                                                                                        column.label
                                                                                    }
                                                                                </TableCell>
                                                                            )
                                                                        )}
                                                                    </TableRow>
                                                                </TableHead>
                                                                <TableBody>
                                                                    {data.DATA[0].ITEM_DETAILS.filter(
                                                                        (
                                                                            item
                                                                        ) =>
                                                                            item.billref ===
                                                                            bill.BILLREF
                                                                    )
                                                                        .slice(
                                                                            childPage *
                                                                                childRowsPerPage,
                                                                            childPage *
                                                                                childRowsPerPage +
                                                                                childRowsPerPage
                                                                        )
                                                                        .map(
                                                                            (
                                                                                item
                                                                            ) => (
                                                                                <TableRow
                                                                                    key={
                                                                                        item.billref
                                                                                    }
                                                                                >
                                                                                    {columnsTRAN.map(
                                                                                        (
                                                                                            column
                                                                                        ) => (
                                                                                            <TableCell
                                                                                                key={
                                                                                                    column.key
                                                                                                }
                                                                                                align={
                                                                                                    column.label ===
                                                                                                        "Qty" ||
                                                                                                    column.label ===
                                                                                                        "Tax Price" ||
                                                                                                    column.label ===
                                                                                                        "Unit Price"
                                                                                                        ? "right"
                                                                                                        : "left"
                                                                                                }
                                                                                            >
                                                                                                {
                                                                                                    item[
                                                                                                        column
                                                                                                            .key
                                                                                                    ]
                                                                                                }
                                                                                            </TableCell>
                                                                                        )
                                                                                    )}
                                                                                </TableRow>
                                                                            )
                                                                        )}
                                                                </TableBody>
                                                            </Table>
                                                            <TablePagination
                                                                rowsPerPageOptions={[
                                                                    5, 10, 25,
                                                                ]}
                                                                component="div"
                                                                count={
                                                                    data.DATA[0].ITEM_DETAILS.filter(
                                                                        (
                                                                            item
                                                                        ) =>
                                                                            item.billref ===
                                                                            bill.BILLREF
                                                                    ).length
                                                                }
                                                                rowsPerPage={
                                                                    childRowsPerPage
                                                                }
                                                                page={childPage}
                                                                onPageChange={(
                                                                    event,
                                                                    newPage
                                                                ) =>
                                                                    handleChangeChildPage(
                                                                        event,
                                                                        newPage
                                                                    )
                                                                }
                                                                onRowsPerPageChange={
                                                                    handleChangeChildRowsPerPage
                                                                }
                                                                ActionsComponent={(
                                                                    props
                                                                ) => (
                                                                    <InnerTablePaginationActions
                                                                        {...props}
                                                                        count={
                                                                            data.DATA[0].ITEM_DETAILS.filter(
                                                                                (
                                                                                    item
                                                                                ) =>
                                                                                    item.billref ===
                                                                                    bill.BILLREF
                                                                            )
                                                                                .length
                                                                        }
                                                                        childPage={
                                                                            childPage
                                                                        }
                                                                        childRowsPerPage={
                                                                            childRowsPerPage
                                                                        }
                                                                        onPageChange={
                                                                            handleChangeChildPage
                                                                        }
                                                                    />
                                                                )}
                                                            />
                                                        </Box>
                                                    </Collapse>
                                                </TableCell>
                                            </TableRow>
                                        </React.Fragment>
                                    );
                                })}
                        </TableBody>
                    </Table>

                    <TablePagination
                        rowsPerPageOptions={[5, 10, 25]}
                        component="div"
                        count={data?.DATA[0]?.BILL_DETAILS.length}
                        rowsPerPage={rowsPerPage}
                        page={page}
                        onPageChange={handleChangePage}
                        onRowsPerPageChange={handleChangeRowsPerPage}
                        ActionsComponent={(props) => (
                            <TablePaginationActions {...props} />
                        )}
                    />
                </TableContainer>
            )}
        </>
    );
};

const TablePaginationActions = ({ count, page, rowsPerPage, onPageChange }) => {
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
                <FirstPageIcon />
            </IconButton>
            <IconButton
                onClick={handleBackButtonClick}
                disabled={page === 0}
                aria-label="previous page"
            >
                <NavigateBeforeIcon />
            </IconButton>
            <IconButton
                onClick={handleNextButtonClick}
                disabled={page >= Math.ceil(count / rowsPerPage) - 1}
                aria-label="next page"
            >
                <NavigateNextIcon />
            </IconButton>
            <IconButton
                onClick={handleLastPageButtonClick}
                disabled={page >= Math.ceil(count / rowsPerPage) - 1}
                aria-label="last page"
            >
                <LastPageIcon />
            </IconButton>
        </Box>
    );
};

const InnerTablePaginationActions = ({
    count,
    childPage,
    childRowsPerPage,
    onPageChange,
}) => {
    const handleFirstPageButtonClickChild = (event) => {
        onPageChange(event, 0);
    };

    const handleBackButtonClickChild = (event) => {
        onPageChange(event, childPage - 1);
    };

    const handleNextButtonClickChild = (event) => {
        onPageChange(event, childPage + 1);
    };

    const handleLastPageButtonClickChild = (event) => {
        onPageChange(
            event,
            Math.max(0, Math.ceil(count / childRowsPerPage) - 1)
        );
    };

    return (
        <Box sx={{ flexShrink: 0, ml: 2.5 }}>
            <IconButton
                onClick={handleFirstPageButtonClickChild}
                disabled={childPage === 0}
                aria-label="first page"
            >
                <FirstPageIcon />
            </IconButton>
            <IconButton
                onClick={handleBackButtonClickChild}
                disabled={childPage === 0}
                aria-label="previous page"
            >
                <NavigateBeforeIcon />
            </IconButton>
            <IconButton
                onClick={handleNextButtonClickChild}
                disabled={childPage >= Math.ceil(count / childRowsPerPage) - 1}
                aria-label="next page"
            >
                <NavigateNextIcon />
            </IconButton>
            <IconButton
                onClick={handleLastPageButtonClickChild}
                disabled={childPage >= Math.ceil(count / childRowsPerPage) - 1}
                aria-label="last page"
            >
                <LastPageIcon />
            </IconButton>
        </Box>
    );
};

export default TransactionNew;
