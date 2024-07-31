import CloseIcon from "@mui/icons-material/Close";
import ImageIcon from "@mui/icons-material/Image";
import ZoomInIcon from "@mui/icons-material/ZoomIn";
import ZoomOutIcon from "@mui/icons-material/ZoomOut";
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    IconButton,
} from "@mui/material";
import Box from "@mui/material/Box";
import { styled } from "@mui/material/styles";
import Typography from "@mui/material/Typography";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { TransformComponent, TransformWrapper } from "react-zoom-pan-pinch";
import { clearImageUploader, setFileName, setInitialStageCreatePromotions } from "../../Redux/Slices/PromotionSlice";

function ZoomInAndZoomOut({ styles, width, value, handleImage }) {
    const { imageURL } = useSelector((state) => state.auth)
    const data = useSelector((state) => state.promotionSlice?.createPromotions);

    const [selectedImage, setSelectedImage] = useState("");
    const [isDialogOpen, setDialogOpen] = useState(false);
    const [previewUrl, setPreviewUrl] = useState(null);
    const [zoomLevel, setZoomLevel] = useState(1);


    const VisuallyHiddenInput = styled("input")({
        clip: "rect(0 0 0 0)",
        clipPath: "inset(50%)",
        height: 1,
        overflow: "hidden",
        position: "absolute",
        bottom: 0,
        left: 0,
        whiteSpace: "nowrap",
        width: 1,
    });

    const dispatch = useDispatch();


    const isBase64 = (str) => {
        if (!str) {
            return false;
        }
        return (
            str.includes("data:image/jpeg;base64") ||
            str.includes("data:image/png;base64")
        );
    };
    useEffect(() => {
        if (isBase64(value) || (value && value.length > 900)) {
            setSelectedImage(value);
        } else if (value) {
            setSelectedImage(`${imageURL}${value}`);
        } else {
            setSelectedImage("");
        }
        // dispatch(setFileName(""))
        dispatch(clearImageUploader(""))

    }, [value]);
    const {saveFileName} = useSelector((state) => state.promotionSlice);
    useEffect(() => {
        if (saveFileName == "") {
            setSelectedImage("");
        }

    }, [saveFileName])
    useEffect(() => {
        return () => {
            dispatch(clearImageUploader(""));
        };
    }, []);
    const handleImageChange = (event) => {
        const file = event.target.files[0];
        if (file && file.type.startsWith("image/")) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setPreviewUrl(reader.result);
                setSelectedImage(reader.result);
                const formData = new FormData();
                formData.append('myFile', file);
                setDialogOpen(true);
                handleImage(formData, file.name);
                console.log(formData, 'image');

            };
            reader.readAsDataURL(file);
        }
    };

    const imagePath = useSelector((state) => state.promotionSlice.imageUploader);
    console.log(imagePath, 'path');
    // const handleImageChange = (event) => {
    //     console.log(event.target.files)
    //     const file = event.target.files[0];
    //     if (file && file.type.startsWith('image/')) {
    //       const reader = new FileReader();
    //       reader.onloadend = () => {
    //         setSelectedImage(reader.result);
    //         const formData = new FormData();
    //         formData.append('myFile', file);
    //         console.log(formData)

    //         handleImage(formData, file.name);
    //         handleInputChange(objectname, reader.result);
    //       };
    //       reader.readAsDataURL(file);
    //     }
    //   };

    const handleZoomIn = () => {
        setZoomLevel(zoomLevel + 0.3);
    };

    const handleZoomOut = () => {
        if (zoomLevel > 0.1) {
            setZoomLevel(zoomLevel - 0.3);
        }
    };

    const handleUpload = () => {
        if (selectedImage) {
            // Perform the upload action here
            // console.log("Image uploaded:", selectedImage);
        } else {
            alert("No file selected.");
        }
        setDialogOpen(false);
    };

    const handleCancel = () => {
        setDialogOpen(false);
        setSelectedImage("");
        setPreviewUrl(null);
        setZoomLevel(1);
    };

    // ZoomIn and ZoomOut
    // const Controls = () => {
    //     const { zoomIn, zoomOut, resetTransform } = useControls();
    //     return (
    //         <>
    //             {/* <button onClick={() => zoomIn()}>Zoom In</button> */}
    //             {/* <button onClick={() => zoomOut()}>Zoom Out</button> */}
    //             {/* <button onClick={() => resetTransform()}>Reset</button> */}
    //         </>
    //     );
    // };
    console.log(selectedImage, 'image');

    return (
        <Box
            sx={{
                height: {
                    xs: "100px",
                    sm: "120px",
                },
                border: "2px",
                borderStyle: "dashed",
                borderColor: "gray",
                width: width ? width : "200px",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                flexDirection: "column",
                position: "relative",
            }}
        >
            {!selectedImage && (
                <>
                    <ImageIcon sx={{ color: "gray" }} />
                    <Typography
                        sx={{
                            color: "gray",
                            fontSize: "14px",
                            padding: "10px",
                        }}
                        variant="p"
                    >
                        <Typography
                            sx={{ fontSize: "14px" }}
                            color="secondary"
                            variant="p"
                        >
                            Click here to upload
                        </Typography>
                    </Typography>
                </>
            )}
            {selectedImage && (
                <div
                    style={{
                        width: "100%",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        height: "100%",
                        overflow: "hidden",
                        // transform: `scale(${zoomLevel})`, // Apply zoom level to the image
                        // transition: "transform 0.1s ease", // Add smooth transition
                    }}
                >
                    <img

                        src={selectedImage}
                        alt="Selected"
                        style={{
                            ...styles,
                            objectFit: "contain",
                            width: "100%", // Take full width of the container
                            height: "100%", // Maintain aspect ratio
                            // borderRadius: "0",
                            // padding: "2.5rem"
                        }}
                    />
                </div>
            )}
            <input
                type="file"
                accept="image/*"
                style={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    width: "100%",
                    height: "100%",
                    opacity: 0,
                    cursor: "pointer",
                }}
                onChange={handleImageChange}
            />

            <Dialog open={isDialogOpen} onClose={handleCancel}>
                <DialogTitle> Upload Section Image</DialogTitle>

                <IconButton
                    aria-label="close"
                    onClick={handleCancel}
                    sx={{
                        position: "absolute",
                        right: 8,
                        top: 8,
                        color: (theme) => theme.palette.grey[500],
                    }}
                >
                    <CloseIcon />
                </IconButton>

                <DialogContent
                    sx={{
                        padding: "0 24px",
                    }}
                >
                    <div
                        style={{
                            width: "30rem",
                            height: "20rem",
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            // backgroundColor: "red",
                            // padding: "1rem 0",
                            overflow: "auto",
                            transition: "transform 0.1s ease", // Add smooth transition
                        }}
                    >
                        <TransformWrapper>
                            {/* <Controls /> */}
                            <TransformComponent>
                                <img
                                    src={previewUrl}
                                    alt="Preview"
                                    style={{
                                        width: "318px",
                                        height: "300px",
                                        transform: `scale(${zoomLevel})`, // Apply zoom level to the image
                                        transition: "transform 0.1s ease", // Add smooth transition
                                        // transformOrigin: "center",
                                        // height: `${10 * zoomLevel}%`,
                                        // backgroundColor: "red",
                                        // flexGrow: 1,
                                        // flexShrink: 0
                                    }}
                                />
                            </TransformComponent>
                        </TransformWrapper>
                    </div>
                </DialogContent>

                <DialogActions>
                    <IconButton
                        sx={{
                            // width: '80px',
                            // position: 'absolute',
                            // right: 50,
                            // top: 9,
                            // fontSize: "4rem",
                            color: "#373434",
                        }}
                        onClick={handleZoomIn}
                    >
                        <ZoomInIcon
                            sx={{
                                fontSize: "1.8rem",
                            }}
                        />
                    </IconButton>
                    <IconButton
                        sx={{
                            // width: '80px',
                            // position: 'absolute',
                            // right: 90,
                            // top: 9,
                            // fontSize: "2rem",
                            color: "#373434",
                        }}
                        onClick={handleZoomOut}
                    >
                        <ZoomOutIcon
                            sx={{
                                fontSize: "1.8rem",
                            }}
                        />
                    </IconButton>
                    <Button
                        variant="contained"
                        sx={{ width: "80px" }}
                        onClick={handleUpload}
                        color="primary"
                    >
                        Save
                    </Button>
                    <Button
                        variant="contained"
                        sx={{ width: "80px" }}
                        onClick={handleCancel}
                        color="error"
                    >
                        Cancel
                    </Button>
                </DialogActions>
            </Dialog>
        </Box>
    );
}

export default ZoomInAndZoomOut;
