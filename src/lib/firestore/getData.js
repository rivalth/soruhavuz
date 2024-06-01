import firebase_app from "../firebase";
import { getFirestore, doc, getDoc, getDocs, collection } from "firebase/firestore";

const db = getFirestore(firebase_app)

export async function getDocuments(_collection) {
    return new Promise((resolve, reject) => {
        try {
            getDocs(collection(db, _collection)).then((x) => {
                const result = [];
                x.forEach(doc => result.push({ ...doc._document.data.value.mapValue.fields, id: doc.id }))
                resolve({ result: result, error: null });
            })
        } catch (err) {
            resolve({ result: null, error: err })
        }
    })
}