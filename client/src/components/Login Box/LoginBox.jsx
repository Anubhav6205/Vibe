import { Dialog, Box, Typography, Button, Grid, TextField, createTheme, ThemeProvider } from "@mui/material";
import { qrImage } from "../../constants/data";
import { GoogleLogin } from "@react-oauth/google";
import jwt_decode from "jwt-decode";
import { useContext } from "react";
import { AccountContext } from "../../context/AccountProvider";
import styled from "@emotion/styled";
import { addUser } from "../../api/api";

// Define a custom theme with purple button color
const theme = createTheme({
  palette: {
    primary: {
      main: "#32349C",
    },
  },
});

export default function LoginBox() {
  const { setAccount } = useContext(AccountContext);

  const handleSuccess = async (res) => {
    const credential = res.credential;
    const decoded = jwt_decode(credential);
    setAccount(decoded);

    // An API is called here, so use async
    await addUser(decoded);
  };

  const handleError = (res) => {
    console.log(res);
    // console.log("Error");
  };

  const AppTitle = styled(Typography)`
  font-family: 'Shadows Into Light', cursive;
  `;

  return (
    <ThemeProvider theme={theme}>
      <Dialog open={true} maxWidth="xs">
        <Box p={4}>
          <AppTitle variant="h4" align="center" mb={4}>
            Vibe
          </AppTitle>
          <Grid container spacing={2} alignItems="center">
            <Grid item xs={12}>
              <TextField
                label="Email"
                variant="outlined"
                fullWidth
                size="small"
                InputProps={{
                  sx: {
                    borderBottom: "1px solid #000",
                  },
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Password"
                variant="outlined"
                fullWidth
                size="small"
                type="password"
                InputProps={{
                  sx: {
                    borderBottom: "1px solid #000",
                  },
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <Button variant="contained" color="primary" fullWidth>
                Sign In
              </Button>
            </Grid>
            <Grid item xs={12} textAlign="center">
              <Typography variant="body2">
                Don't have an account? <a href="#">Sign Up</a>
              </Typography>
            </Grid>
            <Grid item xs={12} textAlign="center">
              <Typography variant="body2">Or sign in with:</Typography>
            </Grid>
            <Grid item xs={12}>
              <Box display="flex" justifyContent="center">
                <GoogleLogin
                  onSuccess={handleSuccess}
                  onError={handleError}
                  render={({ onClick }) => (
                    <Button variant="contained" fullWidth onClick={onClick}>
                      Sign in with Google
                    </Button>
                  )}
                />
              </Box>
            </Grid>
          </Grid>
          <Box mt={4} textAlign="center">
            <img src="../../../../public/qr-code.png" alt="QR Code" style={{ height: "10rem" }} />
            <Typography variant="body2" mt={2}>
              Scan to open my Github profile
            </Typography>
          </Box>
        </Box>
      </Dialog>
    </ThemeProvider>
  );
}
