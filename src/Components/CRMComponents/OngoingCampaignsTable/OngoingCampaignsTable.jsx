import { Box, Typography } from "@mui/material";

import OngoingCampaignsTableRow from "./OngoingCampaignsTableRow";

function OngoingCampaignsTable() {
    return (
        <Box
            sx={{
                display: "flex",
                flexDirection: "column",
                height: "240px",
                width: "100%",
            }}
        >
            <Box
                sx={{
                    display: "flex",
                    fontFamily: "Open Sans",
                    color: "#96A5B8",
                    padding: "10px",
                }}
            >
                <Box
                    sx={{
                        flexBasis: "15%",
                        display: "flex",
                        // paddingLeft: "1rem",
                    }}
                >
                    <Typography sx={{ fontSize: "12px" }}>From Date</Typography>
                </Box>
                <Box
                    sx={{
                        flexBasis: "15%",
                        display: "flex",
                        // paddingLeft: "1rem",
                    }}
                >
                    <Typography sx={{ fontSize: "12px" }}>To Date</Typography>
                </Box>
                <Box
                    sx={{
                        flexBasis: "50%",
                        display: "flex",
                        paddingLeft: "1rem",
                    }}
                >
                    <Typography sx={{ fontSize: "12px" }}>
                        Promotion Title
                    </Typography>
                </Box>
                <Box
                    sx={{
                        flexBasis: "20%",
                        display: "flex",
                        paddingLeft: "1rem",
                    }}
                >
                    <Typography
                        sx={{
                            fontSize: "12px",
                            marginLeft: {
                                xs: "0.3rem",
                                sm: "0.8rem",
                                md: "1rem",
                                lg: "1rem",
                            },
                        }}
                    >
                        View
                    </Typography>
                </Box>
            </Box>
            <OngoingCampaignsTableRow
                Number={"10/05/2024"}
                Name={"25/06/2024"}
                Title = {"Promotion Title 1"}
                Percentage={"View"}
                Color={"rgba(0, 149, 255, 1)"}
                bgColor={"rgba(205, 231, 255, 0.3)"}
            />
            <OngoingCampaignsTableRow
                Number={"10/05/2024"}
                Name={"25/06/2024"}
                Title = {"Promotion Title 2"}
                Percentage={"View"}
                Color={"rgba(0, 229, 143, 1)"}
                bgColor={"rgba(140, 250, 199, 0.3)"}
            />
            <OngoingCampaignsTableRow
                Number={"10/05/2024"}
                Name={"25/06/2024"}
                Title = {"Promotion Title 3"}
                Percentage={"View"}
                Color={"rgba(136, 77, 255, 1)"}
                bgColor={"rgba(197, 168, 255, 0.3)"}
            />
            <OngoingCampaignsTableRow
                Number={"10/05/2024"}
                Name={"25/06/2024"}
                Title = {"Promotion Title 4"}
                Percentage={"View"}
                Color={"rgba(255, 137, 0, 1)"}
                bgColor={"rgba(255, 213, 164, 0.3)"}
            />
        </Box>
    );
}

export default OngoingCampaignsTable;
