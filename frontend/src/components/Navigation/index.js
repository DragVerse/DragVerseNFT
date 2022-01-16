import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Badge from '@mui/material/Badge';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import Avatar from '@mui/material/Avatar';
import MenuItem from '@mui/material/MenuItem';
import NotificationsIcon from '@mui/icons-material/Notifications';
import AccountCircle from '@mui/icons-material/AccountCircle';
import { withFirebase } from '../Firebase';
import avatar from "../../assets/avatar.png";
import logo from "../../assets/dragverse-logo.png";
import { DragVerseTheme } from '../../styles';
const settings = ['Profile', 'Account', 'Dashboard', 'Logout'];

const NavBar = ({firebase}) => {
  const [notificationNumber, setNotificationNumber] = React.useState(0);
  const [avatarUrl, setAvatarUrl] = React.useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  React.useEffect(() => {
    const currentUser = firebase.currentUser;
    setAvatarUrl(currentUser?.avatarUrl)
  }, [firebase.currentUser]);

  const mobileMenuId = 'primary-search-account-menu-mobile';
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      <MenuItem>
        <IconButton
          aria-label="show 17 new notifications"
          color="inherit"
        >
          <Badge badgeContent={notificationNumber} color="error">
            <NotificationsIcon />
          </Badge>
        </IconButton>
        <p>Notifications</p>
      </MenuItem>
      <MenuItem onClick={handleProfileMenuOpen}>
        <IconButton
          aria-label="account of current user"
          aria-controls="primary-search-account-menu"
          aria-haspopup="true"
          color="inherit"
        >
          <AccountCircle />
        </IconButton>
        <p>Profile</p>
      </MenuItem>
    </Menu>
  );

  return (
    <Box style={{width: '100%'}}>
      <AppBar style={{...DragVerseTheme, minHeight: '80px'}} position="fixed">
        <Toolbar style={{width: '100%'}} disableGutters>
        <Box style={{textAlign: 'left'}}>
            <IconButton size="large" onClick={handleOpenUserMenu}>
              <Avatar style={{maxHeight: '40px', cursor: 'pointer', zIndex: '200'}} src={avatarUrl ?? avatar}></Avatar>
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {settings.map((setting) => (
                <MenuItem key={setting} onClick={handleCloseNavMenu}>
                  <Typography>{setting}</Typography>
                </MenuItem>
              ))}
            </Menu>
        </Box>
        <Box sx={{ textAlign: 'center', flexGrow: 2 }}>
          <img style={{maxHeight: '60px'}} src={logo}></img>
        </Box>
        <Box sx={{ textAlign: 'right', flexGrow: 0, position: 'relative'}}>
            <IconButton
              style={{color: 'white'}}
              aria-label="show more"
              aria-controls={mobileMenuId}
              aria-haspopup="true"
              onClick={handleMobileMenuOpen}
              color="inherit"
            >
              Menu
            </IconButton>
        </Box>
        {renderMobileMenu}
        </Toolbar>
      </AppBar>
    </Box>
  );
}

export default withFirebase(NavBar);
