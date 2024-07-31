import { Box, Skeleton } from "@mui/material";
import formatNumber from "../../Utils/formatNumber";
function MiniCustomerCard({
    cardTitle,
    percentage,
    value,
    SubTitle,
    loading,
    fluctuationColor,
    fluctuationBgColor,
}) {
    return (
        <Box
            sx={{
                display: "flex",
                flexDirection: "column",
                backgroundColor: "white",
                border: "2px solid #ECEEF6",
                minWidth: { xs: "70%", sm: "35%", md: "234px" },
                padding: "1rem 0rem",
                paddingLeft: "1.2rem",
                gap: "1rem",
                fontFamily: "DM Sans",
                borderRadius: "6px",
                margin: "0.5rem",
                flex: "1",
                boxShadow: " 0px 4px 10px 5px rgba(238, 238, 238, 0.3)",
            }}
        >
            <Box
                sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    paddingRight: "1rem",
                }}
            >
                <Box
                    sx={{
                        fontSize: "14px",
                        fontWeight: "600",
                    }}
                >
                    {cardTitle}
                </Box>

                {/* <Box
                    sx={{
                        backgroundColor: fluctuationBgColor,
                        fontSize: "11px",
                        color: fluctuationColor,
                        padding: "2px 6px",
                        borderRadius: "12px",
                        height: "20px",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        gap: "3px",
                        fontWeight: "400",
                    }}
                >
                    <TrendingUp sx={{ fontSize: "11px" }} />
                    <Typography
                        sx={{
                            fontSize: "11px",
                            fontWeight: "400",
                            marginTop: "2.2px",
                        }}
                    >
                        {percentage}.0%
                    </Typography>
                </Box> */}
            </Box>
            <Box>
                {!loading ? (
                    <Box
                        sx={{
                            fontSize: "23px",
                            fontWeight: "700",
                            letterSpacing: "1px",
                            // minHeight: "35px"
                        }}
                    >
                        {value == 0 || value ? formatNumber(value, 0): "-"}
                    </Box>
                ) : (
                    <Skeleton
                        sx={{
                            fontSize: "23px",
                            fontWeight: "700",
                            letterSpacing: "1px",
                            width: "30%",
                        }}
                    />
                )}
                <Box
                    sx={{
                        marginTop: "0.5rem",
                        fontSize: "11px",
                        color: "rgba(148, 148, 148, 1)",
                    }}
                >
                    {SubTitle}
                </Box>
            </Box>
        </Box>
    );
}

export default MiniCustomerCard;
