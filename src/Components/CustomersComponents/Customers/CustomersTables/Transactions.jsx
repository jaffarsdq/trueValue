import { KeyboardArrowDown, KeyboardArrowUp } from "@mui/icons-material";
import {
    Box,
    Button,
    Collapse,
    FormControl,
    IconButton,
    InputLabel,
    LinearProgress,
    Paper,
    Table,
    TableBody,
    TableCell,
    tableCellClasses,
    TableContainer,
    TableHead,
    TableRow,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
    fetchTran,
    setTranPayload,
} from "../../../../Redux/Slices/CustomerSlice";
import ResponsiveDatePickers from "../../../CommonComponents/CustomerDatePicker";
import ViewCustomerCode from "../../ViewCustomerCode";

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

export default function Transactions() {
    const dispatch = useDispatch();

    const { tranPayload, tranDataLoading, tranData } = useSelector(
        (state) => state.customer
    );

    const { client_id } = useSelector((state) => state.auth);

    const [expandedRow, setExpandedRow] = useState(null);

    const handleInputChange = (field, value) => {
        dispatch(setTranPayload({ [field]: value }));
    };

    const { selectedCustomerId } = useSelector((state) => state.customer);

    const handleClick = () => {
        if (selectedCustomerId)
            dispatch(
                fetchTran({
                    ...tranPayload[0],
                    AUTH_KEY: "TXlDb206TG95QVBJMTIz",
                    cust_code: selectedCustomerId,
                    client_id: client_id,
                })
            );
    };

    const handleExpandClick = (index) => {
        setExpandedRow(expandedRow === index ? null : index);
    };
    return (
        <Box sx={{ bgcolor: "#FAFBFC" }}>
            <Box sx={{ padding: "0.5rem 0 0 1rem" }}>
                <ViewCustomerCode selectedCustomerId={selectedCustomerId} />
            </Box>
            <Box
                sx={{
                    display: "flex",
                    width: "100%",
                    padding: "0.5rem 0",
                    flexDirection: {
                        xs: "column",
                        sm: "column",
                        md: "row",
                    },
                    justifyContent: "space-around",
                }}
            >
                <Box
                    sx={{
                        width: { xs: "98%", md: "40%" },
                        margin: "0 auto",
                    }}
                >
                    <FormControl
                        variant="standard"
                        sx={{
                            margin: "2px 0",
                            padding: "7px 0",
                            width: {
                                xs: "100%",
                                lg: "100%",
                            },
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
                    }}
                >
                    <FormControl
                        variant="standard"
                        sx={{
                            margin: "2px 0",
                            padding: "7px 0",
                            width: {
                                xs: "100%",
                                lg: "100%",
                            },
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
                    }}
                >
                    <Button
                        variant="contained"
                        color="secondary"
                        sx={{
                            height: "30px",
                            fontSize: "12px",
                            textTransform: "capitalize",
                        }}
                        onClick={handleClick}
                    >
                        Retrieve
                    </Button>
                </Box>
            </Box>
            {tranDataLoading ? (
                <LinearProgress color="secondary" />
            ) : (
                <TableContainer component={Paper} sx={{ padding: "2rem 1rem" }}>
                <Table aria-label="customer details table">
                  <TableHead>
                    <TableRow>
                      <StyledTableCell></StyledTableCell>
                      <StyledTableCell>Card No</StyledTableCell>
                      <StyledTableCell>Date</StyledTableCell>
                      <StyledTableCell>Bill Reference</StyledTableCell>
                      <StyledTableCell>Total Vat</StyledTableCell>
                      <StyledTableCell>Points Earned</StyledTableCell>
                      <StyledTableCell>Points Redeemed</StyledTableCell>
                      <StyledTableCell>Points Expiry</StyledTableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {tranData[0]?.BILL_DETAILS.map((bill, index) => (
                      <React.Fragment key={bill.BILLREF}>
                        <StyledTableRow>
                          <TableCell>
                            <IconButton
                              aria-label="expand row"
                              size="small"
                              onClick={() => handleExpandClick(index)}
                            >
                              {expandedRow === index ? <KeyboardArrowUp /> : <KeyboardArrowDown />}
                            </IconButton>
                          </TableCell>
                          <StyledTableCell>{bill.CARD_NO}</StyledTableCell>
                          <StyledTableCell>{bill.TRAN_DATE}</StyledTableCell>
                          <StyledTableCell>{bill.BILLREF}</StyledTableCell>
                          <StyledTableCell>{bill.BILL_AMOUNT}</StyledTableCell>
                          <StyledTableCell>
                            {tranData[0].VOUCHER_REDEEMED.find(
                              (voucher) => voucher.BILLREF === bill.BILLREF
                            )?.POINTS_REDEEMED || 0}
                          </StyledTableCell>
                          <StyledTableCell>
                            {tranData[0].VOUCHER_ISSUED.find(
                              (voucher) => voucher.BILLREF === bill.BILLREF
                            )?.CARD_NO || "No Card"}
                          </StyledTableCell>
                          <StyledTableCell></StyledTableCell>
                        </StyledTableRow>
                        <StyledTableRow>
                          <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
                            <Collapse in={expandedRow === index} timeout="auto" unmountOnExit>
                              <Box margin={1}>
                                {/* <h6>Item Details:</h6> */}
                                <Table size="small" aria-label="item details">
                                  <TableHead>
                                    <TableRow>
                                      <StyledTableCell>Barcode</StyledTableCell>
                                      <StyledTableCell>Description</StyledTableCell>
                                      <StyledTableCell>Retail</StyledTableCell>
                                      <StyledTableCell>Quantity</StyledTableCell>
                                      <StyledTableCell>Amount</StyledTableCell>
                                      <StyledTableCell>Vat Amount</StyledTableCell>
                                    </TableRow>
                                  </TableHead>
                                  <TableBody>
                                    {tranData[0].ITEM_DETAILS.filter(
                                      (item) => item.billref === bill.BILLREF
                                    ).map((item, idx) => (
                                      <StyledTableRow key={idx}>
                                        <StyledTableCell>{item.barcode}</StyledTableCell>
                                        <StyledTableCell>{item.des}</StyledTableCell>
                                        <StyledTableCell>{item.retail}</StyledTableCell>
                                        <StyledTableCell>{item.qty}</StyledTableCell>
                                        <StyledTableCell>{item.price}</StyledTableCell>
                                        <StyledTableCell>{item.dept_code}</StyledTableCell>
                                      </StyledTableRow>
                                    ))}
                                  </TableBody>
                                </Table>
                                {tranData[0].VOUCHER_ISSUED.some(
                                  (voucher) => voucher.BILLREF === bill.BILLREF
                                ) ? (
                                  <>
                                    <h6>Vouchers Issued:</h6>
                                    <Table size="small" aria-label="vouchers issued">
                                      <TableHead>
                                        <TableRow>
                                          <StyledTableCell>Voucher Number</StyledTableCell>
                                          <StyledTableCell>CARD_NO</StyledTableCell>
                                        </TableRow>
                                      </TableHead>
                                      <TableBody>
                                        {tranData[0].VOUCHER_ISSUED.filter(
                                          (voucher) => voucher.BILLREF === bill.BILLREF
                                        ).map((voucher, idx) => (
                                          <StyledTableRow key={idx}>
                                            <StyledTableCell>{voucher.VOUCHER_NUM}</StyledTableCell>
                                            <StyledTableCell>{voucher.CARD_NO}</StyledTableCell>
                                          </StyledTableRow>
                                        ))}
                                      </TableBody>
                                    </Table>
                                  </>
                                ) : (
                                  <h6></h6>
                                )}
                                {tranData[0].VOUCHER_REDEEMED.some(
                                  (voucher) => voucher.BILLREF === bill.BILLREF
                                ) ? (
                                  <>
                                    <h6>Vouchers Redeemed:</h6>
                                    <Table size="small" aria-label="vouchers redeemed">
                                      <TableHead>
                                        <TableRow>
                                          <StyledTableCell>Voucher Number</StyledTableCell>
                                          <StyledTableCell>Points Redeemed</StyledTableCell>
                                          <StyledTableCell>REEDEM_DATE</StyledTableCell>
                                          <StyledTableCell>CARD_NO</StyledTableCell>
                                          <StyledTableCell>VALUE</StyledTableCell>
                                          <StyledTableCell>VOUCHER_NUM</StyledTableCell>
                                        </TableRow>
                                      </TableHead>
                                      <TableBody>
                                        {tranData[0].VOUCHER_REDEEMED.filter(
                                          (voucher) => voucher.BILLREF === bill.BILLREF
                                        ).map((voucher, idx) => (
                                          <StyledTableRow key={idx}>
                                            <StyledTableCell>{voucher.VOUCHER_NUM}</StyledTableCell>
                                            <StyledTableCell>{voucher.POINTS_REDEEMED}</StyledTableCell>
                                            <StyledTableCell>{voucher.REEDEM_DATE}</StyledTableCell>
                                            <StyledTableCell>{voucher.CARD_NO}</StyledTableCell>
                                            <StyledTableCell>{voucher.VALUE}</StyledTableCell>
                                            <StyledTableCell>{voucher.VOUCHER_NUM}</StyledTableCell>
                                          </StyledTableRow>
                                        ))}
                                      </TableBody>
                                    </Table>
                                  </>
                                ) : (
                                  <h6></h6>
                                )}
                              </Box>
                            </Collapse>
                          </TableCell>
                        </StyledTableRow>
                      </React.Fragment>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            )}
        </Box>
    );
}
