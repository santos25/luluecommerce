import { createSelector } from 'reselect'

const adminData = state => state.admin;


export const productSelector = createSelector(
    [adminData],
    adminData => {
        console.log(adminData.products);
        const dataItems = [];
        adminData.products.forEach((collection, index) => {
            Object.keys(collection.categories).forEach(categoryKey => {
                Object.keys(collection.categories[categoryKey]).forEach(itemKey => {

                    dataItems.push({ ...collection.categories[categoryKey][itemKey], 
                                    id: collection.id, 
                                    genre: collection.genre,
                                    itemkey: itemKey,
                                    category : categoryKey })
                })
            })
        })
        return dataItems;
    }

)

export const isFetchSelector = createSelector(
    [adminData],
    adminData => adminData.isFetching
)

export const isUploadinSelector = createSelector(
    [adminData],
    adminData => adminData.isUploading
)