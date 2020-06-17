export const addUniqueitemTocart = (cartitems, newItem) => {


    const itemExist = cartitems.find(item => item.id === newItem.id);

    if (itemExist) {
        return cartitems.map(item => item.id === itemExist.id ? { ...item, quantity: item.quantity + 1 } : item)
    }

    return [...cartitems, {...newItem, quantity: 1}]

}


export const clearItemfromCart = (items, itemtoRemove) => {

    if (itemtoRemove.quantity === 1) {
        return items.filter((item) => item.id !== itemtoRemove.id);
    } else {
        return items.map((item) => item.id === itemtoRemove.id ? { ...item, quantity: item.quantity - 1 } : item)

    }

}