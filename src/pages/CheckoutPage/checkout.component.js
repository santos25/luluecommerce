import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { cartitemsSelector , itemTotaValueSelector } from '../../Redux/Cart/cart-selectors';
import CheckOutItems from '../../components/checkoutitems/checkOutItems'

import './checkout.styles.css'

const CheckOutPage = ({cartitems , totalprice}) => {
    console.log(cartitems);
    
    return (
        <div className='checkout-page'>
            <div className='checkout-header'>
                <div className='header-block'>
                    <span>Product</span>
                </div>
                <div className='header-block'>
                    <span>Description</span>
                </div>
                <div className='header-block'>
                    <span>Quantity</span>
                </div>
                <div className='header-block'>
                    <span>Price</span>
                </div>
                <div className='header-block'>
                    <span>Remove</span>
                </div>
            </div>
            {cartitems.map( (item, index) => <CheckOutItems key={index} cartItem={item}/>  )}    
            <div className='total'>TOTAL: ${totalprice}</div>
    
        </div>
    )
}

const mapStateToProps =  createStructuredSelector({
    cartitems: cartitemsSelector,
    totalprice: itemTotaValueSelector
})
export default connect(mapStateToProps)(CheckOutPage);