import React from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { cartitemsSelector } from "../../Redux/Cart/cart-selectors";
// import { toggleCart } from "../../Redux/Cart/cart.action";

// import CartItems from "../cart-items/cart-items.component";
import CheckOutItems from "../checkoutitems/checkOutItems";

import { makeStyles, Button, Box, Typography } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  title: {
    fontWeight: "bold",
  },
}));
const CardDropdown = ({ cartitems, history, dispatch }) => {
  const classes = useStyles();
  return (
    <Box display="flex" flexDirection="column" justifyContent="center">
      <Box display="flex" py={1} px={2} height="30%" bgcolor="secondary.main">
        <Typography className={classes.title} variant="body1">
          Mi bolsa, {` 3 articulos`}
        </Typography>
      </Box>
      <Box display="flex" maxHeight="80%" border={1} borderColor="black">
        {cartitems.map((item, index) => (
          <CheckOutItems key={index} cartItem={item} />
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
        height="30%"
        bgcolor="secondary.main"
      >
        <Button variant="contained">Ver Bolsa</Button>
      </Box>
    </Box>
    // <Box
    //   zIndex="tooltip"
    //   width={350}
    //   bgcolor="white"
    //   borderRadius="borderRadius"
    //   border={1}
    //   className={classes.cartdropdown}
    //   p={2}
    // >
    //   <Box display="flex" justifyContent="space-between">
    //     <Typography fon component="h5" className={classes.title}>
    //       Image
    //     </Typography>
    //     <Typography component="h5" className={classes.title}>
    //       Nombre
    //     </Typography>
    //     <Typography component="h5" className={classes.title}>
    //       precio
    //     </Typography>
    //     <Typography component="h5" className={classes.title}>
    //       Cant.
    //     </Typography>
    //   </Box>
    //   {cartitems.length ? (
    //     cartitems.map((item, i) => <CartItems key={i} {...item} />)
    //   ) : (
    //     <span className="empty-message">No hay items</span>
    //   )}
    //   <Box mt={2}>
    //     <Button
    //       fullWidth
    //       variant="outlined"
    //       onClick={() => {
    //         dispatch(toggleCart());
    //         history.push("/checkout");
    //       }}
    //     >
    //       Go to Check out
    //     </Button>
    //   </Box>
    // </Box>
  );
};

const mapStateToProps = (state) => ({
  cartitems: cartitemsSelector(state),
});
export default withRouter(connect(mapStateToProps)(CardDropdown));
