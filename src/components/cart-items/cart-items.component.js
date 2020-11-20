import React from "react";
import "./cart-item.styles.css";

import {
  makeStyles,
  Box,
  Typography,
  ButtonBase,
  Card,
  CardContent,
  IconButton,
  CardMedia,
} from "@material-ui/core";
import PlayArrowIcon from "@material-ui/icons/PlayArrow";
import SkipNextIcon from "@material-ui/icons/SkipNext";
import SkipPreviousIcon from "@material-ui/icons/SkipPrevious";
const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    // padding: theme.spacing(1),
  },
  details: {
    display: "flex",
    flexDirection: "column",
  },
  content: {
    flex: "1 0 auto",
  },
  controls: {
    display: "flex",
    alignItems: "center",
    paddingLeft: theme.spacing(1),
    // paddingBottom: theme.spacing(1),
  },
  playIcon: {
    height: 38,
    width: 38,
  },
  cover: {
    width: 100,
    height: 110,
  },
}));

const CardItems = ({ image, name, price, talla, quantity }) => {
  const classes = useStyles();

  return (
    <Card className={classes.root}>
      <CardMedia
        className={classes.cover}
        image={`http://${image}`}
        title="Live from space album cover"
      />
      <div className={classes.details}>
        <CardContent className={classes.content}>
          <Typography variant="body1">{price}</Typography>
          <Typography variant="subtitle1" color="textSecondary">
            {name.substring(0, 10)}
          </Typography>
          <Typography variant="subtitle1" color="textSecondary">
            {talla}
          </Typography>
          <Typography variant="subtitle1" color="textSecondary">
            {`Cant.: ${quantity}`}
          </Typography>
        </CardContent>
        {/* <div className={classes.controls}>
          <IconButton aria-label="previous">
            <SkipPreviousIcon />
          </IconButton>
          <IconButton aria-label="play/pause">
            <PlayArrowIcon className={classes.playIcon} />
          </IconButton>
          <IconButton aria-label="next">
            <SkipNextIcon />
          </IconButton>
        </div> */}
      </div>
    </Card>
  );
};

export default CardItems;
