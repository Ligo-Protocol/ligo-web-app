import { Box } from "@mui/material"
import Grid from "@mui/material/Grid"
import Typography from "@mui/material/Typography"
import { Container } from "react-bootstrap"
import { Button } from "@mui/material"
import { createTheme, ThemeProvider } from '@mui/material/styles'
const theme = createTheme({
    palette: {
        primary: {
            // light: will be calculated from palette.primary.main,
            main: '#3FC1C9',
            // dark: will be calculated from palette.primary.main,
            // contrastText: will be calculated to contrast with palette.primary.main
        },
        secondary: {
            main: '#FC5185',
            // dark: will be calculated from palette.secondary.main,
        },
    },
});

export function BoxContent({ logged }) {
    return <Box minHeight="95vh"
        width="100%"
        sx={{
            //backgroundImage: `url(${bgImage})`,
            background: '#364F6B',
            backgroundSize: "cover",
            backgroundPosition: "top",
            display: "grid",
            placeItems: "center",
        }}>
        <Container>
            <Grid container spacing={2} justifyContent="left" mx="auto">
                <Grid item xs={12}>
                    <Typography
                        variant="h1"
                        color="#3FC1C9"
                        textAlign="left"
                        fontFamily="Rockwell"
                    >
                        Ligo Protocol{" "}
                    </Typography>
                </Grid>
                <Grid item xs={12}>
                    <Typography
                        variant="h6"
                        color="#3FC1C9"
                        textAlign="left"
                        fontFamily="Rockwell"
                    >
                        Your Blockchain Powered Car Sharing Platform.
                    </Typography>
                </Grid>
                <ThemeProvider theme={theme}>
                    <Grid item xs={0}>
                        <Button
                            variant="outlined"
                            color="primary"
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
                            variant="outlined"
                            color="primary"
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
                </ThemeProvider>
            </Grid>

        </Container>
    </Box>
}
