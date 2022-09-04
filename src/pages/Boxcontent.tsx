import { Box } from "@mui/material"
import Grid from "@mui/material/Grid"
import Typography from "@mui/material/Typography"
import { Container } from "react-bootstrap"

import bgImage from "../../src/assets/image/pexels-albin-berlin-919073.jpg"

export function BoxContent() {
    return <Box minHeight="75vh"
        width="100%"
        sx={{
            backgroundImage: `url(${bgImage})`,
            backgroundSize: "cover",
            backgroundPosition: "top",
            display: "grid",
            placeItems: "center",
        }}>
        <Container>
            <Grid container item xs={12} lg={7} justifyContent="center" mx="auto">
                <Typography
                    variant="h1"
                    color="white"
                    textAlign="center"
                    fontFamily="roboto"
                >
                    Ligo Protocol{" "}
                </Typography>
                <Typography
                    variant="h5"
                    color="white"
                    textAlign="center"
                    fontFamily="roboto"
                    px={{ xs: 6, lg: 12 }}
                    mt={1}
                >
                    Your blockchain powered Car sharing platform.
                </Typography>
            </Grid>

        </Container>
    </Box>
}
