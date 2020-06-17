import CartType from './cart.types'
import { addUniqueitemTocart, clearItemfromCart } from './car-utils';

const INITIAL_SATE = {
    hidden: true,
    cartitems: []
}

const CartReducer = (state = INITIAL_SATE, action) => {
    switch (action.type) {
        case CartType.TOGGLE_CART:
            return {
                ...state,
                hidden: !state.hidden
            }
        case CartType.ADDITEMS_TO_CART:

            return {
                ...state,
                cartitems: addUniqueitemTocart(state.cartitems, action.payload)
            }
        case CartType.CLEAR_ITEM:
            return {
                ...state,
                cartitems: state.cartitems.filter((item) => item.id !== action.payload.id)
            }
        case CartType.REMOVE_ITEM:
            return {
                ...state,
                cartitems :  clearItemfromCart(state.cartitems, action.payload)
            }
        default:
            return state
    }
}

export default CartReducer