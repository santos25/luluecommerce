import React from 'react';
import './cart-icon.css';
import { connect } from 'react-redux';
import {createStructuredSelector} from 'reselect';
import {itemCountSelector} from '../../Redux/Cart/cart-selectors';
import { toggleCart } from '../../Redux/Cart/cart.action';
import { ReactComponent as ShopIcon } from '../../assets/images/shopping-bag.svg';

const CartIconComponent = ({ toggleCart, itemCount }) => {
    return (
        <div className="cart-icon" onClick={toggleCart}>
            <ShopIcon className="shopping-icon" />
            <span className="item-count">{itemCount}</span>
        </div>
    )
}

const mapDispatchToState = dispatch => ({
    toggleCart: () => { dispatch(toggleCart()) }
})

const mapStateToProps = (state) => {
    console.log("being called Cart Icon");
    return ({
        itemCount: itemCountSelector(state)
    })
}
export default connect(mapStateToProps, mapDispatchToState)(CartIconComponent);