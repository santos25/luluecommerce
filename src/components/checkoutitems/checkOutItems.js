import React from 'react';
import {connect} from 'react-redux';
import {addItemsToCart, clearItem , removeItem} from '../../Redux/Cart/cart.action';

import './checkout-item.styles.css'

const CheckOutItems = ({cartItem , removeItem, addItem, clearItem}) => {

    const {imageUrl , name, price , quantity} = cartItem;
    return (
        <div className='checkout-item'>
            <div className='image-container'>
                <img src={imageUrl} alt='item' />
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
    removeItem : (item) => dispatch(removeItem(item)),
    addItem: (item) => dispatch(addItemsToCart(item)),
    clearItem: (item) => dispatch(clearItem(item))
})
export default connect(null, mapDispatchToState) (CheckOutItems);