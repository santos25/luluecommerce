import React, { useState } from "react";
import { Link as RouterLink } from "react-router-dom";
import { auth } from "../../FireBase/FireBaseUtil";
import { connect } from "react-redux";

//selectors
import { currentUserSelector } from "../../Redux/user/user-selectors";
import { hiddeCartSelector } from "../../Redux/Cart/cart-selectors";

//react-router
import { useHistory } from "react-router-dom";

//components
import CartIconComponent from "../Cart-Icon/Cart-icon.component";
import Drawer from "../Drawer/Drawer";
// import CartDropdown from "../Card-Dropdown/card-dropdown";

//material
import {
  Search as SearchIcon,
  // AccountCircle,
  Menu as MenuIcon,
  // Notifications as NotificationsIcon,
  // Mail as MailIcon,
  // More as MoreIcon,
  Person as PersonIcon,
  FavoriteBorder as FavoriteBorderIcon,
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
  SwipeableDrawer,
} from "@material-ui/core";

import UseStyles from "./Styles";

const Nav = ({ currentUser, hidden }) => {
  const [drawerState, setDrawerState] = React.useState({
    left: false,
  });

  const classes = UseStyles();
  const history = useHistory();

  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event &&
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setDrawerState({ ...drawerState, [anchor]: open });
  };

  return (
    <div className={classes.grow}>
      <AppBar position="fixed" color="primary">
        <Toolbar>
          <IconButton
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="open drawer"
            onClick={toggleDrawer("left", true)}
          >
            <MenuIcon />
          </IconButton>
          <SwipeableDrawer
            anchor="left"
            open={drawerState.left}
            onClose={toggleDrawer("left", false)}
            onOpen={toggleDrawer("left", true)}
          >
            {<Drawer anchor="left" toggleDrawer={toggleDrawer} />}
          </SwipeableDrawer>
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
            <CartIconComponent />
          </div>
        </Toolbar>
      </AppBar>
    </div>
  );
};

const mapStatetoProps = (state) => ({
  currentUser: currentUserSelector(state),
  hidden: hiddeCartSelector(state),
});

export default connect(mapStatetoProps)(Nav);
