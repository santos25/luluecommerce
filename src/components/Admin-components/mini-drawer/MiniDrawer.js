import React, { useState } from "react";
import clsx from "clsx";

//components
import NavAdmin from "../NavAdmin/NavAdmin.component";
import ProductHomePage from "../products/ProductHomePage.component";
import ListPrendasComponent from "../prendas/ListPrendas";
import UserHome from "../Users/UserHome";
// import OrderList from "../Orders/OrderList";

import {
  makeStyles,
  useTheme,
  CssBaseline,
  Drawer,
  IconButton,
  ListItem,
  ListItemText,
  Divider,
  ListItemIcon,
  List,
  Link,
} from "@material-ui/core";

import {
  ChevronLeft as ChevronLeftIcon,
  ChevronRight as ChevronRightIcon,
  Store as StoreIcon,
  Wc as WcIcon,
} from "@material-ui/icons";

import {
  BrowserRouter as Router,
  Link as RouterLink,
  Switch,
  Route,
} from "react-router-dom";

const drawerWidth = 200;

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: "nowrap",
  },
  drawerOpen: {
    width: drawerWidth,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerClose: {
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: "hidden",
    width: theme.spacing(7) + 1,
    [theme.breakpoints.up("sm")]: {
      width: theme.spacing(9) + 1,
    },
  },
  toolbar: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
}));
const MiniDrawer = () => {
  const classes = useStyles();
  const theme = useTheme();

  const [open, setOpen] = useState(true);

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const handleDrawerOpen = () => {
    setOpen(true);
  };
  return (
    <Router basename="/luluecommerce">
      <div className={classes.root}>
        <CssBaseline />
        <NavAdmin open={open} handleDrawerOpen={handleDrawerOpen} />

        <Drawer
          variant="permanent"
          className={clsx(classes.drawer, {
            [classes.drawerOpen]: open,
            [classes.drawerClose]: !open,
          })}
          classes={{
            paper: clsx({
              [classes.drawerOpen]: open,
              [classes.drawerClose]: !open,
            }),
          }}
        >
          <div className={classes.toolbar}>
            <IconButton onClick={handleDrawerClose}>
              {theme.direction === "rtl" ? (
                <ChevronRightIcon />
              ) : (
                <ChevronLeftIcon />
              )}
            </IconButton>
          </div>
          <Divider />
          <List>
            <Link component={RouterLink} to="/producto">
              <ListItem button>
                <ListItemIcon>
                  <StoreIcon />
                </ListItemIcon>
                <ListItemText primary="Productos" />
              </ListItem>
            </Link>
            <Link component={RouterLink} to="/prendas">
              <ListItem button>
                <ListItemIcon>
                  <WcIcon />
                </ListItemIcon>
                <ListItemText primary="Prendas" />
              </ListItem>
            </Link>
            <Link component={RouterLink} to="/users">
              <ListItem button>
                <ListItemIcon>
                  <WcIcon />
                </ListItemIcon>
                <ListItemText primary="Clientes" />
              </ListItem>
            </Link>
            {/* <Link component={RouterLink} to="/orders">
              <ListItem button>
                <ListItemIcon>
                  <WcIcon />
                </ListItemIcon>
                <ListItemText primary="Compras" />
              </ListItem>
            </Link> */}
          </List>
        </Drawer>

        <main className={classes.content}>
          {/* <div className={classes.toolbar} /> */}
          <Switch>
            <Route exact path="/">
              Bienvenidos Panel de administracion
            </Route>
            <Route path="/producto">
              <ProductHomePage />
            </Route>
            <Route path="/prendas">
              <ListPrendasComponent />
            </Route>
            <Route path="/users">
              <UserHome />
            </Route>
            {/* <Route path="/orders">
              <OrderList />
            </Route> */}
          </Switch>
        </main>
      </div>
    </Router>
  );
};

export default MiniDrawer;
