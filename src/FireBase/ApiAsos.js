import { firestore } from "./FireBaseUtil";

export const createCategories = () => {
  const categoryCollecRef = firestore
    .collection("collections")
    .doc("kZzILXWTxyZYglE6IDLx")
    .collection("categories");
  const docRef = firestore.collection("genre").doc("mujer");
  docRef.get().then((document) => {
    const prendas = document.data().prendas;
    const keysCategories = Object.keys(prendas);
    keysCategories.forEach((key, index) => {
      const newDoc = categoryCollecRef.doc();
      newDoc.set({
        ...prendas[key],
      });
    });
  });
};

export const createProducts = async (products = []) => {
  const allFormatProducts = [];
  for (let index = 0; index < products.length; index++) {
    console.log("Starting Creating id ", index);
    try {
      const result = await fetch(
        `https://asos2.p.rapidapi.com/products/v3/detail?store=ES&sizeSchema=US&lang=es-ES&currency=EUR&id=${products[index].id}`,
        {
          method: "GET",
          headers: {
            "x-rapidapi-host": "asos2.p.rapidapi.com",
            "x-rapidapi-key":
              "e0c2ff620emshb363b654f7a100dp11dc64jsnab02f06151eb",
          },
        }
      );

      const data = await result.json();
      if (typeof data.errorCode !== "undefined") {
        console.log(data.errorCode);
      } else {
        const {
          name,
          description,
          media: { images },
          info,
          price: { current, previous, currency },
          rating,
          variants,
        } = data;
        const imagesSave = images.map((image) => image.url);
        const sizes = variants.map((variant) => variant.brandSize);

        allFormatProducts.push({
          name,
          description,
          images: imagesSave,
          info,
          price: { current, previous, currency },
          rating,
          sizes,
        });
      }
    } catch (error) {
      console.log(error);
    }
  }
  console.log(allFormatProducts);
  const refDoc = firestore
    .collection("collections")
    .doc("kZzILXWTxyZYglE6IDLx")
    .collection("categories")
    .doc("ipm1P5yFug7xs1NubFoj");

  return await refDoc.set(
    {
      products: allFormatProducts,
    },
    { merge: true }
  );
};
