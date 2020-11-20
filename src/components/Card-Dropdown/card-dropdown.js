import React from "react";
//redux
import { connect } from "react-redux";
//routers
import { useHistory } from "react-router-dom";
//selectors
import { cartitemsSelector } from "../../Redux/Cart/cart-selectors";

// import { toggleCart } from "../../Redux/Cart/cart.action";

//components
import CartItemComponent from "../cart-items/cart-items.component";

import { makeStyles, Button, Box, Typography } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  title: {
    fontWeight: "bold",
  },
  content: {
    height: "auto",
    maxHeight: "280px",
    overflowY: "scroll",
    padding: theme.spacing(1),
  },
}));
const CardDropdown = ({ cartitems, dispatch }) => {
  const classes = useStyles();
  const history = useHistory();
  return (
    <Box display="flex" flexDirection="column" justifyContent="center">
      <Box display="flex" py={1} px={2} height="30%" bgcolor="secondary.main">
        <Typography variant="body1">
          <span className={classes.title}>Mi Bolsa</span>{" "}
          {`, ${cartitems.length} Articulos`}
        </Typography>
      </Box>
      <Box className={classes.content}>
        {cartitems.map((item, index) => (
          <CartItemComponent
            key={index}
            price={item.price.current.text}
            image={item.images[0]}
            name={item.name}
            talla={item.selectedTalla}
            quantity={item.quantity}
          />
        ))}
      </Box>
      <Box
        display="flex"
        justifyContent="space-between"
        py={1}
        px={2}
        border={1}
        borderColor="secondary.main"
        bgcolor="grey.100"
        height="30%"
      >
        <Typography variant="body1">Total</Typography>
        <Typography variant="body1">$200.000</Typography>
      </Box>
      <Box
        display="flex"
        justifyContent="center"
        py={1}
        px={2}
        height="auto"
        bgcolor="secondary.main"
      >
        <Button
          variant="contained"
          onClick={() => history.push("/checkout")}
          color="primary"
        >
          Ver Bolsa
        </Button>
      </Box>
    </Box>
  );
};

const mapStateToProps = (state) => ({
  cartitems: cartitemsSelector(state),
});

export default connect(mapStateToProps)(CardDropdown);
