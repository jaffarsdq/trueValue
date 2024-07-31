import React, { useState, useEffect } from "react";
import SideBar from "../../Layouts/SideBar";
import Emptyrow from "../../Components/CommonComponents/EmptyTableGride";
import { deleteBenefitAndCriteriaPoint, fetchRewardsDetails, setBenefitsAndCriteriaPoints, setBenefitsAndCriteriaValues, setInitialStageRewardsDetails, setRewardsDetails, setToggleCreateRewards, toggleCreateAndUpdatebtn, updateRewardsDetails } from "../../Redux/Slices/RewardsSetupSlice";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Button,
  Collapse,
  IconButton,
  LinearProgress,
  Menu,
  MenuItem,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  Typography,
  tableCellClasses,
} from "@mui/material";
import {
  BorderColorOutlined as BorderColorOutlinedIcon,
  DeleteOutlineOutlined as DeleteColorOutlinedIcon,
  FirstPage as FirstPageIcon,
  KeyboardArrowLeft,
  KeyboardArrowRight,
  LastPage as LastPageIcon,
  MoreVert as MoreVertIcon,
} from "@mui/icons-material";
import { styled, useTheme } from "@mui/material/styles";
import PropTypes from "prop-types";
import setInitialStagerewardsDetails from "../../Redux/Slices/RewardsSetupSlice"
import setButton from "../../Redux/Slices/RewardsSetupSlice"
import DisplayDateFormat from "../../Components/CommonComponents/DispaltDateFormat";
import RestoreFromTrashIcon from '@mui/icons-material/RestoreFromTrash';
import LinearIndeterminate from "../../Components/CommonComponents/LinearIndeterminate";
import RewardsSetup from "./RewardsSetup";

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
    onPageChange(
      event,
      Math.max(0, Math.ceil(count / rowsPerPage) - 1)
    );
  };

  // Date Format
  function DisplayDateFormat(dateString) {
    // Create a new Date object from the given date string
    // const dateString = "2024-07-01T00:00:00"
    if (!dateString) return;
    const date = new Date(dateString);

    // Options for formatting the date and time
    const options = {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "numeric",
      minute: "2-digit",
      second: "2-digit",
      hour12: true, // Use 12-hour clock format
    };

    // Format the date and time using toLocaleString()
    const formattedDate = date.toLocaleString("en-US", options);

    // Extract the time part
    const timePart = formattedDate.split(",")[1].trim();

    // Construct the final formatted date string
    return `${date.getFullYear()}-${(date.getMonth() + 1)
      .toString()
      .padStart(2, "0")}-${date
        .getDate()
        .toString()
        .padStart(2, "0")} at ${timePart}`;
  }

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

