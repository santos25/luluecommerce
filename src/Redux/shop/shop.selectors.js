import { createSelector } from "reselect";

const data = (state) => state.shop;

export const landscapeImageSelector = () =>
  createSelector([data], (data) => {
    if (data.categories === undefined) return "";
    else return data.categories.landscape;
  });

export const categoriesSelector = () =>
  createSelector([data], (data) => {
    console.log(data.categories.categorias);

    return Object.keys(data.categories.categorias).map((key) => {
      return data.categories.categorias[key];
    });
  });

export const dataCollectionSelector = () =>
  createSelector([data], (data) => {
    return data.collections;
  });

export const dataSuggestedCollectionSelector = () =>
  createSelector([data], (data) => {
    return data.suggestedCollections;
  });

export const dataProductDetailSelector = (productId) =>
  createSelector([data], (data) => {
    let product;
    // console.log(data.collections.products);
    if (typeof data.collections.products !== "undefined") {
      product = data.collections.products.find((item) => {
        return item.name.toLowerCase() === productId.toLowerCase();
      });
    }

    if (typeof product === "undefined") {
      // console.log("undefined");
      product = data.suggestedCollections.products.find((item) => {
        return item.name.toLowerCase() === productId.toLowerCase();
      });
    }
    return product;
  });

export const isLoadingOverView = createSelector(
  [data],
  (data) => data.isFetching
);

export const isLoadingCollections = createSelector(
  [data],
  (data) => data.isFetchingCollection
);

export const isLoadingSuggestedCollections = createSelector(
  [data],
  (data) => data.isFetchingSuggested
);
