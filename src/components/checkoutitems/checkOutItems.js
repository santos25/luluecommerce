import React from "react";
import { connect } from "react-redux";
import {
  addItemsToCart,
  clearItem,
  removeItem,
} from "../../Redux/Cart/cart.action";

import "./checkout-item.styles.css";

import {
  Box,
  // Avatar,
  Button,
  ButtonBase,
  Grid,
  IconButton,
  Paper,
  Typography,
} from "@material-ui/core";
import { Add as AddIcon, Remove as RemoveIcon } from "@material-ui/icons";
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
  // console.log(cartItem);
  return (
    <div className={classes.root}>
      <Paper className={classes.paper}>
        <Grid container spacing={2}>
          <Grid xs={4} item>
            <ButtonBase className={classes.image}>
              <img className={classes.img} alt="complex" src={`${images[0]}`} />
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
                <Box display="flex" alignItems="center" justify="center">
                  <Typography variant="subtitle1" color="textSecondary">
                    {`Cantidad:`}
                  </Typography>
                  <Box display="flex" alignItems="center" justify="center">
                    <IconButton
                      aria-label="Eliminar"
                      onClick={() => removeItem(cartItem)}
                      color="primary"
                    >
                      <RemoveIcon fontSize="small" />
                    </IconButton>
                    <Typography variant="body1">{quantity}</Typography>
                    <IconButton
                      aria-label="Agregar"
                      onClick={() => addItem(cartItem)}
                      color="primary"
                    >
                      <AddIcon fontSize="small" />
                    </IconButton>
                  </Box>
                </Box>
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
          </Grid>
        </Grid>
      </Paper>
    </div>
  );
};

const mapDispatchToState = (dispatch) => ({
  removeItem: (item) => dispatch(removeItem(item)),
  addItem: (item) => dispatch(addItemsToCart(item)),
  clearItem: (item) => dispatch(clearItem(item)),
});
export default connect(null, mapDispatchToState)(CheckOutItems);
