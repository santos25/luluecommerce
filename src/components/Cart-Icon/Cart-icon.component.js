import React from "react";
import "./cart-icon.css";
import { connect } from "react-redux";

//react-dom
import { useHistory } from "react-router-dom";

//selectors
import { createStructuredSelector } from "reselect";
import { itemCountSelector } from "../../Redux/Cart/cart-selectors";

//actions
import { toggleCart } from "../../Redux/Cart/cart.action";
// import { ReactComponent as ShopIcon } from '../../assets/images/shopping-bag.svg';

import { ShoppingCart } from "@material-ui/icons";

import { IconButton, Badge } from "@material-ui/core";

const CartIconComponent = ({ toggleCart, itemCount }) => {
  let history = useHistory();

  return (
    <IconButton
      onClick={() => history.push("/checkout")}
      aria-label="show products"
      color="inherit"
    >
      <Badge badgeContent={itemCount} color="error">
        <ShoppingCart />
      </Badge>
    </IconButton>
  );
};

const mapDispatchToState = (dispatch) => ({
  toggleCart: () => {
    dispatch(toggleCart());
  },
});

const mapStateToProps = createStructuredSelector({
  itemCount: itemCountSelector,
});

export default connect(mapStateToProps, mapDispatchToState)(CartIconComponent);
