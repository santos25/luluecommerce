import { createSelector } from "reselect";

const data = (state) => state.shop;

export const landscapeImageSelector = () =>
  createSelector([data], (data) => {
    if (data.categories === undefined) return "";
    else return data.categories.landscape;
  });

export const categoriesSelector = () =>
  createSelector([data], (data) => {
    return Object.keys(data.categories.categorias).map((key) => {
      return data.categories.categorias[key];
    });
  });

export const dataCollectionSelector = () =>
  createSelector([data], (data) => {
    return data.collections;
  });

export const dataProductDetailSelector = (productId) =>
  createSelector([data], (data) => {
    const product = data.collections.find((item) => {
      return item.name.toLowerCase() === productId.toLowerCase();
    });

    return product;
  });

export const isLoadingCollections = createSelector(
  [data],
  (data) => data.isFetching
);
