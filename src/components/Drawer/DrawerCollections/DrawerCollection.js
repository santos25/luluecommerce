import React from "react";

import {
  Box,
  Typography,
  makeStyles,
  IconButton,
  ListItem,
  List,
  ListItemAvatar,
  Avatar,
  Divider,
} from "@material-ui/core";
import { ArrowBack as ArrowBackIcon } from "@material-ui/icons";

const useStyles = makeStyles((theme) => ({
  title: {
    fontWeight: "bold",
    textTransform: "uppercase",
  },
  background: {
    backgroundColor: "#eee",
  },
  large: {
    width: theme.spacing(8),
    height: theme.spacing(8),
  },
}));
const DrawerCollection = ({
  collections,
  title,
  setCurrentPage,
  redirectCollections,
}) => {
  console.log(collections);
  const classes = useStyles();
  return (
    <>
      <Box
        mt={1}
        mb={1}
        borderBottom={1}
        display="flex"
        justifyContent="space-around"
        alignItems="center"
      >
        <IconButton
          edge="start"
          color="primary"
          aria-label="back"
          onClick={() => setCurrentPage(0)}
        >
          <ArrowBackIcon />
        </IconButton>
        <Typography className={classes.title} variant="body1">
          {title}
        </Typography>
      </Box>
      <Box className={classes.background} mt={1} pt={1} pb={0.5} px={1}>
        <Typography className={classes.title} variant="body2">
          Ver por producto
        </Typography>
      </Box>
      <Box>
        <List>
          {collections.map((collection, index) => {
            return (
              <>
                <ListItem
                  key={index}
                  onClick={() => redirectCollections(collection.name)}
                  button
                  alignItems="center"
                >
                  <ListItemAvatar>
                    <Avatar
                      alt="ropa"
                      variant="circle"
                      className={classes.large}
                      src={`http://${collection.image}`}
                      // "https://images.unsplash.com/photo-1572804013427-4d7ca7268217?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=401&q=80"
                    />
                  </ListItemAvatar>
                  <Box display="flex" width="100%" justifyContent="center">
                    <Typography variant="subtitle1">
                      {collection.name}
                    </Typography>
                  </Box>
                </ListItem>
                <Divider />
              </>
            );
          })}
        </List>
      </Box>
    </>
  );
};

export default DrawerCollection;
