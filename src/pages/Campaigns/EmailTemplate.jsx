import { Box, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import EmailTemplateTable from "../../Components/CampaignsComponents/EmailTemplateTable";
import SideBar from "../../Layouts/SideBar";
import TemplateBuilder from "../../Components/CampaignsComponents/TemplateBuilder";
import MyEditor from "../../Components/CampaignsComponents/MyEditor";

function EmailTemplate() {
    const navigate = useNavigate();
    return (
        <SideBar>
            <div
                style={{
                    backgroundColor: "#FAFBFC",
                    fontFamily: "poppins",
                }}
            >
                <Box
                    sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        padding: "0.5rem 2rem",
                    }}
                >
                    <Box>E-mail Template</Box>
                    <Button
                        color="secondary"
                        variant="contained"
                        sx={{ height: "40px" }}
                        onClick={() => navigate("/campaigns/createTemplate")}
                    >
                        Create Template
                    </Button>
                </Box>
                <Box sx={{width: "100%"}}>
                    <MyEditor/>
                </Box>
                <Box>
                    <EmailTemplateTable />
                </Box>
            </div>
        </SideBar>
    );
}

export default EmailTemplate;
