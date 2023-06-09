import { useEffect, useState } from "react";
import {
  collection,
  getDocs,
  query,
  where,
  setDoc,
  doc,
  deleteDoc,
  updateDoc,
} from "firebase/firestore";
import { db, auth } from "../config/firebase";
import { nanoid } from "nanoid";

export const useFirestore = () => {
  const [data, setData] = useState([]);
  const [error, setError] = useState();
  const [loading, setLoading] = useState({});

  const getData = async () => {
    try {
      setLoading((prev) => ({ ...prev, getData: true }));
      const dataRef = collection(db, "urls");
      const queryData = query(
        dataRef,
        where("uid", "==", auth.currentUser.uid)
      );
      const querySnapshot = await getDocs(queryData);
      const dataDb = querySnapshot.docs.map((doc) => doc.data());
      setData(dataDb);
    } catch (error) {
      console.log(error);
      setError(error.message);
    } finally {
      setLoading((prev) => ({ ...prev, getData: false }));
    }
  };

  const addData = async (url) => {
    try {
      setLoading((prev) => ({ ...prev, addData: true }));
      const newDoc = {
        enabled: true,
        nanoid: nanoid(5),
        origin: url,
        uid: auth.currentUser.uid,
      };
      const docRef = doc(db, "urls", newDoc.nanoid);
      await setDoc(docRef, newDoc);
      setData([...data, newDoc]);
    } catch (error) {
      console.log(error.message);
      setError(error.message);
    } finally {
      setLoading((prev) => ({ ...prev, addData: false }));
    }
  };

  const deleteData = async (nanoid) => {
    try {
      setLoading((prev) => ({ ...prev, deleteData: true }));
      const docRef = doc(db, "urls", nanoid);
      await deleteDoc(docRef);
      setData(data.filter((item) => item.nanoid != nanoid));
    } catch (error) {
      console.log(error.message);
      setError(error.message);
    } finally {
      setLoading((prev) => ({ ...prev, addData: false }));
    }
  };

  const updateData = async (nanoid, newOrigin) => {
    try {
      setLoading((prev) => ({ ...prev, updateData: true }));
      const docRef = doc(db, "urls", nanoid);
      await updateDoc(docRef, { origin: newOrigin });
      setData(
        data.map((item) =>
          item.nanoid === nanoid ? { ...item, origin: newOrigin } : item
        )
      );
    } catch (error) {
      console.log(console.message);
      setError(error.message);
    } finally {
      setLoading((prev) => ({ ...prev, updateData: false }));
    }
  };

  return {
    data,
    error,
    loading,
    getData,
    addData,
    deleteData,
    updateData,
  };
};
