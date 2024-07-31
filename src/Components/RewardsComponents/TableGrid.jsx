import BorderColorOutlinedIcon from "@mui/icons-material/BorderColorOutlined";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import FirstPageIcon from "@mui/icons-material/FirstPage";
import KeyboardArrowLeft from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRight from "@mui/icons-material/KeyboardArrowRight";
import LastPageIcon from "@mui/icons-material/LastPage";

import { Checkbox, FormControlLabel, Popper } from "@mui/material";
import Box from "@mui/material/Box";

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
import Emptyrow from "../CampaignsComponents/Emptyrow";


const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
        backgroundColor: "#606060",
        color: theme.palette.common.white,
        fontSize: 12,
        padding:10
    },
    [`&.${tableCellClasses.body}`]: {
        fontSize: 12,
        padding:10
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

export default function UserTableGrid({handleActive,permissionValues,handleSaveinput, disable, getInput,data }) {
    const { permissionData } = []

    const gridName = ["Permission", "Active"];
    const dispatch = useDispatch();
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(5);
    const color = "rgba(0, 229, 143, 0.07)"; // green with 50% opacity
    const borderColor = "rgba(0, 229, 143, 1)"; // green with 100% opacity
    const { ClientId, LocCode, authKey } = useSelector((state) => state.auth);
    const [selectedRows, setSelectedRows] = React.useState([]);
    const handleedit = (value) => {};

    const handleDelete = (index) => {};
    const handleRestore = (index) => {
        console.log(index);
        const data = {
            valid: 1,
            client_id: ClientId,
            auth_key: authKey,
        };
      
    };
    const handleSave=()=>{
        handleSaveinput(selectedRows)
        console.log("Selected Permissions:", selectedRows);
    }
    const handleCheckboxChange = (event, permission) => {
        const checked = event.target.checked;
        if (checked) {
          setSelectedRows((prevSelected) => [...prevSelected, permission]);
        } else {
          setSelectedRows((prevSelected) =>
            prevSelected.filter((item) => item !== permission)
          );
        }
        handleSaveinput(selectedRows)
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
        <Box
            
        >
            <TableContainer component={Paper} >
                <Table aria-label="customized table">
                    <TableHead>
                        <TableRow>
                            <StyledTableCell align="left">
                                {"Location"}
                            </StyledTableCell>
                      
                        </TableRow>
                    </TableHead>

                    <TableBody>
                        {permissionValues.length ? (
                            permissionValues.slice(
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
                                            {row}
                                        </StyledTableCell>
                                        {/* <StyledTableCell
                                            sx={{
                                                textTransform: "none",
                                                borderBottom: "0px",

                                                fontSize: { xs: "16px" },
                                            }}
                                            align="left"
                                        >
                                            <FormControlLabel
                                                control={
                                                    <Checkbox
                        checked={row.valid==="Y"?true:false}
                        onChange={(e) => {
                            const value =e.target.checked?"Y":"N"
                            handleActive(row,value)
                        }}
                      />
                                                }
                                                sx={{
                                                    color: "rgba(0, 0, 0, 0.7)",
                                                    width: {
                                                        xs: "150px",
                                                        sm: "180px",
                                                    },
                                                    margin: "14px 0 0 0",
                                                    backgroundColor: "transparent",
                                                    height: "28px",
                                                    borderRadius: "4px",

                                                    fontSize: "14px !important",
                                                    "& .MuiFormControlLabel-label":
                                                        {
                                                            fontSize: "15px",
                                                            fontFamily:
                                                                "Public Sans!important ",
                                                            fontWeight: "500",
                                                        },
                                                }}
                                                
                                            />
                                        </StyledTableCell> */}

                                        {/* <StyledTableCell
                                                        sx={{
                                                            borderBottom: "0px",
                                                            
                                                        }}
                                                        align="left"
                                                    >
                                                        {row.valid ? (
                                                            <Button
                                                                sx={{
                                                                    border: `solid 1px ${borderColor}`,
                                                                    color: borderColor,
                                                                    borderRadius:
                                                                        "20px",
                                                                    fontSize: "11px",
                                                                    height: "27px",
                                                                    fontWeight:
                                                                        "bolder",
                                                                    backgroundColor:
                                                                        color,
                                                                }}
                                                            >
                                                                <Box
                                                                    component="span"
                                                                    sx={{
                                                                        display:
                                                                            "inline-block",
                                                                        width: "6px",
                                                                        height: "6px",
                                                                        borderRadius:
                                                                            "50%",
                                                                        backgroundColor:
                                                                            borderColor,
                                                                        marginRight:
                                                                            "5px", // Adjust the margin as needed
                                                                    }}
                                                                />
                                                                Active
                                                            </Button>
                                                        ) : (
                                                            <Button
                                                                sx={{
                                                                    border: `solid 1px rgba(255, 85, 49, 1)`,
                                                                    color: "rgba(255, 85, 49, 1)",
                                                                    borderRadius:
                                                                        "20px",
                                                                    fontSize: "11px",
                                                                    height: "27px",
                                                                    fontWeight:
                                                                        "bolder",
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
                                                                        borderRadius:
                                                                            "50%",
                                                                        color: "rgba(255, 85, 49, 0.07)",
                                                                        backgroundColor:
                                                                            "rgba(255, 85, 49, 1)",
                                                                        marginRight:
                                                                            "5px", // Adjust the margin as needed
                                                                    }}
                                                                />
                                                                Inactive
                                                            </Button>
                                                        )}
                                                    </StyledTableCell> */}
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
                    permissionData && permissionValues
                        ? permissionValues.length
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
