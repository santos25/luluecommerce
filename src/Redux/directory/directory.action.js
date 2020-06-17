import directoryTypes from './directory.types';

export const loadDiscountClothes = (items) => {
    return {
        type: directoryTypes.LOAD_DISCOUNT_CLOTHES,
        payload: items
    }
}