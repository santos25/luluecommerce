import React from "react";
import { Link as RouterLink } from "react-router-dom";
import { auth } from "../../FireBase/FireBaseUtil";
import { connect } from "react-redux";

//selectors
import { currentUserSelector } from "../../Redux/user/user-selectors";
import { hiddeCartSelector } from "../../Redux/Cart/cart-selectors";

//react-router
import { useHistory } from "react-router-dom";

//components
import CartIconComponent from "../Cart-Icon/car-icon.component";
import CartDropdown from "../Card-Dropdown/card-dropdown";

//material
import {
  Search as SearchIcon,
  AccountCircle,
  Menu as MenuIcon,
  Notifications as NotificationsIcon,
  Mail as MailIcon,
  More as MoreIcon,
  Person as PersonIcon,
  FavoriteBorder as FavoriteBorderIcon,
  LocalMall as LocalMallIcon,
} from "@material-ui/icons";

import { fade } from "@material-ui/core/styles";

import {
  AppBar,
  Toolbar,
  Link,
  makeStyles,
  Button,
  Menu,
  InputBase,
  Typography,
  IconButton,
  MenuItem,
  Badge,
  // Badge,
  // Box
} from "@material-ui/core";

import UseStyles from "./Styles";

const Nav = ({ currentUser, hidden }) => {
  // console.log({ currentUser, hidden });
  const classes = UseStyles();
  const history = useHistory();
  // const [anchorEl, setAnchorEl] = React.useState(null);
  // const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);

  // const isMenuOpen = Boolean(anchorEl);
  // const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  // const handleProfileMenuOpen = (event) => {
  //   setAnchorEl(event.currentTarget);
  // };

  // const handleMobileMenuClose = () => {
  //   setMobileMoreAnchorEl(null);
  // };

  // const handleMenuClose = () => {
  //   setAnchorEl(null);
  //   handleMobileMenuClose();
  // };

  // const handleMobileMenuOpen = (event) => {
  //   setMobileMoreAnchorEl(event.currentTarget);
  // };

  // const menuId = "primary-search-account-menu";
  // const renderMenu = (
  //   <Menu
  //     anchorEl={anchorEl}
  //     anchorOrigin={{ vertical: "top", horizontal: "right" }}
  //     id={menuId}
  //     keepMounted
  //     transformOrigin={{ vertical: "top", horizontal: "right" }}
  //     open={isMenuOpen}
  //     onClose={handleMenuClose}
  //   >
  //     <MenuItem onClick={handleMenuClose}>Profile</MenuItem>
  //     <MenuItem onClick={handleMenuClose}>My account</MenuItem>
  //   </Menu>
  // );

  // const mobileMenuId = "primary-search-account-menu-mobile";
  // const renderMobileMenu = (
  //   <Menu
  //     anchorEl={mobileMoreAnchorEl}
  //     anchorOrigin={{ vertical: "top", horizontal: "right" }}
  //     id={mobileMenuId}
  //     keepMounted
  //     transformOrigin={{ vertical: "top", horizontal: "right" }}
  //     open={isMobileMenuOpen}
  //     onClose={handleMobileMenuClose}
  //   >
  //     <MenuItem>
  //       <IconButton aria-label="show 4 new mails" color="inherit">
  //         <Badge badgeContent={4} color="secondary">
  //           <MailIcon />
  //         </Badge>
  //       </IconButton>
  //       <p>Messages</p>
  //     </MenuItem>
  //     <MenuItem>
  //       <IconButton aria-label="show 11 new notifications" color="inherit">
  //         <Badge badgeContent={11} color="secondary">
  //           <NotificationsIcon />
  //         </Badge>
  //       </IconButton>
  //       <p>Notifications</p>
  //     </MenuItem>
  //     <MenuItem onClick={handleProfileMenuOpen}>
  //       <IconButton
  //         aria-label="account of current user"
  //         aria-controls="primary-search-account-menu"
  //         aria-haspopup="true"
  //         color="inherit"
  //       >
  //         <AccountCircle />
  //       </IconButton>
  //       <p>Profile</p>
  //     </MenuItem>
  //   </Menu>
  // );

  return (
    <div className={classes.grow}>
      <AppBar position="fixed" color="primary">
        <Toolbar>
          <IconButton
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="open drawer"
          >
            <MenuIcon />
          </IconButton>
          <Typography
            component={RouterLink}
            to="/mujer"
            className={classes.title}
            variant="h6"
            noWrap
          >
            LULU
          </Typography>

          <div className={classes.grow} />

          <div className={classes.sectionMobile}>
            <IconButton aria-label="show 4 new mails" color="inherit">
              <SearchIcon />
            </IconButton>
            <IconButton aria-label="show 4 new mails" color="inherit">
              <PersonIcon />
            </IconButton>
            <IconButton aria-label="show 4 new mails" color="inherit">
              <FavoriteBorderIcon />
            </IconButton>
            <IconButton
              onClick={() => history.push("/checkout")}
              aria-label="show 4 new mails"
              color="inherit"
            >
              <LocalMallIcon />
            </IconButton>
            {/* <IconButton
              aria-label="show more"
              aria-controls={mobileMenuId}
              aria-haspopup="true"
              onClick={handleMobileMenuOpen}
              color="inherit"
            >
              <MoreIcon />
            </IconButton> */}
          </div>
        </Toolbar>
      </AppBar>
      {/* {renderMobileMenu} */}
      {/* {renderMenu} */}
    </div>
  );
};

const mapStatetoProps = (state) => ({
  currentUser: currentUserSelector(state),
  hidden: hiddeCartSelector(state),
});

export default connect(mapStatetoProps)(Nav);
