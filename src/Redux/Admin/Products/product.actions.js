import PRODUCT_TYPE from './product.type';
import { firestore, removeItem, uploadImages  } from '../../../FireBase/FireBaseUtil';

const fetchingProductsStart = () => ({
    type: PRODUCT_TYPE.FETCHING_PRODUCTS_START
});

const fetchingProductsSuccess = (products) => ({
    type: PRODUCT_TYPE.FETCHING_PRODUCTS_SUCCESS,
    payload: products
});


export const uploadProductsStart = () => ({
    type: PRODUCT_TYPE.UPLOADING_PRODUCTS_START
});


export const uploadProductsSuccess = () => ({
    type: PRODUCT_TYPE.UPLOADING_PRODUCTS_SUCCESS
});


export const fetchingProductsAsync = () => {
    return (dispatch) => {
        dispatch(fetchingProductsStart());
        const collectionsRef = firestore.collection('collections');
        collectionsRef.get().then((snapshot) => {

            const productValues = snapshot.docs.map(document => ({ id: document.id, ...document.data() }))
            dispatch(fetchingProductsSuccess(productValues));

            // const valueArray = snapshot.docs.map(async (document) => {
            //     let   collection = { id: document.id, ...document.data() }
            //     console.log(collection);

            //     const productos = await document.ref.collection('productos').get()
            //     collection.productos = productos.docs.map(producto => ({ id: producto.id, ...producto.data() }))
            //     return collection;
            // })
        })
        // .then(response => {

        //     Promise.all(response).then(res => {
        //         dispatch(fetchingProductsSuccess([...res]));
        //     })
        // })
    }
}

// export const addNewItemsAsync = ({ idcollection, category, items }) => {
//     return (dispatch) => {
//         dispatch(uploadProductsStart());
//         // console.log(product);

//         // const productRef = firestore.collection('collections').doc(idcollection).collection('productos').doc(productoid)
//         const productRef = firestore.collection('collections').doc(idcollection)

//         productRef.get().then(async (document) => {
//             console.log(document.exists);

//             if (document.exists) {
//                 const itemsImgLoaded = await uploadImages(items)
//                 addNewItems(productRef, document,  category ,  itemsImgLoaded)
//                 dispatch(uploadProductsSuccess());

//             } else
//                 console.log("no exist document");

//         })


//     }
// }

// export const addCategory = ({ idcollection, category, items }) => {
//     return (dispatch) => {
//         dispatch(uploadProductsStart());

//         const productRef = firestore.collection('collections').doc(idcollection)
//         // console.log(items);

//         productRef.get().then(async (snapshot) => {
//             console.log(snapshot.exists);

//             if (snapshot.exists) {
//                 console.log("Existe");
//                 const itemsImgLoaded = await uploadImages(items)
//                 console.log(itemsImgLoaded);
//                 addCategoryDoc(productRef, category, itemsImgLoaded)
//                 dispatch(uploadProductsSuccess());

//             }
//         })

//     }
// }

export const removeItemsAsync = ({ idcollection, productoid }, item) => {
    return (dispatch) => {
        const productRef = firestore.collection('collections').doc(idcollection).collection('productos').doc(productoid)
        productRef.get().then(async (snapshot) => {
            console.log(snapshot.exists);

            if (snapshot.exists) {
                removeItem(productRef, snapshot.data().items, item);
                dispatch(fetchingProductsAsync())
            } else
                console.log("no exist document");

        })

    }
}
