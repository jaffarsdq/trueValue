import AddIcon from '@mui/icons-material/Add';
import {
    Box,
    Button,
    Checkbox,
    Collapse,
    Dialog,
    DialogActions,
    FormControlLabel,
    LinearProgress,
    Typography,
} from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import AlertPop from '../../Components/CommonComponents/AlertPop';
import CustomInputField from '../../Components/CommonComponents/CustomInputField';
import SelectButton from '../../Components/CommonComponents/SelectButton';
import FeedbackTable from '../../Components/Feedback Components/FeedbackTable';
import RatingSmileys from '../../Components/Feedback Components/RatingSmileys';
import RatingStars from '../../Components/Feedback Components/RatingStars';
import SideBar from '../../Layouts/SideBar';
import {
    createAndUpdateInsertRatings,
    fetchRatingsAndOptions,
    setCreateRatingOptions,
    setInitialStageFeedbackDetails,
    setUpdateRatingsAndOptions,
    toggleCreateAndUpdatebtn,
} from '../../Redux/Slices/FeedbackSlice';

const Feedback = () => {
    const { client_id } = useSelector((state) => state.auth);
    const reportData = useSelector(
        (state) => state.feedback.updateRatingsAndOptions
    );
    const reportDataOptions = useSelector(
        (state) => state.feedback.ratingOptions
    );
    const createRatings = useSelector(
        (state) => state.feedback.createRatingOptions
    );

    const preview = useSelector((state) => state.feedback.ratingsAndOptions);
    const { loadingRatingsAndOptions, loadingUpdateRatingsAndOptions } =
        useSelector((state) => state.feedback);

    const [alerts, setAlerts] = useState({
        alertToggle: false,
        message: '',
        status: 'error',
    });
    const { alertToggle, message, status } = alerts;

    const showAlert = (message, status) => {
        setAlerts({
            alertToggle: true,
            message: message,
            status: status,
        });
        setTimeout(() => {
            setAlerts({
                alertToggle: false,
                message: '',
            });
        }, 2000);
    };

    const activeCustomer = preview?.DATA?.RATINGS?.filter(
        (opt) => opt.active === 'Y'
    );

    console.log(activeCustomer, 'active customers');

    // const data = reportData?.RATINGS;
    const button = useSelector((state) => state.feedback.button);
    console.log(activeCustomer, 'preview');
    console.log(reportDataOptions, 'create');
    const options = [{ name: 3 }, { name: 4 }, { name: 5 }];

    const typeOfRatings = [{ name: 'Star' }, { name: 'smiley' }];

    const gridName = ['Id', 'Description', 'Enabled', 'Index', 'Actions'];

    const [open, setOpen] = useState(false);
    const [publish, setPublish] = useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchRatingsAndOptions());
    }, []);

    const handleInputChange = (field, value) => {
        dispatch(setUpdateRatingsAndOptions({ [field]: value }));
    };

    const updateApiData = {
        RATINGS: [
            {
                client_id: client_id,
                rating_id: reportData.rating_id,
                description: reportData.description,
                secondLanguage: reportData.secondLanguage,
                count_value: reportData.count_value,
                rating_type: reportData.rating_type,
                active: reportData.active,
                publish: 'N',
            },
        ],
        OPTIONS: reportDataOptions[0],
    };
    // const handleUpdate = () => {
    //     console.log(updateApiData, "apidata");
    //     dispatch(createAndUpdateInsertRatings(updateApiData));
    //     dispatch(setInitialStageFeedbackDetails());
    //     dispatch(toggleCreateAndUpdatebtn(true));
    //     setToggle(false);
    // };

    const createApiData = {
        RATINGS: [
            {
                client_id: client_id,
                rating_id: reportData.rating_id,
                description: reportData.description,
                secondLanguage: reportData.secondLanguage,
                count_value: reportData.count_value,
                rating_type: reportData.rating_type,
                active: reportData.active,
                publish: 'N',
                Deleted: 0,
            },
        ],
        OPTIONS: createRatings,
    };

    // const handleCreate = () => {
    //     // console.log(createApiData);
    //     dispatch(createAndUpdateInsertRatings(createApiData));
    //     dispatch(setInitialStageFeedbackDetails());
    //     setToggle(false);
    // };

    const handleCreate = () => {
        if (
            !reportData.description ||
            !reportData.count_value ||
            !reportData.rating_type
        ) {
            showAlert('Please fill out all required fields.', 'error');
            return;
        }
        dispatch(createAndUpdateInsertRatings(createApiData))
            .then(() => {
                dispatch(setInitialStageFeedbackDetails());
                setToggle(false);
                showAlert('Feedback created successfully.', 'success');
            })
            .catch((error) => {
                setAlerts({
                    alertToggle: true,
                    message: 'Failed to create feedback.',
                    status: 'error',
                });
            });
        dispatch(setInitialStageFeedbackDetails());
        setToggle(false);
    };

    const handleUpdate = () => {
        if (
            !reportData.description ||
            !reportData.count_value ||
            !reportData.rating_type
        ) {
            showAlert('Please fill out all required fields.', 'error');
            return;
        }
        dispatch(createAndUpdateInsertRatings(updateApiData))
            .then(() => {
                dispatch(setInitialStageFeedbackDetails());
                setToggle(false);
                showAlert('Feedback updated successfully.', 'success');
            })
            .catch((error) => {
                setAlerts({
                    alertToggle: true,
                    message: 'Failed to update feedback.',
                    status: 'error',
                });
            });
        dispatch(setInitialStageFeedbackDetails());
        dispatch(toggleCreateAndUpdatebtn(true));
        setToggle(false);
    };

    const handleInputOptionCreate = (index, field, value) => {
        const updatedOptions = [...createRatings]; // Create a copy of createRatingOptions
        updatedOptions[index] = {
            ...updatedOptions[index],
            [field]: value,
        };
        console.log(index, field, value, 'updated');
        dispatch(setCreateRatingOptions(updatedOptions));
    };

    const [toggle, setToggle] = useState(false);

    const handleCancel = () => {
        dispatch(toggleCreateAndUpdatebtn(true));
        dispatch(setInitialStageFeedbackDetails());
        setToggle(false);
    };

    const handlePageChangeAddressForm = () => {
        setToggle(!toggle);
    };

    const handleToggleContactForm = () => {
        setToggle(true);
    };

    return (
        <SideBar>
            {alertToggle && (
                <AlertPop boolean={alertToggle} msg={message} status={status} />
            )}
            <Box
                sx={{
                    bgcolor: '#FAFBFC',
                    fontFamily: 'poppins',
                    minHeight: 'calc(100dvh)',
                }}
            >
                <Box
                    sx={{
                        display: 'flex',
                        justifyContent: 'end',
                        padding: '0.5rem 1rem 0 1rem',
                        alignItems: 'center',
                        gap: '1rem',
                    }}
                >
                    {/* <ViewCustomerCode selectedCustomerId={selectedCustomerId} /> */}
                    {!toggle ? (
                        <Button
                            variant='contained'
                            color='secondary'
                            onClick={handlePageChangeAddressForm}
                            startIcon={<AddIcon />}
                            sx={{ height: '30px' }}
                        >
                            {'Add new feedback'}
                        </Button>
                    ) : (
                        <Button
                            variant='outlined'
                            color='secondary'
                            onClick={handleCancel}
                            sx={{ height: '30px' }}
                        >
                            {'Cancel'}
                        </Button>
                    )}

                    {button ? (
                        toggle && (
                            <Box
                                sx={{
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                }}
                            >
                                <Button
                                    variant='contained'
                                    color='secondary'
                                    sx={{ height: '30px' }}
                                    onClick={handleCreate}
                                >
                                    Save
                                </Button>
                            </Box>
                        )
                    ) : (
                        <Box
                            sx={{
                                display: 'flex',
                                justifyContent: 'space-between',
                            }}
                        >
                            <Button
                                variant='contained'
                                color='secondary'
                                sx={{ height: '30px' }}
                                onClick={handleUpdate}
                            >
                                Update
                            </Button>
                        </Box>
                    )}
                    <Button
                        variant='contained'
                        color='secondary'
                        sx={{
                            padding: '10px 1rem',
                            height: '30px',
                        }}
                        onClick={handleClickOpen}
                    >
                        Preview
                    </Button>
                </Box>

                <Collapse in={toggle}>
                    <Box
                        sx={{
                            width: {
                                xs: '95%',
                                sm: '95%',
                                md: '95%',
                                lg: '95%',
                            },
                            margin: '1rem auto',
                            display: 'flex',
                            flexDirection: 'column',
                            bgcolor: 'white',
                            boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.15)',
                        }}
                    >
                        <Box
                            sx={{
                                display: 'flex',
                                flexDirection: { xs: 'column', sm: 'row' },
                                height: 'auto',
                                width: '99%',
                                margin: '0 auto',
                                padding: '0.5rem',
                                gap: '1rem',
                            }}
                        >
                            <Box sx={{ width: { xs: '100%', sm: '10%' } }}>
                                <CustomInputField
                                    height={'30px'}
                                    label='Index'
                                    value={reportData.rating_id}
                                    onChange={(e) =>
                                        handleInputChange(
                                            'rating_id',
                                            e.target.value
                                        )
                                    }
                                    type='text'
                                    disabled={true}
                                />
                            </Box>

                            <Box
                                sx={{
                                    width: { xs: '100%', sm: '50%', lg: '55%' },
                                }}
                            >
                                <CustomInputField
                                    height={'30px'}
                                    label='Question'
                                    value={reportData.description}
                                    onChange={(e) =>
                                        handleInputChange(
                                            'description',
                                            e.target.value
                                        )
                                    }
                                    type='text'
                                />
                            </Box>

                            <SelectButton
                                height='30px'
                                sx={{
                                    margin: '4px 0px',
                                    padding: '7px 0',
                                    width: {
                                        xs: '100%',
                                        sm: '14%',
                                    },
                                }}
                                name='Count'
                                obj='count_value'
                                value={reportData.count_value}
                                placeholder='Count'
                                option={options}
                                handleInputChange={handleInputChange}
                            />
                            <SelectButton
                                height='30px'
                                sx={{
                                    margin: '4px 0px',
                                    padding: '7px 0',
                                    width: {
                                        xs: '100%',
                                        sm: '14%',
                                    },
                                }}
                                name='Type of Rating'
                                fontFamily={'Poppins'}
                                fontWeight={700}
                                obj='rating_type'
                                value={reportData.rating_type}
                                placeholder='Type of Rating'
                                option={typeOfRatings}
                                disabled={false}
                                handleInputChange={handleInputChange}
                            />
                            <Box
                                sx={{
                                    display: 'flex',
                                    width: { xs: '100%', sm: '10%' },
                                    alignItems: 'center',
                                    marginTop: '5px',
                                    justifyContent: { xs: 'end', sm: 'none' },
                                }}
                            >
                                <FormControlLabel
                                    control={
                                        <Checkbox
                                            checked={reportData.active === 'Y'}
                                            color='secondary'
                                            sx={{
                                                '& .MuiSvgIcon-root': {
                                                    fontSize: '1.2rem',
                                                },
                                            }}
                                            onChange={() => {
                                                handleInputChange(
                                                    'active',
                                                    reportData.active === 'Y'
                                                        ? 'N'
                                                        : 'Y'
                                                );
                                            }}
                                        />
                                    }
                                    sx={{
                                        color: 'secondary',
                                        marginRight: '0 !important',
                                        backgroundColor: 'inherit',
                                        height: '15px',
                                        borderRadius: '4px',
                                        '& .MuiFormControlLabel-label': {
                                            fontSize: {
                                                xs: '11px !important',
                                                md: '12px !important',
                                            },
                                            fontFamily: 'Poppins !important ',
                                            fontWeight: '600',
                                        },
                                    }}
                                    label='Active'
                                />
                            </Box>
                        </Box>
                    </Box>
                </Collapse>

                <Box sx={{ width: '98%', margin: '0 auto', padding: '0 1rem' }}>
                    <Box
                        sx={{
                            display: 'flex',
                            justifyContent: 'flex-end',
                            marginBlock: '1rem',
                        }}
                    >
                        {/* <Button
                        variant="contained"
                        color="secondary"
                        sx={{
                            padding: "10px 1rem",
                            height: "30px",
                        }}
                        onClick={handleClickOpen}
                    >
                        Preview
                    </Button> */}
                    </Box>
                    {loadingRatingsAndOptions ||
                    loadingUpdateRatingsAndOptions ? (
                        <LinearProgress color='secondary' />
                    ) : (
                        <FeedbackTable
                            handleToggleContactForm={handleToggleContactForm}
                            gridName={gridName}
                        />
                    )}
                </Box>

                <Dialog
                    open={open}
                    onClose={handleClose}
                    maxWidth={'xs'}
                    fullWidth={false}
                >
                    <Box
                        sx={{
                            background: '#F0F4F7',
                            padding: '1rem 0.3rem 1rem 1rem',
                            display: 'flex',
                            flexDirection: 'column',
                            width: '340px',
                        }}
                    >
                        <Box
                            sx={{
                                display: 'flex',
                                justifyContent: 'space-between',
                                alignItems: 'center',
                            }}
                        >
                            <Typography
                                sx={{
                                    fontSize: '16px',
                                    fontWeight: '700',
                                }}
                            >
                                Feedback Preview
                            </Typography>
                            <FormControlLabel
                                control={
                                    <Checkbox
                                        checked={publish}
                                        color='secondary'
                                        sx={{
                                            '& .MuiSvgIcon-root': {
                                                fontSize: '1.2rem',
                                            },
                                        }}
                                        onChange={(e) =>
                                            setPublish(e.target.checked)
                                        }
                                    />
                                }
                                label={
                                    <Typography
                                        sx={{
                                            fontSize: '12px',
                                            marginTop: '2px',
                                            fontWeight: '500',
                                            opacity: '95%',
                                        }}
                                    >
                                        Publish
                                    </Typography>
                                }
                                sx={{
                                    '& .MuiSvgIcon-root': {
                                        fontSize: {
                                            xs: '12px',
                                            sm: '12px',
                                            md: '16px',
                                            lg: '16px',
                                        },
                                    },
                                }}
                            />
                        </Box>

                        {activeCustomer?.map((opt, index) => {
                            return (
                                <Box
                                    key={index}
                                    sx={{
                                        background: '#F0F4F7',
                                        fontSize: '14px',
                                        margin: '0.5rem 0',
                                        display: 'flex',
                                        flexDirection: 'column',
                                        gap: '5px',
                                    }}
                                >
                                    <Typography
                                        sx={{
                                            fontSize: '12px',
                                            fontStyle: 'normal',
                                            fontWeight: 'bold',
                                            textTransform: 'capitalize',
                                            color: '#7B1FA2',
                                        }}
                                    >
                                        {opt.description}
                                    </Typography>
                                    <Box sx={{ width: '100%' }}>
                                        {opt.rating_type === 'Star' ? (
                                            <RatingStars />
                                        ) : (
                                            <RatingSmileys />
                                        )}
                                    </Box>
                                </Box>
                            );
                        })}

                        <DialogActions>
                            <Button
                                onClick={handleClose}
                                color='secondary'
                                variant='outlined'
                                sx={{
                                    padding: '10px 1rem',
                                    height: '30px',
                                }}
                            >
                                Cancel
                            </Button>
                            <Button
                                onClick={() => {
                                    // Prepare updated data to send to API
                                    const updatedActiveCustomer =
                                        activeCustomer.map((opt) => ({
                                            ...opt,
                                            publish: publish ? 'Y' : 'N',
                                            client_id: client_id,
                                        }));

                                    const updatedData = {
                                        RATINGS: updatedActiveCustomer,
                                    };

                                    // Dispatch action to send updated data to API
                                    dispatch(
                                        createAndUpdateInsertRatings(
                                            updatedData
                                        )
                                    )
                                        .then(() => {
                                            dispatch(
                                                setInitialStageFeedbackDetails()
                                            );
                                            setToggle(false);
                                            showAlert(
                                                'Published successfully.',
                                                'success'
                                            );
                                        })
                                        .catch((error) => {
                                            setAlerts({
                                                alertToggle: true,
                                                message:
                                                    'Failed to publish feedback.',
                                                status: 'error',
                                            });
                                        });
                                    dispatch(setInitialStageFeedbackDetails());
                                    handleClose(); // Close the dialog after saving
                                }}
                                color='secondary'
                                variant='contained'
                                sx={{
                                    padding: '10px 1rem',
                                    height: '30px',
                                }}
                            >
                                Save
                            </Button>
                        </DialogActions>
                    </Box>
                </Dialog>
            </Box>
        </SideBar>
    );
};

export default Feedback;
