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
}));

const DrawerCategory = ({ getCollections }) => {
  const classes = useStyles();

  return (
    <>
      <Box mt={1} borderBottom={1} display="flex" justifyContent="center">
        <Typography variant="h6">MUJER</Typography>
      </Box>
      <List>
        <ListItem onClick={() => getCollections(0)} button alignItems="center">
          <ListItemAvatar>
            <Avatar
              alt="ropa"
              variant="rounded"
              className={classes.large}
              src="https://images.unsplash.com/photo-1572804013427-4d7ca7268217?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=401&q=80"
            />
          </ListItemAvatar>
          <Box display="flex" width="100%" justifyContent="center">
            <Typography variant="body1">ROPA</Typography>
          </Box>
        </ListItem>
        <Divider />
        <ListItem button alignItems="center">
          <ListItemAvatar>
            <Avatar
              alt="zapatos"
              variant="rounded"
              className={classes.large}
              src="https://images.unsplash.com/photo-1559504344-33abd17324d5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=334&q=80"
            />
          </ListItemAvatar>
          <Box display="flex" width="100%" justifyContent="center">
            <Typography variant="body1">ZAPATOS</Typography>
          </Box>
        </ListItem>
        <Divider />
        <ListItem button alignItems="center">
          <ListItemAvatar>
            <Avatar
              alt="accesorios"
              variant="rounded"
              className={classes.large}
              src="https://images.unsplash.com/photo-1575201647632-45fae95c9ce4?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=733&q=80"
            />
          </ListItemAvatar>
          <Box display="flex" width="100%" justifyContent="center">
            <Typography variant="body1">ACCESORIOS</Typography>
          </Box>
        </ListItem>
      </List>
    </>
  );
};

export default DrawerCategory;
