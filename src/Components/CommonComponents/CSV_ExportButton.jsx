import IosShareIcon from "@mui/icons-material/IosShare";
import { Button, Typography } from "@mui/material";

import exportAsCSV from "../../Utils/exportAsCSV";

function CSV_ExportButton({ data, fileName }) {
    return (
        <Button
            onClick={() => exportAsCSV(data, fileName)}
            sx={{
                display: "flex",
                gap: "4px",
                alignItems: "center",
                border: "1px solid rgba(195, 211, 226,0.5)",
                padding: "2px 10px",
                borderRadius: "6px",
                height: "30px",
                justifyContent: "center",
                color: "#0F3659",
                backgroundColor: "white",
                cursor: "pointer",
                boxShadow: "0 1px 5px rgba(0, 0, 0, 0.1)",
                "&:hover": {
                    boxShadow: "0 1px 5px rgba(0, 0, 0, 0.15)",
                },
                transition: "all ease 0.2s",
            }}
        >
            <IosShareIcon
                style={{
                    alignSelf: "center",
                    fontSize: "12px",
                }}
            />
            <Typography
                sx={{
                    fontSize: "11px",
                    marginTop: "4px",
                    textTransform: "capitalize",
                }}
            >
                Export
            </Typography>
        </Button>
    );
}

export default CSV_ExportButton;
