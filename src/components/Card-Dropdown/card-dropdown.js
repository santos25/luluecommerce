import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import './cart-dropdown.styles.css';
import { cartitemsSelector } from '../../Redux/Cart/cart-selectors';
import { toggleCart } from '../../Redux/Cart/cart.action';
import CartItems from '../cart-items/cart-items.component'
import ButtonCustom from '../Button/Button';

const CardDropdown = ({ cartitems, history, dispatch }) => {

    return (
        <div className="cart-dropdown">
            {
                cartitems.length ? <div className="cart-items">
                    {cartitems.map(item => <CartItems key={item.id} {...item} />)}
                </div>
                    :
                    <span className="empty-message">No hay items</span>
            }

            <ButtonCustom onClick={() => {
                dispatch(toggleCart());
                history.push("/checkout");
            }}>Go to Check out</ButtonCustom>
        </div>
    )
}

const mapStateToProps = (state) => ({
    cartitems: cartitemsSelector(state)
})
export default withRouter(connect(mapStateToProps)(CardDropdown));