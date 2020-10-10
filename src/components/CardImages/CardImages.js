import React from "react";
import { connect } from "react-redux";
import { useHistory, useRouteMatch } from "react-router-dom";
// import ButtonCustom from '../Button/Button';
import { addItemsToCart } from "../../Redux/Cart/cart.action";

import { FavoriteBorder } from "@material-ui/icons";
import {
  Card,
  CardActionArea,
  Typography,
  CardMedia,
  CardContent,
  makeStyles,
  Box,
  CardActions,
  Button,
} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 545,
    margin: theme.spacing(1),
  },
  media: {
    height: 340,
  },
  icon: {
    fontSize: 30,
  },
}));

const CardImages = ({ item, addItemsToCart, tagId }) => {
  const classes = useStyles();
  // console.log(item);
  const history = useHistory();
  const match = useRouteMatch();
  let url;
  if (tagId !== "") {
    if (match.params.hasOwnProperty("collectionId")) {
      url = match.url;
    } else {
      url = `${match.url}/${item.categoryid}`;
    }
  } else {
    // console.log("no tag");
    // console.log(item);
    url = `${item.genreid}/${item.categoryid}`;
  }

  // console.log(match.params);
  return (
    <Card className={classes.root}>
      <CardActionArea
        onClick={() => history.push(`${url}/${encodeURI(item.name)}`)}
      >
        <CardMedia className={classes.media} image={item.image[0]} />
        <CardContent>
          <Box display="flex" width="auto">
            <Box flexGrow={1}>
              <Typography variant="h5" component="h2">
                {item.name}
              </Typography>
              <Typography variant="body2" component="p">
                {`$${item.price}`}
              </Typography>
            </Box>
            <Box>
              <FavoriteBorder className={classes.icon} />
            </Box>
          </Box>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Button
          onClick={() => {
            addItemsToCart(item);
          }}
          variant="outlined"
          size="small"
          color="primary"
        >
          Agregar al Carrito
        </Button>
      </CardActions>
    </Card>

    //   <ButtonCustom onClick={() => { addItemsToCart(item) }} >Agregar al Carro</ButtonCustom>
  );
};

const mapDispatchToState = (dispatch) => ({
  addItemsToCart: (item) => {
    dispatch(addItemsToCart(item));
  },
});

export default connect(null, mapDispatchToState)(CardImages);
