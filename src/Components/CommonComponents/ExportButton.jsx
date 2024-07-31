import IosShareIcon from "@mui/icons-material/IosShare";
import { Button, Typography } from "@mui/material";

function ExportButton({ downloadChart, exportAsImage, exportAsPDF }) {
    const handleExport = () => {
        if (downloadChart) {
            downloadChart();
        } else if (exportAsImage) {
            exportAsImage();
        } else if (exportAsPDF) {
            exportAsPDF();
        }
    };
    return (
        <Button
            onClick={handleExport}
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
                cursor: "pointer",
                boxShadow: "0 1px 5px rgba(0, 0, 0, 0.08)",
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

export default ExportButton;
