import { onValue, ref } from 'firebase/database';
import { useCallback, useEffect, useState } from 'react';
import { initializeApp } from "firebase/app";
import { getDatabase, push, update } from 'firebase/database';

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
  return useCallback((value: unknown) => (
    update(ref(database, path), value)
  ), [path]);
};

export default useDbData;

