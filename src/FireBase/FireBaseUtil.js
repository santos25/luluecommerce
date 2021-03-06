import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";
import "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyDE4m7rjsqUnslU7o8_YMNuJuJ9E5vIEYQ",
  authDomain: "lulustore-ed754.firebaseapp.com",
  databaseURL: "https://lulustore-ed754.firebaseio.com",
  projectId: "lulustore-ed754",
  storageBucket: "lulustore-ed754.appspot.com",
  messagingSenderId: "326764885111",
  appId: "1:326764885111:web:ad153d1ecd517772e94272",
  measurementId: "G-V0SETSRG6J",
};

firebase.initializeApp(firebaseConfig);

export const auth = firebase.auth();
export const firestore = firebase.firestore();
export const storage = firebase.storage();

const provider = new firebase.auth.GoogleAuthProvider();

export const signInWithGoogle = () =>
  auth
    .signInWithPopup(provider)
    .then()
    .catch((error) => {
      console.log(error);
    });

export const createDocumentUserDb = async (userAuth, otherProperties) => {
  if (!userAuth) return;
  console.log(userAuth.id);
  const userRef = firestore.doc(`users/${userAuth.uid}`);
  const snapshot = await userRef.get();
  // console.log({snapshot});

  if (!snapshot.exists) {
    const { displayName, email } = userAuth;
    const date = new Date();
    await userRef.set({
      displayName,
      email,
      date,
      ...otherProperties,
    });
  }

  return userRef;
};

export const createCollectionAndDocuments = async (
  collectionKey,
  documentsToAdd
) => {
  let batch = firestore.batch();

  documentsToAdd.forEach((doc) => {
    const collectionKeyRef = firestore
      .collection("collections")
      .doc("AMZYPUVf4xfQdP239Z1s")
      .collection("productos")
      .doc(doc.id)
      .collection("items");

    doc.items.forEach((item) => {
      const newDocRef = collectionKeyRef.doc();
      batch.set(newDocRef, item);
    });
  });

  return await batch.commit();
};

export const convertCollectionsToObjects = (collection) => {
  const convertedDataArray = collection.docs.map((document) => {
    const { category } = document.data();

    return {
      id: document.id,
      category,
      // routeName: encodeURI(title.toLowerCase())
    };
  });

  const convertedDataObjects = convertedDataArray.reduce((acumulator, item) => {
    acumulator[item.category] = item;
    return acumulator;
  }, {});

  return convertedDataObjects;
};

export const uploadProductDB = async (document, product, items) => {
  let itemTotal = 0;
  if (document.data().categories.hasOwnProperty(product.category))
    itemTotal = Object.keys(document.data().categories[product.category])
      .length;

  let objItems = {};

  console.log(items);
  items.forEach((item, i) => {
    objItems[`item_${itemTotal}`] = { ...item, createdt: new Date() };
    itemTotal++;
  });

  const result = await document.ref.set(
    {
      categories: {
        [product.category.toLowerCase()]: objItems,
      },
    },
    { merge: true }
  );

  return result;
};

export const uploadImages = async (items, category, genre) => {
  console.log(items);

  try {
    const promisesItem = items.map((item) =>
      item.image.map((image) => {
        const uploadImage = storage
          .ref(`images-lulu/${genre}/${category}/${item.name}`)
          .child(image.name)
          .put(image);
        uploadImage.on(
          firebase.storage.TaskEvent.STATE_CHANGED,
          (snapshot) => {
            let progress =
              (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            console.log("Upload is " + progress + "% done");
          },
          (error) => console.log(error)
        );
        return uploadImage;
      })
    );
    console.log(promisesItem);
    for (let index = 0; index < promisesItem.length; index++) {
      // console.log("loop", promisesItem[index]);
      const resultImages = await Promise.all(promisesItem[index]);
      const resultUrlImages = await Promise.all(
        resultImages.map((snapshot) => snapshot.ref.getDownloadURL())
      );
      // console.log(resultUrlImages);
      items[index].image = resultUrlImages;
      // console.log("ciclo");
    }
    return [...items];
  } catch (error) {
    console.log("Error Uploading Images ", error);
  }
};

// export const addNewItems = (productRef, document , category , items) => {

//     const itemsSavedObjetc = document.data().categories[category];
//     let itemTotal = Object.keys(document.data().categories[category]).length;

//     console.log(items);

//     let objItems= {};

//     console.log(items);
//     items.forEach( item => {
//         objItems[`item_${itemTotal}`] = {...item , createdt : new Date()};
//         itemTotal++
//     })

//     productRef.update({
//         [`categories.${category}`] : {...itemsSavedObjetc , ...objItems}
//     });
// }

export const updateItem = (docRef, category, itemKey, editedItem) => {
  console.log(editedItem);
  docRef.update({
    [`categories.${category}.${itemKey}`]: editedItem,
  });
};

export const removeItem = (docRef, category, itemKey) => {
  docRef.update({
    [`categories.${category}.${itemKey}`]: firebase.firestore.FieldValue.delete(),
  });
};

export const removePrenda = (docRef, item) => {
  docRef.update({
    [`prendas.${item.name.toLowerCase()}`]: firebase.firestore.FieldValue.delete(),
  });
};
