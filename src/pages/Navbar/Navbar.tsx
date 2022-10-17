import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { ReactComponent as Logo } from "../../assets/image/image2vector.svg"; ///Users/satheeshkumarb/Downloads/ligo/ligo-web-app/src/assets/image/image2vector.svg
import Divider from '@mui/material/Divider';
// import AdbIcon from '@mui/icons-material/Adb';
// import styles from  '../../assets/css/pages/Navbar/Navbar.module.css';
// import { Link } from 'react-router-dom';
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
const ResponsiveAppBar = ({ logged, isLogged }) => {


  return (
    <>

      <AppBar position="static" style={{ background: '#F5F5F5' }}>
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            {/* <AdbIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} /> */}
            <Logo height={50} width={50} />
            <Typography
              variant="h6"
              noWrap
              component="a"
              href="/"
              sx={{
                mr: 2,
                display: { xs: 'none', md: 'flex' },
                fontFamily: 'Rockwell',
                fontWeight: 700,
                color: '#3FC1C9',
                textDecoration: 'none',
                width: "50vh"
              }}
            >
              Ligo Protocol
            </Typography>
            <ThemeProvider theme={theme}>
              <Typography
                variant="subtitle1"
                noWrap
                component="a"
                href="/"
                align='center'
                sx={{
                  mr: 2,
                  display: { xs: 'none', md: 'flex' },
                  fontFamily: 'Rockwell',
                  fontWeight: 100,
                  textDecoration: 'none',
                  color: '#3FC1C9',
                }}
              >
                Available Cities
              </Typography>
              <Typography
                variant="subtitle1"
                noWrap
                component="a"
                href="/"
                align='center'
                sx={{
                  mr: 2,
                  display: { xs: 'none', md: 'flex' },
                  fontFamily: 'Rockwell',
                  fontWeight: 100,
                  textDecoration: 'none',
                  color: '#3FC1C9',
                }}
              >
                Experiences
              </Typography>
              <Typography
                variant="subtitle1"
                noWrap
                component="a"
                href="/Information"
                align='center'
                sx={{
                  mr: 2,
                  display: { xs: 'none', md: 'flex' },
                  fontFamily: 'Rockwell',
                  fontWeight: 100,
                  textDecoration: 'none',
                  color: '#3FC1C9',
                }}
              >
                About Us
              </Typography>
              <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' }, justifyContent: 'right', alignItems: 'right' }}>
                {!isLogged ?
                  <>

                    <Button variant="outlined" color="primary" onClick={logged}>Login</Button>
                  </> :
                  <>
                    {/* <Link className={styles.link} to="openmarket"><Button style={{ background: '#2E3B55' }}>Open marketplace</Button></Link> */}
                    <Button variant="contained" color="secondary" onClick={logged}>Logout</Button>
                  </>
                }
              </Box>
            </ThemeProvider>

          </Toolbar>
        </Container>
      </AppBar>
    </>
  );
};
export default ResponsiveAppBar;
