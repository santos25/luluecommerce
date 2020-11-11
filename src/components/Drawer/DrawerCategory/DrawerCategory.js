import React from "react";

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

const useStyles = makeStyles((theme) => ({
  large: {
    width: theme.spacing(10),
    height: theme.spacing(10),
  },
  title: {
    textTransform: "uppercase",
  },
}));

const DrawerCategory = ({ categories, getCollections }) => {
  const classes = useStyles();

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
    </>
  );
};

export default DrawerCategory;
