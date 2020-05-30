import CartType from './cart.types'

export const toggleCart = () => {
    return {
        type : CartType.TOGGLE_CART
    }
}

export const addItemsToCart = (item) => {
        return {
            type : CartType.ADDITEMS_TO_CART,
            payload: item
        }
}