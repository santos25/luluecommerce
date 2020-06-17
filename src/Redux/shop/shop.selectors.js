import { createSelector } from 'reselect';

const data = state => state.shop;

export const dataShopSelector = createSelector(
    [data],
    data => Object.keys(data.dataShop).map(key => data.dataShop[key])
)

export const dataCollectionSelector = collectionId => createSelector(
    [data],
    item => item.dataShop[collectionId.toLowerCase()]
)

export const isLoadingCollections = createSelector(
    [data],
    data => data.isFetching
)
