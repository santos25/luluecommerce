import React from "react";

//redux
import { connect } from "react-redux";
import { currentUserSelector } from "../../../Redux/user/user-selectors";

//firebase
import { auth } from "../../../FireBase/FireBaseUtil";

//routers
import { Link as RouterLink, useHistory } from "react-router-dom";
import {
  Avatar,
  Box,
  Divider,
  List,
  ListItem,
  ListItemAvatar,
  makeStyles,
  Typography,
} from "@material-ui/core";

import { Person as PersonIcon } from "@material-ui/icons";

import FollowIcons from "../../Footer/FollowIcons";

const useStyles = makeStyles((theme) => ({
  large: {
    width: theme.spacing(10),
    height: theme.spacing(10),
  },
  title: {
    textTransform: "uppercase",
  },
  link: {
    color: "black",
    textDecoration: "none",
  },
  user: {
    fontWeight: "bold",
  },
  signout: {
    textDecoration: "underline",
    cursor: "pointer",
  },
}));

const DrawerCategory = ({
  toggleDrawer,
  currentUser,
  categories,
  getCollections,
  anchor,
}) => {
  const classes = useStyles();

  console.log(currentUser);
  let history = useHistory();
  return (
    <>
      <Box mt={1} borderBottom={1} display="flex" justifyContent="center">
        <Typography variant="h6">MUJER</Typography>
      </Box>
      <List>
        {Object.keys(categories).map((key) => {
          return (
            <>
              <ListItem
                key={key}
                onClick={() => getCollections(key)}
                button
                alignItems="center"
              >
                <ListItemAvatar>
                  <Avatar
                    alt="ropa"
                    variant="rounded"
                    className={classes.large}
                    src={`http://${categories[key][0].image}`}
                    // "https://images.unsplash.com/photo-1572804013427-4d7ca7268217?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=401&q=80"
                  />
                </ListItemAvatar>
                <Box display="flex" width="100%" justifyContent="center">
                  <Typography className={classes.title} variant="body1">
                    {key}
                  </Typography>
                </Box>
              </ListItem>
              <Divider />
            </>
          );
        })}
      </List>
      <Box mt={1}>
        <FollowIcons />
      </Box>
      <Box>
        {currentUser ? (
          <Box
            display="flex"
            justifyContent="flex-start"
            py={1}
            bgcolor="grey.300"
          >
            <Box pl={1}>
              <Typography className={classes.user} variant="body2">
                Hola{" "}
                {currentUser.name ? currentUser.name : currentUser.displayName}
              </Typography>
            </Box>
            <Box
              px={1}
              onClick={() => {
                auth.signOut();
                toggleDrawer(anchor, false)();
                history.push("/mujer");
              }}
            >
              <Typography className={classes.signout} variant="body2">
                Salir
              </Typography>
            </Box>
          </Box>
        ) : (
          <Box display="flex" justifyContent="center" py={1} bgcolor="grey.300">
            <Box px={1}>
              <RouterLink
                to="/identity"
                onClick={() => toggleDrawer(anchor, false)()}
              >
                <Typography variant="body1">Acceder </Typography>
              </RouterLink>
            </Box>
            ||
            <Box px={1}>
              <RouterLink
                to="/identity"
                onClick={() => toggleDrawer(anchor, false)()}
              >
                <Typography variant="body1"> Regístrate</Typography>
              </RouterLink>
            </Box>
          </Box>
        )}
      </Box>
      {/* <Box mt={1} px={1} color="black">
        <RouterLink
          to="/identity"
          onClick={() => toggleDrawer(anchor, false)()}
          className={classes.link}
        >
          <Box display="flex" justifyContent="flex-start">
            <Box px={1}>
              <PersonIcon />
            </Box>
            <Box>
              <Typography variant="body1">Mi Cuenta</Typography>
            </Box>
          </Box>
        </RouterLink>
      </Box> */}
    </>
  );
};

const mapStateToProps = (state) => ({
  currentUser: currentUserSelector(state),
});
export default connect(mapStateToProps)(DrawerCategory);
