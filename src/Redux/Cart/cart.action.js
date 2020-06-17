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

export const clearItem = (itemToClear) => {
    return {
        type : CartType.CLEAR_ITEM,
        payload: itemToClear
    }
}

export const removeItem = (itemToRemove) => {
    return {
        type : CartType.REMOVE_ITEM,
        payload: itemToRemove
    }
}