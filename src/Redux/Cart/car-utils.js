export const addUniqueitemTocart = (cartitems, newItem) => {


    const itemExist = cartitems.find(item => item.id === newItem.id);

    if (itemExist) {
        return cartitems.map(item => item.id === itemExist.id ? { ...item, quantity : item.quantity + 1 } : item)
    }

    return [...cartitems, { ...newItem, quantity: 1 }]

}