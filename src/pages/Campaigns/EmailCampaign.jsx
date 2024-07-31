import { Box, Button } from "@mui/material";

import { useNavigate } from "react-router-dom";
import EmailTemplateTable from "../../Components/CampaignsComponents/EmailTemplateTable";
import SideBar from "../../Layouts/SideBar";
import CampaignForm from "../../Components/CampaignsComponents/CampaignForm";

function EmailCampaign() {
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
                    <Box>E-mail Campaign</Box>
                    <Button
                        color="secondary"
                        variant="contained"
                        sx={{ height: "40px" }}
                        onClick={() => navigate("/campaigns/createCampaign")}
                    >
                        Create Campaign
                    </Button>
                </Box>
                <CampaignForm />
                <Box>
                    <EmailTemplateTable />
                </Box>
            </div>
        </SideBar>
    );
}

export default EmailCampaign;
