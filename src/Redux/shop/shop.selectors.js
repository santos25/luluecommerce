import { createSelector } from "reselect";

const data = (state) => state.shop;

export const landscapeImageSelector = () =>
  createSelector([data], (data) => {
    if (data.collections === undefined) return "";
    else return data.collections.landscape;
  });

export const categoriesSelector = () =>
  createSelector([data], (data) => {
    return Object.keys(data.collections.categorias).map((key) => {
      return data.collections.categorias[key];
    });
  });

export const dataCollectionSelector = (collectionId, genreId) =>
  createSelector([data], (data) => {
    console.log(collectionId);
    console.log(genreId);
    const collectionGenre = data.dataShop.find(
      (item) => item.genre === genreId
    );
    console.log(collectionGenre);
    const itemCollections = Object.keys(
      collectionGenre.categories[collectionId.toLowerCase()]
    ).map(
      (itemKey) =>
        collectionGenre.categories[collectionId.toLowerCase()][itemKey]
    );
    return itemCollections;
  });

export const dataProductDetailSelector = (collectionId, productId, genreId) =>
  createSelector(
    [data],
    (data) => {
      const collectionGenre = data.dataShop.find(
        (item) => item.genre === genreId
      );
      const itemDetail = Object.keys(collectionGenre.categories[collectionId])
        .map((itemKey) => collectionGenre.categories[collectionId][itemKey])
        .find((item) => item.name === productId);
      return itemDetail;
    }

    //    [collectionId].items.find(item => item.name.toLowerCase() === productId.toLowerCase())
  );

export const isLoadingCollections = createSelector(
  [data],
  (data) => data.isFetching
);
