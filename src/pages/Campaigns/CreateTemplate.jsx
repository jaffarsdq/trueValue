import EditIcon from "@mui/icons-material/Edit";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import ViewListIcon from "@mui/icons-material/ViewList";
import WindowIcon from "@mui/icons-material/Window";
import {
    Box,
    Button,
    ButtonGroup,
    Card,
    CardActions,
    CardMedia,
    Container,
    Grid,
    IconButton,
    Typography,
} from "@mui/material";
import { useState } from "react";

import img from "../../assets/campaign.jpg";

import CampaignsTable from "../../Components/CampaignsComponents/CampaignsTable";
import SideBar from "../../Layouts/SideBar";

function CardTemplate({ CardName }) {
    return (
        <>
            <Container>
                <Card
                    sx={{
                        maxWidth: "250px",

                        borderRadius: ".3rem",

                        border: "1px solid rgba(226, 223, 223, 1)",

                        boxShadow: "none",
                    }}
                >
                    <CardActions
                        sx={{
                            backgroundColor: "rgba(226, 223, 223, .6)",

                            borderBottom: ".5px solid rgba(228, 227, 227, 1)",
                        }}
                    >
                        <Typography
                            sx={{
                                color: "#3f60c3",

                                fontFamily: "Poppins",

                                fontWeight: "500",

                                marginRight: "10%",
                            }}
                        >
                            {" "}
                            {CardName.name}{" "}
                        </Typography>

                        <IconButton
                            sx={{
                                border: "1px solid rgba(187, 176, 176, .6)",

                                height: "20px",

                                width: "20px",

                                borderRadius: ".3rem",

                                padding: ".8rem",
                            }}
                        >
                            <RemoveRedEyeIcon
                                sx={{
                                    fontSize: "1.2rem",
                                }}
                            />
                        </IconButton>

                        <IconButton
                            sx={{
                                border: "1px solid rgba(187, 176, 176, .6)",

                                height: "20px",

                                width: "20px",

                                borderRadius: ".3rem",

                                padding: ".8rem",
                            }}
                        >
                            <EditIcon
                                sx={{
                                    fontSize: "1.2rem",
                                }}
                            />
                        </IconButton>
                    </CardActions>

                    <CardMedia
                        component="img"
                        alt="green iguana"
                        height="250"
                        image={img}
                        sx={{
                            padding: "1rem .5rem",

                            objectFit: "contain",
                        }}
                    />
                </Card>
            </Container>
        </>
    );
}

const CreateTemplate = () => {
    const CardDetailts = [
        {
            name: "Promotion Description",
        },
        {
            name: "Promotion Description",
        },
        {
            name: "Promotion Description",
        },
        {
            name: "Promotion Description",
        },
        {
            name: "Promotion Description",
        },
        {
            name: "Promotion Description",
        },
        {
            name: "Promotion Description",
        },
        {
            name: "Promotion Description",
        },
        {
            name: "Promotion Description",
        },
        {
            name: "Promotion Description",
        },
        {
            name: "Promotion Description",
        },
        {
            name: "Promotion Description",
        },
    ];

    const [toggle, setToggle] = useState(false);

    function handleToggle() {
        setToggle(!toggle);
    }

    return (
        <>
            <SideBar />

            <Box
                sx={{
                    display: "flex",

                    justifyContent: "flex-end",

                    padding: "5px 20px",
                }}
            >
                <ButtonGroup
                    variant="outlined"
                    aria-label="Basic button group"
                    sx={{}}
                >
                    <Button
                        sx={{ overflow: "hidden" }}
                        variant={toggle ? "contained" : "outlined"}
                        onClick={handleToggle}
                        color="secondary"
                    >
                        <ViewListIcon color="#FFF" />
                    </Button>

                    <Button
                        sx={{ overflow: "hidden" }}
                        variant={!toggle ? "contained" : "outlined"}
                        onClick={handleToggle}
                        color="secondary"
                    >
                        <WindowIcon color="#FFF" />
                    </Button>
                </ButtonGroup>
            </Box>

            {!toggle ? (
                <Container>
                    <Grid
                        container
                        spacing={2}
                        justifyContent="center"
                        alignItems="center"
                        style={{ margin: "1rem 0", width: "100%" }}
                        sx={{ "& > .MuiGrid-item": { paddingLeft: 0 } }}
                    >
                        {CardDetailts.map((data) => (
                            <Grid item xs={12} sm={6} md={3} key={data.name}>
                                <CardTemplate CardName={data} />
                            </Grid>
                        ))}
                    </Grid>
                </Container>
            ) : (
                <CampaignsTable />
            )}
        </>
    );
};

export default CreateTemplate;
