import {createSelector} from 'reselect';

const discountClothes = state => state.directory;

export const newCollectionsHomeSelector = createSelector(
    [discountClothes],
    discount => Object.keys( discount.discountItems).map( collec => discount.discountItems[collec])
)

