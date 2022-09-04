import { Container } from "react-bootstrap"
import ResponsiveAppBar from "./Navbar/Navbar"
import { Box } from "@mui/material"
import Grid from "@mui/material/Grid"
import Typography from "@mui/material/Typography"
import CustomizedTimeline from "./Information"
import { Button } from "@mui/material"

import bgImage from "../../src/assets/image/pexels-albin-berlin-919073.jpg"

export function Home(){
    return(
        <>
            <ResponsiveAppBar/>
            <Box minHeight="75vh"
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
            <CustomizedTimeline/>
            <div style={{display: 'flex',  justifyContent:'center', alignItems:'center', height: '10vh'}}>
            <Button variant="contained" color='success'>Get Started</Button>
            </div>
        </>
    )
}