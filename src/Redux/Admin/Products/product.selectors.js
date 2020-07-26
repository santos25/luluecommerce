import { createSelector } from 'reselect'

const adminData = state => state.admin;


export const productSelector = createSelector(
    [adminData],
    adminData => {
        console.log(adminData.products);
        const itemsResult = adminData.products.map((collection, index) => {
            const allItems = Object.keys(collection.categories)
                .map(category => Object.keys(collection.categories[category])
                    .map(item => ({ ...collection.categories[category][item], id: collection.id, genre: collection.genre }))
                )

            return allItems;
        })

        return itemsResult;
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