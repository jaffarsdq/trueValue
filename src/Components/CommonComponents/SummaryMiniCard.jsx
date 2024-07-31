import { Box, Typography } from "@mui/material";

import LoadingAnimationDots from "./loadingAnimationDots";

function SummaryMiniCard({
    img,
    mainTitle,
    subTitle1,
    subTitle2,
    bgColor,
    isLoading,
}) {
    return (
        <Box
            sx={{
                backgroundColor: bgColor,
                display: "flex",
                flexDirection: "column",
                width: { xs: "90%", sm: "50%", lg: "22%" },
                alignItems: { xs: "center", md: "start" },
                height: "140px",
                marginTop: "2rem",
                borderRadius: "12px",
                padding: {
                    xs: "1rem",
                    sm: "1rem",
                    md: "1rem",
                    lg: "0.5rem",
                },
                fontFamily: "poppins",
                justifyContent: "space-around",
            }}
        >
            <img src={img} alt={`card ${img}`} width={"30px"} height={"30px"} />
            {isLoading ? (
                <LoadingAnimationDots />
            ) : (
                <Typography
                    sx={{
                        fontSize: { xs: "16px", md: "13px", lg: "16px" },
                        fontWeight: "900",
                        color: "rgba(21, 29, 72, 1)",
                        marginTop: "12px",
                    }}
                >
                    {mainTitle}
                </Typography>
            )}
            <Box sx={{ marginTop: "8px" }}>
                <Typography
                    sx={{
                        fontSize: { xs: "13px", md: "10px", lg: "15px" },
                        fontWeight: "600",
                        color: "rgba(66, 81, 102, 0.9)",
                    }}
                >
                    {subTitle1}
                </Typography>
                <Typography
                    sx={{
                        fontSize: "9px",
                        color: "rgba(64, 121, 237, 1)",
                        marginTop: "2px",
                    }}
                >
                    {subTitle2}
                </Typography>
            </Box>
        </Box>
    );
}

export default SummaryMiniCard;
