import { Box } from "@mui/material";

function NoDataMsg() {
    return (
        <Box
            sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                height: "100px",
                width: "100%",
            }}
        >
            <p>There is no data</p>
        </Box>
    );
}

export default NoDataMsg;
