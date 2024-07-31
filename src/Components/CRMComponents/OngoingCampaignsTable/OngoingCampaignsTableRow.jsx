import { Box, Typography } from "@mui/material";

function OngoingCampaignsTableRow({
    Number,
    Name,
    Percentage,
    Title,
    Color,
    bgColor,
}) {
    return (
        <Box
            sx={{
                display: "flex",
                fontFamily: "poppins",
                height: "55px",
                alignItems: "center",
                color: "#444A6D",
                borderTop: "1px solid rgba(237, 242, 246, 1)",
            }}
        >
            <Box
                sx={{
                    flexBasis: "15%",
                    display: "flex",
                    // paddingLeft: "1rem",
                }}
            >
                <Typography sx={{ fontSize: "12px" }}>{Number}</Typography>
            </Box>
            <Box
                sx={{
                    flexBasis: "15%",
                    display: "flex",
                    // paddingLeft: "1rem",
                }}
            >
                <Typography sx={{ fontSize: "12px" }}>{Name}</Typography>
            </Box>
            {/* percentage bar */}
            {/* <Box
                sx={{
                    flexBasis: "50%",
                    display: "flex",
                    width: "90%",
                    height: "5px",
                    backgroundColor: bgColor,
                    borderRadius: "8px",
                }}
            >
                <Box
                    sx={{
                        width: "100%",
                        flexBasis: Percentage + "%",
                        backgroundColor: Color,
                        height: "5px",
                        borderRadius: "8px",
                    }}
                ></Box>
            </Box> */}
            <Box
                sx={{
                    flexBasis: "50%",
                    display: "flex",
                    paddingLeft: "1rem",
                }}
            >
                <Typography sx={{ fontSize: "12px" }}>{Title}</Typography>
            </Box>
            <Box
                sx={{
                    flexBasis: "20%",
                    display: "flex",
                    paddingLeft: "1rem",
                }}
            >
                <Box
                    sx={{
                        border: `solid 1px ${Color}`,
                        backgroundColor: bgColor,
                        color: `${Color}`,
                        width: "60%",
                        display: "flex",
                        justifyContent: "center",
                        borderRadius: "8px",
                        padding: "2px",
                        height: "20px",
                        ":hover": {
                            cursor: "pointer"
                        }
                    }}
                >
                    <Typography sx={{ fontSize: "10px" }}>
                        {Percentage}
                    </Typography>
                </Box>
            </Box>
        </Box>
    );
}

export default OngoingCampaignsTableRow;
