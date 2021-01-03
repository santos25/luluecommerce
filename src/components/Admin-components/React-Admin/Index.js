import React from "react";
import { Admin, Resource } from "react-admin";
import {
  FirebaseAuthProvider,
  FirebaseDataProvider,
  FirebaseRealTimeSaga,
} from "react-admin-firebase";

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

const options = {};

const dataProvider = FirebaseDataProvider(firebaseConfig, options);

const Index = () => {
  return (
    <Admin dataProvider={dataProvider}>
      <Resource
        name="catgories"
        // list={PostList}
        // show={PostShow}
        // create={PostCreate}
        // edit={PostEdit}
      />
    </Admin>
  );
};

export default Index;
