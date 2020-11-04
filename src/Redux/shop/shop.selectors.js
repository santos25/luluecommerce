import { createSelector } from "reselect";

const data = (state) => state.shop;

export const landscapeImageSelector = () =>
  createSelector([data], (data) => {
    if (data.collection === undefined) return "";
    else return data.collection.landscape;
  });

export const categoriesSelector = () =>
  createSelector([data], (data) => {
    return data.collection.categories;

    // const resultCollection = Object.keys(collectionGenre.categories).map(
    //   (key) => {
    //     const imageByCategory = Object.keys(collectionGenre.categories[key])
    //       .filter((item, i) => i < 1)
    //       .map((item) => collectionGenre.categories[key][item].image[0]);

    //     return {
    //       name: key,
    //       image: imageByCategory[0],
    //     };
    //   }
    // );

    // return resultCollection;
  });

export const suggestedCollectionsSelector = (genreId) =>
  createSelector([data], (data) => {
    const collectionGenre = data.dataShop.find(
      (item) => item.genre === genreId
    );
    const categoryRandom = Object.keys(collectionGenre.categories)[0];
    const categorySuggested = collectionGenre.categories[categoryRandom];
    // console.log(categorySuggested);
    const itemResults = Object.keys(categorySuggested).map((itemKey) => ({
      ...categorySuggested[itemKey],
      categoryid: categoryRandom,
    }));
    return itemResults;
  });

export const dataCollectionSelector = (collectionId, genreId) =>
  createSelector(
    [data],
    (data) => {
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
    }

    //
    //
  );

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
