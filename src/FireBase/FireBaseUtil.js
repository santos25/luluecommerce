import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

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

const provider = new firebase.auth.GoogleAuthProvider();
export const signInWithGoogle = () => auth.signInWithPopup(provider).then().catch(error => {
    console.log(error);
});


export const createDocumentUserDb = async (userAuth , otherProperties) => {
    console.log({userAuth});
    if(!userAuth) return;
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
// export default firebase;

