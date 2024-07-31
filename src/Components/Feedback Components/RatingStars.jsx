import { Box, Rating, Typography } from "@mui/material";
import { useState } from "react";

function RatingStars() {
    const [value, setValue] = useState(Math.floor(Math.random() * 5) + 1);

    const messages = [
        "It was terrible",
        "It was bad",
        "It was okay",
        "It was good",
        "It was great",
    ];

    return (
        <Box
            sx={{
                display: "flex",
                flexDirection: "column",
                width: "fit-content",
                gap: "2px",
            }}
        >
            <Rating
                name="simple-controlled"
                value={value}
                onChange={(event, newValue) => {
                    setValue(newValue);
                }}
                sx={{ fontSize: "46px", marginLeft: "-5px" }}
            />
            <Typography
                variant="body2"
                sx={{
                    fontStyle: "italic",
                    fontSize: "12px",
                    opacity: "1",
                    color: "grey",
                }}
            >
                {messages[value - 1]}
            </Typography>
        </Box>
    );
}

export default RatingStars;
