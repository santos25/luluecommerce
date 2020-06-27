import {createSelector} from 'reselect'

const adminData = state => state.admin;


export const  productSelector = createSelector(
    [adminData],
    adminData => adminData.products
)

export const isFetchSelector = createSelector(
    [adminData],
    adminData => adminData.isFetching
)

export const isUploadinSelector = createSelector(
    [adminData],
    adminData => adminData.isUploading
)