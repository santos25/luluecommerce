import React from "react";
import { connect } from "react-redux";
import {
  addItemsToCart,
  clearItem,
  removeItem,
} from "../../Redux/Cart/cart.action";

import "./checkout-item.styles.css";

import {
  Avatar,
  Button,
  ButtonBase,
  Grid,
  Paper,
  Typography,
} from "@material-ui/core";
import UseStyles from "./Styles";

const CheckOutItems = ({ cartItem, removeItem, addItem, clearItem }) => {
  const classes = UseStyles();

  const {
    images,
    name,
    price: { current },
    quantity,
    selectedTalla,
  } = cartItem;
  console.log(cartItem);
  return (
    <div className={classes.root}>
      <Paper className={classes.paper}>
        <Grid container spacing={2}>
          <Grid xs={4} item>
            <ButtonBase className={classes.image}>
              <img
                className={classes.img}
                alt="complex"
                src={`http://${images[0]}`}
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
                  <Grid item xs>
                    <Typography variant="subtitle1">
                      {`Talla: ${selectedTalla}`}
                    </Typography>
                  </Grid>
                  <Grid item xs>
                    <Typography variant="subtitle1">{current.text}</Typography>
                  </Grid>
                </Grid>
                <Typography variant="body2" color="textSecondary">
                  {`Cantidad: ${quantity}`}
                </Typography>
              </Grid>
              <Grid item>
                <Button
                  onClick={() => {
                    clearItem(cartItem);
                  }}
                  variant="contained"
                  size="small"
                  color="primary"
                >
                  <Typography variant="body2">Eliminar</Typography>
                </Button>
              </Grid>
            </Grid>
            {/* <Grid item>
            </Grid> */}
          </Grid>
        </Grid>
      </Paper>
    </div>
    // <div className="checkout-item">
    //   <div className="image-container">
    //     <Avatar alt={name} src={image} className={classes.large} />
    //   </div>
    //   <span className="name">{name}</span>
    //   <span className="quantity">
    //     <div className="arrow" onClick={() => removeItem(cartItem)}>
    //       &#10094;
    //     </div>
    //     <span className="value">{quantity}</span>
    //     <div className="arrow" onClick={() => addItem(cartItem)}>
    //       &#10095;
    //     </div>
    //   </span>
    //   <span className="price">{price}</span>
    //   <div className="remove-button" onClick={() => clearItem(cartItem)}>
    //     &#10005;
    //   </div>
    // </div>
  );
};

const mapDispatchToState = (dispatch) => ({
  removeItem: (item) => dispatch(removeItem(item)),
  addItem: (item) => dispatch(addItemsToCart(item)),
  clearItem: (item) => dispatch(clearItem(item)),
});
export default connect(null, mapDispatchToState)(CheckOutItems);
