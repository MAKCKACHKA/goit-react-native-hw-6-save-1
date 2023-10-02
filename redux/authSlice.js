import { createSlice } from "@reduxjs/toolkit";

// import {
//   createUserWithEmailAndPassword,
//   getAuth,
//   signInWithEmailAndPassword,
//   updateProfile,
// } from "firebase/auth";
// import { initializeApp } from "firebase/app";
// import { getDatabase, ref, set, update } from "firebase/database";
// import {
//   collection,
//   doc,
//   getFirestore,
//   setDoc,
//   updateDoc,
// } from "firebase/firestore";
// import { docUid } from "../config";

// const firebaseConfig = {
//   apiKey: "AIzaSyBNLU6QRyBo-vfZAzYVxwl3AIlgJH7x4qo",
//   authDomain: "react-native-hw-4fea8.firebaseapp.com",
//   databaseURL:
//     "https://react-native-hw-4fea8-default-rtdb.europe-west1.firebasedatabase.app",
//   projectId: "react-native-hw-4fea8",
//   storageBucket: "react-native-hw-4fea8.appspot.com",
//   messagingSenderId: "1046278970744",
//   appId: "1:1046278970744:web:f0dd789fc7053d2b51bc8d",
// };

// const app = initializeApp(firebaseConfig);
// const auth = getAuth(app);

const authState = {
  login: "",
  email: "",
  password: "",

  uid: "",

  posts: [],
  data: {},
};

export const authSlice = createSlice({
  name: "auth",
  initialState: authState,
  reducers: {
    changeLogin: (state, action) => {
      state.login = action.payload;
    },
    changeEmail: (state, action) => {
      state.email = action.payload;
    },
    changePassword: (state, action) => {
      state.password = action.payload;
    },

    changeUid: (state, action) => {
      state.uid = action.payload;
    },

    logOut: (state) => {
      state.uid = "";
    },

    changePosts: (state, action) => {
      state.posts = action.payload;
    },

    changeData: (state, action) => {
      state.data = action.payload;
    },
  },
});

export const authReducer = authSlice.reducer;

export const {
  changeLogin,
  changeEmail,
  changePassword,
  changeUid,
  // changePosts,
} = authSlice.actions;
