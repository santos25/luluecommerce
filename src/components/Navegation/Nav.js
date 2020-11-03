import React from "react";
import { Link as RouterLink } from "react-router-dom";
import { auth } from "../../FireBase/FireBaseUtil";
import { connect } from "react-redux";
import { currentUserSelector } from "../../Redux/user/user-selectors";
import { hiddeCartSelector } from "../../Redux/Cart/cart-selectors";

import CartIconComponent from "../Cart-Icon/car-icon.component";
import CartDropdown from "../Card-Dropdown/card-dropdown";

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

// import logo from "./lulu.png";
const useStyle = makeStyles((theme) => ({
  grow: {
    flexGrow: 1,
    // marginLeft: theme.spacing(7),
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    display: "block",

    [theme.breakpoints.down("sm")]: {
      display: "block",
      fontSize: theme.spacing(3.5),
      color: theme.palette.common.white,
      textDecoration: "none",
    },
  },
  // search: {
  //   position: "relative",
  //   borderRadius: theme.shape.borderRadius,
  //   backgroundColor: fade(theme.palette.common.white, 0.15),
  //   "&:hover": {
  //     backgroundColor: fade(theme.palette.common.white, 0.25),
  //   },
  //   marginRight: theme.spacing(2),
  //   marginLeft: 0,
  //   width: "100%",
  //   [theme.breakpoints.up("sm")]: {
  //     marginLeft: theme.spacing(3),
  //     width: "auto",
  //   },
  // },
  // searchIcon: {
  //   padding: theme.spacing(0, 2),
  //   height: "100%",
  //   position: "absolute",
  //   pointerEvents: "none",
  //   display: "flex",
  //   alignItems: "center",
  //   justifyContent: "center",
  // },
  // inputRoot: {
  //   color: "inherit",
  // },
  // inputInput: {
  //   padding: theme.spacing(1, 1, 1, 0),
  //   // vertical padding + font size from searchIcon
  //   paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
  //   transition: theme.transitions.create("width"),
  //   width: "100%",
  //   [theme.breakpoints.up("md")]: {
  //     width: "20ch",
  //   },
  // },
  sectionDesktop: {
    display: "none",
    [theme.breakpoints.up("md")]: {
      display: "flex",
    },
  },
  sectionMobile: {
    display: "flex",
    [theme.breakpoints.up("md")]: {
      display: "none",
    },
  },
}));

const Nav = ({ currentUser, hidden }) => {
  // console.log({ currentUser, hidden });
  const classes = useStyle();
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
          {/* <div className={classes.search}>
            <div className={classes.searchIcon}>
              <SearchIcon />
            </div>
            <InputBase
              placeholder="Search…"
              classes={{
                root: classes.inputRoot,
                input: classes.inputInput,
              }}
              inputProps={{ "aria-label": "search" }}
            />
          </div> */}
          <div className={classes.grow} />
          {/* <div className={classes.sectionDesktop}>
            <IconButton aria-label="show 4 new mails" color="inherit">
              <Badge badgeContent={4} color="secondary">
                <MailIcon />
              </Badge>
            </IconButton>
            <IconButton aria-label="show 17 new notifications" color="inherit">
              <Badge badgeContent={17} color="secondary">
                <NotificationsIcon />
              </Badge>
            </IconButton>
            <IconButton
              edge="end"
              aria-label="account of current user"
              aria-controls={menuId}
              aria-haspopup="true"
              onClick={handleProfileMenuOpen}
              color="inherit"
            >
              <AccountCircle />
            </IconButton>
          </div> */}
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
            <IconButton aria-label="show 4 new mails" color="inherit">
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
