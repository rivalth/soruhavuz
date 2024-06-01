import firebase_app from "../firebase";
import { getFirestore, doc, setDoc, collection, addDoc } from "firebase/firestore";

const db = getFirestore(firebase_app)
export async function setData(colllection, id, data) {
    let result = null;
    let error = null;

    try {
        result = await setDoc(doc(db, colllection, id), data, {
            merge: true,
        });
    } catch (e) {
        error = e;
    }

    return { result, error };
}

export async function addData(_collection, data) {
    let result = null;
    let error = null;

    try {
        result = await addDoc(collection(db, _collection), data);
    } catch (e) {
        error = e;
    }

    return { result, error };
}