const RewardsTable = ({ disable, getInput }) => {
  const gridName = [
    "ID",
    "Type",
    "Description",
    "Valid From",
    "Valid To",
    "Location Type",
    "CardType",
    "Enabled",
    // "FromValue",
    // "ToValue",
    // "PointsValue",
    "Actions",
  ];

  const dispatch = useDispatch();
  const navigator = useNavigate();

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [anchorEl, setAnchorEl] = useState(null);
  const [togglecreate, setToggleCreate] = useState(false);

  const { ClientId, LocCode, authKey } = useSelector(
    (state) => state.auth
  );

  const rewardsDetails = useSelector(
    (state) => state.rewardsManagement.rewardsFetchData
  );
  const data = rewardsDetails?.REWARD_SETUP;

  console.log(data, 'fetchedsssssssssssssss');

  const [storeEditValue, setStoreEditValue] = React.useState("")

  useEffect(() => {
    dispatch(fetchRewardsDetails());
    dispatch(setInitialStageRewardsDetails());
  }, []);

  const handleMenuOpen = (event, row) => {

    setStoreEditValue(row)
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };
  const button = useSelector((state) => state.rewardsManagement.button);

  const [deleteRow, setDeleteRow] = useState('')

  const handleEdit = () => {
    dispatch(toggleCreateAndUpdatebtn(true))
    dispatch(setRewardsDetails(storeEditValue));
    setToggleCreate(true)
    dispatch(setToggleCreateRewards(true))
    // navigator("/rewards/CreateRewardsSetup");
    // console.log(value, 'value');
    // getInput(value);
    handleMenuClose();
  };

  const handleDelete = (index) => {

    const updatedReward = { ...storeEditValue, enabled: storeEditValue.enabled === "Y" ? "N" : "Y" };
    const data = {
      REWARD_SETUP: [updatedReward]
    }
    dispatch(updateRewardsDetails(data));

    handleMenuClose();
    // Handle delete logic
  };

  const handleRestore = (index) => {

    const updatedReward = { ...storeEditValue, enabled: storeEditValue.enabled === "Y" ? "N" : "Y" };
    const data = {
      REWARD_SETUP: [updatedReward]
    }
    dispatch(updateRewardsDetails(data));
    handleMenuClose();
    // Handle restore logic
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };


  const handleCreate = () => {
    // dispatch(setButton(true))
    // dispatch(setButton("dd"))
    dispatch(toggleCreateAndUpdatebtn(false))
    dispatch(setToggleCreateRewards(false))
    setToggleCreate(!togglecreate)
    dispatch(setInitialStageRewardsDetails());
    // navigator("/rewards/CreateRewardsSetup");

  };

  const loader = useSelector((state) => state.rewardsManagement.loading);

  //   if (loading) {
  //     return <LinearIndeterminate />;
  // }
  console.log(loader, 'loader');
  return (
    <SideBar>
      <Box sx={{ backgroundColor: "rgb(250, 251, 252)" }}>
        <Box
          sx={{
            display: "flex",
            gap: "15px",
            justifyContent: "space-between",
            width: "100%",
            padding: "1rem",
          }}
        >
          <Typography sx={{ fontWeight: "600" }}>
            Rewards Setup
          </Typography>
          {togglecreate ?
            <Button
              sx={{
                height: "30px",
                fontSize: { xs: "10px", sm: "14px" },
              }}
              color="secondary"
              variant="outlined"
              onClick={handleCreate}
            >
              Back
            </Button> :
            <Button
              sx={{ height: "30px", width: "200px" }}
              color="secondary"
              variant="contained"
              onClick={handleCreate}
            >
              Create Reward
            </Button>
          }
        </Box>
        <Collapse in={togglecreate}>
          <Box sx={{ height: "auto" }}>
            <RewardsSetup
              setToggleCreate={setToggleCreate}
              togglecreate={togglecreate}
            // navBack={handleCreate}
            />
          </Box>
        </Collapse>

        {/* <LinearIndeterminate /> */}
        <TableContainer
          component={Paper}
          sx={{
            padding: "2rem 1rem",
            backgroundColor: "rgb(250, 251, 252)",
          }}
        >
          <Table aria-label="customized table">
            <TableHead>
              <TableRow>
                {gridName.map((name) => (
                  <StyledTableCell
                    key={name}
                    align="left"
                  >
                    {name}
                  </StyledTableCell>
                ))}
              </TableRow>
            </TableHead>

            {loader ?
              <StyledTableRow>
                <StyledTableCell colSpan={gridName.length} sx={{ padding: 0 }}>
                  <LinearProgress sx={{ width: "100%" }} color="secondary"/>
                </StyledTableCell>
              </StyledTableRow>
              :
              <TableBody>
                {/* {data.length > 0 ? (
                  data
                    .slice(
                      page * rowsPerPage,
                      page * rowsPerPage + rowsPerPage
                    )
                    .map((row) => (
                      <StyledTableRow key={row.ID}>
                        <StyledTableCell
                          sx={{
                            textTransform: "none",
                            borderBottom: "0px",
                            fontSize: { xs: "16px" },
                          }}
                          align="left"
                        >
                          {row.ID}
                        </StyledTableCell>
                        <StyledTableCell
                          sx={{
                            borderBottom: "0px",
                            textTransform: "capitalize",
                          }}
                          align="left"
                        >
                          {row.Type}
                        </StyledTableCell>
                        <StyledTableCell
                          sx={{
                            borderBottom: "0px",
                            textTransform: "capitalize",
                          }}
                          align="left"
                        >
                          {row.Description}
                        </StyledTableCell>
                        <StyledTableCell
                          sx={{
                            borderBottom: "0px",
                            textTransform: "capitalize",
                          }}
                          align="left"
                        >
                          {DisplayDateFormat(row.Valid_from)}
                        </StyledTableCell>
                        <StyledTableCell
                          sx={{
                            borderBottom: "0px",
                            textTransform: "capitalize",
                          }}
                          align="left"
                        >
                          {DisplayDateFormat(row.Valid_to)}
                        </StyledTableCell>
                        <StyledTableCell
                          sx={{
                            borderBottom: "0px",
                            textTransform: "capitalize",
                          }}
                          align="left"
                        >
                          {row.LocationType}
                        </StyledTableCell>
                        <StyledTableCell
                          sx={{
                            borderBottom: "0px",
                            textTransform: "capitalize",
                          }}
                          align="left"
                        >
                          {row.CardType}
                        </StyledTableCell>
                        <StyledTableCell
                          sx={{
                            borderBottom: "0px",
                            textTransform: "capitalize",
                          }}
                          align="left"
                        >
                          {row.Enabled}
                        </StyledTableCell>
                        <StyledTableCell
                          sx={{
                            borderBottom: "0px",
                            textTransform: "capitalize",
                          }}
                          align="left"
                        >
                          {row.FromValue}
                        </StyledTableCell>
                        <StyledTableCell
                          sx={{
                            borderBottom: "0px",
                            textTransform: "capitalize",
                          }}
                          align="left"
                        >
                          {row.ToValue}
                        </StyledTableCell>
                        <StyledTableCell
                          sx={{
                            borderBottom: "0px",
                            textTransform: "capitalize",
                          }}
                          align="left"
                        >
                          {row.PointsValue}
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
                          <IconButton

                            onClick={(e) => handleMenuOpen(e, row)}
                          >
                            <MoreVertIcon />
                          </IconButton>


                          <Menu
                            anchorEl={anchorEl}
                            open={Boolean(anchorEl)}
                            onClose={handleMenuClose}
                          >
                            <MenuItem
                              onClick={(e) => {
                                handleDelete(row)
                                window.scrollTo({
                                  top: 0,
                                  behavior: "smooth",
                                });
                              }}
                            >
                              {storeEditValue.Enabled === "Y" ?
                                <DeleteColorOutlinedIcon
                                  sx={{
                                    margin: "0 5px",
                                    cursor: "pointer",
                                    color: "#e62727",
                                  }}

                                /> :

                                <RestoreFromTrashIcon
                                  sx={{
                                    margin: "0 5px",
                                    cursor: "pointer",
                                    color: "#429f2b",
                                  }}
                                />}
                            </MenuItem>
                            <MenuItem
                              // onClick={handleDelete}
                              onClick={(e) => {
                                handleEdit(row);
                                window.scrollTo({
                                  top: 0,
                                  behavior: "smooth",
                                });
                              }}
                            >
                              <BorderColorOutlinedIcon
                                sx={{
                                  margin: "0 5px",
                                  cursor: "pointer",
                                  color: "#2c6cc6",
                                }}

                              />
                            </MenuItem>
                            {/* Add more menu items as needed *
                          </Menu>
                        </StyledTableCell>
                      </StyledTableRow>
                    ))
                ) : (
                  <Emptyrow colSpan={gridName.length} />
                )} */}

                {data?.length > 0 ? (
                  data
                    .slice(
                      page * rowsPerPage,
                      page * rowsPerPage + rowsPerPage
                    )
                    .map((row) => (
                      <StyledTableRow key={row.ID}>
                        <StyledTableCell
                          sx={{
                            textTransform: "none",
                            borderBottom: "0px",
                            fontSize: { xs: "16px" },
                          }}
                          align="left"
                        >
                          {row.ID}
                        </StyledTableCell>

                        <StyledTableCell
                          sx={{
                            borderBottom: "0px",
                            textTransform: "capitalize",
                          }}
                          align="left"
                        >
                          {row.Type}
                        </StyledTableCell>

                        <StyledTableCell
                          sx={{
                            borderBottom: "0px",
                            textTransform: "capitalize",
                          }}
                          align="left"
                        >
                          {row.Description}
                        </StyledTableCell>

                        <StyledTableCell
                          sx={{
                            borderBottom: "0px",
                            textTransform: "capitalize",
                          }}
                          align="left"
                        >
                          {DisplayDateFormat(row.Valid_from)}
                        </StyledTableCell>

                        <StyledTableCell
                          sx={{
                            borderBottom: "0px",
                            textTransform: "capitalize",
                          }}
                          align="left"
                        >
                          {DisplayDateFormat(row.Valid_to)}
                        </StyledTableCell>

                        <StyledTableCell
                          sx={{
                            borderBottom: "0px",
                            textTransform: "capitalize",
                          }}
                          align="left"
                        >
                          {row.location_type}
                        </StyledTableCell>

                        <StyledTableCell
                          sx={{
                            borderBottom: "0px",
                            textTransform: "capitalize",
                          }}
                          align="left"
                        >
                          {row.Card_type}
                        </StyledTableCell>

                        <StyledTableCell
                          sx={{
                            borderBottom: "0px",
                            textTransform: "capitalize",
                          }}
                          align="left"
                        >
                          {row.enabled}
                        </StyledTableCell>

                        {/* <StyledTableCell
                          sx={{
                            borderBottom: "0px",
                            textTransform: "capitalize",
                          }}
                          align="left"
                        >
                          {row.FromValue}
                        </StyledTableCell>

                        <StyledTableCell
                          sx={{
                            borderBottom: "0px",
                            textTransform: "capitalize",
                          }}
                          align="left"
                        >
                          {row.ToValue}
                        </StyledTableCell>

                        <StyledTableCell
                          sx={{
                            borderBottom: "0px",
                            textTransform: "capitalize",
                          }}
                          align="left"
                        >
                          {row.PointsValue}
                        </StyledTableCell> */}

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
                          <IconButton

                            onClick={(e) => handleMenuOpen(e, row)}
                          >
                            <MoreVertIcon />
                          </IconButton>


                          <Menu
                            anchorEl={anchorEl}
                            open={Boolean(anchorEl)}
                            onClose={handleMenuClose}
                          >
                            <MenuItem
                              // onClick={handleDelete}
                              onClick={(e) => {
                                handleEdit(row);
                                window.scrollTo({
                                  top: 0,
                                  behavior: "smooth",
                                });
                              }}
                            >
                              <BorderColorOutlinedIcon
                                sx={{
                                  margin: "0 5px",
                                  cursor: "pointer",
                                  color: "#2c6cc6",
                                }}

                              />
                            </MenuItem>
                            <MenuItem
                              onClick={(e) => {
                                handleDelete(row)
                                window.scrollTo({
                                  top: 0,
                                  behavior: "smooth",
                                });
                              }}
                            >
                              {storeEditValue.enabled === "Y" ?
                                <DeleteColorOutlinedIcon
                                  sx={{
                                    margin: "0 5px",
                                    cursor: "pointer",
                                    color: "#e62727",
                                  }}

                                /> :

                                <RestoreFromTrashIcon
                                  sx={{
                                    margin: "0 5px",
                                    cursor: "pointer",
                                    color: "#429f2b",
                                  }}
                                  onClick={handleRestore}
                                />}
                            </MenuItem>

                            {/* Add more menu items as needed */}
                          </Menu>
                        </StyledTableCell>

                      </StyledTableRow>
                    ))
                ) : (
                  <Emptyrow colSpan={gridName.length} />
                )}
              </TableBody>
            }
          </Table>
        </TableContainer>
        <TablePagination
          sx={{
            backgroundColor: "white",
            display: "flex",
            justifyContent: "flex-end",
          }}
          rowsPerPageOptions={[
            5,
            10,
            25,
            { label: "All", value: -1 },
          ]}
          colSpan={gridName.length}
          count={data?.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={
            handleChangeRowsPerPage
          }
          ActionsComponent={TablePaginationActions}
        />
      </Box>



    </SideBar>
  );
};

export default RewardsTable;
