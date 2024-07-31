import CloseIcon from '@mui/icons-material/Close';
import ImageIcon from '@mui/icons-material/Image';
import { IconButton } from '@mui/material';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';

import getFileNameFromUrl from '../../Utils/getFileNameFromUrl';

function ImageUploader({
    Url,
    handleImage,
    styles,
    width,
    height,
    value,
    handleInputChange,
    objectname,
    hxs,
    hsm,
}) {
    const [selectedImage, setSelectedImage] = useState(null);
    const fileInputRef = useRef(null);
    const [selectedUrl, setSelectedUrl] = useState();
    const { ClientId, LocCode, authKey, imageURL } = useSelector(
        (state) => state.auth
    );
    const isBase64 = (str) => {
        if (!str) {
            return false;
        }
        return (
            str.includes('data:image/jpeg;base64') ||
            str.includes('data:image/png;base64')
        );
    };
    useEffect(() => {
        if (isBase64(value) || (value && value.length > 900)) {
            setSelectedImage(value);
        } else if (value) {
            setSelectedImage(`${imageURL}${value}`);
        } else {
            setSelectedImage(null);
        }
    }, [value, imageURL]);
    useEffect(() => {
        setSelectedUrl(null);
    }, [value]);
    const handleImageChange = (event) => {
        const file = event.target.files[0];
        if (file && file.type.startsWith('image/')) {
            const reader = new FileReader();
            reader.onloadend = () => {
                console.log(reader.result, 'reader.result');
                setSelectedImage(reader.result);
                const formData = new FormData();
                formData.append('myFile', file);
                handleImage(formData, file.name);
                handleInputChange(objectname, reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleCancel = () => {
        handleImage('', '');
        handleInputChange('', '');
        setSelectedImage(null);

        if (fileInputRef.current) {
            fileInputRef.current.value = '';
        }
    };

    return (
        <Box
            sx={{
                height: { xs: hxs ? hxs : '180px', sm: hsm ? hsm : '180px' },
                border: '2px',
                borderStyle: 'dashed',
                borderColor: 'gray',
                width: width ? width : '220px',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                flexDirection: 'column',
                position: 'relative',
            }}
        >
            {!selectedImage && (
                <>
                    <ImageIcon sx={{ color: 'gray' }} />
                    <Typography
                        sx={{
                            color: 'gray',
                            fontSize: '14px',
                            padding: '10px',
                        }}
                        variant='p'
                    >
                        <Typography
                            sx={{ fontSize: '14px' }}
                            color='primary'
                            variant='p'
                        >
                            Click here to upload
                        </Typography>
                    </Typography>
                </>
            )}
            {selectedImage && (
                <div
                    style={{
                        width: '100%',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        height: '100%',

                        position: 'relative', // Add this to make the cancel button position correctly
                    }}
                >
                    <img
                        src={selectedImage}
                        alt='Selected'
                        style={
                            styles
                                ? styles
                                : {
                                      width: '100%',
                                      height: '100%',
                                      objectFit: 'contain',
                                  }
                        }
                    />
                    {/* Cancel button */}
                    <IconButton
                        size='small'
                        sx={{
                            ':hover': {
                                background: 'red',
                            },
                            position: 'absolute',
                            top: '-15px',
                            right: '-15px',
                            color: 'white',
                            background: 'red',
                        }}
                        onClick={handleCancel}
                        aria-label='delete'
                    >
                        <CloseIcon
                            sx={{
                                fontSize: '15px',
                            }}
                        />
                    </IconButton>
                </div>
            )}
            <input
                type='file'
                accept='image/*'
                title={getFileNameFromUrl(selectedImage)}
                style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    opacity: 0,
                    cursor: 'pointer',
                }}
                onChange={handleImageChange}
                ref={fileInputRef}
            />
        </Box>
    );
}

export default ImageUploader;
