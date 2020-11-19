import React from "react";

//redux
import { connect } from "react-redux";
import { currentUserSelector } from "../../../Redux/user/user-selectors";

//firebase
import { auth } from "../../../FireBase/FireBaseUtil";

//components
import ListItemComponent from "../../ListItemComponent/ListItemComponent";
//routers
import { Link as RouterLink, useHistory } from "react-router-dom";
import { Box, List, makeStyles, Typography } from "@material-ui/core";

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
        {Object.keys(categories).map((key, index) => (
          <ListItemComponent
            key={index}
            text={key}
            getDataClick={() => getCollections(key)}
            avatarClass={classes.large}
            titleClass={classes.title}
            image={categories[key][0].image}
            variant="body1"
          />
        ))}
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
    </>
  );
};

const mapStateToProps = (state) => ({
  currentUser: currentUserSelector(state),
});
export default connect(mapStateToProps)(DrawerCategory);
