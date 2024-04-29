import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { useEffect, useState } from 'react';
import ThemeProvider from '@mui/material/styles/ThemeProvider';
import { BasicUserInfo, useAuthContext } from "@asgardeo/auth-react";
import CircularProgress from '@mui/material/CircularProgress/CircularProgress';
import { Avatar, Grid, IconButton, ListItemIcon, ListItemText, Menu, MenuItem, Tooltip } from '@mui/material';
import LogoutIcon from '@mui/icons-material/Logout';
import Dashboard from './components/Dashboard';
import axios from 'axios';
import { theme } from './lib/Theme';

axios.defaults.baseURL = (window as any).configs.apiUrl;

export default function App() {

  const {
    signIn,
    signOut,
    getAccessToken,
    isAuthenticated,
    getIDToken,
    getBasicUserInfo,
    state,
  } = useAuthContext();
  const [isAuthLoading, setIsAuthLoading] = useState(false);
  const [signedIn, setSignedIn] = useState(false);
  const [user, setUser] = useState<BasicUserInfo | null>(null);
  const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));



  const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);


  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };


  useEffect(() => {
    async function signInCheck() {
      setIsAuthLoading(true);
      await sleep(2000);
      const isSignedIn = await isAuthenticated();
      setSignedIn(isSignedIn);
      setIsAuthLoading(false);
      return isSignedIn;
    }
    signInCheck().then((res) => {
      if (res) {
        getUser();
      } else {
        handleSignIn();
        console.log("User has not signed in");
      }
    });
  }, []);

  const handleSignIn = async () => {
    signIn()
      .then(() => {
        setSignedIn(true);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const handleSignOut = async () => {
    signOut()
      .then(() => {
        setSignedIn(false);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  async function getUser() {
    //setIsLoading(true);
    const userResponse = await getBasicUserInfo();
    const accessToken = await getAccessToken();
    const idToken = await getIDToken();
    axios.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;
    console.log(accessToken)
    console.log(idToken)
    console.log(userResponse)
    setUser(userResponse);
    //setIsLoading(false);
  }

  if (isAuthLoading || !signedIn) {
    return (
      <Grid container sx={{justifyContent:'center'}}>
        <Box sx={{ display: 'flex' }}>
          <CircularProgress />
        </Box>
      </Grid>)
  }


  return (
    <ThemeProvider theme={theme} >
      <CssBaseline />
      <Box sx={{ height: '100vh', overflowY: 'scroll' }}>
        <Box>
          <CssBaseline />
          <AppBar component="nav">
            <Toolbar>
              <Typography
                variant="h6"
                component="div"
                sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' } }}
              >
                Momentum Maker
              </Typography>
              <Box sx={{ flexGrow: 0 }}>
                <Tooltip title="Open settings">
                  <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                    <Avatar alt={user?.displayName} src={user?.picture} />
                  </IconButton>
                </Tooltip>
                <Menu
                  sx={{ mt: '45px' }}
                  id="menu-appbar"
                  anchorEl={anchorElUser}
                  anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                  }}
                  open={Boolean(anchorElUser)}
                  onClose={handleCloseUserMenu}
                >

                  <MenuItem onClick={handleSignOut}>
                    <ListItemIcon>
                      <LogoutIcon fontSize="small" />
                    </ListItemIcon>
                    <ListItemText>Logout</ListItemText>
                  </MenuItem>
                </Menu>
              </Box>
            </Toolbar>
          </AppBar>
          <Container maxWidth="lg">
            <Box sx={{ pt: '5rem' }} >
            <Dashboard></Dashboard>
            </Box>
          </Container>
        </Box>
      </Box>
    </ThemeProvider>
  );
}
