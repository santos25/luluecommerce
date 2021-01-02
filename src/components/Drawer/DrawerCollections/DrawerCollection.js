import React from "react";

import ListItemComponent from "../../ListItemComponent/ListItemComponent";

import {
  Box,
  Typography,
  makeStyles,
  IconButton,
  List,
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
          {collections.map((collection, index) => (
            <ListItemComponent
              key={index}
              text={collection.name}
              getDataClick={() => redirectCollections(collection.name)}
              avatarClass={classes.large}
              image={collection.image}
              variant="subtitle1"
            />
          ))}
        </List>
      </Box>
    </>
  );
};

export default DrawerCollection;
