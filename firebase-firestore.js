import {
    getFirestore,
    collection,
    doc,
    addDoc,
    setDoc,
} from "https://www.gstatic.com/firebasejs/10.14.1/firebase-firestore.js";


import { userId } from "./firebase-auth.js";
import { app } from "./firebase-common.js";

const db = getFirestore(app);


async function addData(data) {
    const userDocRef = doc(db, "answers", userId);
    try {
        await setDoc(userDocRef, data);

        console.log("Data added successfully");
    } catch (error) {
        console.error("Error adding document: ", error);
    }
}

export { addData };