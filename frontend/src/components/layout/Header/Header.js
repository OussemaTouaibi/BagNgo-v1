import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import useScrollTrigger from '@mui/material/useScrollTrigger';
import { makeStyles } from '@mui/styles';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import { useState } from 'react'
import BedroomParentIcon from '@mui/icons-material/BedroomParent';
import PointOfSaleIcon from '@mui/icons-material/PointOfSale';
import ListItemIcon from '@mui/material/ListItemIcon';
import Divider from '@mui/material/Divider';
import Logout from '@mui/icons-material/Logout';
import PersonIcon from '@mui/icons-material/Person';
import Login from '../../userAuth/Login/Login';
import Signup from '../../userAuth/Signup/Signup';


import { useDispatch, useSelector } from 'react-redux';
import { useAlert } from 'react-alert';

import { logout } from '../../../actions/userActions';

function ElevationScroll(props) {
  const { children } = props;
  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 0,

  });

  return React.cloneElement(children, {
    elevation: trigger ? 4 : 0,
  });
}

const useStyles = makeStyles(theme => ({
  toolbarMargin: {
    ...theme.mixins.Toolbar
  },
  tabContainer: {
 
  },
  tab: {

    textTransform: "none",
    marginRight:'3rem',
    display: 'flex'
      
  }
}))

const pages = ['Accueil', 'Expérience', 'Sérvices', 'Espace Privé'];


const Header = () => {

  const logoutHandler = () => {
    dispatch(logout());
    window.location.reload();
    alert.success('Logged out successfully.')
  }

  const alert = useAlert();
  const dispatch = useDispatch();

  const { user, loading } = useSelector(state => state.auth);



  const classes = useStyles();

  const [anchorEl, setAnchorEl] = useState(null);
  const [open, setOpen] =useState(false);



  const handleClick = (e) => {
    setAnchorEl(e.currentTarget)
    setOpen(true)
  }

  

  const handleClose = (e) => {
    setAnchorEl(null)
    setOpen(false)
  }

  const Click = (event) => {
    setAnchorElUser(event.currentTarget);
  };
  const Close = () => {
    setAnchorElUser(null);
  };

  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const Open = Boolean(anchorElUser);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };






  return (

    <React.Fragment>
   <ElevationScroll>
         <AppBar position="fixed" color="primary" >
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ mr: 2, display: { xs: 'none', md: 'flex' } }}
          >
            BAGNGO
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: 'block', md: 'none' },
              }}
            >
              {pages.map((page) => (
                <MenuItem key={page}  onClick={handleCloseNavMenu}>
                  <Typography  textAlign="center">{page}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}
          >
            BAGNGOO
          </Typography>
          <Box style={{marginLeft:"21rem"}} sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
          <Tabs className={classes.tabContainer}>
                <Tab style={{color:"#ffffff"}} className={classes.tab} label="Accueil" />
                <Tab style={{color:"#ffffff"}} className={classes.tab}  label="Expérience" />
                <Tab style={{color:"#ffffff"}} className={classes.tab}  label="Sérvices" />
                <Tab
                style={{color:"#ffffff"}}
                  aria-owns={anchorEl ? "simple-menu" : undefined}
                  aria-haspopup={anchorEl ? "true" : undefined}
                  className={classes.tab}
                  onClick={event => handleClick(event)} 
                  label="Espace Privé" />
                  
              </Tabs>
           
          </Box>

          <Box sx={{ flexGrow: 0 }}>
          <Tooltip title="Account settings">
          <IconButton
            onClick={Click}
            size="small"
            sx={{ ml: 2 }}
            aria-controls={Open ? 'account-menu' : undefined}
            aria-haspopup="true"
            aria-expanded={Open ? 'true' : undefined}
          >
            <Avatar sx={{ width: 32, height: 32 }}></Avatar>
          </IconButton>
        </Tooltip>
        <Menu
        anchorEl={anchorElUser}
        id="account-menu"
        open={Open}
        onClose={Close}
        
        PaperProps={{
          elevation: 0,
          sx: {
            overflow: 'visible',
            filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
            mt: 1.5,
            '& .MuiAvatar-root': {
              width: 32,
              height: 32,
              ml: -0.5,
              mr: 1,
            },
            '&:before': {
              content: '""',
              display: 'block',
              position: 'absolute',
              top: 0,
              right: 14,
              width: 10,
              height: 10,
              bgcolor: 'background.paper',
              transform: 'translateY(-50%) rotate(45deg)',
              zIndex: 0,
            },
          },
        }}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
     {user && user.role === 'user' && (
        <div>
        <MenuItem>
        <ListItemIcon>
        <PersonIcon  fontSize="small"/>
        </ListItemIcon>

        </MenuItem>
        <MenuItem onClick={logoutHandler}>
          <ListItemIcon >
            <Logout fontSize="small" />
          </ListItemIcon>
          Logout 
        </MenuItem>
        <Divider />
        </div>
        ) }

        <div>
        <MenuItem>
          <Avatar /> <Signup />
          </MenuItem>
          <MenuItem >
          <Avatar /> <Login />
        </MenuItem>
        </div>

      </Menu>
          </Box>
          <Menu id="simple-menu" anchorEl={anchorEl} open={open}
          onClose={handleClose}>
            <MenuItem onClick={handleClose}>Devenir un hote <BedroomParentIcon /> </MenuItem>
            <MenuItem onClick={handleClose}>Devenir un commerçant <PointOfSaleIcon /></MenuItem>

            </Menu>
        </Toolbar>
      </Container>
    </AppBar>
    </ElevationScroll>
    <div className={classes.toolbarMargin} />
    </React.Fragment>
  );
};
export default Header;
