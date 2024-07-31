import { Box, Typography } from "@mui/material";
import { useState } from "react";

function RatingSmileys() {
    const [value, setValue] = useState(Math.floor(Math.random() * 5) + 1);
    const [hoveredEmoji, setHoveredEmoji] = useState(null);

    const emojis = [
        "😠", // For rating 1
        "😕", // For rating 2
        "😐", // For rating 3
        "🙂", // For rating 4
        "😄", // For rating 5
    ];

    const messages = [
        "It was terrible",
        "It was bad",
        "It was okay",
        "It was good",
        "It was great",
    ];

    const handleChange = (newValue) => {
        setValue(newValue);
    };

    const handleMouseEnter = (index) => {
        setHoveredEmoji(index);
    };

    const handleMouseLeave = () => {
        setHoveredEmoji(null);
    };

    return (
        <Box
            sx={{
                display: "flex",
                flexDirection: "column",
                // alignItems: "center",
                // gap: "5px",
            }}
        >
            <div
                role="radiogroup"
                aria-labelledby="rating-message"
                style={{
                    display: "flex",
                    gap: "5px",
                }}
            >
                {emojis.map((emoji, index) => (
                    <Box
                        key={index}
                        component="div"
                        onClick={() => handleChange(index + 1)}
                        onMouseEnter={() => handleMouseEnter(index)}
                        onMouseLeave={handleMouseLeave}
                        sx={{
                            fontSize: "30px",
                            cursor: "pointer",
                            opacity: value === index + 1 ? 1 : 0.5,
                            // transition: "all 0.3s ease-out",
                            filter: "drop-shadow(0 0 5px rgba(0, 0, 0, 0.5))",
                            borderRadius: "50%",
                            // padding: "10px",
                            position: "relative",
                            ":hover": {
                                opacity: 0.8,
                                transform: "scale(1.2)",
                                
                            },
                        }}
                    >
                        {emoji}
                    </Box>
                ))}
            </div>
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

export default RatingSmileys;
