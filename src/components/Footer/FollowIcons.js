import React from "react";

import { Box, makeStyles, Typography } from "@material-ui/core";

import {
  Facebook as FacebookIcon,
  Instagram as InstagramIcon,
} from "@material-ui/icons";

const useStyles = makeStyles((theme) => ({
  title: {
    fontWeight: "bold",
  },
}));

const FollowIcons = () => {
  const classes = useStyles();

  return (
    <Box borderTop={1} borderColor="grey.500" p={1}>
      <Typography align="center" className={classes.title} variant="subtitle2">
        Síguenos en
      </Typography>
      <Box display="flex" justifyContent="center" alignItems="center" mt={1}>
        <Box mr={3}>
          <a href="https://www.facebook.com/lulucartagen" target="_blank">
            <FacebookIcon
              color="primary"
              style={{ fontSize: 30, color: "#3b5998" }}
            />
          </a>
        </Box>
        <Box>
          <a href="https://www.instagram.com/lulucartagena/" target="_blank">
            <InstagramIcon
              color="primary"
              style={{ fontSize: 30, color: "#833AB4" }}
            />
          </a>
        </Box>
      </Box>
    </Box>
  );
};

export default FollowIcons;
