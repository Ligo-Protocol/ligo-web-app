import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
// import AdbIcon from '@mui/icons-material/Adb';

const ResponsiveAppBar = () => {


  return (
    <AppBar position="static" style={{ background: '#2E3B55' }}>
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
                    fontFamily: 'roboto',
                    fontWeight: 700,
                    color: 'inherit',
                    textDecoration: 'none',
                    width: "50vh"
                  }}
                >
                  Ligo Protocol
                </Typography>
                  <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' },justifyContent:'right', alignItems:'right' }}>
                              <Button variant="contained">About</Button>
                              <Button variant="contained">Contact</Button>
                              <Button variant="contained" rel="noopener noreferrer" href="https://ligo-book.codyhatfield.me/" target="_blank">Docs</Button>
                              <Button variant="contained">Login</Button>
                  </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};
export default ResponsiveAppBar;
