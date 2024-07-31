import { useTheme } from '@emotion/react';
import BorderColorOutlinedIcon from '@mui/icons-material/BorderColorOutlined';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import FirstPageIcon from "@mui/icons-material/FirstPage";
import KeyboardArrowLeft from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRight from "@mui/icons-material/KeyboardArrowRight";
import LastPageIcon from "@mui/icons-material/LastPage";
import RestoreFromTrashIcon from '@mui/icons-material/RestoreFromTrash';
import {
    Box,
    Button,
    IconButton,
    Paper,
    styled,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TablePagination,
    TableRow,
} from '@mui/material';
import { tableCellClasses } from '@mui/material/TableCell';
import PropTypes from 'prop-types';
import React from 'react';
import Emptyrow from '../../Components/CampaignsComponents/Emptyrow';


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

function CustomTable({status, data, columns, hiddenColumns, onEdit, onDelete }) {
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(5);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    return (
        <TableContainer  sx={{ padding: "20px" }}>
            <Table aria-label="customized table">
                <TableHead>
                    <TableRow>
                        {columns.map((column) => (
                            !hiddenColumns.includes(column.key) && (
                                <StyledTableCell key={column.key} align="left">
                                    {column.label}
                                </StyledTableCell>
                            )
                        ))}
                        {
                            status&&
                        <StyledTableCell align="center">Status</StyledTableCell>
                        }
                        <StyledTableCell align="center">Action</StyledTableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {data?data.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => (
                        <StyledTableRow key={row.id}>
                            {columns.map((column) => (
                                !hiddenColumns.includes(column.key) && (
                                    <StyledTableCell key={column.key} sx={{
                                        borderBottom: "0px",
                                    }} align="left">
                                        {row[column.key]}
                                    </StyledTableCell>
                                )
                            ))}
                            {
                                                            status&&
                            <StyledTableCell align="center">
                                {row.valid ? (
                                    <Button sx={{
                                        border: `solid 1px green`,
                                        color: 'green',
                                        borderRadius: '20px',
                                        fontSize: '11px',
                                        height: '27px',
                                        fontWeight: 'bolder',
                                        backgroundColor: 'rgba(0, 229, 143, 0.07)',
                                    }}>
                                        <Box component="span" sx={{
                                            display: 'inline-block',
                                            width: '6px',
                                            height: '6px',
                                            borderRadius: '50%',
                                            backgroundColor: 'green',
                                            marginRight: '5px',
                                        }} />
                                        Valid
                                    </Button>
                                ) : (
                                    <Button sx={{
                                        border: `solid 1px red`,
                                        color: 'red',
                                        borderRadius: '20px',
                                        fontSize: '11px',
                                        height: '27px',
                                        fontWeight: 'bolder',
                                        backgroundColor: 'rgba(255, 85, 49, 0.07)',
                                    }}>
                                        <Box component="span" sx={{
                                            display: 'inline-block',
                                            width: '6px',
                                            height: '6px',
                                            borderRadius: '50%',
                                            backgroundColor: 'red',
                                            marginRight: '5px',
                                        }} />
                                        Invalid
                                    </Button>
                                )}
                            </StyledTableCell>
                            }
                            <StyledTableCell  sx={{
                                                        display: "flex",
                                                        justifyContent:
                                                            "center",
                                                            flexDirection:"row-reverse",
                                                        alignItems: "center",
                                                        gap: "0 10px",
                                                        borderBottom: "0px",
                                                    }}  align="center">
                                {!row.valid ? (
                                    <DeleteOutlineOutlinedIcon
                                        onClick={() => onDelete(row)}
                                        sx={{ cursor: "pointer", margin: "0 5px" }}
                                        color="error"
                                    />
                                ) : (
                                    <RestoreFromTrashIcon
                                        onClick={() =>  (row)}
                                        sx={{ cursor: "pointer", margin: "0 5px" }}
                                        color="success"
                                    />
                                )}
                                <BorderColorOutlinedIcon
                                    sx={{  margin: "0 5px", cursor: "pointer" }}
                                    color="primary"
                                    onClick={() => onEdit(row)}
                                />
                            </StyledTableCell>
                        </StyledTableRow>
                    )): (
                        <Emptyrow colSpan={22} />
                    )}
                </TableBody>
            </Table>
            <TablePagination
                sx={{ backgroundColor: "white", display: "flex", justifyContent: "flex-end" }}
                rowsPerPageOptions={[5, 10, 25, { label: "All", value: -1 }]}
                colSpan={3}
                count={data?data.length:0}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
                ActionsComponent={TablePaginationActions}
            />
        </TableContainer>
    );
}

CustomTable.propTypes = {
    data: PropTypes.array.isRequired,
    columns: PropTypes.arrayOf(PropTypes.shape({
        key: PropTypes.string.isRequired,
        label: PropTypes.string.isRequired,
    })).isRequired,
    hiddenColumns: PropTypes.array,
    onEdit: PropTypes.func,
    onDelete: PropTypes.func,
};

CustomTable.defaultProps = {
    hiddenColumns: [],
    onEdit: () => {},
    onDelete: () => {},
};

export default CustomTable;
