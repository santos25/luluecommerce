import React from "react";

import {
  Box,
  Container,
  Grid,
  makeStyles,
  Typography,
} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  title: {
    fontWeight: "bold",
  },
}));

const SavedList = () => {
  const classes = useStyles();
  return (
    <Grid container>
      <Grid component={Box} py={2} bgcolor="grey.300" xs={12}>
        <Typography variant="h5" className={classes.title} align="center">
          Articulos Guardados
        </Typography>
      </Grid>
    </Grid>
  );
};

export default SavedList;
