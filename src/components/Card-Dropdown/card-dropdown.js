import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import './CardDropdownStyle.css';
import { cartitemsSelector } from '../../Redux/Cart/cart-selectors';
import CartItems from '../cart-items/cart-items.component'
import ButtonCustom from '../Button/Button';

const CardDropdown = ({ cartitems, history }) => {
    return (
        <div className="cart-dropdown">
            {
                cartitems.length ? <div className="cart-items">
                    {cartitems.map(item => <CartItems key={item.id} {...item} />)}
                </div>
                    :
                    <div>No hay items</div>
            }

            <ButtonCustom onClick={() => history.push("/checkout")}>Go to Check out</ButtonCustom>
        </div>
    )
}

const mapStateToProps = (state) => ({
    cartitems: cartitemsSelector(state)
})
export default withRouter(connect(mapStateToProps)(CardDropdown));