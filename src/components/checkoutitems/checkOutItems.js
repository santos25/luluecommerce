import React from 'react';
import { connect } from 'react-redux';
import { addItemsToCart, clearItem, removeItem } from '../../Redux/Cart/cart.action';

import './checkout-item.styles.css'
import {  makeStyles , Avatar} from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
    large: {
     width: theme.spacing(15),
     height: theme.spacing(15),
 },
}));

const CheckOutItems = ({ cartItem, removeItem, addItem, clearItem }) => {
    const classes = useStyles();

    const { image, name, price, quantity } = cartItem;
    return (
        <div className='checkout-item'>
            <div className='image-container'>
                <Avatar alt={name} src={image} className={classes.large} />
            </div>
            <span className='name'>{name}</span>
            <span className='quantity'>
                <div className='arrow' onClick={() => removeItem(cartItem)}>
                    &#10094;
        </div>
                <span className='value'>{quantity}</span>
                <div className='arrow' onClick={() => addItem(cartItem)}>
                    &#10095;
        </div>
            </span>
            <span className='price'>{price}</span>
            <div className='remove-button' onClick={() => clearItem(cartItem)}>
                &#10005;
      </div>
        </div>
    );
}

const mapDispatchToState = (dispatch) => ({
    removeItem: (item) => dispatch(removeItem(item)),
    addItem: (item) => dispatch(addItemsToCart(item)),
    clearItem: (item) => dispatch(clearItem(item))
})
export default connect(null, mapDispatchToState)(CheckOutItems);