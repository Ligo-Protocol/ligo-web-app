import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
// import AdbIcon from '@mui/icons-material/Adb';
// import styles from  '../../assets/css/pages/Navbar/Navbar.module.css';
// import { Link } from 'react-router-dom';

const ResponsiveAppBar = ({logged,isLogged}) => {


  return (
    <>
    
    <AppBar position="static" style={{ background: 'black' }}>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
               {/* <AdbIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} /> */}
                <Typography
                  variant="h6"
                  noWrap
                  component="a"
                  href="/"
                  sx={{
                    mr: 2,
                    display: { xs: 'none', md: 'flex' },
                    fontFamily: 'calibri',
                    fontWeight: 700,
                    color: 'inherit',
                    textDecoration: 'none',
                    width: "50vh"
                  }}
                >
                  LIGO PROTOCOL
                </Typography>
                  <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' },justifyContent:'right', alignItems:'right' }}>
                    {!isLogged?
                    <>
          
                              <Button variant="contained" color="success" onClick={logged}>Login</Button>
                    </>:
                    <>
                    {/* <Link className={styles.link} to="openmarket"><Button style={{ background: '#2E3B55' }}>Open marketplace</Button></Link> */}
                    <Button variant="contained" color="error" onClick={logged}>Logout</Button>
                    </>
                      }         
                  </Box>
        </Toolbar>
      </Container>
    </AppBar>
    </>
  );
};
export default ResponsiveAppBar;
