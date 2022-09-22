import { Box } from "@mui/material"
import Grid from "@mui/material/Grid"
import Typography from "@mui/material/Typography"
import { Container } from "react-bootstrap"
import { Button } from "@mui/material";

import bgImage from "../../src/assets/image/automobile-gd3b510a1c_1920.jpg"

export function BoxContent({logged}) {
    return <Box minHeight="95vh"
        width="100%"
        sx={{
            backgroundImage: `url(${bgImage})`,
            backgroundSize: "cover",
            backgroundPosition: "top",
            display: "grid",
            placeItems: "center",
        }}>
        <Container>
            <Grid container spacing={2} justifyContent="center" mx="auto">
            <Grid item xs={12}>
                <Typography
                    variant="h1"
                    color="white"
                    textAlign="center"
                    fontFamily="calibri"
                >
                    Ligo Protocol{" "}
                </Typography>
            </Grid>
            <Grid item xs={12}>
                <Typography
                    variant="h5"
                    color="white"
                    textAlign="center"
                    fontFamily="calibri"
                >
                    Your blockchain powered Car sharing platform.
                </Typography>
                </Grid>
                <Grid item xs={0}>
                    <Button 
                        variant="contained" 
                        color="success" 
                        onClick={logged}
                        sx={{
                            margin: "15px"
                        }}
                    >
                        Get Started
                    </Button>
                </Grid>
                <Grid item xs={0}>
                    <Button 
                        variant="contained" 
                        rel="noopener noreferrer" 
                        href="https://ligo.dev/docs" 
                        target="_blank"
                        sx={{
                            margin: "15px"
                        }}
                    >
                        Read the Docs
                    </Button>
                    </Grid>
            </Grid>

        </Container>
    </Box>
}
