import { createSelector } from 'reselect'

const adminData = state => state.admin;


export const productSelector = createSelector(
    [adminData],
    adminData => {
        console.log(adminData.products);
        const dataItems = [];
        adminData.products.forEach((collection, index) => {
            Object.keys(collection.categories).forEach(category => {
                Object.keys(collection.categories[category]).forEach(item => {

                    dataItems.push({ ...collection.categories[category][item], 
                                    id: collection.id, 
                                    genre: collection.genre,
                                    category })
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