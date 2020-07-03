import React from 'react';
import './cart-icon.css';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { itemCountSelector } from '../../Redux/Cart/cart-selectors';
import { toggleCart } from '../../Redux/Cart/cart.action';
// import { ReactComponent as ShopIcon } from '../../assets/images/shopping-bag.svg';

import {ShoppingCart} from '@material-ui/icons'
import {
    IconButton,
    Badge
} from '@material-ui/core';

const CartIconComponent = ({ toggleCart, itemCount }) => {
    return (
        <IconButton onClick={toggleCart} aria-label="show 17 new notifications" color="inherit">
            <Badge badgeContent={itemCount} color="secondary">
                <ShoppingCart />
            </Badge>
        </IconButton>
    )
}

const mapDispatchToState = dispatch => ({
    toggleCart: () => { dispatch(toggleCart()) }
})

const mapStateToProps = createStructuredSelector({
    itemCount: itemCountSelector
})

export default connect(mapStateToProps, mapDispatchToState)(CartIconComponent);