import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';
import 'firebase/storage';

const firebaseConfig = {
    apiKey: "AIzaSyDE4m7rjsqUnslU7o8_YMNuJuJ9E5vIEYQ",
    authDomain: "lulustore-ed754.firebaseapp.com",
    databaseURL: "https://lulustore-ed754.firebaseio.com",
    projectId: "lulustore-ed754",
    storageBucket: "lulustore-ed754.appspot.com",
    messagingSenderId: "326764885111",
    appId: "1:326764885111:web:ad153d1ecd517772e94272",
    measurementId: "G-V0SETSRG6J"
};

firebase.initializeApp(firebaseConfig);

export const auth = firebase.auth();
export const firestore = firebase.firestore();
export const storage = firebase.storage();

const provider = new firebase.auth.GoogleAuthProvider();

export const signInWithGoogle = () => auth.signInWithPopup(provider).then().catch(error => {
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
            ...otherProperties
        })
    }

    return userRef;
}

export const createCollectionAndDocuments = async (collectionKey, documentsToAdd) => {
    const collectionKeyRef = firestore.collection(collectionKey);
    let batch = firestore.batch();
    documentsToAdd.forEach(document => {
        const newDocRef = collectionKeyRef.doc();
        batch.set(newDocRef, document);
    })

    return await batch.commit();
}

export const convertCollectionsToObjects = (collection) => {
    const convertedDataArray = collection.docs.map(document => {
        const { category , items } = document.data();
        return {
            id: document.id,
            category,
            items
            // routeName: encodeURI(title.toLowerCase())
        }
    });

    const convertedDataObjects = convertedDataArray.reduce((acumulator, item) => {
        acumulator[item.category] = item;
        return acumulator;
    }, {})

    return convertedDataObjects;
}


export const uploadProductDB = async (product, items) => {

    const { brand, category, genre } = product;
    let batch = firestore.batch();

    const newDocRef = firestore.collection("collections").doc();
    batch.set(newDocRef, { brand, genre });

    const proDocRef = newDocRef.collection("productos").doc();
    batch.set(proDocRef, { category, items });
 
    return await batch.commit();
}

export const uploadImages = async (items) => {
    // console.log(product);
    const promises = [];
    items.forEach(item => {
        const uploadImages = storage.ref().child('images-lulu/' + item.image.name).put(item.image);
        promises.push(uploadImages)
        uploadImages.on(firebase.storage.TaskEvent.STATE_CHANGED,
            snapshot => {
                let progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                console.log('Upload is ' + progress + '% done');
            },
            error => console.log(error)
        );
    });

    return Promise.all(promises).then(responses => {
        return responses.map(snapshot => snapshot.ref.getDownloadURL());
    }).then(responseImgs => {
        return Promise.all(responseImgs).then(downloadURL => {
            let itemsImgLoaded = items.map((item, index) => ({ ...item, image: downloadURL[index] }))
            // let dt = uploadProductDB(product, itemsImgLoaded);
            return itemsImgLoaded;
        })
    }).catch(err => console.log(err.code));
}


export const addNewItems = (productRef, items) => {

    console.log(items);

    productRef.update({
        items: firebase.firestore.FieldValue.arrayUnion(...items)
    });
}

export const removeItem = (productRef, items, itemtoDelete) => {

    productRef.update({
        items: items.filter(item => item.name !== itemtoDelete.name)
    });
}

export const addCategoryDoc = (productRef, category, items) => {
    console.log(items);

    productRef.set({
        category,
        items
    });
}
