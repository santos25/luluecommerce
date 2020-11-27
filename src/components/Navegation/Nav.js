import React, { useState } from "react";

// import { auth } from "../../FireBase/FireBaseUtil";

import { connect } from "react-redux";

//selectors
import { currentUserSelector } from "../../Redux/user/user-selectors";
import { hiddeCartSelector } from "../../Redux/Cart/cart-selectors";
import { categoriesSelector } from "../../Redux/shop/shop.selectors";

//react-router
import { useHistory, Link as RouterLink } from "react-router-dom";

//components
import CartIconComponent from "../Cart-Icon/Cart-icon.component";
import Drawer from "../Drawer/Drawer";
import FavoriteIcon from "../Favorite-Icon/FavoriteIcon";
import NavItem from "./NavItem/NavItem";
import DropdownMenu from "./DropdownMenu/DropdownMenu";
import PopoverComponent from "../PopOverComponent/PopoverComponent";
import CartDropdown from "../Card-Dropdown/card-dropdown";

//material
import {
  Search as SearchIcon,
  Menu as MenuIcon,
  Person as PersonIcon,
} from "@material-ui/icons";

import {
  AppBar,
  Toolbar,
  makeStyles,
  Button,
  Menu,
  Typography,
  IconButton,
  MenuItem,
  SwipeableDrawer,
  Box,
  InputBase,
  ClickAwayListener,
} from "@material-ui/core";

import { useTheme } from "@material-ui/core/styles";
import useMediaQuery from "@material-ui/core/useMediaQuery";

//images
import TitleImage from "../../assets/images/title.png";
import UseStyles from "./Styles";
import PopoverUser from "./PopoverUser/PopoverUser";

const Nav = ({ currentUser, hidden, categories }) => {
  const [drawerState, setDrawerState] = useState({
    left: false,
  });

  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.down("xs"));

  const classes = UseStyles();
  const history = useHistory();

  const toggleDrawer = (anchor, open) => (event) => {
    console.log("toggleDrawer");
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
      <AppBar
        style={{
          maxHeight: "64px",
        }}
        position="fixed"
        color="primary"
      >
        <Toolbar>
          <div className={classes.sectionMobile}>
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
          </div>

          <RouterLink style={{ textDecoration: "none" }} to="/mujer">
            <img className={classes.title} src={TitleImage} alt="Title" />
          </RouterLink>

          {matches && <div className={classes.grow} />}

          <div className={classes.sectionDesktop}>
            <Box
              display="flex"
              alignItems="center"
              justifyContent="center"
              ml={8}
              // borderRight={1}
              borderColor="grey.300"
              // py={1}
              // px={2}
            >
              <ul className={classes.navBarItem}>
                <NavItem
                  renderElement={(handlePopoverOpen) => (
                    <Typography
                      onMouseEnter={handlePopoverOpen}
                      className={classes.genre}
                      variant="body1"
                    >
                      MUJER
                    </Typography>
                  )}
                >
                  <DropdownMenu datas={categories}></DropdownMenu>
                </NavItem>
              </ul>
            </Box>

            <Box flexGrow={1}>
              <div className={classes.search}>
                <div className={classes.searchIcon}>
                  <SearchIcon />
                </div>
                <InputBase
                  placeholder="Buscar…"
                  classes={{
                    root: classes.inputRoot,
                    input: classes.inputInput,
                  }}
                  inputProps={{ "aria-label": "buscar" }}
                />
              </div>
            </Box>
          </div>
          {matches && (
            <IconButton aria-label="show 4 new mails" color="inherit">
              <SearchIcon />
            </IconButton>
          )}
          <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            mr={4}
          >
            {/* <ul className={classes.navBarItem}> */}
            <NavItem
              renderElement={(handlePopoverOpen) => (
                <IconButton
                  onMouseEnter={handlePopoverOpen}
                  onClick={() => history.push("/identity")}
                  aria-label="user"
                  color="inherit"
                >
                  <PersonIcon />
                </IconButton>
              )}
            >
              <Box className={classes.popoverUserDesktop}>
                <PopoverComponent height="40px">
                  <PopoverUser currentUser={currentUser} />
                </PopoverComponent>
              </Box>
            </NavItem>
            <NavItem
              renderElement={(handlePopoverOpen) => (
                <IconButton
                  // onMouseEnter={handlePopoverOpen}
                  // onClick={() => history.push("/identity")}
                  aria-label="user"
                  color="inherit"
                >
                  <FavoriteIcon />
                </IconButton>
              )}
            ></NavItem>
            <NavItem
              renderElement={(handlePopoverOpen) => (
                <IconButton
                  onMouseEnter={handlePopoverOpen}
                  onClick={() => history.push("/checkout")}
                  aria-label="user"
                  color="inherit"
                >
                  <CartIconComponent />
                </IconButton>
              )}
            >
              <Box className={classes.popoverUserDesktop}>
                <PopoverComponent
                  height="auto"
                  maxHeight="420px"
                  padding="0"
                  transform="translateX(-63%)"
                >
                  <CartDropdown />
                </PopoverComponent>
              </Box>
            </NavItem>
            {/* </ul> */}
          </Box>
        </Toolbar>
      </AppBar>
    </div>
  );
};

const mapStatetoProps = (state) => ({
  currentUser: currentUserSelector(state),
  hidden: hiddeCartSelector(state),
  categories: categoriesSelector()(state),
});

export default connect(mapStatetoProps)(Nav);
