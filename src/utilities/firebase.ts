import { onValue, ref } from 'firebase/database';
import { useCallback, useEffect, useState } from 'react';
import { initializeApp } from "firebase/app";
import { 
  getAuth, 
  GoogleAuthProvider, 
  onAuthStateChanged, 
  signInWithPopup,
  signOut,
  type User
} from 'firebase/auth';
import { getDatabase, update } from 'firebase/database';

const firebaseConfig = {
  apiKey: "AIzaSyBbe3P6WQAgtLvv205XmrkjZaqRyQ4EQRY",
  authDomain: "react-challenge-9a65c.firebaseapp.com",
  databaseURL: "https://react-challenge-9a65c-default-rtdb.firebaseio.com",
  projectId: "react-challenge-9a65c",
  storageBucket: "react-challenge-9a65c.firebasestorage.app",
  messagingSenderId: "322508851836",
  appId: "1:322508851836:web:f47db0ad14d6163a3ad7f9",
  measurementId: "G-G8EYKHC60G"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

// Add Firebase Auth
const auth = getAuth(app);

export const useAuthState = () => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    return onAuthStateChanged(auth, (user) => {
      setUser(user);
    });
  }, []);

  return [user];
};

const provider = new GoogleAuthProvider();

export const signInWithGoogle = () => {
  signInWithPopup(auth, provider)
    .catch((error) => {
      console.error(error);
    });
};

export const signOutUser = async () => {
  try {
    await signOut(auth);
  } catch (error) {
    console.error(error);
  }
};


const useDbData = (path: string) => {
  const [data, setData] = useState<unknown>();
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => (
    onValue(ref(database, path), (snapshot) => {
      setData(snapshot.val());
    }, (error) => {
      setError(error);
    })
  ), [path]);

  return [data, error];
};

export const useDbUpdate = (path: string) => {
  return useCallback((value: object) => (
    update(ref(database, path), value)
  ), [path]);
};

export default useDbData;

