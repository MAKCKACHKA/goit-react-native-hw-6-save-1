import {
  createUserWithEmailAndPassword,
  getAuth,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
} from "firebase/auth";
import { initializeApp } from "firebase/app";

import { getDatabase, ref, set, update } from "firebase/database";

import {
  collection,
  doc,
  getDocs,
  getFirestore,
  setDoc,
  updateDoc,
  query,
  where,
  arrayUnion,
} from "firebase/firestore";

import { initializeAuth, getReactNativePersistence } from "firebase/auth";
import ReactNativeAsyncStorage from "@react-native-async-storage/async-storage";

const firebaseConfig = {
  apiKey: "AIzaSyBNLU6QRyBo-vfZAzYVxwl3AIlgJH7x4qo",
  authDomain: "react-native-hw-4fea8.firebaseapp.com",
  databaseURL:
    "https://react-native-hw-4fea8-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "react-native-hw-4fea8",
  storageBucket: "react-native-hw-4fea8.appspot.com",
  messagingSenderId: "1046278970744",
  appId: "1:1046278970744:web:f0dd789fc7053d2b51bc8d",
};

// import { initializeAuth, getReactNativePersistence } from "firebase/auth";
// import ReactNativeAsyncStorage from "@react-native-async-storage/async-storage";

const app = initializeApp(firebaseConfig);
export const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage),
});
// const auth = initializeAuth(app, {
//   persistence: getReactNativePersistence(ReactNativeAsyncStorage),
// });

export let docUid = "";

export const handleRegistration = async (email, password, login) => {
  try {
    const createUser = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    await updateProfile(createUser.user, {
      displayName: login,
    });

    const db = getFirestore(app);
    const firestor = getFirestore();

    const docData = {
      uid: createUser.user.uid,
      displayName: createUser.user.displayName,
      email: createUser.user.email,
      photoURL: createUser.user.photoURL,
      posts: [],
    };
    // updateDoc(doc(db, "users", createUser.user.uid), docData);
    setDoc(doc(db, "users", createUser.user.uid), docData);

    docUid = createUser.user.uid;
    console.log(`${docUid} docUid docUid docUid`);

    // const postsCol = collection(db, "posts");
    console.log("!!!!!!Успішна реєстрація:", createUser.user.uid);
    // console.log(createUser.user.uid);
  } catch {
    (error) => {
      // console.log(auth);
      console.error("Помилка реєстрації:", error);
    };
  }
};

export const signUp = async (email, password) => {
  try {
    const signUp = await signInWithEmailAndPassword(auth, email, password);
    // console.log(signUp.user);
    docUid = signUp.user.uid;

    // console.log("!!!!!!!!!Успішний вхід:", signUp.user.uid);
    // console.log(docUid);
  } catch (error) {
    // console.log(auth);
    console.error("Помилка входу:", error);
  }
};

export const logOut = async () => {
  await signOut(auth);
  docUid = "";
};

export const authStateChanged = async (onChange = () => {}) => {
  onAuthStateChanged(auth, (user) => {
    onChange(user);
    console.log("authStateChanged", user.uid);
    const data = user.data();
    return data;
    // console.log("onAuthStateChangedonAuthuthStateChanged", auth);
  });
};

export const getData = async () => {
  try {
    const db = getFirestore(app);
    const uid = "lSoS3DkyYXdYEwvd0Ud7xNLmCNg2";
    const q = query(collection(db, "users"), where("uid", "==", uid));
    const querySnapshot = await getDocs(q);

    // querySnapshot.forEach((doc) => {
    //   console.log(`${doc.id} => ${doc.data().userData.displayName}`);
    // });
  } catch (error) {
    console.error("Помилка отримання даних:", error);
  }
};

export let userData = null;

export const getD = async (uid) => {
  try {
    const db = getFirestore(app);
    // const uid = "lSoS3DkyYXdYEwvd0Ud7xNLmCNg2";
    const q = query(collection(db, "users"), where("uid", "==", uid));
    const querySnapshot = await getDocs(q);

    querySnapshot.forEach((doc) => {
      userData = doc.data();
    });
    // console.log(userData);

    // console.log("отримано дані:", uid);

    return userData;
  } catch (error) {
    console.error("Помилка отримати дані:", error);
  }
};

export const addPost = (uid, newData) => {
  try {
    const db = getFirestore(app);
    updateDoc(doc(db, "users", uid), {
      posts: arrayUnion(newData),
    });
    // console.log(newData);
    console.log("Дані успішно додані до вмісту posts.");
  } catch (error) {
    console.error("Помилка додавання даних до вмісту posts:", error);
  }
};
