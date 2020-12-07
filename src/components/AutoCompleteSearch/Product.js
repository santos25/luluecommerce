import React from "react";

import {
  ButtonBase,
  Grid,
  makeStyles,
  Paper,
  Typography,
} from "@material-ui/core";

import { Highlight } from "react-instantsearch-dom";

const useStyles = makeStyles((theme) => ({
  image: {
    maxWidth: 128,
    maxHeight: 128,
  },
  img: {
    margin: "auto",
    display: "block",
    maxWidth: "100%",
    maxHeight: "100%",
  },
}));

const Product = ({ image, name, price }) => {
  const classes = useStyles();

  return (
    <Paper className={classes.paper}>
      <Grid container spacing={2}>
        <Grid xs={4} item>
          <ButtonBase className={classes.image}>
            <img
              className={classes.img}
              alt="complex"
              src={`http://${image}`}
            />
          </ButtonBase>
        </Grid>
        <Grid item xs={8} sm container>
          <Grid item xs={12} container direction="column" spacing={2}>
            <Grid item xs>
              <Typography gutterBottom variant="subtitle1">
                {name.substring(0, 20)}
              </Typography>
              <Grid
                item
                xs={12}
                justify="space-between"
                alignItems="center"
                container
              >
                <Typography variant="subtitle1">{price}</Typography>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Paper>
  );
};

export default Product;
