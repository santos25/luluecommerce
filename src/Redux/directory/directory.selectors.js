import {createSelector} from 'reselect';

const discountClothes = state => state.directory;

export const discountItemsSelector = createSelector(
    [discountClothes],
    discount => discount.discountItems
)

