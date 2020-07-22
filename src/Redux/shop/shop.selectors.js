import { createSelector } from 'reselect';

const data = state => state.shop;

export const dataShopSelector = createSelector(
    [data],
    data => Object.keys(data.dataShop.categories).map(key => {

        const imageByCategory = Object.keys(data.dataShop.categories[key]).filter((item, i) => i < 1)
            .map(item => data.dataShop.categories[key][item].image[0])
        return {
            name: key,
            image: imageByCategory[0]
        }

    })
)

export const dataCollectionSelector = collectionId => createSelector(
    [data],
    data => Object.keys(data.dataShop.categories[collectionId.toLowerCase()])
        .map(itemKey => data.dataShop.categories[collectionId.toLowerCase()][itemKey])
)

export const dataProductDetailSelector = (collectionId, productId) => createSelector(
    [data],
    data => Object.keys(data.dataShop.categories[collectionId]).map(itemKey =>
                    data.dataShop.categories[collectionId][itemKey]
                 ).find( item => item.name === productId)
    //    [collectionId].items.find(item => item.name.toLowerCase() === productId.toLowerCase())
)

export const isLoadingCollections = createSelector(
    [data],
    data => data.isFetching
)
