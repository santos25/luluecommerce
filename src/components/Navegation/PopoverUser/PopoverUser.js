import React from "react";

import { Box, makeStyles, Typography } from "@material-ui/core";

import { Link as RouterLink } from "react-router-dom";

import { auth } from "../../../FireBase/FireBaseUtil";

const useStyles = makeStyles((theme) => ({
  user: {
    fontWeight: "bold",
  },
  signout: {
    textDecoration: "underline",
    cursor: "pointer",
  },
}));
const PopoverUser = ({ currentUser }) => {
  const classes = useStyles();

  return (
    <Box display="flex" justifyContent="center">
      {currentUser ? (
        <>
          <Box flexGrow={1}>
            <Typography className={classes.user} variant="body2">
              Hola{" "}
              {currentUser.name ? currentUser.name : currentUser.displayName}
            </Typography>
          </Box>
          <Box>
            <Typography
              onClick={() => {
                auth.signOut();
              }}
              className={classes.signout}
              align="center"
              variant="body2"
            >
              salir
            </Typography>
          </Box>
        </>
      ) : (
        <>
          <Box flexGrow={1} borderRight={1}>
            <RouterLink
              style={{ textDecoration: "none", color: "black" }}
              to="/identity"
            >
              <Typography align="center" variant="body2">
                Acceder
              </Typography>
            </RouterLink>
          </Box>
          <Box flexGrow={1}>
            <RouterLink
              style={{ textDecoration: "none", color: "black" }}
              to="/identity"
            >
              <Typography align="center" variant="body2">
                Regístrarse
              </Typography>
            </RouterLink>
          </Box>
        </>
      )}
    </Box>
  );
};

export default PopoverUser;
